import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import recordingsData from '@/repo/data/recordings.json';

type RecordingItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  duration_mins?: number;
  watch_first?: boolean;
  published?: boolean;
  sort_order?: number;
};

function getStaticItems(): RecordingItem[] {
  const fromRecordings = (recordingsData.recordings ?? []).map((r) => ({
    ...r,
    tags: [] as string[],
  }));

  const fromReference = (recordingsData.reference_recordings ?? []).map((r) => {
    const raw = r as { id: string; title: string; description: string; url: string; category?: string; duration_mins?: number; tags?: (string | string[])[] };
    const flatTags = (raw.tags ?? []).map((t) => (Array.isArray(t) ? t.join(',') : t));
    return { ...raw, category: raw.category ?? 'reference', tags: flatTags };
  });

  const fromLooms = (recordingsData.training_looms ?? []).map((r) => {
    const raw = r as { id: string; title: string; description: string; url: string; category?: string; priority?: string; tags?: string[] };
    const tags = raw.priority ? [raw.priority, ...(raw.tags ?? [])] : (raw.tags ?? []);
    return { ...raw, category: raw.category ?? 'training_loom', tags };
  });

  return [...fromRecordings, ...fromReference, ...fromLooms] as RecordingItem[];
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
        CREATE TABLE IF NOT EXISTS content_recordings (
          id text PRIMARY KEY,
          title text NOT NULL,
          description text NOT NULL,
          url text NOT NULL,
          category text NOT NULL DEFAULT 'training_loom',
          tags text[] DEFAULT '{}',
          duration_mins integer,
          watch_first boolean DEFAULT false,
          published boolean DEFAULT true,
          sort_order integer DEFAULT 0,
          created_at timestamptz DEFAULT now()
        );
        ALTER TABLE content_recordings ENABLE ROW LEVEL SECURITY;
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='content_recordings' AND policyname='anon_read') THEN
            CREATE POLICY anon_read ON content_recordings FOR SELECT USING (published = true);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='content_recordings' AND policyname='service_all') THEN
            CREATE POLICY service_all ON content_recordings USING (true) WITH CHECK (true);
          END IF;
        END $$;
      `,
    }),
  });
}

function mergeItems(staticItems: RecordingItem[], dbRows: RecordingItem[]): RecordingItem[] {
  const dbMap = new Map(dbRows.map((r) => [r.id, r]));
  const unpublishedIds = new Set(dbRows.filter((r) => r.published === false).map((r) => r.id));

  const merged: RecordingItem[] = [];
  for (const item of staticItems) {
    if (unpublishedIds.has(item.id)) continue;
    const dbVersion = dbMap.get(item.id);
    merged.push(dbVersion ? { ...item, ...dbVersion } : item);
  }

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

  const { data, error } = await client.from('content_recordings').select('*');
  if (error?.message?.includes('does not exist')) {
    await ensureTable();
    return NextResponse.json({ items: staticItems });
  }
  if (error) return NextResponse.json({ items: staticItems });

  return NextResponse.json({ items: mergeItems(staticItems, (data ?? []) as RecordingItem[]) });
}

export async function POST(req: NextRequest) {
  const client = getAdminClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const body = await req.json() as Partial<RecordingItem>;
  const id = body.id ?? `${(body.title ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 40)}_${Date.now()}`;

  const { data, error } = await client
    .from('content_recordings')
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
