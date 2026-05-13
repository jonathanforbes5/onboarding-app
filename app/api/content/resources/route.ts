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

function getStaticItems(): ResourceItem[] {
  const fromResources = (sopsData.resources ?? []).map((r) => ({ ...r, tags: [] as string[] }));
  const fromTools = (sopsData.tools ?? []).map((r) => ({ ...r, tags: [] as string[] }));
  const fromSops = (sopsData.sops ?? []).map((r) => ({ ...r, tags: (r as { tags?: string[] }).tags ?? [] }));
  return [...fromResources, ...fromTools, ...fromSops] as ResourceItem[];
}

function getStaticIds(): Set<string> {
  return new Set(getStaticItems().map((r) => r.id));
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

function mergeItems(staticItems: ResourceItem[], dbRows: ResourceItem[]): ResourceItem[] {
  const dbMap = new Map(dbRows.map((r) => [r.id, r]));
  const unpublishedIds = new Set(dbRows.filter((r) => r.published === false).map((r) => r.id));

  // Start with static items, overriding with DB versions where applicable
  const merged: ResourceItem[] = [];
  for (const item of staticItems) {
    if (unpublishedIds.has(item.id)) continue;
    const dbVersion = dbMap.get(item.id);
    merged.push(dbVersion ? { ...item, ...dbVersion } : item);
  }

  // Append DB-only items (not in static) that are published
  const staticIds = new Set(staticItems.map((r) => r.id));
  for (const row of dbRows) {
    if (!staticIds.has(row.id) && row.published !== false) {
      merged.push(row);
    }
  }

  return merged;
}

export async function GET() {
  const staticItems = getStaticItems();
  const client = getAdminClient();
  if (!client) return NextResponse.json({ items: staticItems });

  const { data, error } = await client.from('content_resources').select('*');
  if (error?.message?.includes('does not exist')) {
    await ensureTable();
    return NextResponse.json({ items: staticItems });
  }
  if (error) return NextResponse.json({ items: staticItems });

  return NextResponse.json({ items: mergeItems(staticItems, (data ?? []) as ResourceItem[]) });
}

export async function POST(req: NextRequest) {
  const client = getAdminClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const body = await req.json() as Partial<ResourceItem>;
  const id = body.id ?? `${(body.title ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 40)}_${Date.now()}`;

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

