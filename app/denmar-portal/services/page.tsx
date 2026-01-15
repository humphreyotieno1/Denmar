import Link from "next/link"
import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { Plus, Wrench, Pencil, Eye, EyeOff, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteServiceButton } from "./delete-button"
import { Pagination } from "@/components/admin/pagination"
import { ListFilters } from "@/components/admin/list-filters"

const ITEMS_PER_PAGE = 10

const SORT_OPTIONS = [
    { value: "order", label: "Display Order" },
    { value: "newest", label: "Newest First" },
    { value: "name-asc", label: "Name A-Z" },
    { value: "name-desc", label: "Name Z-A" },
]

const FILTER_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "hidden", label: "Hidden" },
    { value: "featured", label: "Featured" },
]

interface PageProps {
    searchParams: Promise<{ page?: string; sort?: string; filter?: string }>
}

function getOrderBy(sort: string) {
    switch (sort) {
        case "order":
            return [{ order: "asc" as const }, { name: "asc" as const }]
        case "newest":
            return { createdAt: "desc" as const }
        case "name-asc":
            return { name: "asc" as const }
        case "name-desc":
            return { name: "desc" as const }
        default:
            return [{ order: "asc" as const }, { name: "asc" as const }]
    }
}

function getWhereClause(filter: string) {
    switch (filter) {
        case "active":
            return { isActive: true }
        case "hidden":
            return { isActive: false }
        case "featured":
            return { featured: true }
        default:
            return {}
    }
}

async function ServicesList({ page, sort, filter }: { page: number; sort: string; filter: string }) {
    const whereClause = getWhereClause(filter)
    const orderBy = getOrderBy(sort)

    const serviceModel: any = prisma.service

    const [services, totalCount] = await Promise.all([
        serviceModel.findMany({
            where: whereClause,
            orderBy: orderBy,
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
        }),
        serviceModel.count({ where: whereClause }),
    ])

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                {services.length === 0 && page === 1 && filter === "all" ? (
                    <div className="p-12 text-center">
                        <Wrench className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No services yet
                        </h3>
                        <p className="text-slate-500 mb-4">
                            Add a service to showcase what you offer
                        </p>
                        <Link href="/denmar-portal/services/new">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Service
                            </Button>
                        </Link>
                    </div>
                ) : services.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-500">No services found matching your filters.</p>
                    </div>
                ) : (
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-slate-100/50">
                            <tr>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Service
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Category
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                                    Price/Duration
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
                            {services.map((service: any) => (
                                <tr key={service.id} className="hover:bg-slate-100/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
                                                {service.image ? (
                                                    <img
                                                        src={service.image}
                                                        alt={service.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Wrench className="h-5 w-5 text-slate-50" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{service.name}</p>
                                                <p className="text-sm text-slate-500">/{service.slug}</p>
                                            </div>
                                            {service.featured && (
                                                <Star className="h-4 w-4 text-brand-accent fill-amber-400" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-50">
                                            {service.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">
                                        <div className="flex flex-col">
                                            <span>{service.price || "Contact for price"}</span>
                                            <span className="text-xs text-slate-500">{service.duration}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {service.isActive ? (
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
                                            <Link href={`/denmar-portal/services/${service.id}`}>
                                                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <DeleteServiceButton id={service.id} name={service.name} />
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
                    Showing {services.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(page * ITEMS_PER_PAGE, totalCount)} of {totalCount} services
                </p>
                <Suspense fallback={<div className="h-9" />}>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        basePath="/denmar-portal/services"
                    />
                </Suspense>
            </div>
        </>
    )
}

export default async function ServicesPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1)
    const sort = params.sort || "order"
    const filter = params.filter || "all"

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Services</h1>
                    <p className="text-slate-500 mt-1">
                        Manage travel services and business offerings
                    </p>
                </div>
                <Link href="/denmar-portal/services/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
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
                        defaultSort="order"
                    />
                </Suspense>
            </div>

            <Suspense fallback={<div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">Loading services...</div>}>
                <ServicesList page={page} sort={sort} filter={filter} />
            </Suspense>
        </div>
    )
}

