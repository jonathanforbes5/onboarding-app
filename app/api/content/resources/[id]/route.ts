import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sopsData from '@/repo/data/sops.json';

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon?: string;
  category: string;
  tags: string[];
  published?: boolean;
  sort_order?: number;
};

function getStaticIds(): Set<string> {
  const resources = (sopsData.resources ?? []).map((r) => r.id);
  const tools = (sopsData.tools ?? []).map((r) => r.id);
  const sops = (sopsData.sops ?? []).map((r) => r.id);
  return new Set([...resources, ...tools, ...sops]);
}

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
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
        CREATE TABLE IF NOT EXISTS content_resources (
          id text PRIMARY KEY,
          title text NOT NULL,
          description text NOT NULL,
          url text NOT NULL,
          icon text DEFAULT '📄',
          category text NOT NULL DEFAULT 'sop',
          tags text[] DEFAULT '{}',
          published boolean DEFAULT true,
          sort_order integer DEFAULT 0,
          created_at timestamptz DEFAULT now()
        );
        ALTER TABLE content_resources ENABLE ROW LEVEL SECURITY;
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='content_resources' AND policyname='anon_read') THEN
            CREATE POLICY anon_read ON content_resources FOR SELECT USING (published = true);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='content_resources' AND policyname='service_all') THEN
            CREATE POLICY service_all ON content_resources USING (true) WITH CHECK (true);
          END IF;
        END $$;
      `,
    }),
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = getAdminClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const body = await req.json() as Partial<ResourceItem>;
  const { data, error } = await client
    .from('content_resources')
    .upsert({ ...body, id })
    .select()
    .single();

  if (error?.message?.includes('does not exist')) {
    await ensureTable();
    return NextResponse.json({ error: 'Table created — retry' }, { status: 503 });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = getAdminClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const staticIds = getStaticIds();

  if (staticIds.has(id)) {
    // Soft-delete: set published=false
    const { error } = await client
      .from('content_resources')
      .upsert({ id, published: false } as ResourceItem)
      .eq('id', id);
    if (error?.message?.includes('does not exist')) {
      await ensureTable();
      return NextResponse.json({ error: 'Table created — retry' }, { status: 503 });
    }
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ deleted: false, hidden: true });
  }

  const { error } = await client.from('content_resources').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
