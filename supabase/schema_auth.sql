-- ============================================================
-- Run this in Supabase SQL Editor AFTER schema.sql
-- Adds the allowed_users table and seeds all permitted accounts
-- ============================================================

create table if not exists allowed_users (
  email         text primary key,
  display_name  text not null,
  role          text not null check (role in ('super_admin', 'user')),
  user_key      text not null, -- internal key used for data storage
  created_at    timestamptz default now()
);

-- Seed all permitted accounts
insert into allowed_users (email, display_name, role, user_key) values
  ('jonathan@roofignite.com', 'Jonathan', 'super_admin', 'jonathan'),
  ('mani@roofignite.com',     'Mani',     'super_admin', 'mani'),
  ('oscar@roofignite.com',    'Oscar',    'super_admin', 'oscar'),
  ('info@roofignite.com',     'Info',     'super_admin', 'info'),
  ('cole@roofignite.com',     'Cole',     'super_admin', 'cole'),
  ('sam@roofignite.com',      'Sam',      'user',        'sam'),
  ('patrick@roofignite.com',  'Patrick',  'user',        'patrick')
on conflict (email) do nothing;

-- RLS: authenticated users can read allowed_users (to verify their own access)
alter table allowed_users enable row level security;
create policy "authenticated_read" on allowed_users
  for select using (true);
