"use client"

import { SessionProvider } from "next-auth/react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { GlobalSearch } from "@/components/admin/global-search"
import { Toaster } from "sonner"
import { usePathname } from "next/navigation"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isLoginPage = pathname?.startsWith("/denmar-portal/login")

    if (isLoginPage) {
        return (
            <SessionProvider>
                <div className="min-h-screen bg-white">
                    {children}
                </div>
                <Toaster position="top-right" richColors />
            </SessionProvider>
        )
    }

    return (
        <SessionProvider>
            <div className="flex h-screen bg-slate-50 overflow-hidden">
                <AdminSidebar />
                <main className="flex-1 overflow-auto relative">
                    {/* Top Bar with Search - Desktop */}
                    <div className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 px-4 md:px-8 py-3 hidden md:flex items-center justify-end">
                        <GlobalSearch />
                    </div>
                    {/* Top Bar - Mobile: Search positioned to the left of hamburger */}
                    <div className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 px-4 py-3 flex md:hidden items-center justify-end pr-16">
                        <GlobalSearch />
                    </div>
                    <div className="p-4 md:p-8 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
            <Toaster position="top-right" richColors />
        </SessionProvider>
    )
}
