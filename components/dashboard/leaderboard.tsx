import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

// Function to fetch and calculate leaderboard
async function getLeaderboardData() {
    // Fetch players
    const { data: players } = await supabase.from('players').select('*')
    if (!players) return []

    // Fetch matches
    const { data: matches } = await supabase.from('matches').select('*')
    const validMatches = matches || []

    // Calculate stats
    const stats = players.map(player => {
        let played = 0, won = 0, drawn = 0, lost = 0, gf = 0, ga = 0, points = 0

        validMatches.forEach(match => {
            // Logic for Home Player
            if (match.home_player_id === player.id) {
                played++
                gf += match.home_score
                ga += match.away_score
                if (match.home_score > match.away_score || (match.match_type === 'penalties' && (match.home_penalty_score || 0) > (match.away_penalty_score || 0))) {
                    won++
                    points += 3
                } else if (match.home_score === match.away_score && match.match_type !== 'penalties') {
                    drawn++
                    points += 1
                } else {
                    lost++
                }
            }

            // Logic for Away Player
            if (match.away_player_id === player.id) {
                played++
                gf += match.away_score
                ga += match.home_score
                if (match.away_score > match.home_score || (match.match_type === 'penalties' && (match.away_penalty_score || 0) > (match.home_penalty_score || 0))) {
                    won++
                    points += 3
                } else if (match.away_score === match.home_score && match.match_type !== 'penalties') {
                    drawn++
                    points += 1
                } else {
                    lost++
                }
            }
        })

        return {
            id: player.id,
            name: player.name,
            points, played, won, drawn, lost, gf, ga
        }
    })

    // Sort by points, then gd, then gf
    return stats.sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf)
}

// ... imports kept (Card, Trophy, supabase)

export async function Leaderboard() {
    const leaderboard = await getLeaderboardData()

    return (
        <Card className="col-span-1 lg:col-span-2 overflow-hidden border-white/10 shadow-2xl bg-black/20 backdrop-blur-xl ring-1 ring-white/5">
            <CardHeader className="pb-4 border-b border-white/5">
                <CardTitle className="text-xl font-bold flex items-center gap-3 text-white">
                    <div className="p-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                    </div>
                    Tabla de Posiciones
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-white/5">
                            <tr>
                                <th className="px-6 py-4 font-semibold tracking-wider">Pos</th>
                                <th className="px-6 py-4 font-semibold tracking-wider">Jugador</th>
                                <th className="px-6 py-4 font-semibold tracking-wider text-center">PTS</th>
                                <th className="px-6 py-4 font-semibold tracking-wider text-center hidden sm:table-cell">PJ</th>
                                <th className="px-6 py-4 font-semibold tracking-wider text-center hidden sm:table-cell">DG</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leaderboard.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                                        Empieza la temporada jugando un partido.
                                    </td>
                                </tr>
                            ) : (
                                leaderboard.map((player, index) => {
                                    let rankColor = "bg-white/5 text-muted-foreground border-white/5"
                                    if (index === 0) rankColor = "bg-yellow-500/20 text-yellow-400 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]"
                                    if (index === 1) rankColor = "bg-slate-300/20 text-slate-300 border-slate-300/20"
                                    if (index === 2) rankColor = "bg-amber-700/20 text-amber-600 border-amber-700/20"

                                    return (
                                        <tr
                                            key={player.id}
                                            className="hover:bg-white/5 transition-colors duration-200 group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${rankColor} font-bold text-xs`}>
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-base text-white group-hover:text-primary transition-colors">
                                                    {player.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-block min-w-[30px] py-1 bg-white/10 rounded font-bold text-white">
                                                    {player.points}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-muted-foreground hidden sm:table-cell">{player.played}</td>
                                            <td className="px-6 py-4 text-center text-muted-foreground hidden sm:table-cell">
                                                <span className={player.gf - player.ga > 0 ? "text-green-400" : player.gf - player.ga < 0 ? "text-red-400" : "text-gray-400"}>
                                                    {player.gf - player.ga > 0 ? `+${player.gf - player.ga}` : player.gf - player.ga}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
