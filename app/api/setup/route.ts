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
  bio          text,
  goal         text,
  avatar_emoji text,
  avatar_url   text,
  created_at   timestamptz default now()
);

-- Idempotent migrations for existing deployments missing these columns
alter table allowed_users add column if not exists bio          text;
alter table allowed_users add column if not exists goal         text;
alter table allowed_users add column if not exists avatar_emoji text;
alter table allowed_users add column if not exists avatar_url   text;

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

-- Ask RI chat logs
create table if not exists chat_logs (
  id         uuid default gen_random_uuid() primary key,
  user_name  text not null default 'anonymous',
  question   text not null,
  answer     text not null,
  feedback   text check (feedback in ('up', 'down')) default null,
  created_at timestamptz default now()
);

alter table chat_logs enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'chat_logs' and policyname = 'allow_all') then
    create policy "allow_all" on chat_logs for all using (true) with check (true); end if;
end $$;

create index if not exists idx_chat_logs_created on chat_logs(created_at desc);
create index if not exists idx_chat_logs_user    on chat_logs(user_name);

-- Search query logs
create table if not exists search_logs (
  id           uuid default gen_random_uuid() primary key,
  user_name    text not null default 'anonymous',
  query        text not null,
  result_title text,
  result_kind  text,
  created_at   timestamptz default now()
);

alter table search_logs enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'search_logs' and policyname = 'allow_all') then
    create policy "allow_all" on search_logs for all using (true) with check (true); end if;
end $$;

create index if not exists idx_search_logs_created on search_logs(created_at desc);
create index if not exists idx_search_logs_user    on search_logs(user_name);

-- Ask RI knowledge corrections
create table if not exists chat_knowledge (
  id           uuid default gen_random_uuid() primary key,
  question     text not null,
  answer       text not null,
  submitted_by text not null default 'anonymous',
  approved     boolean not null default false,
  created_at   timestamptz default now()
);

alter table chat_knowledge enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'chat_knowledge' and policyname = 'allow_all') then
    create policy "allow_all" on chat_knowledge for all using (true) with check (true); end if;
end $$;

-- Announcements (What's New popup + community widget)
create table if not exists announcements (
  id         uuid default gen_random_uuid() primary key,
  title      text not null,
  body       text not null,
  link_url   text,
  loom_url   text,
  image_url  text,
  created_by text not null default 'admin',
  published  boolean not null default true,
  created_at timestamptz not null default now()
);

alter table announcements enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'announcements' and policyname = 'anon_read') then
    create policy "anon_read" on announcements for select using (published = true); end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'announcements' and policyname = 'service_all') then
    create policy "service_all" on announcements for all using (true) with check (true); end if;
end $$;

-- Roadmap (public board + admin view)
create table if not exists roadmap_items (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  description text,
  status      text not null default 'planned',
  category    text,
  created_by  text not null default 'admin',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table roadmap_items enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'roadmap_items' and policyname = 'all_access') then
    create policy "all_access" on roadmap_items for all using (true) with check (true); end if;
end $$;

-- Anonymous voice / feedback board
create table if not exists feedback_items (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  description text,
  category    text,
  vote_count  integer not null default 0,
  created_by  text not null default 'anonymous',
  status      text not null default 'open',
  created_at  timestamptz not null default now()
);

create table if not exists feedback_votes (
  id               uuid default gen_random_uuid() primary key,
  feedback_item_id uuid not null references feedback_items(id) on delete cascade,
  user_key         text not null,
  created_at       timestamptz not null default now(),
  unique(feedback_item_id, user_key)
);

create table if not exists feedback_comments (
  id               uuid default gen_random_uuid() primary key,
  feedback_item_id uuid not null references feedback_items(id) on delete cascade,
  author           text not null default 'admin',
  comment          text not null,
  created_at       timestamptz not null default now()
);

