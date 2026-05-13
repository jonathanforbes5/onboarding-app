import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });

  const { title, notes } = await req.json() as { title: string; notes: string };

  const client = new Anthropic({ apiKey });
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    system:
      'You are a concise internal comms writer for a marketing agency. Write a clear, professional 2-4 sentence announcement body. Focus on what changed, why it matters, and where to find it. No fluff. Plain text, no markdown.',
    messages: [{ role: 'user', content: `Title: ${title}\nNotes: ${notes}` }],
  });

  const summary = (msg.content[0] as { type: string; text: string }).text;
  return NextResponse.json({ summary });
}
