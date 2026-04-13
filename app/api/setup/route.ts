/**
 * One-time setup endpoint — creates all Supabase tables, seeds allowed_users,
 * and configures auth settings via the Management API.
 *
 * Usage (run once after deploying to Vercel):
 *   GET https://onboarding.roofignite.com/api/setup?token=<SETUP_SECRET>
 *
 * Required env vars (add to Vercel):
 *   SETUP_SECRET              — any random string you choose (protects this endpoint)
 *   SUPABASE_MANAGEMENT_TOKEN — sbp_... token from app.supabase.com/account/tokens
 *   SUPABASE_SERVICE_ROLE_KEY — service_role key from Supabase project settings
 *   NEXT_PUBLIC_SUPABASE_URL  — your project URL
 */

import { NextRequest, NextResponse } from 'next/server';

const PROJECT_REF = 'keceufndfmmcpwferudo';
const MGMT_API    = 'https://api.supabase.com';

const SCHEMA_SQL = `
-- Core tables
create table if not exists checklist_items (
  id         uuid default gen_random_uuid() primary key,
  user_name  text not null,
  group_id   text not null,
  item_index integer not null,
  completed  boolean not null default false,
  updated_at timestamptz default now(),
  unique(user_name, group_id, item_index)
);

create table if not exists worksheet_state (
  user_name   text primary key,
  current_day integer not null default 1,
  updated_at  timestamptz default now()
);

create table if not exists section_completions (
  id           uuid default gen_random_uuid() primary key,
  user_name    text not null,
  section_id   integer not null,
  completed_at timestamptz default now(),
  unique(user_name, section_id)
);

create table if not exists quiz_scores (
  id         uuid default gen_random_uuid() primary key,
  user_name  text not null,
  section_id integer not null,
  score      integer not null,
  updated_at timestamptz default now(),
  unique(user_name, section_id)
);

create table if not exists allowed_users (
  email        text primary key,
  display_name text not null,
  role         text not null check (role in ('super_admin', 'user')),
  user_key     text not null,
  created_at   timestamptz default now()
);

-- RLS
alter table checklist_items    enable row level security;
alter table worksheet_state    enable row level security;
alter table section_completions enable row level security;
alter table quiz_scores        enable row level security;
alter table allowed_users      enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'checklist_items'    and policyname = 'allow_all') then
    create policy "allow_all" on checklist_items    for all using (true) with check (true); end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'worksheet_state'    and policyname = 'allow_all') then
    create policy "allow_all" on worksheet_state    for all using (true) with check (true); end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'section_completions' and policyname = 'allow_all') then
    create policy "allow_all" on section_completions for all using (true) with check (true); end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'quiz_scores'         and policyname = 'allow_all') then
    create policy "allow_all" on quiz_scores         for all using (true) with check (true); end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'allowed_users' and policyname = 'authenticated_read') then
    create policy "authenticated_read" on allowed_users for select using (true); end if;
end $$;

-- Indexes
create index if not exists idx_checklist_user on checklist_items(user_name);
create index if not exists idx_sections_user  on section_completions(user_name);
create index if not exists idx_quiz_user      on quiz_scores(user_name);

-- Seed users
insert into allowed_users (email, display_name, role, user_key) values
  ('jonathan@roofignite.com', 'Jonathan', 'super_admin', 'jonathan'),
  ('mani@roofignite.com',     'Mani',     'super_admin', 'mani'),
  ('oscar@roofignite.com',    'Oscar',    'super_admin', 'oscar'),
  ('info@roofignite.com',     'Info',     'super_admin', 'info'),
  ('cole@roofignite.com',     'Cole',     'super_admin', 'cole'),
  ('sam@roofignite.com',      'Sam',      'user',        'sam'),
  ('patrick@roofignite.com',  'Patrick',  'user',        'patrick')
on conflict (email) do nothing;
`;

async function runSql(managementToken: string, sql: string) {
  const res = await fetch(`${MGMT_API}/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${managementToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: sql }),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}

async function configureAuth(managementToken: string, siteUrl: string) {
  const res = await fetch(`${MGMT_API}/v1/projects/${PROJECT_REF}/config/auth`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${managementToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      site_url: siteUrl,
      uri_allow_list: `${siteUrl},${siteUrl}/**`,
      mailer_otp_enabled: true,
      email_otp_length: 6,
      mailer_otp_exp: 3600,
    }),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}

export async function GET(req: NextRequest) {
  const token    = req.nextUrl.searchParams.get('token');
  const expected = process.env.SETUP_SECRET;
  const mgmtToken = process.env.SUPABASE_MANAGEMENT_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!mgmtToken) {
    return NextResponse.json(
      { error: 'SUPABASE_MANAGEMENT_TOKEN env var is missing' },
      { status: 500 },
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin;
  const results: Record<string, unknown> = {};

  // 1. Run schema SQL
  const sqlResult = await runSql(mgmtToken, SCHEMA_SQL);
  results.schema = { ok: sqlResult.ok, status: sqlResult.status };
  if (!sqlResult.ok) {
    results.schemaError = sqlResult.body;
  }

  // 2. Configure auth (site URL + magic link settings)
  const authResult = await configureAuth(mgmtToken, siteUrl);
  results.auth = { ok: authResult.ok, status: authResult.status };
  if (!authResult.ok) {
    results.authError = authResult.body;
  }

  const allOk = sqlResult.ok && authResult.ok;

  return NextResponse.json(
    {
      success: allOk,
      message: allOk
        ? '✅ Database tables created, users seeded, and auth configured. Setup complete!'
        : '⚠️ Setup completed with some errors — check the details below.',
      ...results,
    },
    { status: allOk ? 200 : 207 },
  );
}
