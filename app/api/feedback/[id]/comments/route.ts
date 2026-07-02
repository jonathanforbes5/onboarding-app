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
        CREATE TABLE IF NOT EXISTS feedback_comments (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          feedback_item_id uuid NOT NULL REFERENCES feedback_items(id) ON DELETE CASCADE,
          author text NOT NULL DEFAULT 'admin',
          comment text NOT NULL,
          created_at timestamptz NOT NULL DEFAULT now()
        );
        ALTER TABLE feedback_comments ENABLE ROW LEVEL SECURITY;
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='feedback_comments' AND policyname='all_access') THEN
            CREATE POLICY all_access ON feedback_comments USING (true) WITH CHECK (true);
          END IF;
        END $$;
        CREATE INDEX IF NOT EXISTS feedback_comments_item_idx ON feedback_comments(feedback_item_id);
      `,
    }),
  });
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

  const { data, error } = await client
    .from('feedback_comments')
    .insert({
      feedback_item_id: params.id,
      comment: comment.trim(),
      author: author?.trim() || 'admin',
    })
    .select()
    .single();

  if (error?.message?.includes('does not exist')) {
    await ensureTable();
    return NextResponse.json({ error: 'Table created — retry' }, { status: 503 });
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
