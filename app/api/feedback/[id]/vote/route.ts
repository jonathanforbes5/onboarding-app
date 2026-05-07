import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const client = getClient();
  if (!client) return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });

  const { user_key } = await req.json() as { user_key: string };
  if (!user_key) return NextResponse.json({ error: 'user_key required' }, { status: 400 });

  // Check if already voted
  const { data: existing } = await client
    .from('feedback_votes')
    .select('id')
    .eq('feedback_item_id', params.id)
    .eq('user_key', user_key)
    .maybeSingle();

  if (existing) {
    // Toggle off — remove vote and decrement
    await client.from('feedback_votes').delete().eq('id', (existing as { id: string }).id);
    const { data: item } = await client.from('feedback_items').select('vote_count').eq('id', params.id).single();
    if (item) {
      const current = (item as unknown as { vote_count: number }).vote_count;
      await client.from('feedback_items').update({ vote_count: Math.max(0, current - 1) }).eq('id', params.id);
    }
    return NextResponse.json({ voted: false });
  }

  // Add vote and increment
  await client.from('feedback_votes').insert({ feedback_item_id: params.id, user_key });
  const { data: item } = await client.from('feedback_items').select('vote_count').eq('id', params.id).single();
  if (item) {
    const current = (item as unknown as { vote_count: number }).vote_count;
    await client.from('feedback_items').update({ vote_count: current + 1 }).eq('id', params.id);
  }
  return NextResponse.json({ voted: true });
}
