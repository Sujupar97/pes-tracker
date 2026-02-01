"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // We need to create this or use a simple div
import { Calendar, User, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Statistics Component for the expanded view
function MatchStatsSummary({ active }: { active: boolean }) {
    if (!active) return null
    return (
        <div className="mt-4 pt-4 border-t border-white/10 animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-3 text-xs text-center gap-y-2">
                <div className="text-muted-foreground">55%</div>
                <div className="font-bold text-white uppercase">Posesión</div>
                <div className="text-muted-foreground">45%</div>

                <div className="text-muted-foreground">5</div>
                <div className="font-bold text-white uppercase">Tiros</div>
                <div className="text-muted-foreground">6</div>

                <div className="text-muted-foreground">116</div>
                <div className="font-bold text-white uppercase">Pases</div>
                <div className="text-muted-foreground">105</div>
            </div>
        </div>
    )
}

export function MatchCard() {
    const [expanded, setExpanded] = useState(false)

    return (
        <Card className="overflow-hidden bg-white/5 border-white/10 hover:border-primary/50 transition-all duration-300">
            <div
                className="p-4 cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>31 Ene 2026, 15:30</span>
                    </div>
                    {/* Badges */}
                    <div className="flex gap-2">
                        <span className="bg-yellow-500/20 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-500/20">
                            Penales
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    {/* Home */}
                    <div className="flex flex-col items-center flex-1 gap-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold shadow-lg">
                            JP
                        </div>
                        <span className="font-bold text-sm text-center">Julián</span>
                        <span className="text-[10px] text-muted-foreground text-center">SU PESADILLA F.C.</span>
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-center mx-4 gap-1">
                        <div className="text-3xl font-black text-white tracking-widest flex items-center gap-3">
                            <span>3</span>
                            <span className="text-muted-foreground text-xl">-</span>
                            <span>3</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono bg-white/10 px-2 py-0.5 rounded">
                            (2 - 3)
                        </span>
                    </div>

                    {/* Away */}
                    <div className="flex flex-col items-center flex-1 gap-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg">
                            AN
                        </div>
                        <span className="font-bold text-sm text-center">Andrés</span>
                        <span className="text-[10px] text-muted-foreground text-center">FC Legends</span>
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
