import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const { question, answer, submittedBy } = await req.json() as {
    question: string;
    answer: string;
    submittedBy?: string;
  };

  if (!question || !answer) {
    return NextResponse.json({ error: 'question and answer required' }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Try to store in Supabase
  if (supabaseUrl && (serviceKey || anonKey)) {
    try {
      const client = createClient(supabaseUrl, serviceKey ?? anonKey!);
      await client.from('chat_knowledge').insert({
        question: question.trim(),
        answer: answer.trim(),
        submitted_by: submittedBy ?? 'anonymous',
        created_at: new Date().toISOString(),
      });
    } catch {
      // Table may not exist yet — log to console and return OK anyway
      console.log('[chat/feedback] Knowledge submission (table not ready):', { question, answer, submittedBy });
    }
  } else {
    console.log('[chat/feedback] Knowledge submission (no Supabase):', { question, answer, submittedBy });
  }

  return NextResponse.json({ ok: true });
}
