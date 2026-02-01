import { Card } from "@/components/ui/card"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Statistics Component for the expanded view
function MatchStatsSummary({ active }: { active: boolean }) {
    if (!active) return null
    return (
        <div className="mt-4 pt-4 border-t border-white/10 animate-in slide-in-from-top-2 duration-300">
            <p className="text-center text-xs text-muted-foreground mb-2">Estadísticas detalladas próximamente</p>
        </div>
    )
}

export function MatchCard({ match }: { match: any }) {
    const [expanded, setExpanded] = useState(false)

    const homeName = match.home_player?.name || "Desconocido"
    const awayName = match.away_player?.name || "Desconocido"

    // Initial Letter
    const homeInitial = homeName.substring(0, 2).toUpperCase()
    const awayInitial = awayName.substring(0, 2).toUpperCase()

    const date = new Date(match.date).toLocaleDateString('es-ES', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    })

    return (
        <Card className="overflow-hidden bg-white/5 border-white/10 hover:border-primary/50 transition-all duration-300">
            <div
                className="p-4 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{date}</span>
                    </div>
                    {/* Badges */}
                    <div className="flex gap-2">
                        {match.match_type === 'penalties' && (
                            <span className="bg-yellow-500/20 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-500/20">
                                Penales
                            </span>
                        )}
                        {match.is_goleada && (
                            <span className="bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">
                                Goleada
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    {/* Home */}
                    <div className="flex flex-col items-center flex-1 gap-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold shadow-lg">
                            {homeInitial}
                        </div>
                        <span className="font-bold text-sm text-center">{homeName}</span>
                        <span className="text-[10px] text-muted-foreground text-center">{match.home_team_name || "Equipo Local"}</span>
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-center mx-4 gap-1">
                        <div className="text-3xl font-black text-white tracking-widest flex items-center gap-3">
                            <span>{match.home_score}</span>
                            <span className="text-muted-foreground text-xl">-</span>
                            <span>{match.away_score}</span>
                        </div>
                        {match.match_type === 'penalties' && (
                            <span className="text-xs text-muted-foreground font-mono bg-white/10 px-2 py-0.5 rounded">
                                ({match.home_penalty_score} - {match.away_penalty_score})
                            </span>
                        )}
                    </div>

                    {/* Away */}
                    <div className="flex flex-col items-center flex-1 gap-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg">
                            {awayInitial}
                        </div>
                        <span className="font-bold text-sm text-center">{awayName}</span>
                        <span className="text-[10px] text-muted-foreground text-center">{match.away_team_name || "Equipo Visita"}</span>
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>

                <MatchStatsSummary active={expanded} />
            </div>
        </Card>
    )
}
