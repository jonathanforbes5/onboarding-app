import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function ensureTables() {
  const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN;
  const projectRef = process.env.SUPABASE_PROJECT_REF ?? 'keceufndfmmcpwferudo';
  if (!mgmtToken) return;
  await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${mgmtToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        CREATE TABLE IF NOT EXISTS feedback_items (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          title text NOT NULL,
          description text,
          category text,
          vote_count integer NOT NULL DEFAULT 0,
          created_by text NOT NULL DEFAULT 'anonymous',
          status text NOT NULL DEFAULT 'open',
          created_at timestamptz NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS feedback_votes (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          feedback_item_id uuid NOT NULL REFERENCES feedback_items(id) ON DELETE CASCADE,
          user_key text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now(),
          UNIQUE(feedback_item_id, user_key)
        );
        ALTER TABLE feedback_items ENABLE ROW LEVEL SECURITY;
        ALTER TABLE feedback_votes ENABLE ROW LEVEL SECURITY;
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='feedback_items' AND policyname='all_access') THEN
            CREATE POLICY all_access ON feedback_items USING (true) WITH CHECK (true);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='feedback_votes' AND policyname='all_access') THEN
            CREATE POLICY all_access ON feedback_votes USING (true) WITH CHECK (true);
          END IF;
        END $$;
        CREATE INDEX IF NOT EXISTS feedback_votes_item_idx ON feedback_votes(feedback_item_id);
      `,
    }),
  });
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

  // Fetch which items the current user has voted on
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

  const { data, error } = await client.from('feedback_items').insert({
    title: body.title.trim(),
    description: body.description?.trim() || null,
    category: body.category?.trim() || null,
    created_by: body.created_by || 'anonymous',
  }).select().single();

  if (error?.message?.includes('does not exist')) {
    await ensureTables();
    return NextResponse.json({ error: 'Table created — retry' }, { status: 503 });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
