import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { buildKnowledgeBase } from '@/lib/knowledge-base';

const knowledgeBase = buildKnowledgeBase();

function buildSystemPrompt(_corrections: string): string {
  return `You are "Ask RI" — a resource guide for Roof Ignite pod managers.

Your ONLY job: when a pod manager asks a question, point them to the right place in the portal to find the answer. Do NOT answer the question yourself. Be a guide, not an oracle.

=== PORTAL — TRAINING TAB (13 sections) ===
Link format for sections: [Section Name](#section-{id}) — these open directly in the portal.

- [01 – Company Vision & Growth](#section-1): origin story, niche breakdown ($300K/mo, 5 pods), retention philosophy
- [02 – The Contractor Industry](#section-2): roofing / HVAC / gutters — markets, client psychology, industry language
- [03 – Business Model & Offer](#section-3): 28-day cycle, pricing, setup fees, the 80% rule, renewals
- [04 – How We Generate Results](#section-4): full funnel — Meta Ads → landing page → survey → GHL → VA call → booked appointment
- [05 – Sales Process & ICP](#section-5): client tiers, ideal client profile, who we target and why
- [06 – Service Delivery Flow](#section-6): the 5-phase client journey — onboarding call through renewal, post-call checklist
- [07 – Organizational Structure](#section-7): team hierarchy, pods, your role as quarterback, who does what
- [08 – Layer 1 vs Layer 2 Metrics](#section-8): bookings and cost per booking first; when to dig deeper into CPC/CTR/survey rates
- [09 – KPI Diagnosis Playbook](#section-9): step-by-step diagnostic framework when numbers are off
- [10 – Culture & Performance](#section-10): operating rhythm, A-player standards, radical ownership, communication rules
- [11 – Account Management Playbook](#section-11): daily rhythm, client ownership, revenue protection, escalation paths
- [12 – Onboarding Call Mastery](#section-12): pre-call prep, asset gathering, running the call, post-call flow, Account Specific Document
- [13 – Tools & Systems](#section-13): full tech stack (GHL, ClickUp, Slack, Command Centre, Logbook) and proficiency timeline

=== PORTAL — OTHER TABS ===
- [Resources tab](#tab-resources): SOPs, quick-access links, tool guides, and checklists
- [Recordings tab](#tab-recordings): training videos, Loom walkthroughs, real onboarding call recordings

=== HOW TO RESPOND ===
1. Identify the 1–3 most relevant portal locations for the question.
2. Link each one using the exact markdown link format above — they become clickable in the portal.
3. One sentence per location explaining what they'll find there.
4. Keep the entire response under 100 words.
5. Always end with: "If the portal doesn't cover it, message Jonathan directly in Slack."

Do not explain concepts. Do not give step-by-step answers. Just link them directly to where the answer lives.`;
}

async function loadKnowledgeCorrections(): Promise<string> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || (!anonKey && !serviceKey)) return '';

  try {
    const client = createClient(supabaseUrl, serviceKey ?? anonKey!);
    const { data } = await client
      .from('chat_knowledge')
      .select('question, answer')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(30);

    if (!data || data.length === 0) return '';

    return data.map((row: { question: string; answer: string }) =>
      `Q: ${row.question}\nA: ${row.answer}`
    ).join('\n\n');
  } catch {
    return '';
  }
}

async function logChatExchange(
  userName: string,
  question: string,
  answer: string,
): Promise<void> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || (!anonKey && !serviceKey)) return;

  try {
    const client = createClient(supabaseUrl, serviceKey ?? anonKey!);
    await client.from('chat_logs').insert({
      user_name: userName || 'anonymous',
      question,
      answer,
    });
  } catch {
    // fire-and-forget — never block the response
  }
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error: 'ANTHROPIC_API_KEY not configured',
        setup: 'Add ANTHROPIC_API_KEY to your Vercel environment variables (Settings → Environment Variables → add ANTHROPIC_API_KEY with your sk-ant-... key). Then redeploy.',
      },
      { status: 503 },
    );
  }

  const body = await req.json() as {
    messages: Array<{ role: 'user' | 'assistant'; content: string; id?: string }>;
    userName?: string;
  };

  const { messages, userName } = body;

  if (!messages || messages.length === 0) {
    return Response.json({ error: 'No messages provided' }, { status: 400 });
  }

  // Strip client-side fields — Anthropic only accepts role + content
  const cleanMessages = messages.map(({ role, content }) => ({ role, content }));

  // Extract the latest user question for logging
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
  const question = lastUserMessage?.content ?? '';

  // Load approved corrections (non-blocking — returns '' if Supabase unavailable)
  const corrections = await loadKnowledgeCorrections();
  const systemPrompt = buildSystemPrompt(corrections);

  const client = new Anthropic({ apiKey });

  let fullAnswer = '';
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    start(controller) {
      const stream = client.messages.stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        system: systemPrompt,
        messages: cleanMessages,
      });

      stream.on('text', (textDelta: string) => {
        fullAnswer += textDelta;
        controller.enqueue(encoder.encode(textDelta));
      });

      stream.finalMessage()
        .then(() => {
          controller.close();
          // Fire-and-forget question logging — don't await
          if (question) {
            logChatExchange(userName ?? 'anonymous', question, fullAnswer);
          }
        })
        .catch((err: Error) => {
          controller.enqueue(encoder.encode(`\n\n⚠️ Ask RI error: ${err.message}`));
          controller.close();
        });
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Transfer-Encoding': 'chunked',
    },
  });
}
