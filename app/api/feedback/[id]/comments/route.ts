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
    return false;
  } catch {
    return false;
  }
}

async function ensureTable(): Promise<boolean> {
  const stmts = [
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
    `CREATE INDEX IF NOT EXISTS feedback_comments_item_idx ON feedback_comments(feedback_item_id)`,
  ];
  for (const stmt of stmts) {
    if (!await runSql(stmt.trim())) return false;
  }
  return true;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const client = getClient();
  if (!client) return NextResponse.json({ comments: [] });

  const { data, error } = await client
    .from('feedback_comments')
    .select('id, author, comment, created_at')
    .eq('feedback_item_id', params.id)
    .order('created_at', { ascending: true });

  if (error?.message?.includes('does not exist')) {
    await ensureTable();
    return NextResponse.json({ comments: [] });
  }
  if (error) return NextResponse.json({ comments: [] });
  return NextResponse.json({ comments: data ?? [] });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const client = getClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const { comment, author } = await req.json() as { comment: string; author?: string };
  if (!comment?.trim()) return NextResponse.json({ error: 'comment required' }, { status: 400 });

  const payload = {
    feedback_item_id: params.id,
    comment: comment.trim(),
    author: author?.trim() || 'admin',
  };

  const { data, error } = await client
    .from('feedback_comments')
    .insert(payload)
    .select()
    .single();

  if (error?.message?.includes('does not exist')) {
    const created = await ensureTable();
    if (!created) return NextResponse.json({ error: 'Database not ready' }, { status: 503 });
    const retry = await client.from('feedback_comments').insert(payload).select().single();
    if (retry.error) return NextResponse.json({ error: retry.error.message }, { status: 500 });
    return NextResponse.json({ comment: retry.data });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ comment: data });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const client = getClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const commentId = req.nextUrl.searchParams.get('comment_id');
  if (!commentId) return NextResponse.json({ error: 'comment_id required' }, { status: 400 });

  await client
    .from('feedback_comments')
    .delete()
    .eq('id', commentId)
    .eq('feedback_item_id', params.id);

  return NextResponse.json({ ok: true });
}
