import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function ensureTable(supabase: any) {
  const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN;
  const projectRef = process.env.SUPABASE_PROJECT_REF ?? 'keceufndfmmcpwferudo';
  if (!mgmtToken) return;
  await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${mgmtToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        CREATE TABLE IF NOT EXISTS quiz_submissions (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          session_id integer NOT NULL,
          name text NOT NULL,
          score integer NOT NULL,
          total_questions integer NOT NULL,
          submitted_at timestamptz NOT NULL DEFAULT now()
        );
        CREATE INDEX IF NOT EXISTS quiz_submissions_session_idx ON quiz_submissions(session_id);
        CREATE INDEX IF NOT EXISTS quiz_submissions_submitted_at_idx ON quiz_submissions(submitted_at DESC);
      `,
    }),
  });
}

export async function POST(req: NextRequest) {
  const supabase = getClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const body = await req.json();
  const { sessionId, name, score, totalQuestions } = body;

  if (!sessionId || !name?.trim() || score == null || !totalQuestions) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await ensureTable(supabase);

  const { error } = await supabase.from('quiz_submissions').insert({
    session_id: Number(sessionId),
    name: name.trim(),
    score: Number(score),
    total_questions: Number(totalQuestions),
  });

  if (error) {
    console.error('Quiz submit error:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
