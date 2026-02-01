"use client"

import { Card } from "@/components/ui/card"
import { UploadCloud, PenTool } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadModeSelectorProps {
    mode: "auto" | "manual"
    setMode: (mode: "auto" | "manual") => void
}

export function UploadModeSelector({ mode, setMode }: UploadModeSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-4 mb-8">
            <Card
                onClick={() => setMode("auto")}
                className={cn(
                    "cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2",
                    mode === "auto"
                        ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        : "border-transparent bg-white/5 hover:bg-white/10"
                )}
            >
                <div className="flex flex-col items-center justify-center p-6 text-center gap-3">
                    <div className={cn("p-3 rounded-full transition-colors", mode === "auto" ? "bg-primary text-white" : "bg-white/10 text-muted-foreground")}>
                        <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Captura Inteligente</h3>
                        <p className="text-xs text-muted-foreground mt-1">Sube la foto y detectaremos todo</p>
                    </div>
                </div>
            </Card>

            <Card
                onClick={() => setMode("manual")}
                className={cn(
                    "cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2",
                    mode === "manual"
                        ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        : "border-transparent bg-white/5 hover:bg-white/10"
                )}
            >
                <div className="flex flex-col items-center justify-center p-6 text-center gap-3">
                    <div className={cn("p-3 rounded-full transition-colors", mode === "manual" ? "bg-primary text-white" : "bg-white/10 text-muted-foreground")}>
                        <PenTool className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Entrada Manual</h3>
                        <p className="text-xs text-muted-foreground mt-1">Ingresa los datos tú mismo</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}
