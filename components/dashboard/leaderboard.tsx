"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Minus } from "lucide-react"

// Mock Data
const leaderboard = [
    { id: 1, name: "Julián", points: 15, played: 8, won: 5, drawn: 0, lost: 3, gf: 24, ga: 12 },
    { id: 2, name: "Nicolás", points: 12, played: 8, won: 4, drawn: 0, lost: 4, gf: 18, ga: 20 },
    { id: 3, name: "Andrés", points: 9, played: 8, won: 3, drawn: 0, lost: 5, gf: 14, ga: 24 },
]

export function Leaderboard() {
    return (
        <Card className="col-span-1 lg:col-span-2 overflow-hidden border-none shadow-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Tabla de Posiciones
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase border-b border-white/10">
                            <tr>
                                <th className="px-4 py-3 font-medium">Pos</th>
                                <th className="px-4 py-3 font-medium">Jugador</th>
                                <th className="px-4 py-3 font-medium text-center">PTS</th>
                                <th className="px-4 py-3 font-center text-center hidden sm:table-cell">PJ</th>
                                <th className="px-4 py-3 font-center text-center hidden sm:table-cell">PG</th>
                                <th className="px-4 py-3 font-center text-center hidden sm:table-cell">PP</th>
                                <th className="px-4 py-3 font-center text-center hidden sm:table-cell">DG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((player, index) => (
                                <tr
                                    key={player.id}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-4 py-4 font-medium">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 font-bold text-base text-white">
                                        {player.name}
                                    </td>
                                    <td className="px-4 py-4 text-center font-bold text-primary text-lg">
                                        {player.points}
                                    </td>
                                    <td className="px-4 py-4 text-center text-muted-foreground hidden sm:table-cell">{player.played}</td>
                                    <td className="px-4 py-4 text-center text-green-400 hidden sm:table-cell">{player.won}</td>
                                    <td className="px-4 py-4 text-center text-red-400 hidden sm:table-cell">{player.lost}</td>
                                    <td className="px-4 py-4 text-center text-muted-foreground hidden sm:table-cell">
                                        {player.gf - player.ga > 0 ? `+${player.gf - player.ga}` : player.gf - player.ga}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
