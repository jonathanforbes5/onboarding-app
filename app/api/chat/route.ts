import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { buildKnowledgeBase } from '@/lib/knowledge-base';

const knowledgeBase = buildKnowledgeBase();

function buildSystemPrompt(corrections: string): string {
  return `You are "Ask RI" — the internal AI assistant for Roof Ignite pod managers. You have deep, comprehensive knowledge of Roof Ignite's processes, SOPs, tools, team, and operations.

Your purpose: give pod managers fast, accurate, actionable answers so they can do their jobs with confidence.

${knowledgeBase}

${corrections ? `=== VERIFIED CORRECTIONS & UPDATES ===\n(These answers have been verified by leadership — treat them as authoritative)\n${corrections}\n` : ''}

=== YOUR RESPONSE RULES ===

1. **Be direct and fast.** Pod managers are busy. Lead with the answer, then explain if needed.

2. **Use structure.** Bullet points for steps. Bold for key terms. Short paragraphs.

3. **Link to resources.** When a relevant SOP, training recording, or tool exists, name it and give the URL.

4. **Confidence levels:**
   - If you know it confidently → answer directly
   - If you're 80%+ confident → answer and note "double-check with [person] if this is urgent"
   - If you're uncertain → say so clearly and redirect (see escalation block below)

5. **For live account questions** (what's happening with a specific client right now) → you can't see live data. Direct them to the Command Centre or their ClickUp.

6. **For HR/payroll/PTO** → direct to BambooHR or Jonathan Forbes.

7. **When uncertain or when the answer needs human judgment**, end with this block:

---
**Not 100% sure? Ask Jonathan.**
> Suggested message: "Hey Jonathan, quick one — [restate their question in one sentence]. Can you confirm?"
> Once he answers, you can come back here and tell me — I'll remember it for next time.
---

8. **When a client is at risk** (threatening to cancel, billing dispute, extreme churn risk) → always say: loop in Oscar Sey (CEO) AND Jonathan Forbes immediately. Do not try to handle alone.

9. Keep responses under 400 words unless the question genuinely requires more. Complex step-by-step processes can be longer.

10. Format in markdown. Use headers sparingly — prefer bullets.`;
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
