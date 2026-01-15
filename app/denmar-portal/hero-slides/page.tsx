import Link from "next/link"
import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { Plus, LayoutTemplate, Pencil, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteHeroSlideButton } from "./delete-button"
import { Pagination } from "@/components/admin/pagination"
import { ListFilters } from "@/components/admin/list-filters"

const ITEMS_PER_PAGE = 6

const SORT_OPTIONS = [
    { value: "order", label: "Display Order" },
    { value: "newest", label: "Newest First" },
]

const FILTER_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "hidden", label: "Hidden" },
]

interface PageProps {
    searchParams: Promise<{ page?: string; sort?: string; filter?: string }>
}

function getOrderBy(sort: string) {
    switch (sort) {
        case "order":
            return { order: "asc" as const }
        case "newest":
            return { createdAt: "desc" as const }
        default:
            return { order: "asc" as const }
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

async function HeroSlidesList({ page, sort, filter }: { page: number; sort: string; filter: string }) {
    const whereClause = getWhereClause(filter)
    const orderBy = getOrderBy(sort)

    const slideModel: any = prisma.heroSlide

    const [slides, totalCount] = await Promise.all([
        slideModel.findMany({
            where: whereClause,
            orderBy: orderBy,
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
        }),
        slideModel.count({ where: whereClause }),
    ])

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.length === 0 && page === 1 && filter === "all" ? (
                    <div className="md:col-span-2 lg:col-span-3 p-12 bg-white border border-slate-200 rounded-xl text-center">
                        <LayoutTemplate className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No hero slides yet
                        </h3>
                        <p className="text-slate-500 mb-4">
                            Create slides to showcase featured destinations or deals
                        </p>
                        <Link href="/denmar-portal/hero-slides/new">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Slide
                            </Button>
                        </Link>
                    </div>
                ) : slides.length === 0 ? (
                    <div className="md:col-span-2 lg:col-span-3 p-12 bg-white border border-slate-200 rounded-xl text-center">
                        <p className="text-slate-500">No slides found matching your filters.</p>
                    </div>
                ) : (
                    slides.map((slide: any) => (
                        <div key={slide.id} className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
                                    <p className="text-brand-accent text-xs font-medium uppercase tracking-wider mb-1">
                                        {slide.eyebrow}
                                    </p>
                                    <h3 className="text-slate-900 font-bold leading-tight">
                                        {slide.title} <span className="text-amber-500">{slide.highlight}</span>
                                    </h3>
                                </div>
                                <div className="absolute top-2 right-2 flex gap-1">
                                    {slide.isActive ? (
                                        <span className="bg-emerald-500/90 text-slate-100 p-1 rounded-md shadow-lg border border-black/10">
                                            <Eye className="h-4 w-4" />
                                        </span>
                                    ) : (
                                        <span className="bg-slate-700/90 text-slate-100 p-1 rounded-md shadow-lg border border-black/10">
                                            <EyeOff className="h-4 w-4" />
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 flex items-center justify-between border-t border-slate-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-300">
                                        #{slide.order}
                                    </div>
                                    <span className="text-sm text-slate-500 font-medium">Order</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/denmar-portal/hero-slides/${slide.id}`}>
                                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <DeleteHeroSlideButton id={slide.id} name={slide.title} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    Showing {slides.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(page * ITEMS_PER_PAGE, totalCount)} of {totalCount} slides
                </p>
                <Suspense fallback={<div className="h-9" />}>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        basePath="/denmar-portal/hero-slides"
                    />
                </Suspense>
            </div>
        </>
    )
}

export default async function HeroSlidesPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1)
    const sort = params.sort || "order"
    const filter = params.filter || "all"

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Hero Slides</h1>
                    <p className="text-slate-500 mt-1">
                        Manage the homepage hero carousel slides
                    </p>
                </div>
                <Link href="/denmar-portal/hero-slides/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Slide
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

            <Suspense fallback={<div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">Loading slides...</div>}>
                <HeroSlidesList page={page} sort={sort} filter={filter} />
            </Suspense>
        </div>
    )
}

