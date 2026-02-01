"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, Upload, PieChart, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Inicio", href: "/", icon: Trophy },
    { name: "Partidos", href: "/matches", icon: Users },
    { name: "Cargar", href: "/upload", icon: Upload },
    { name: "Stats", href: "/stats", icon: PieChart },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
            <div className="mx-4 mb-4 rounded-2xl glass border border-white/10 shadow-2xl backdrop-blur-xl">
                <div className="flex justify-around items-center h-16">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center w-16 h-full transition-all duration-200",
                                    isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                <div
                                    className={cn(
                                        "p-1.5 rounded-xl transition-all duration-200",
                                        isActive && "bg-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-medium mt-1">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
