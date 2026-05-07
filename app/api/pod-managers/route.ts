import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ managers: [] });
  }

  const client = createClient(supabaseUrl, anonKey);

  // Try full query with profile columns first.
  const { data, error } = await client
    .from('allowed_users')
    .select('display_name, user_key, role, bio, goal, avatar_emoji, avatar_url')
    .order('display_name');

  if (!error) {
    return NextResponse.json({ managers: data ?? [] });
  }

  // Columns may not exist yet — fall back to base fields so the directory still renders.
  const fallback = await client
    .from('allowed_users')
    .select('display_name, user_key, role')
    .order('display_name');

  return NextResponse.json({ managers: fallback.data ?? [] });
}
