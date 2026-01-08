"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Globe,
    MapPin,
    Package,
    Tag,
    Wrench,
    ImageIcon,
    MessageSquare,
    Settings,
    Users,
    Mail,
    FileText,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Plane,
    Megaphone,
    Menu,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const navigation = [
    { name: "Dashboard", href: "/denmar-portal", icon: LayoutDashboard },
    { name: "Countries", href: "/denmar-portal/countries", icon: Globe },
    { name: "Destinations", href: "/denmar-portal/destinations", icon: MapPin },
    { name: "Packages", href: "/denmar-portal/packages", icon: Package },
    { name: "Deals", href: "/denmar-portal/deals", icon: Tag },
    { name: "Services", href: "/denmar-portal/services", icon: Wrench },
    { name: "Hero Slides", href: "/denmar-portal/hero-slides", icon: ImageIcon },
    { name: "Deals Popup", href: "/denmar-portal/deals-popup", icon: Megaphone },
    { name: "Testimonials", href: "/denmar-portal/testimonials", icon: MessageSquare },
    { name: "divider", href: "", icon: null },
    { name: "Newsletter", href: "/denmar-portal/subscribers", icon: Mail },
    { name: "Contact Submissions", href: "/denmar-portal/contacts", icon: Users },
    { name: "Audit Logs", href: "/denmar-portal/audit-logs", icon: FileText },
    { name: "Settings", href: "/denmar-portal/settings", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    const SidebarContent = (
        <div className="flex flex-col h-full bg-white border-r border-slate-200">
            {/* Logo */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-success rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-success/20">
                        <Plane className="h-5 w-5 text-white" />
                    </div>
                    {(!collapsed || mobileOpen) && (
                        <div>
                            <h1 className="text-lg font-bold text-slate-900 leading-tight">Denmar</h1>
                            <p className="text-[10px] text-brand-success font-bold uppercase tracking-widest">Portal</p>
                        </div>
                    )}
                </div>
                {mobileOpen && (
                    <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} className="md:hidden">
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 py-6">
                <nav className="space-y-1.5 px-3">
                    {navigation.map((item, index) => {
                        if (item.name === "divider") {
                            return <div key={index} className="my-6 border-t border-slate-100" />
                        }

                        const isActive = pathname === item.href ||
                            (item.href !== "/denmar-portal" && pathname.startsWith(item.href))

                        const Icon = item.icon!

                        const linkContent = (
                            <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-brand-success text-white shadow-md shadow-brand-success/10 font-medium"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-brand-success"
                                )}
                            >
                                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-brand-success")} />
                                {(!collapsed || mobileOpen) && (
                                    <span className="truncate">{item.name}</span>
                                )}
                            </Link>
                        )

                        if (collapsed && !mobileOpen) {
                            return (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                                    <TooltipContent side="right">{item.name}</TooltipContent>
                                </Tooltip>
                            )
                        }

                        return <div key={index}>{linkContent}</div>
                    })}
                </nav>
            </ScrollArea>

            {/* User & Collapse */}
            <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                {(!collapsed || mobileOpen) && session?.user && (
                    <div className="mb-4 px-2">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                            {session.user.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                            {session.user.role === "admin" ? "Administrator" : "Staff"}
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {!mobileOpen && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-slate-400 hover:text-brand-success hidden md:flex"
                        >
                            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </Button>
                    )}

                    {(!collapsed || mobileOpen) && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => signOut({ callbackUrl: "/denmar-portal/login" })}
                            className="flex-1 text-slate-600 border-slate-200 hover:bg-white hover:text-red-500 hover:border-red-200"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    )}

                    {collapsed && !mobileOpen && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => signOut({ callbackUrl: "/denmar-portal/login" })}
                                    className="text-slate-400 hover:text-red-500"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Sign Out</TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <TooltipProvider delayDuration={0}>
            {/* Desktop Sidebar */}
            <div
                className={cn(
                    "hidden md:flex flex-col h-screen transition-all duration-300 overflow-hidden",
                    collapsed ? "w-20" : "w-64"
                )}
            >
                {SidebarContent}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <Button variant="outline" size="icon" onClick={() => setMobileOpen(true)} className="bg-white shadow-md border-slate-200">
                    <Menu className="h-5 w-5 text-slate-600" />
                </Button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-50 flex"
                    onClick={() => setMobileOpen(false)}
                >
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />
                    <div
                        className="relative w-72 h-full shadow-2xl animate-in slide-in-from-left duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {SidebarContent}
                    </div>
                </div>
            )}
        </TooltipProvider>
    )
}
