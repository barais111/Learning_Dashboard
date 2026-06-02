-- ============================================================
-- Lumina Learning Dashboard — Supabase Schema & Seed
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension (usually already enabled)
create extension if not exists "uuid-ossp";

-- Drop and recreate for a clean setup
drop table if exists public.courses;

-- Create courses table
create table public.courses (
  id          uuid primary key default uuid_generate_v4(),
  title       text        not null,
  progress    integer     not null default 0 check (progress >= 0 and progress <= 100),
  icon_name   text        not null default 'book-open',
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.courses enable row level security;

-- Allow anonymous read access (public dashboard)
create policy "Allow public read access"
  on public.courses
  for select
  using (true);

-- Seed data — 4 sample courses
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns',   75, 'Layers'),
  ('TypeScript Deep Dive',      42, 'Code2'),
  ('System Design Masterclass', 88, 'Network'),
  ('Web Performance & Core Vitals', 20, 'Zap');
