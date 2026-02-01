import { Leaderboard } from "@/components/dashboard/leaderboard"
import { RecentMatches } from "@/components/dashboard/recent-matches"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Resumen de la temporada y estadísticas.</p>
        </div>
        <Link href="/upload">
          <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-0 shadow-lg shadow-blue-500/25">
            <PlusCircle className="w-5 h-5" />
            Nuevo Partido
          </Button>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Leaderboard />
        <RecentMatches />
      </div>
    </div>
  )
}
