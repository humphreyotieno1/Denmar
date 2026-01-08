import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import {
    Globe,
    MapPin,
    Package,
    Tag,
    Wrench,
    ImageIcon,
    MessageSquare,
    Mail,
    Users,
    TrendingUp,
} from "lucide-react"

async function getStats() {
    const [
        countries,
        destinations,
        packages,
        deals,
        services,
        heroSlides,
        testimonials,
        subscribers,
        contacts,
    ] = await Promise.all([
        prisma.country.count(),
        prisma.destination.count(),
        prisma.package.count(),
        prisma.deal.count(),
        prisma.service.count(),
        prisma.heroSlide.count(),
        prisma.testimonial.count(),
        prisma.newsletterSubscriber.count({ where: { status: "active" } }),
        prisma.contactSubmission.count(),
    ])

    return {
        countries,
        destinations,
        packages,
        deals,
        services,
        heroSlides,
        testimonials,
        subscribers,
        contacts,
    }
}

export default async function AdminDashboard() {
    const session = await auth()
    const stats = await getStats()

    const statCards = [
        {
            name: "Countries",
            value: stats.countries,
            icon: Globe,
            href: "/denmar-portal/countries",
            color: "bg-blue-500",
        },
        {
            name: "Destinations",
            value: stats.destinations,
            icon: MapPin,
            href: "/denmar-portal/destinations",
            color: "bg-emerald-500",
        },
        {
            name: "Packages",
            value: stats.packages,
            icon: Package,
            href: "/denmar-portal/packages",
            color: "bg-purple-500",
        },
        {
            name: "Deals",
            value: stats.deals,
            icon: Tag,
            href: "/denmar-portal/deals",
            color: "bg-orange-500",
        },
        {
            name: "Services",
            value: stats.services,
            icon: Wrench,
            href: "/denmar-portal/services",
            color: "bg-cyan-500",
        },
        {
            name: "Hero Slides",
            value: stats.heroSlides,
            icon: ImageIcon,
            href: "/denmar-portal/hero-slides",
            color: "bg-pink-500",
        },
        {
            name: "Testimonials",
            value: stats.testimonials,
            icon: MessageSquare,
            href: "/denmar-portal/testimonials",
            color: "bg-indigo-500",
        },
        {
            name: "Subscribers",
            value: stats.subscribers,
            icon: Mail,
            href: "/denmar-portal/subscribers",
            color: "bg-brand-success",
        },
        {
            name: "Contacts",
            value: stats.contacts,
            icon: Users,
            href: "/denmar-portal/contacts",
            color: "bg-rose-500",
        },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 mt-1">
                    Welcome back, {session?.user?.name}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <a
                        key={stat.name}
                        href={stat.href}
                        className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500">{stat.name}</p>
                                <p className="text-3xl font-bold text-slate-900 mt-1">
                                    {stat.value}
                                </p>
                            </div>
                            <div
                                className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                            >
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-brand-accent" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a
                        href="/denmar-portal/packages/new"
                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-center text-sm text-slate-900 transition-colors"
                    >
                        + New Package
                    </a>
                    <a
                        href="/denmar-portal/deals/new"
                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-center text-sm text-slate-900 transition-colors"
                    >
                        + New Deal
                    </a>
                    <a
                        href="/denmar-portal/destinations/new"
                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-center text-sm text-slate-900 transition-colors"
                    >
                        + New Destination
                    </a>
                    <a
                        href="/denmar-portal/hero-slides"
                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-center text-sm text-slate-900 transition-colors"
                    >
                        Manage Hero
                    </a>
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    Recent Activity
                </h2>
                <p className="text-slate-500 text-sm">
                    Activity will be displayed here once you start managing content.
                </p>
            </div>
        </div>
    )
}

