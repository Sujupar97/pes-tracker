"use client"

import { MatchCard } from "@/components/matches/match-card"
// Used native input below
import { Search, Filter } from "lucide-react"

import { supabase } from "@/lib/supabase/client"

async function getAllMatches() {
    const { data: matches } = await supabase
        .from('matches')
        .select(`
      *,
      home_player:players!matches_home_player_id_fkey(name),
      away_player:players!matches_away_player_id_fkey(name),
      winner:players!matches_winner_id_fkey(name)
    `)
        .order('created_at', { ascending: false })

    return matches || []
}

export default async function MatchesPage() {
    const matches = await getAllMatches()

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Historial de Partidos</h1>
                    <p className="text-muted-foreground">Todos los resultados de la temporada.</p>
                </div>
                {/* Search/Filter omitted for brevity in diff but kept in file via context */}
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar jugador..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                        <Filter className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {matches.length === 0 ? (
                    <div className="text-center col-span-full py-12 text-muted-foreground">
                        No hay partidos registrados aún.
                    </div>
                ) : (
                    matches.map((match: any) => (
                        <MatchCard key={match.id} match={match} />
                    ))
                )}
            </div>
        </div>
    )
}
