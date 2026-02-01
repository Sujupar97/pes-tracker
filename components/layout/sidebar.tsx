"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Upload, PieChart, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Dashboard", href: "/", icon: Trophy },
    { name: "Partidos", href: "/matches", icon: Users },
    { name: "Cargar", href: "/upload", icon: Upload },
    { name: "Estadísticas", href: "/stats", icon: PieChart },
    { name: "Configuración", href: "/settings", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="hidden border-r border-white/10 md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col glass">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        PES Tracker
                    </h1>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "group flex gap-x-3 rounded-xl p-3 text-sm font-semibold leading-6 transition-all duration-200",
                                                    isActive
                                                        ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                <item.icon
                                                    className={cn(
                                                        "h-6 w-6 shrink-0 transition-colors",
                                                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
