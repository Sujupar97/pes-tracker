"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon, Loader2, CheckCircle2 } from "lucide-react"

export function ImageUploader() {
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [analyzing, setAnalyzing] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    const handleFile = (file: File) => {
        setFile(file)
        setResult(null)
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const removeFile = () => {
        setFile(null)
        setPreview(null)
        setAnalyzing(false)
        setResult(null)
    }

    const handleAnalyze = async () => {
        if (!file) return

        setAnalyzing(true)

        try {
            const formData = new FormData()
            formData.append("file", file)

            const response = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()
            setResult(data)
        } catch (error) {
            console.error("Error:", error)
            alert("Error al analizar la imagen. Intenta de nuevo.")
        } finally {
            setAnalyzing(false)
        }
    }

    return (
        <div className="w-full max-w-xl mx-auto animate-in fade-in zoom-in duration-500">
            {!preview ? (
                <label
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors
            ${dragActive ? "border-primary bg-primary/10" : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                        <div className="p-4 rounded-full bg-white/10 mb-4">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="mb-2 text-sm text-white font-medium">
                            <span className="font-bold text-primary">Haz clic para subir</span> o arrastra la imagen
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Soporta JPG, PNG (Capturas de PES Mobile)
                        </p>
                    </div>
                    <input type="file" className="hidden" onChange={handleChange} accept="image/*" />
                </label>
            ) : (
                <Card className="overflow-hidden border-none bg-black/40">
                    <div className="relative h-64 w-full">
                        {/* Image Preview */}
                        <img src={preview} alt="Preview" className="w-full h-full object-contain bg-black/50" />

                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 rounded-full"
                            onClick={removeFile}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-white truncate max-w-[200px]">{file?.name}</span>
                            </div>
                            <Button onClick={handleAnalyze} disabled={analyzing || !!result} className="gap-2">
                                {analyzing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Analizando...
                                    </>
                                ) : result ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        ¡Completado!
                                    </>
                                ) : (
                                    "Procesar Resultado"
                                )}
                            </Button>
                        </div>

                        {/* Result Preview (Simplified) */}
                        {result && (
                            <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 animate-in slide-in-from-top-2">
                                <p className="text-green-400 font-bold text-sm mb-2">¡Lectura Exitosa!</p>
                                <div className="text-xs text-white space-y-1">
                                    <p>Partido: {result.home_team_name} vs {result.away_team_name}</p>
                                    <p>Marcador: {result.home_score} - {result.away_score}</p>
                                    <p>Ganador Probable: {result.winner_guess}</p>
                                </div>
                                <Button className="w-full mt-3 h-8 text-xs" variant="outline">
                                    Guardar en Base de Datos
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
