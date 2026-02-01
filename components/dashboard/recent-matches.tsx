"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock Data
const recentMatches = [
    { id: 1, home: "Julián", away: "Andrés", score: "3 - 2", winner: "Julián", date: "Hace 2 horas", type: "regular" },
    { id: 2, home: "Nicolás", away: "Julián", score: "1 - 4", winner: "Julián", date: "Ayer", type: "goleada" },
    { id: 3, home: "Andrés", away: "Nicolás", score: "2 - 2", winner: "Andrés", method: "Penales (4-3)", date: "Ayer", type: "penalties" },
]

export function RecentMatches() {
    return (
        <Card className="col-span-1 overflow-hidden border-none shadow-xl bg-white/5 backdrop-blur-md">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-blue-400" />
                        Resultados Recientes
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {recentMatches.map((match) => (
                        <div
                            key={match.id}
                            className="relative flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-primary/50 transition-all group"
                        >
                            {match.type === "goleada" && (
                                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-[10px] uppercase font-bold tracking-widest rounded-full shadow-lg transform rotate-12">
                                    Goleada
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className={cn("font-semibold", match.winner === match.home ? "text-green-400" : "text-white")}>
                                        {match.home}
                                    </span>
                                    <span className="text-muted-foreground text-xs">vs</span>
                                    <span className={cn("font-semibold", match.winner === match.away ? "text-green-400" : "text-white")}>
                                        {match.away}
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground">{match.date}</div>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className="text-lg font-black tracking-widest font-mono text-primary">
                                    {match.score}
                                </span>
                                {match.method && (
                                    <span className="text-[10px] text-yellow-500 font-medium">
                                        {match.method}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-2 border-t border-white/10 flex justify-center">
                    <button className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 transition-colors">
                        Ver todos <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
