import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHmac } from 'crypto';
import { LOCAL_USERS } from '@/lib/auth';

const OTP_SECRET = process.env.OTP_SECRET ?? 'ri-otp-fallback-secret-change-me';

function verifyToken(token: string, otp: string): { valid: boolean; userKey?: string } {
  try {
    const { userKey, exp, sig } = JSON.parse(Buffer.from(token, 'base64url').toString());
    if (Date.now() > exp) return { valid: false };
    const payload = `${userKey}:${otp}:${exp}`;
    const expected = createHmac('sha256', OTP_SECRET).update(payload).digest('hex');
    if (sig !== expected) return { valid: false };
    return { valid: true, userKey };
  } catch {
    return { valid: false };
  }
}

export async function POST(req: NextRequest) {
  const { token, otp } = await req.json() as { token: string; otp: string };
  if (!token || !otp) return NextResponse.json({ error: 'token and otp required' }, { status: 400 });

  const result = verifyToken(token, otp.trim());
  if (!result.valid || !result.userKey) {
    return NextResponse.json({ error: 'Invalid or expired code — request a new one' }, { status: 401 });
  }

  const userKey = result.userKey;

  // Get full profile
  const anonKey    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (anonKey && supabaseUrl) {
    const client = createClient(supabaseUrl, anonKey);
    const { data } = await client
      .from('allowed_users')
      .select('email, display_name, role, user_key, bio, goal, avatar_emoji, avatar_url')
      .eq('user_key', userKey)
      .maybeSingle();

    if (data) {
      return NextResponse.json({
        profile: {
          email: data.email,
          displayName: data.display_name,
          userKey: data.user_key,
          role: data.role,
          bio: data.bio,
          goal: data.goal,
          avatarEmoji: data.avatar_emoji,
          avatarUrl: data.avatar_url,
        },
      });
    }
  }

  // Fallback to LOCAL_USERS
  const profile = LOCAL_USERS[userKey];
  if (!profile) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json({ profile });
}
