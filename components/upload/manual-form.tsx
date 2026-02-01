"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ManualForm() {
    return (
        <Card className="max-w-xl mx-auto border-white/10 bg-white/5 animate-in slide-in-from-bottom-4 fade-in duration-500">
            <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8 items-center">
                    {/* Home Team */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Local</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-primary outline-none">
                            <option>Seleccionar</option>
                            <option>Julián</option>
                            <option>Andrés</option>
                            <option>Nicolás</option>
                        </select>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full text-center text-4xl font-black bg-transparent border-b border-white/20 focus:border-primary py-2 outline-none text-white"
                        />
                    </div>

                    {/* V.S. Divider */}
                    <div className="text-center font-bold text-muted-foreground italic text-xl">VS</div>

                    {/* Away Team */}
                    <div className="space-y-2 text-right">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Visitante</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-primary outline-none text-right">
                            <option>Seleccionar</option>
                            <option>Julián</option>
                            <option>Andrés</option>
                            <option>Nicolás</option>
                        </select>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full text-center text-4xl font-black bg-transparent border-b border-white/20 focus:border-primary py-2 outline-none text-white"
                        />
                    </div>
                </div>

                {/* Comment Section */}
                <div className="space-y-2 pt-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Comentarios (Opcional)</label>
                    <textarea
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white resize-none h-24 focus:ring-2 focus:ring-primary outline-none"
                        placeholder="¿Hubo golazo? ¿Robo arbitral? Cuéntalo aquí..."
                    ></textarea>
                </div>

                <Button className="w-full font-bold text-lg h-12">
                    Guardar Resultado
                </Button>
            </CardContent>
        </Card>
    )
}
