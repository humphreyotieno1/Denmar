import Link from "next/link"
import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { Plus, Megaphone, Pencil, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeletePopupButton } from "./delete-button"
import { Pagination } from "@/components/admin/pagination"
import { ListFilters } from "@/components/admin/list-filters"

const ITEMS_PER_PAGE = 10

const SORT_OPTIONS = [
    { value: "priority", label: "Priority" },
    { value: "newest", label: "Newest First" },
]

const FILTER_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "hidden", label: "Inactive" },
]

interface PageProps {
    searchParams: Promise<{ page?: string; sort?: string; filter?: string }>
}

function getOrderBy(sort: string) {
    switch (sort) {
        case "priority":
            return { priority: "desc" as const }
        case "newest":
            return { createdAt: "desc" as const }
        default:
            return { priority: "desc" as const }
    }
}

function getWhereClause(filter: string) {
    switch (filter) {
        case "active":
            return { isActive: true }
        case "hidden":
            return { isActive: false }
        default:
            return {}
    }
}

async function DealsPopupList({ page, sort, filter }: { page: number; sort: string; filter: string }) {
    const whereClause = getWhereClause(filter)
    const orderBy = getOrderBy(sort)

    const dealsPopupModel: any = prisma.dealsPopup

    const [popups, totalCount] = await Promise.all([
        dealsPopupModel.findMany({
            where: whereClause,
            orderBy: orderBy,
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
        }),
        dealsPopupModel.count({ where: whereClause }),
    ])

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                {popups.length === 0 && page === 1 && filter === "all" ? (
                    <div className="p-12 text-center text-slate-500">
                        <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No popups configured yet.</p>
                        <Link href="/denmar-portal/deals-popup/new" className="mt-4 inline-block">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Popup
                            </Button>
                        </Link>
                    </div>
                ) : popups.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">No popups found matching your filters.</p>
                    </div>
                ) : (
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-100/50">
                            <tr>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Title</th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Link</th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Discount</th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Priority</th>
                                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {popups.map((popup: any) => (
                                <tr key={popup.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {popup.image && <img src={popup.image} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{popup.title}</p>
                                                <p className="text-xs text-slate-500 line-clamp-1">{popup.subtitle}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-600 font-mono text-ellipsis overflow-hidden max-w-[200px]">{popup.link}</td>
                                    <td className="px-6 py-4 text-sm text-slate-700">{popup.discount || "N/A"}</td>
                                    <td className="px-6 py-4">
                                        {popup.isActive ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                <Eye className="h-3 w-3" /> Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500 border border-slate-300">
                                                <EyeOff className="h-3 w-3" /> Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-700">{popup.priority}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/denmar-portal/deals-popup/${popup.id}`}>
                                                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeletePopupButton id={popup.id} title={popup.title} />
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
                    Showing {popups.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(page * ITEMS_PER_PAGE, totalCount)} of {totalCount} popups
                </p>
                <Suspense fallback={<div className="h-9" />}>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        basePath="/denmar-portal/deals-popup"
                    />
                </Suspense>
            </div>
        </>
    )
}

export default async function DealsPopupPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1)
    const sort = params.sort || "priority"
    const filter = params.filter || "all"

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Deals Popups</h1>
                    <p className="text-slate-500 mt-1">
                        Manage promotional popups for the website
                    </p>
                </div>
                <Link href="/denmar-portal/deals-popup/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Popup
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
                        defaultSort="priority"
                    />
                </Suspense>
            </div>

            <Suspense fallback={<div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">Loading popups...</div>}>
                <DealsPopupList page={page} sort={sort} filter={filter} />
            </Suspense>
        </div>
    )
}
