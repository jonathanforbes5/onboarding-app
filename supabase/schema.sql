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
