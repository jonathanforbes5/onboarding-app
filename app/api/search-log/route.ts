import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || (!serviceKey && !anonKey)) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  try {
    const body = await req.json() as {
      query: string;
      result_title?: string;
      result_kind?: string;
      user_name?: string;
    };

    const client = createClient(supabaseUrl, serviceKey ?? anonKey!);
    await client.from('search_logs').insert({
      user_name:    body.user_name ?? 'anonymous',
      query:        body.query,
      result_title: body.result_title ?? null,
      result_kind:  body.result_kind ?? null,
    });
  } catch {
    // fire-and-forget — never fail the caller
  }

  return NextResponse.json({ ok: true });
}
