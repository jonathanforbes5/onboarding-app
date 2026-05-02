// Admin-only: force-reset a user's password so they must set a new one on next login
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const { adminKey, targetUserKey } = await req.json() as { adminKey: string; targetUserKey: string };

  if (!adminKey || adminKey !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return NextResponse.json({ error: 'not configured' }, { status: 503 });

  const admin = createClient(supabaseUrl, serviceKey);

  // Ensure columns exist first (best effort)
  await admin.from('allowed_users').select('password_hash').limit(1);

  const { error } = await admin
    .from('allowed_users')
    .update({ password_hash: null, password_salt: null, force_reset: true })
    .eq('user_key', targetUserKey);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, message: `Password reset for ${targetUserKey} — they will be prompted to set a new one on next login.` });
}
