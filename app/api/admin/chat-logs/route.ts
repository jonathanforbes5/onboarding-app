import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || (!serviceKey && !anonKey)) {
    return NextResponse.json({ logs: [], knowledge: [], error: 'Supabase not configured' }, { status: 200 });
  }

  const client = createClient(supabaseUrl, serviceKey ?? anonKey!);
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get('limit') ?? '50'), 200);

  try {
    const [logsResult, knowledgeResult, searchResult] = await Promise.all([
      client
        .from('chat_logs')
        .select('id, user_name, question, answer, feedback, created_at')
        .order('created_at', { ascending: false })
        .limit(limit),
      client
        .from('chat_knowledge')
        .select('id, question, answer, submitted_by, approved, created_at')
        .order('created_at', { ascending: false })
        .limit(50),
      client
        .from('search_logs')
        .select('id, user_name, query, result_title, result_kind, created_at')
        .order('created_at', { ascending: false })
        .limit(100)
        .then((r) => r), // table may not exist yet — handle below
    ]);

    return NextResponse.json({
      logs: logsResult.data ?? [],
      knowledge: knowledgeResult.data ?? [],
      searchLogs: searchResult.error?.message?.includes('does not exist') ? [] : (searchResult.data ?? []),
    });
  } catch (err) {
    return NextResponse.json({ logs: [], knowledge: [], searchLogs: [], error: String(err) }, { status: 200 });
  }
}

export async function PATCH(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || (!serviceKey && !anonKey)) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  const { id, approved } = await req.json() as { id: string; approved: boolean };
  const client = createClient(supabaseUrl, serviceKey ?? anonKey!);

  try {
    await client.from('chat_knowledge').update({ approved }).eq('id', id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
