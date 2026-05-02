import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

export async function POST(req: NextRequest) {
  const { name, password } = await req.json() as { name: string; password: string };
  const userKey = name?.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
  if (!userKey || !password) return NextResponse.json({ error: 'name and password required' }, { status: 400 });

  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !supabaseUrl) return NextResponse.json({ error: 'not configured' }, { status: 503 });

  const admin = createClient(supabaseUrl, serviceKey);
  const { data } = await admin
    .from('allowed_users')
    .select('email, display_name, role, user_key, password_hash, password_salt, bio, goal, avatar_emoji, avatar_url')
    .eq('user_key', userKey)
    .maybeSingle();

  if (!data || !data.password_hash || !data.password_salt) {
    return NextResponse.json({ error: 'Invalid name or password' }, { status: 401 });
  }

  const hash = hashPassword(password, data.password_salt);
  if (hash !== data.password_hash) {
    return NextResponse.json({ error: 'Invalid name or password' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    profile: {
      email: data.email,
      displayName: data.display_name,
      userKey: data.user_key,
      role: data.role,
      bio: data.bio ?? undefined,
      goal: data.goal ?? undefined,
      avatarEmoji: data.avatar_emoji ?? undefined,
      avatarUrl: data.avatar_url ?? undefined,
    },
  });
}
