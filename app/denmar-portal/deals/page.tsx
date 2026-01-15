import Link from "next/link"
import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { Plus, Tag, Pencil, Eye, EyeOff, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteDealButton } from "./delete-button"
import { format } from "date-fns"
import { Pagination } from "@/components/admin/pagination"
import { ListFilters } from "@/components/admin/list-filters"

const ITEMS_PER_PAGE = 10

const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "expiring-soon", label: "Expiring Soon" },
    { value: "title-asc", label: "Title A-Z" },
    { value: "title-desc", label: "Title Z-A" },
]

const FILTER_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "featured", label: "Featured" },
]

interface PageProps {
    searchParams: Promise<{ page?: string; sort?: string; filter?: string }>
}

function getOrderBy(sort: string) {
    switch (sort) {
        case "newest":
            return { createdAt: "desc" as const }
        case "oldest":
            return { createdAt: "asc" as const }
        case "expiring-soon":
            return { validUntil: "asc" as const }
        case "title-asc":
            return { title: "asc" as const }
        case "title-desc":
            return { title: "desc" as const }
        default:
            return { createdAt: "desc" as const }
    }
}

function getWhereClause(filter: string) {
    switch (filter) {
        case "active":
            return { isActive: true }
        case "inactive":
            return { isActive: false }
        case "featured":
            return { featured: true }
        default:
            return {}
    }
}

async function DealsList({ page, sort, filter }: { page: number; sort: string; filter: string }) {
    const whereClause = getWhereClause(filter)
    const orderBy = getOrderBy(sort)

    const dealModel = (prisma as any).deal

    const [deals, totalCount] = await Promise.all([
        dealModel.findMany({
            where: whereClause,
            orderBy: orderBy,
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
        }),
        dealModel.count({ where: whereClause }),
    ])

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                {deals.length === 0 && page === 1 && filter === "all" ? (
                    <div className="p-12 text-center">
                        <Tag className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No deals found
                        </h3>
                        <p className="text-slate-500 mb-4">
                            Create a new deal to attract more customers
                        </p>
                        <Link href="/denmar-portal/deals/new">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Deal
                            </Button>
                        </Link>
                    </div>
                ) : deals.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">No deals found matching your filters.</p>
                    </div>
                ) : (
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-100/50">
                            <tr>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Deal
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Price
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Discount
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Valid Until
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Status
                                </th>
                                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {deals.map((deal: any) => (
                                <tr key={deal.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-700 rounded-lg overflow-hidden">
                                                {deal.image && (
                                                    <img
                                                        src={deal.image}
                                                        alt={deal.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{deal.title}</p>
                                                <p className="text-sm text-slate-500">{deal.category}</p>
                                            </div>
                                            {deal.featured && (
                                                <Star className="h-4 w-4 text-brand-accent fill-amber-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 line-through">${deal.originalPrice}</span>
                                            <span className="font-medium text-slate-900">${deal.discountedPrice}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-success/10 text-brand-accent border border-amber-500/20">
                                            {deal.discount}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3.5 w-3.5 text-slate-500" />
                                            {format(new Date(deal.validUntil), "MMM d, yyyy")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {deal.isActive ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                                                <Eye className="h-3 w-3" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-500">
                                                <EyeOff className="h-3 w-3" />
                                                Hidden
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/denmar-portal/deals/${deal.id}`}>
                                                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeleteDealButton id={deal.id} name={deal.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    Showing {deals.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(page * ITEMS_PER_PAGE, totalCount)} of {totalCount} deals
                </p>
                <Suspense fallback={<div className="h-9" />}>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        basePath="/denmar-portal/deals"
                    />
                </Suspense>
            </div>
        </>
    )
}

export default async function DealsPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1)
    const sort = params.sort || "newest"
    const filter = params.filter || "all"

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Special Deals</h1>
                    <p className="text-slate-500 mt-1">
                        Manage discounts, offers, and limited-time deals
                    </p>
                </div>
                <Link href="/denmar-portal/deals/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Deal
                    </Button>
                </Link>
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

            <Suspense fallback={<div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">Loading deals...</div>}>
                <DealsList page={page} sort={sort} filter={filter} />
            </Suspense>
        </div>
    )
}
