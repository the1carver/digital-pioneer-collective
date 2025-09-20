-- Supabase schema for governance MVP
-- Run this in Supabase SQL editor

-- Extensions
create extension if not exists pgcrypto;

-- Enums
do $$ begin
  if not exists (select 1 from pg_type where typname = 'proposal_status') then
    create type proposal_status as enum ('draft', 'under_review', 'published');
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_type where typname = 'ai_log_status') then
    create type ai_log_status as enum ('drafted', 'approved', 'rejected');
  end if;
end $$;

-- Tables
create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  content text,
  status proposal_status not null default 'draft',
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_logs (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references public.proposals(id) on delete set null,
  prompt text not null,
  output text not null,
  sha256 text not null,
  status ai_log_status not null default 'drafted',
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now()
);

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  ipfs_cid text not null,
  sha256 text not null,
  published_by uuid not null default auth.uid(),
  created_at timestamptz not null default now()
);

create table if not exists public.roles (
  user_id uuid not null,
  role text not null check (role in ('member', 'moderator', 'admin')),
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- Indexes
create index if not exists idx_proposals_created_by on public.proposals(created_by);
create index if not exists idx_proposals_status on public.proposals(status);
create index if not exists idx_ai_logs_proposal on public.ai_logs(proposal_id);
create index if not exists idx_publications_proposal on public.publications(proposal_id);

-- Row Level Security
alter table public.proposals enable row level security;
alter table public.ai_logs enable row level security;
alter table public.publications enable row level security;
alter table public.roles enable row level security;

-- Proposals policies
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'proposals' and policyname = 'Proposals: public can read published'
  ) then
    create policy "Proposals: public can read published" on public.proposals
      for select using (status = 'published');
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'proposals' and policyname = 'Proposals: owners can read'
  ) then
    create policy "Proposals: owners can read" on public.proposals
      for select using (auth.uid() = created_by);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'proposals' and policyname = 'Proposals: authenticated can insert'
  ) then
    create policy "Proposals: authenticated can insert" on public.proposals
      for insert with check (auth.uid() = created_by);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'proposals' and policyname = 'Proposals: owners can update own drafts'
  ) then
    create policy "Proposals: owners can update own drafts" on public.proposals
      for update using (auth.uid() = created_by) with check (auth.uid() = created_by);
  end if;
end $$;

-- AI logs policies (owner access for MVP)
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'ai_logs' and policyname = 'AI logs: owners can read'
  ) then
    create policy "AI logs: owners can read" on public.ai_logs
      for select using (auth.uid() = created_by);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'ai_logs' and policyname = 'AI logs: owners can insert'
  ) then
    create policy "AI logs: owners can insert" on public.ai_logs
      for insert with check (auth.uid() = created_by);
  end if;
end $$;

-- Publications policies (public read)
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'publications' and policyname = 'Publications: public can read'
  ) then
    create policy "Publications: public can read" on public.publications
      for select using (true);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'publications' and policyname = 'Publications: owners can insert'
  ) then
    create policy "Publications: owners can insert" on public.publications
      for insert with check (auth.uid() = published_by);
  end if;
end $$;

-- Roles policies (admins manage; MVP: owner read)
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'roles' and policyname = 'Roles: user can read own roles'
  ) then
    create policy "Roles: user can read own roles" on public.roles
      for select using (auth.uid() = user_id);
  end if;
end $$;

-- Triggers
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$ begin
  if not exists (
    select 1 from pg_trigger where tgname = 'proposals_set_updated_at'
  ) then
    create trigger proposals_set_updated_at
      before update on public.proposals
      for each row execute function public.set_updated_at();
  end if;
end $$;


-- Moderation policies appended (run after initial setup)

-- AI logs: moderators can read and update
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'ai_logs' and policyname = 'AI logs: moderators can read'
  ) then
    create policy "AI logs: moderators can read" on public.ai_logs
      for select using (exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role in ('moderator','admin')));
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'ai_logs' and policyname = 'AI logs: moderators can update'
  ) then
    create policy "AI logs: moderators can update" on public.ai_logs
      for update using (exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role in ('moderator','admin')));
  end if;
end $$;

-- Proposals: moderators can read all and update
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'proposals' and policyname = 'Proposals: moderators can read all'
  ) then
    create policy "Proposals: moderators can read all" on public.proposals
      for select using (exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role in ('moderator','admin')));
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'proposals' and policyname = 'Proposals: moderators can update'
  ) then
    create policy "Proposals: moderators can update" on public.proposals
      for update using (exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role in ('moderator','admin')));
  end if;
end $$;

