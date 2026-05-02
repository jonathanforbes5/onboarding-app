import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ managers: [] });
  }

  const admin = createClient(supabaseUrl, serviceKey);

  const { data, error } = await admin
    .from('allowed_users')
    .select('display_name, user_key, bio, goal, avatar_emoji')
    .eq('role', 'user')
    .order('display_name');

  if (error) return NextResponse.json({ managers: [] });

  return NextResponse.json({ managers: data ?? [] });
}
