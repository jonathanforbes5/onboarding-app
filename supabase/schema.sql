-- ============================================================
-- Contractors Ignite Onboarding App — Supabase Schema
-- Run this in your Supabase project's SQL Editor
-- Dashboard → SQL Editor → New Query → paste → Run
-- ============================================================

-- Worksheet checklist items (per user, per group, per item)
create table if not exists checklist_items (
  id           uuid default gen_random_uuid() primary key,
  user_name    text not null,
  group_id     text not null,
  item_index   integer not null,
  completed    boolean not null default false,
  updated_at   timestamptz default now(),
  unique(user_name, group_id, item_index)
);

-- Current worksheet day per user
create table if not exists worksheet_state (
  user_name    text primary key,
  current_day  integer not null default 1,
  updated_at   timestamptz default now()
);

-- Training section completions
create table if not exists section_completions (
  id           uuid default gen_random_uuid() primary key,
  user_name    text not null,
  section_id   integer not null,
  completed_at timestamptz default now(),
  unique(user_name, section_id)
);

-- Quiz scores per section
create table if not exists quiz_scores (
  id           uuid default gen_random_uuid() primary key,
  user_name    text not null,
  section_id   integer not null,
  score        integer not null,
  updated_at   timestamptz default now(),
  unique(user_name, section_id)
);

-- ── Row Level Security ──────────────────────────────────────
-- Permissive policies for internal tool (anon key has full access).
-- Tighten these when you add proper auth later.

alter table checklist_items enable row level security;
alter table worksheet_state enable row level security;
alter table section_completions enable row level security;
alter table quiz_scores enable row level security;

create policy "allow_all" on checklist_items   for all using (true) with check (true);
create policy "allow_all" on worksheet_state   for all using (true) with check (true);
create policy "allow_all" on section_completions for all using (true) with check (true);
create policy "allow_all" on quiz_scores       for all using (true) with check (true);

-- ── Indexes for admin dashboard queries ────────────────────
create index if not exists idx_checklist_user on checklist_items(user_name);
create index if not exists idx_sections_user  on section_completions(user_name);
create index if not exists idx_quiz_user      on quiz_scores(user_name);

-- ── Ask RI chat logs ────────────────────────────────────────
-- One row per message exchange (question + AI answer)
create table if not exists chat_logs (
  id           uuid default gen_random_uuid() primary key,
  user_name    text not null default 'anonymous',
  question     text not null,
  answer       text not null,
  feedback     text check (feedback in ('up', 'down')) default null,
  created_at   timestamptz default now()
);

alter table chat_logs enable row level security;
create policy "allow_all" on chat_logs for all using (true) with check (true);
create index if not exists idx_chat_logs_created on chat_logs(created_at desc);
create index if not exists idx_chat_logs_user    on chat_logs(user_name);

-- ── Ask RI knowledge corrections ───────────────────────────
-- Approved Q&A pairs that get injected into the AI system prompt
create table if not exists chat_knowledge (
  id           uuid default gen_random_uuid() primary key,
  question     text not null,
  answer       text not null,
  submitted_by text not null default 'anonymous',
  approved     boolean not null default false,
  created_at   timestamptz default now()
);

alter table chat_knowledge enable row level security;
create policy "allow_all" on chat_knowledge for all using (true) with check (true);

-- ── Announcements ───────────────────────────────────────────
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
create policy "anon_read"   on announcements for select using (published = true);
create policy "service_all" on announcements for all    using (true) with check (true);

-- ── Roadmap ─────────────────────────────────────────────────
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
create policy "allow_all" on roadmap_items for all using (true) with check (true);

-- ── Anonymous feedback / voice board ────────────────────────
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

create policy "allow_all" on feedback_items    for all using (true) with check (true);
create policy "allow_all" on feedback_votes    for all using (true) with check (true);
create policy "allow_all" on feedback_comments for all using (true) with check (true);

create index if not exists feedback_votes_item_idx    on feedback_votes(feedback_item_id);
create index if not exists feedback_comments_item_idx on feedback_comments(feedback_item_id);

-- ── Loom / media slot overrides ─────────────────────────────
create table if not exists media_links (
  slot_key   text primary key,
  url        text not null,
  title      text,
  transcript text,
  updated_at timestamptz default now(),
  updated_by text
);

alter table media_links enable row level security;
create policy "allow_all" on media_links for all using (true) with check (true);

-- ── Dynamic content (admin-managed) ─────────────────────────
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

create policy "allow_all" on content_resources  for all using (true) with check (true);
create policy "allow_all" on content_recordings for all using (true) with check (true);
