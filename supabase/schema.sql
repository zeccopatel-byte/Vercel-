-- Run this once in Supabase > SQL Editor > New query.
-- Creates the table that stores every contact form enquiry.

create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  enquiry_type  text not null,
  name          text not null,
  email         text not null,
  organisation  text,
  event_date    date,
  message       text not null,
  consent       boolean not null default false,
  user_agent    text,
  status        text not null default 'new'   -- new | replied | archived
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);

-- Lock the table down. Only the website's server function (service role key) can write,
-- and only you can read it from the Supabase dashboard. Visitors cannot read anything.
alter table public.enquiries enable row level security;