alter table feedback_items    enable row level security;
alter table feedback_votes    enable row level security;
alter table feedback_comments enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'feedback_items' and policyname = 'all_access') then
    create policy "all_access" on feedback_items for all using (true) with check (true); end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'feedback_votes' and policyname = 'all_access') then
    create policy "all_access" on feedback_votes for all using (true) with check (true); end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'feedback_comments' and policyname = 'all_access') then
    create policy "all_access" on feedback_comments for all using (true) with check (true); end if;
end $$;

create index if not exists feedback_votes_item_idx    on feedback_votes(feedback_item_id);
create index if not exists feedback_comments_item_idx on feedback_comments(feedback_item_id);

-- Loom / media slot overrides
create table if not exists media_links (
  slot_key   text primary key,
  url        text not null,
  title      text,
  transcript text,
  updated_at timestamptz default now(),
  updated_by text
);

alter table media_links add column if not exists transcript text;
alter table media_links enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'media_links' and policyname = 'allow_all') then
    create policy "allow_all" on media_links for all using (true) with check (true); end if;
end $$;

-- Dynamic content items (resources + recordings managed via admin)
create table if not exists content_resources (
  id          text primary key,
  title       text not null,
  description text not null default '',
  url         text not null,
  icon        text default '📄',
  category    text not null default 'sop',
  tags        text[] default '{}',
  published   boolean default true,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

create table if not exists content_recordings (
  id            text primary key,
  title         text not null,
  description   text not null default '',
  url           text not null,
  category      text not null default 'training_loom',
  tags          text[] default '{}',
  duration_mins integer,
  watch_first   boolean default false,
  published     boolean default true,
  sort_order    integer default 0,
  created_at    timestamptz default now()
);

alter table content_resources  enable row level security;
alter table content_recordings enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'content_resources' and policyname = 'allow_all') then
    create policy "allow_all" on content_resources for all using (true) with check (true); end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'content_recordings' and policyname = 'allow_all') then
    create policy "allow_all" on content_recordings for all using (true) with check (true); end if;
end $$;

-- Expand allowed_users role check to include media_buyer
alter table allowed_users drop constraint if exists allowed_users_role_check;
alter table allowed_users add constraint allowed_users_role_check
  check (role in ('super_admin', 'user', 'media_buyer'));

-- Seed users (only leadership have super_admin role)
insert into allowed_users (email, display_name, role, user_key) values
  ('jonathan@roofignite.com', 'Jonathan', 'super_admin', 'jonathan'),
  ('oscar@roofignite.com',    'Oscar',    'super_admin', 'oscar'),
  ('mani@roofignite.com',     'Mani',     'super_admin', 'mani'),
  ('sam@roofignite.com',      'Sam',      'user',        'sam'),
  ('cole@roofignite.com',     'Cole',     'super_admin',  'cole'),
  ('tyler@roofignite.com',    'Tyler',    'user',        'tyler'),
  ('ksenia@roofignite.com',   'Ksenia',   'user',        'ksenia'),
  ('adeen@roofignite.com',    'Adeen',    'user',        'adeen'),
  ('patrick@roofignite.com',  'Patrick',  'user',        'patrick'),
  ('emmanuel@roofignite.com', 'Emmanuel', 'media_buyer', 'emmanuel'),
  ('bren@roofignite.com',     'Bren',     'media_buyer', 'bren'),
  ('mervin@roofignite.com',   'Mervin',   'media_buyer', 'mervin'),
  ('ken@roofignite.com',      'Ken',      'media_buyer', 'ken')
on conflict (email) do update set role = excluded.role, user_key = excluded.user_key;

-- Fix any existing super_admin roles that should be user (idempotent)
update allowed_users set role = 'user' where email in (
  'info@roofignite.com', 'tyler@roofignite.com',
  'ksenia@roofignite.com', 'adeen@roofignite.com', 'patrick@roofignite.com', 'sam@roofignite.com'
) and role = 'super_admin';
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
      mailer_otp_enabled: true,
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
