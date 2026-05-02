import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')?.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });

  const anonKey    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!anonKey || !supabaseUrl) return NextResponse.json({ exists: false, hasPassword: false });

  // Use anon key — RLS policy allows public SELECT on allowed_users
  const client = createClient(supabaseUrl, anonKey);

  const { data } = await client
    .from('allowed_users')
    .select('email, display_name, role, user_key, password_hash, force_reset, bio, goal, avatar_emoji, avatar_url')
    .eq('user_key', name)
    .maybeSingle();

  if (!data) return NextResponse.json({ exists: false, hasPassword: false });

  const serviceKeyAvailable = !!serviceKey;

  return NextResponse.json({
    exists: true,
    hasPassword: !!data.password_hash && serviceKeyAvailable,
    forceReset: (data.force_reset ?? false) && serviceKeyAvailable,
    displayName: data.display_name,
    role: data.role,
    userKey: data.user_key,
    email: data.email,
    bio: data.bio ?? null,
    goal: data.goal ?? null,
    avatarEmoji: data.avatar_emoji ?? null,
    avatarUrl: data.avatar_url ?? null,
    serviceKeyAvailable,
  });
}
