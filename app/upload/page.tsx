"use client"

import { useState } from "react"
import { UploadModeSelector } from "@/components/upload/upload-mode-selector"
import { ImageUploader } from "@/components/upload/image-uploader"
import { ManualForm } from "@/components/upload/manual-form"

export default function UploadPage() {
    const [mode, setMode] = useState<"auto" | "manual">("auto")

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="text-center space-y-2 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                    Cargar Resultado
                </h1>
                <p className="text-muted-foreground">
                    Sube la captura de pantalla o ingresa los datos manualmente.
                </p>
            </div>

            <UploadModeSelector mode={mode} setMode={setMode} />

            <div className="min-h-[400px]">
                {mode === "auto" ? (
                    <div className="space-y-6">
                        <ImageUploader />
                        <p className="text-center text-xs text-muted-foreground max-w-sm mx-auto">
                            El sistema detectará automáticamente los equipos, el marcador y las estadísticas del partido.
                        </p>
                    </div>
                ) : (
                    <ManualForm />
                )}
            </div>
        </div>
    )
}
