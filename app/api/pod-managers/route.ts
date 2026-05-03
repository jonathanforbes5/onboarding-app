import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ managers: [] });
  }

  // Anon key is sufficient — RLS allows public SELECT
  const client = createClient(supabaseUrl, anonKey);

  const { data, error } = await client
    .from('allowed_users')
    .select('display_name, user_key, role, bio, goal, avatar_emoji, avatar_url')
    .order('display_name');

  if (error) return NextResponse.json({ managers: [] });

  return NextResponse.json({ managers: data ?? [] });
}
