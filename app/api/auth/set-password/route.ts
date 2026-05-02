import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

export async function POST(req: NextRequest) {
  const { name, password, currentPassword } = await req.json() as {
    name: string;
    password: string;
    currentPassword?: string;
  };
  const userKey = name?.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
  if (!userKey || !password) return NextResponse.json({ error: 'name and password required' }, { status: 400 });

  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !supabaseUrl) return NextResponse.json({ error: 'not configured' }, { status: 503 });

  const admin = createClient(supabaseUrl, serviceKey);
  const { data } = await admin
    .from('allowed_users')
    .select('password_hash, password_salt, force_reset')
    .eq('user_key', userKey)
    .maybeSingle();

  if (!data) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // If user already has a password and this isn't a forced reset, verify current password first
  if (data.password_hash && !data.force_reset) {
    if (!currentPassword) return NextResponse.json({ error: 'Current password required' }, { status: 400 });
    const currentHash = hashPassword(currentPassword, data.password_salt!);
    if (currentHash !== data.password_hash) {
      return NextResponse.json({ error: 'Current password incorrect' }, { status: 401 });
    }
  }

  const salt = crypto.randomBytes(32).toString('hex');
  const hash = hashPassword(password, salt);

  const { error } = await admin
    .from('allowed_users')
    .update({ password_hash: hash, password_salt: salt, force_reset: false })
    .eq('user_key', userKey);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
