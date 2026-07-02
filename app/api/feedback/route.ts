import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function runSql(sql: string): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  try {
    // PostgREST v12 SQL endpoint — accepts raw DDL with service role key
    const res = await fetch(`${url}/rest/v1/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sql',
        'Authorization': `Bearer ${key}`,
        'apikey': key,
      },
      body: sql,
    });
    if (res.ok) return true;
    const text = await res.text();
    if (text.toLowerCase().includes('already exist')) return true;
    console.error('[feedback] runSql failed', res.status, text.slice(0, 300));

    // Fall back to management API if available
    const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN;
    const projectRef = process.env.SUPABASE_PROJECT_REF ?? 'keceufndfmmcpwferudo';
    if (!mgmtToken) return false;
    const mgmt = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${mgmtToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: sql }),
    });
    return mgmt.ok;
  } catch (e) {
    console.error('[feedback] runSql error:', e);
    return false;
  }
}

async function ensureTables(): Promise<boolean> {
  // Order matters: feedback_votes and feedback_comments reference feedback_items
  const stmts = [
    `CREATE TABLE IF NOT EXISTS feedback_items (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      description text,
      category text,
      vote_count integer NOT NULL DEFAULT 0,
      created_by text NOT NULL DEFAULT 'anonymous',
      status text NOT NULL DEFAULT 'open',
      created_at timestamptz NOT NULL DEFAULT now()
    )`,
    `ALTER TABLE feedback_items ENABLE ROW LEVEL SECURITY`,
    `DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='feedback_items' AND policyname='all_access') THEN
        CREATE POLICY all_access ON feedback_items FOR ALL USING (true) WITH CHECK (true);
      END IF;
    END $$`,
    `CREATE TABLE IF NOT EXISTS feedback_votes (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      feedback_item_id uuid NOT NULL REFERENCES feedback_items(id) ON DELETE CASCADE,
      user_key text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now(),
      UNIQUE(feedback_item_id, user_key)
    )`,
    `ALTER TABLE feedback_votes ENABLE ROW LEVEL SECURITY`,
    `DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='feedback_votes' AND policyname='all_access') THEN
        CREATE POLICY all_access ON feedback_votes FOR ALL USING (true) WITH CHECK (true);
      END IF;
    END $$`,
    `CREATE TABLE IF NOT EXISTS feedback_comments (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      feedback_item_id uuid NOT NULL REFERENCES feedback_items(id) ON DELETE CASCADE,
      author text NOT NULL DEFAULT 'admin',
      comment text NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )`,
    `ALTER TABLE feedback_comments ENABLE ROW LEVEL SECURITY`,
    `DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='feedback_comments' AND policyname='all_access') THEN
        CREATE POLICY all_access ON feedback_comments FOR ALL USING (true) WITH CHECK (true);
      END IF;
    END $$`,
    `CREATE INDEX IF NOT EXISTS feedback_votes_item_idx ON feedback_votes(feedback_item_id)`,
    `CREATE INDEX IF NOT EXISTS feedback_comments_item_idx ON feedback_comments(feedback_item_id)`,
  ];

  for (const stmt of stmts) {
    const ok = await runSql(stmt.trim());
    if (!ok) {
      console.error('[feedback] ensureTables: statement failed, aborting');
      return false;
    }
  }
  return true;
}

export async function GET(req: NextRequest) {
  const client = getClient();
  if (!client) return NextResponse.json({ items: [] });

  const userKey = req.nextUrl.searchParams.get('user_key') ?? '';

  const { data: items, error } = await client
    .from('feedback_items')
    .select('id, title, description, category, vote_count, created_by, status, created_at')
    .order('vote_count', { ascending: false })
    .order('created_at', { ascending: false });

  if (error?.message?.includes('does not exist')) {
    await ensureTables();
    return NextResponse.json({ items: [] });
  }
  if (error) return NextResponse.json({ items: [] });

  let votedIds: string[] = [];
  if (userKey) {
    const { data: votes } = await client
      .from('feedback_votes')
      .select('feedback_item_id')
      .eq('user_key', userKey);
    votedIds = (votes ?? []).map((v: { feedback_item_id: string }) => v.feedback_item_id);
  }

  return NextResponse.json({
    items: (items ?? []).map((item: {
      id: string; title: string; description: string | null; category: string | null;
      vote_count: number; created_by: string; status: string; created_at: string;
    }) => ({ ...item, hasVoted: votedIds.includes(item.id) })),
  });
}

export async function POST(req: NextRequest) {
  const client = getClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const body = await req.json() as {
    title: string; description?: string; category?: string; created_by?: string;
  };

  if (!body.title?.trim()) {
    return NextResponse.json({ error: 'title required' }, { status: 400 });
  }

  const payload = {
    title: body.title.trim(),
    description: body.description?.trim() || null,
    category: body.category?.trim() || null,
    created_by: body.created_by || 'anonymous',
  };

  const { data, error } = await client.from('feedback_items').insert(payload).select().single();

  if (error?.message?.includes('does not exist')) {
    const created = await ensureTables();
    if (!created) {
      return NextResponse.json(
        { error: 'Database not ready. Ask an admin to run /api/setup.' },
        { status: 503 },
      );
    }
    // Retry insert in the same server request — no client round-trip needed
    const retry = await client.from('feedback_items').insert(payload).select().single();
    if (retry.error) return NextResponse.json({ error: retry.error.message }, { status: 500 });
    return NextResponse.json({ item: retry.data });
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
