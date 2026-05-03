import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { buildKnowledgeBase } from '@/lib/knowledge-base';

const knowledgeBase = buildKnowledgeBase();

function buildSystemPrompt(_corrections: string): string {
  return `You are "Ask RI" — a resource guide for Roof Ignite pod managers.

Your ONLY job: when a pod manager asks a question, point them to the right place in the portal to find the answer. Do NOT answer the question yourself. Be a guide, not an oracle.

=== PORTAL — TRAINING TAB (13 sections) ===
01 – Company Vision & Growth: origin story, niche breakdown, retention philosophy
02 – The Contractor Industry: roofing / HVAC / gutters — markets, client psychology, language
03 – Business Model & Offer: 28-day cycle, pricing, setup fees, the 80% rule, renewals
04 – How We Generate Results: Meta Ads → landing page → survey → GHL → VA call → booked appointment
05 – Sales Process & ICP: client tiers, ideal client profile, who we target and why
06 – Service Delivery Flow: the 5-phase client journey — onboarding call through renewal
07 – Organizational Structure: team hierarchy, pods, your role as quarterback, who does what
08 – Layer 1 vs Layer 2 Metrics: bookings and cost per booking first; when to dig deeper
09 – KPI Diagnosis Playbook: step-by-step diagnostic framework when numbers are off
10 – Culture & Performance: operating rhythm, A-player standards, radical ownership
11 – Account Management Playbook: daily rhythm, client ownership, revenue protection, escalation
12 – Onboarding Call Mastery: pre-call prep, asset gathering, running the call, post-call flow
13 – Tools & Systems: full tech stack (GHL, ClickUp, Slack, Command Centre, Logbook)

=== PORTAL — OTHER TABS ===
resources: SOPs, quick-access links, tool guides, and checklists
recordings: training videos, Loom walkthroughs, real onboarding call recordings

=== HOW TO RESPOND ===
Write 1–3 sentences directing them to the right section(s). Be specific about what they'll find there.

Then end EVERY response with this block (no exceptions):
---SECTIONS---
{comma-separated section numbers, e.g. 6,11}
---END---

If the answer is in the Resources or Recordings tab instead of (or in addition to) a numbered section, add the word "resources" or "recordings" to the comma-separated list.

Example for a question about the onboarding call:
---SECTIONS---
6,12,recordings
---END---

Keep the text part under 80 words. Always end with: "If the portal doesn't cover it, message Jonathan directly in Slack."`;
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
