import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { User as UserIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { Pagination } from "@/components/admin/pagination"
import { ListFilters } from "@/components/admin/list-filters"

const ITEMS_PER_PAGE = 20

const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
]

const FILTER_OPTIONS = [
    { value: "create", label: "Creates" },
    { value: "update", label: "Updates" },
    { value: "delete", label: "Deletes" },
]

interface PageProps {
    searchParams: Promise<{ page?: string; sort?: string; filter?: string }>
}

const getActionColor = (action: string) => {
    switch (action) {
        case "create": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        case "update": return "bg-brand-success/10 text-brand-accent border-amber-500/20"
        case "delete": return "bg-red-500/10 text-red-400 border-red-500/20"
        default: return "bg-slate-500/10 text-slate-500 border-slate-500/20"
    }
}

function getOrderBy(sort: string) {
    switch (sort) {
        case "newest":
            return { createdAt: "desc" as const }
        case "oldest":
            return { createdAt: "asc" as const }
        default:
            return { createdAt: "desc" as const }
    }
}

function getWhereClause(filter: string) {
    switch (filter) {
        case "create":
            return { action: "create" }
        case "update":
            return { action: "update" }
        case "delete":
            return { action: "delete" }
        default:
            return {}
    }
}

async function AuditLogsList({ page, sort, filter }: { page: number; sort: string; filter: string }) {
    const whereClause = getWhereClause(filter)
    const orderBy = getOrderBy(sort)

    const auditLogModel: any = prisma.auditLog

    const [logs, totalCount] = await Promise.all([
        auditLogModel.findMany({
            where: whereClause,
            orderBy: orderBy,
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
            include: {
                user: {
                    select: { name: true, email: true }
                }
            },
        }),
        auditLogModel.count({ where: whereClause }),
    ])

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-slate-100/50">
                        <tr>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Action</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">User</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Entity</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">IP Address</th>
                            <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {logs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No activity logs found.
                                </td>
                            </tr>
                        ) : (
                            logs.map((log: any) => (
                                <tr key={log.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-tighter ${getActionColor(log.action)}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                                                <UserIcon className="h-4 w-4 text-slate-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-slate-900 font-medium">{log.user?.name || "Deleted User"}</span>
                                                <span className="text-[10px] text-slate-500">{log.user?.email || "N/A"}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-700 font-medium capitalize">{log.entityType}</span>
                                            <span className="text-[10px] text-slate-500 truncate max-w-[150px]">{log.entityName || log.entityId}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[10px] text-slate-500 font-mono">
                                        {log.ipAddress || "Unknown"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <Clock className="h-3.5 w-3.5 text-slate-600" />
                                            <span className="text-xs">{format(new Date(log.createdAt), "MMM d, HH:mm:ss")}</span>
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
                    Showing {logs.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(page * ITEMS_PER_PAGE, totalCount)} of {totalCount} logs
                </p>
                <Suspense fallback={<div className="h-9" />}>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        basePath="/denmar-portal/audit-logs"
                    />
                </Suspense>
            </div>
        </>
    )
}

export default async function AuditLogPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1)
    const sort = params.sort || "newest"
    const filter = params.filter || "all"

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
                    <p className="text-slate-500 mt-1">
                        Track all administrative actions and content changes
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
                <Suspense fallback={<div className="h-10" />}>
                    <ListFilters
                        sortOptions={SORT_OPTIONS}
                        filterOptions={FILTER_OPTIONS}
                        filterLabel="Action Type"
                        defaultSort="newest"
                    />
                </Suspense>
            </div>

            <Suspense fallback={<div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">Loading logs...</div>}>
                <AuditLogsList page={page} sort={sort} filter={filter} />
            </Suspense>
        </div>
    )
}
