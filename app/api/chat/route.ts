import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildKnowledgeBase } from '@/lib/knowledge-base';

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const SYSTEM_PROMPT = `You are "Ask RI" — an internal AI assistant for Roof Ignite pod managers. You have deep knowledge of Roof Ignite's processes, SOPs, tools, and operations.

Your purpose: give pod managers fast, accurate answers to operational questions so they can do their jobs well.

${buildKnowledgeBase()}

=== YOUR RULES ===
1. Be concise. Pod managers are busy. Get to the answer fast.
2. Use bullet points for step-by-step processes.
3. When a specific SOP or recording is relevant, name it and provide the URL.
4. If you don't know something with confidence, say "I'm not certain on this one" and suggest escalating.
5. For account-specific questions (what's happening with a specific live client) — you can't help with that, direct them to the Command Center or their manager.
6. For HR/payroll/personal matters — direct to Jonathan or BambooHR.
7. When you recommend escalation, provide this exact block:

---ESCALATE---
To: [Jonathan/Oscar/appropriate person]
Via: Slack DM or #ops-manager-discussion
Message: "Hey [name], quick question: [restate their question briefly]. Can you help?"
---END---

Format everything in markdown. Keep responses under 300 words unless the question genuinely requires more detail.`;

export async function POST(req: NextRequest) {
  if (!client) {
    return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  const { messages } = await req.json() as {
    messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  };

  if (!messages || messages.length === 0) {
    return Response.json({ error: 'No messages provided' }, { status: 400 });
  }

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
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
