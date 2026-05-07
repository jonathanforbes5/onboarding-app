import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function ensureTable() {
  const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN;
  const projectRef = process.env.SUPABASE_PROJECT_REF ?? 'keceufndfmmcpwferudo';
  if (!mgmtToken) return;
  await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${mgmtToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        CREATE TABLE IF NOT EXISTS roadmap_items (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          title text NOT NULL,
          description text,
          status text NOT NULL DEFAULT 'planned',
          category text,
          created_by text NOT NULL DEFAULT 'admin',
          created_at timestamptz NOT NULL DEFAULT now(),
          updated_at timestamptz NOT NULL DEFAULT now()
        );
        ALTER TABLE roadmap_items ENABLE ROW LEVEL SECURITY;
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='roadmap_items' AND policyname='all_access') THEN
            CREATE POLICY all_access ON roadmap_items USING (true) WITH CHECK (true);
          END IF;
        END $$;
      `,
    }),
  });
}

export async function GET() {
  const client = getClient();
  if (!client) return NextResponse.json({ items: [] });

  const { data, error } = await client
    .from('roadmap_items')
    .select('id, title, description, status, category, created_by, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error?.message?.includes('does not exist')) {
    await ensureTable();
    return NextResponse.json({ items: [] });
  }
  if (error) return NextResponse.json({ items: [] });
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: NextRequest) {
  const client = getClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const body = await req.json() as {
    title: string; description?: string; status?: string; category?: string; created_by?: string;
  };

  if (!body.title?.trim()) {
    return NextResponse.json({ error: 'title required' }, { status: 400 });
  }

  const validStatuses = ['planned', 'in_progress', 'done'];
  const status = validStatuses.includes(body.status ?? '') ? body.status : 'planned';

  const { data, error } = await client.from('roadmap_items').insert({
    title: body.title.trim(),
    description: body.description?.trim() || null,
    status,
    category: body.category?.trim() || null,
    created_by: body.created_by || 'admin',
  }).select().single();

  if (error?.message?.includes('does not exist')) {
    await ensureTable();
    return NextResponse.json({ error: 'Table created — retry' }, { status: 503 });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
