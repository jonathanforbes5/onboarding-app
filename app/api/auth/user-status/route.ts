import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Source of truth for known users — if Supabase is missing a row, auto-insert from here
const KNOWN_USERS: Record<string, { email: string; displayName: string; role: 'super_admin' | 'user' }> = {
  jonathan:  { email: 'jonathan@roofignite.com',  displayName: 'Jonathan',  role: 'super_admin' },
  oscar:     { email: 'oscar@roofignite.com',     displayName: 'Oscar',     role: 'super_admin' },
  mani:      { email: 'mani@roofignite.com',      displayName: 'Mani',      role: 'super_admin' },
  cole:      { email: 'cole@roofignite.com',      displayName: 'Cole',      role: 'super_admin' },
  sam:       { email: 'sam@roofignite.com',       displayName: 'Sam',       role: 'user' },
  tyler:     { email: 'tyler@roofignite.com',     displayName: 'Tyler',     role: 'user' },
  ksenia:    { email: 'ksenia@roofignite.com',    displayName: 'Ksenia',    role: 'user' },
  adeen:     { email: 'adeen@roofignite.com',     displayName: 'Adeen',     role: 'user' },
  patrick:   { email: 'patrick@roofignite.com',   displayName: 'Patrick',   role: 'user' },
  gianmarco: { email: 'gianmarco@roofignite.com', displayName: 'Gianmarco', role: 'user' },
  gregory:   { email: 'gregory@roofignite.com',   displayName: 'Gregory',   role: 'user' },
  kyle:      { email: 'kyle@roofignite.com',      displayName: 'Kyle',      role: 'user' },
  abdullah:  { email: 'abdullah@roofignite.com',  displayName: 'Abdullah',  role: 'user' },
};

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')?.trim().toLowerCase().replace(/@roofignite\.com$/i, '');
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });

  const anonKey     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!anonKey || !supabaseUrl) {
    // No Supabase — fall back to known users list
    const known = KNOWN_USERS[name];
    if (!known) return NextResponse.json({ exists: false, hasPassword: false });
    return NextResponse.json({ exists: true, hasPassword: false, serviceKeyAvailable: false, ...known, userKey: name, bio: null, goal: null, avatarEmoji: null, avatarUrl: null });
  }

  // Try fetching without optional columns first to avoid schema mismatch errors
  const client = createClient(supabaseUrl, anonKey);
  const { data, error } = await client
    .from('allowed_users')
    .select('email, display_name, role, user_key, bio, goal, avatar_emoji, avatar_url')
    .eq('user_key', name)
    .maybeSingle();

  if (error) {
    // Query failed — fall back to known users
    const known = KNOWN_USERS[name];
    if (!known) return NextResponse.json({ exists: false, hasPassword: false });
    return NextResponse.json({ exists: true, hasPassword: false, serviceKeyAvailable: !!serviceKey, displayName: known.displayName, role: known.role, userKey: name, email: known.email, bio: null, goal: null, avatarEmoji: null, avatarUrl: null });
  }

  if (!data) {
    // Row missing — auto-insert if this is a known user, then return exists: true
    const known = KNOWN_USERS[name];
    if (!known) return NextResponse.json({ exists: false, hasPassword: false });

    // Insert using service key (fire-and-forget — don't block login)
    if (serviceKey) {
      const adminClient = createClient(supabaseUrl, serviceKey);
      void adminClient.from('allowed_users').upsert(
        { email: known.email, display_name: known.displayName, role: known.role, user_key: name },
        { onConflict: 'email' }
      );
    }

    return NextResponse.json({
      exists: true, hasPassword: false, serviceKeyAvailable: !!serviceKey,
      displayName: known.displayName, role: known.role, userKey: name,
      email: known.email, bio: null, goal: null, avatarEmoji: null, avatarUrl: null,
    });
  }

  return NextResponse.json({
    exists: true,
    hasPassword: false,
    forceReset: false,
    displayName: data.display_name,
    role: data.role,
    userKey: data.user_key,
    email: data.email,
    bio: data.bio ?? null,
    goal: data.goal ?? null,
    avatarEmoji: data.avatar_emoji ?? null,
    avatarUrl: data.avatar_url ?? null,
    serviceKeyAvailable: !!serviceKey,
  });
}
