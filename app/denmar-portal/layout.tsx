"use client"

import { SessionProvider } from "next-auth/react"
import { AdminSidebar } from "@/components/admin/sidebar"
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
                    <div className="p-4 md:p-8 pt-20 md:pt-8 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
            <Toaster position="top-right" richColors />
        </SessionProvider>
    )
}

