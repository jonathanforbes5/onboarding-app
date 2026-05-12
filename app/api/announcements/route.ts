import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Announcements that should always exist in the DB.
// On GET, any missing entries (matched by title) are auto-inserted.
const SEEDED_ANNOUNCEMENTS = [
  {
    title: 'Landing Page v2 Tutorial — SOP + Video Now Live',
    body: "Cole just dropped the new Landing Page v2 tutorial. There's a full written SOP and a Loom walkthrough covering the complete build flow end-to-end. Find both in Resources → SOPs (filter by Onboarding or Service Delivery).",
    link_url: 'https://docs.google.com/document/d/1T9aEbXitLV6XZkRCnYD8_7CX3_isp6okUEIxipZIGpQ/edit?tab=t.0',
    loom_url: 'https://www.loom.com/share/56ad708c46c24e138d0ba954b976c13d',
    created_by: 'Cole Yedema',
    published: true,
  },
];

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

const SELECT_COLS = 'id, title, body, link_url, loom_url, image_url, created_by, created_at, published';

async function fetchAnnouncements(client: ReturnType<typeof getClient>) {
  if (!client) return null;
  const res = await client.from('announcements').select(SELECT_COLS).eq('published', true).order('created_at', { ascending: false });
  if (res.error?.message?.includes('does not exist')) {
    await ensureTable();
    const retry = await client.from('announcements').select(SELECT_COLS).eq('published', true).order('created_at', { ascending: false });
    return retry.error ? null : (retry.data ?? []);
  }
  return res.error ? null : (res.data ?? []);
}

export async function GET() {
  const client = getClient();
  if (!client) return NextResponse.json({ announcements: [] });

  const rows = await fetchAnnouncements(client);
  if (rows === null) return NextResponse.json({ announcements: [] });

  // Insert any seeded announcements missing from the DB (matched by title).
  const existingTitles = new Set(rows.map((a) => a.title));
  const missing = SEEDED_ANNOUNCEMENTS.filter((s) => !existingTitles.has(s.title));
  if (missing.length > 0) {
    const { data: inserted } = await client.from('announcements').insert(missing).select(SELECT_COLS);
    const merged = [...(inserted ?? []), ...rows].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    return NextResponse.json({ announcements: merged });
  }

  return NextResponse.json({ announcements: rows });
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
