import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET(req: NextRequest) {
  const supabase = getClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  let query = supabase
    .from('quiz_submissions')
    .select('id, session_id, name, score, total_questions, submitted_at')
    .order('submitted_at', { ascending: false })
    .limit(200);

  if (sessionId) {
    query = query.eq('session_id', Number(sessionId));
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }

  return NextResponse.json({ results: data ?? [] });
}
