-- PLAYERS TABLE
-- Stores data about the 3 friends (Julián, Andrés, Nicolás)
create table public.players (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  avatar_url text, -- Optional: for profile pictures
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MATCHES TABLE
-- Stores the general result of the match
create table public.matches (
  id uuid default gen_random_uuid() primary key,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Participants (Linking to players table)
  home_player_id uuid references public.players(id),
  away_player_id uuid references public.players(id),
  
  -- Team Names used in the specific match (e.g. "SU PESADILLA F.C.", "FC Legends")
  -- Sometimes they might play with different team names in-game
  home_team_name text,
  away_team_name text,

  -- Score
  home_score int not null,
  away_score int not null,
  
  -- Match Resolution
  -- 'regular' (90mins), 'extra' (120mins), 'penalties'
  match_type text check (match_type in ('regular', 'extra', 'penalties')) default 'regular',
  
  -- Penalty Scores (if match_type is 'penalties')
  home_penalty_score int,
  away_penalty_score int,
  
  -- Winner (Computed or Explicit)
  winner_id uuid references public.players(id), 
  
  -- Metadata
  comment text,
  screenshot_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- "Goleada" flag (Humiliation)
  is_goleada boolean default false
);

-- MATCH STATISTICS TABLE
-- Stores detailed stats for each match
create table public.match_stats (
  id uuid default gen_random_uuid() primary key,
  match_id uuid references public.matches(id) on delete cascade not null,
  
  -- Stats for Home Team
  home_possession int,
  home_shots int,
  home_shots_on_target int,
  home_fouls int,
  home_offside int,
  home_corners int,
  home_free_kicks int,
  home_passes int,
  home_passes_completed int,
  home_crosses int,
  home_interceptions int,
  home_tackles int,
  home_saves int,

  -- Stats for Away Team
  away_possession int,
  away_shots int,
  away_shots_on_target int,
  away_fouls int,
  away_offside int,
  away_corners int,
  away_free_kicks int,
  away_passes int,
  away_passes_completed int,
  away_crosses int,
  away_interceptions int,
  away_tackles int,
  away_saves int
);

-- SEED DATA (Optional: Create the 3 players)
insert into public.players (name) values ('Julián'), ('Andrés'), ('Nicolás');
