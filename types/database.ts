export type Player = {
    id: string
    name: string
    avatar_url?: string
    created_at: string
}

export type Match = {
    id: string
    date: string
    home_player_id: string
    away_player_id: string
    home_team_name?: string
    away_team_name?: string
    home_score: number
    away_score: number
    match_type: 'regular' | 'extra' | 'penalties'
    home_penalty_score?: number
    away_penalty_score?: number
    winner_id?: string
    comment?: string
    screenshot_url?: string
    created_at: string
    is_goleada: boolean

    // Joins
    home_player?: Player
    away_player?: Player
}

export type MatchStats = {
    id: string
    match_id: string

    home_possession: number
    home_shots: number
    home_shots_on_target: number
    home_fouls: number
    home_offside: number
    home_corners: number
    home_free_kicks: number
    home_passes: number
    home_passes_completed: number
    home_crosses: number
    home_interceptions: number
    home_tackles: number
    home_saves: number

    away_possession: number
    away_shots: number
    away_shots_on_target: number
    away_fouls: number
    away_offside: number
    away_corners: number
    away_free_kicks: number
    away_passes: number
    away_passes_completed: number
    away_crosses: number
    away_interceptions: number
    away_tackles: number
    away_saves: number
}
