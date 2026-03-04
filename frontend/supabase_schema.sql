-- Create a table for user wellness pulse checks
create table public.pulse_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  ojas_score integer not null,
  sleep_hours numeric,
  mood text,
  agni text,
  ama text,
  movement text,
  sleep_quality integer,
  routines text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security (RLS)
alter table public.pulse_logs enable row level security;

-- Create policy so users can only insert their own logs
create policy "Users can insert their own logs"
on public.pulse_logs for insert
with check ( auth.uid() = user_id );

-- Create policy so users can only view their own logs
create policy "Users can view their own logs"
on public.pulse_logs for select
using ( auth.uid() = user_id );

-- Optional: Create an index on user_id for faster lookups
create index idx_pulse_logs_user_id on public.pulse_logs(user_id);
