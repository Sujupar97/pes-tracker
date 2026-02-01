import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PES Match Tracker",
  description: "Track your PES matches and stats.",
};

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark h-full">
      <body className={cn(inter.variable, "h-full font-sans bg-background text-foreground overflow-hidden")}>
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col h-full md:pl-72">
          <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </body>
    </html>
  );
}
