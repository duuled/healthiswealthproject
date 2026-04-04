create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  source      text not null default 'unknown',  -- 'shop', 'home', 'popup'
  subscribed_at timestamptz not null default now()
);

-- Anyone can insert their own email; only authenticated users can read the list
alter table public.newsletter_subscribers enable row level security;

create policy "Public insert" on public.newsletter_subscribers
  for insert with check (true);

create policy "Authenticated read" on public.newsletter_subscribers
  for select using (auth.role() = 'authenticated');
