/**
 * Seeds the allowed_users table in Supabase.
 * Call once: GET /api/seed-users
 * Only needs SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL (already set in production).
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const USERS = [
  { email: 'jonathan@roofignite.com',  display_name: 'Jonathan',  role: 'super_admin', user_key: 'jonathan' },
  { email: 'oscar@roofignite.com',     display_name: 'Oscar',     role: 'super_admin', user_key: 'oscar' },
  { email: 'mani@roofignite.com',      display_name: 'Mani',      role: 'super_admin', user_key: 'mani' },
  { email: 'cole@roofignite.com',      display_name: 'Cole',      role: 'super_admin', user_key: 'cole' },
  { email: 'tyler@roofignite.com',     display_name: 'Tyler',     role: 'user',        user_key: 'tyler' },
  { email: 'sam@roofignite.com',       display_name: 'Sam',       role: 'user',        user_key: 'sam' },
  { email: 'ksenia@roofignite.com',    display_name: 'Ksenia',    role: 'user',        user_key: 'ksenia' },
  { email: 'adeen@roofignite.com',     display_name: 'Adeen',     role: 'user',        user_key: 'adeen' },
  { email: 'patrick@roofignite.com',   display_name: 'Patrick',   role: 'user',        user_key: 'patrick' },
  { email: 'gianmarco@roofignite.com', display_name: 'Gianmarco', role: 'user',        user_key: 'gianmarco' },
  { email: 'gregory@roofignite.com',   display_name: 'Gregory',   role: 'user',        user_key: 'gregory' },
  { email: 'kyle@roofignite.com',      display_name: 'Kyle',      role: 'user',        user_key: 'kyle' },
  { email: 'abdullah@roofignite.com',  display_name: 'Abdullah',  role: 'user',        user_key: 'abdullah' },
];

export async function GET(req: NextRequest) {
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const setupSecret = process.env.SETUP_SECRET;

  if (setupSecret) {
    const token = req.nextUrl.searchParams.get('token');
    if (token !== setupSecret) {
      return NextResponse.json({ error: 'Unauthorized — add ?token=<SETUP_SECRET>' }, { status: 401 });
    }
  }

  if (!serviceKey || !supabaseUrl) {
    return NextResponse.json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL env vars' }, { status: 500 });
  }

  const admin = createClient(supabaseUrl, serviceKey);

  // Try upsert — works if table already exists
  const { data, error } = await admin
    .from('allowed_users')
    .upsert(USERS, { onConflict: 'email' })
    .select('email');

  if (error) {
    // Table likely doesn't exist — give the user the SQL to run manually
    const sql = `
-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor)
create table if not exists allowed_users (
  email        text primary key,
  display_name text not null,
  role         text not null,
  user_key     text not null,
  bio          text,
  goal         text,
  avatar_emoji text,
  avatar_url   text,
  created_at   timestamptz default now()
);
alter table allowed_users enable row level security;
create policy if not exists "authenticated_read" on allowed_users for select using (true);

insert into allowed_users (email, display_name, role, user_key) values
  ('jonathan@roofignite.com', 'Jonathan', 'super_admin', 'jonathan'),
  ('oscar@roofignite.com',    'Oscar',    'super_admin', 'oscar'),
  ('mani@roofignite.com',     'Mani',     'super_admin', 'mani'),
  ('cole@roofignite.com',     'Cole',     'super_admin', 'cole'),
  ('tyler@roofignite.com',    'Tyler',    'user',        'tyler'),
  ('sam@roofignite.com',      'Sam',      'user',        'sam'),
  ('ksenia@roofignite.com',   'Ksenia',   'user',        'ksenia'),
  ('adeen@roofignite.com',    'Adeen',    'user',        'adeen'),
  ('patrick@roofignite.com',  'Patrick',  'user',        'patrick')
on conflict (email) do nothing;
    `.trim();

    return NextResponse.json({
      success: false,
      error: error.message,
      fix: 'The allowed_users table does not exist yet. Paste the SQL below into Supabase SQL Editor and run it, then visit this URL again.',
      sql,
    }, { status: 500 });
  }

  // Also add password columns if missing (safe to re-run)
  const migrationSql = `
    alter table allowed_users add column if not exists password_hash text;
    alter table allowed_users add column if not exists password_salt text;
    alter table allowed_users add column if not exists force_reset boolean default false;
  `.trim();

  return NextResponse.json({
    success: true,
    message: `✅ ${data?.length ?? USERS.length} users seeded. Run this SQL in Supabase SQL Editor to enable password login:`,
    sql: migrationSql,
    users: data?.map((u) => u.email) ?? USERS.map((u) => u.email),
  });
}
