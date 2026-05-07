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
        CREATE TABLE IF NOT EXISTS announcements (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          title text NOT NULL,
          body text NOT NULL,
          link_url text,
          loom_url text,
          image_url text,
          created_by text NOT NULL DEFAULT 'admin',
          published boolean NOT NULL DEFAULT true,
          created_at timestamptz NOT NULL DEFAULT now()
        );
        ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='announcements' AND policyname='anon_read') THEN
            CREATE POLICY anon_read ON announcements FOR SELECT USING (published = true);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='announcements' AND policyname='service_all') THEN
            CREATE POLICY service_all ON announcements USING (true) WITH CHECK (true);
          END IF;
        END $$;
      `,
    }),
  });
}

export async function GET() {
  const client = getClient();
  if (!client) return NextResponse.json({ announcements: [] });

  const { data, error } = await client
    .from('announcements')
    .select('id, title, body, link_url, loom_url, image_url, created_by, created_at, published')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error?.message?.includes('does not exist')) {
    await ensureTable();
    return NextResponse.json({ announcements: [] });
  }

  return NextResponse.json({ announcements: data ?? [] });
}

export async function POST(req: NextRequest) {
  const client = getClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const body = await req.json() as {
    title: string; body: string; link_url?: string;
    loom_url?: string; image_url?: string; created_by: string; published?: boolean;
  };

  if (!body.title?.trim() || !body.body?.trim()) {
    return NextResponse.json({ error: 'title and body required' }, { status: 400 });
  }

  const { data, error } = await client.from('announcements').insert({
    title: body.title.trim(),
    body: body.body.trim(),
    link_url: body.link_url || null,
    loom_url: body.loom_url || null,
    image_url: body.image_url || null,
    created_by: body.created_by || 'admin',
    published: body.published ?? true,
  }).select().single();

  if (error?.message?.includes('does not exist')) {
    await ensureTable();
    return NextResponse.json({ error: 'Table created — retry' }, { status: 503 });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ announcement: data });
}
