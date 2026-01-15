import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { Mail, CheckCircle, Clock } from "lucide-react"
import { format } from "date-fns"
import { Pagination } from "@/components/admin/pagination"
import { ListFilters } from "@/components/admin/list-filters"

const ITEMS_PER_PAGE = 20

const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "email-asc", label: "Email A-Z" },
]

const FILTER_OPTIONS = [
    { value: "all", label: "All Subscribers" },
]

interface PageProps {
    searchParams: Promise<{ page?: string; sort?: string; filter?: string }>
}

function getOrderBy(sort: string) {
    switch (sort) {
        case "newest":
            return { subscribedAt: "desc" as const }
        case "oldest":
            return { subscribedAt: "asc" as const }
        case "email-asc":
            return { email: "asc" as const }
        default:
            return { subscribedAt: "desc" as const }
    }
}

async function SubscribersList({ page, sort, filter }: { page: number; sort: string; filter: string }) {
    const orderBy = getOrderBy(sort)
    const subscriberModel: any = prisma.newsletterSubscriber

    const [subscribers, totalCount] = await Promise.all([
        subscriberModel.findMany({
            orderBy: orderBy,
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
        }),
        subscriberModel.count(),
    ])

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-slate-100/50">
                        <tr>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Email Address</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Subscribed At</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {subscribers.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-slate-500 font-medium whitespace-nowrap">
                                    No subscribers found.
                                </td>
                            </tr>
                        ) : (
                            subscribers.map((sub: any) => (
                                <tr key={sub.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm text-slate-900 font-medium">{sub.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            <CheckCircle className="h-3 w-3" />
                                            Subscribed
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Clock className="h-3.5 w-3.5 text-slate-600" />
                                            <span className="text-xs">{format(new Date(sub.subscribedAt), "MMM d, yyyy")}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-slate-500">
                    Showing {subscribers.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(page * ITEMS_PER_PAGE, totalCount)} of {totalCount} subscribers
                </p>
                <Suspense fallback={<div className="h-9" />}>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        basePath="/denmar-portal/subscribers"
                    />
                </Suspense>
            </div>
        </>
    )
}

export default async function SubscribersPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1)
    const sort = params.sort || "newest"
    const filter = params.filter || "all"

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Newsletter Subscribers</h1>
                    <p className="text-slate-500 mt-1">
                        Manage your audience and marketing list
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
                <Suspense fallback={<div className="h-10" />}>
                    <ListFilters
                        sortOptions={SORT_OPTIONS}
                        filterOptions={FILTER_OPTIONS}
                        filterLabel="Status"
                        defaultSort="newest"
                    />
                </Suspense>
            </div>

            <Suspense fallback={<div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">Loading subscribers...</div>}>
                <SubscribersList page={page} sort={sort} filter={filter} />
            </Suspense>
        </div>
    )
}
