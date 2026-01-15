import Link from "next/link"
import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { Plus, MessageSquare, Pencil, Eye, EyeOff, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteTestimonialButton } from "./delete-button"
import { Pagination } from "@/components/admin/pagination"
import { ListFilters } from "@/components/admin/list-filters"

const ITEMS_PER_PAGE = 10

const SORT_OPTIONS = [
    { value: "order", label: "Display Order" },
    { value: "newest", label: "Newest First" },
    { value: "rating-desc", label: "Rating: High to Low" },
    { value: "rating-asc", label: "Rating: Low to High" },
]

const FILTER_OPTIONS = [
    { value: "active", label: "Published" },
    { value: "hidden", label: "Hidden" },
    { value: "featured", label: "Featured" },
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
        case "rating-desc":
            return { rating: "desc" as const }
        case "rating-asc":
            return { rating: "asc" as const }
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
        case "featured":
            return { featured: true }
        default:
            return {}
    }
}

async function TestimonialsList({ page, sort, filter }: { page: number; sort: string; filter: string }) {
    const whereClause = getWhereClause(filter)
    const orderBy = getOrderBy(sort)

    const testimonialModel: any = prisma.testimonial

    const [testimonials, totalCount] = await Promise.all([
        testimonialModel.findMany({
            where: whereClause,
            orderBy: orderBy,
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
        }),
        testimonialModel.count({ where: whereClause }),
    ])

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            {/* List */}
            <div className="space-y-4">
                {testimonials.length === 0 && page === 1 && filter === "all" ? (
                    <div className="p-12 bg-white border border-slate-200 rounded-xl text-center text-slate-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No testimonials found. Add one to build trust!</p>
                        <Link href="/denmar-portal/testimonials/new" className="mt-4 inline-block">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Testimonial
                            </Button>
                        </Link>
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="p-12 bg-white border border-slate-200 rounded-xl text-center">
                        <p className="text-slate-500">No testimonials found matching your filters.</p>
                    </div>
                ) : (
                    testimonials.map((testimonial: any) => (
                        <div key={testimonial.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row gap-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                {testimonial.image ? (
                                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xl">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-slate-900 font-semibold">{testimonial.name}</h3>
                                        <p className="text-sm text-slate-500">
                                            {[testimonial.role, testimonial.location, testimonial.trip].filter(Boolean).join(" • ") || "Verified Traveler"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "text-brand-accent fill-amber-400" : "text-slate-200"}`} />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-slate-700 italic">"{testimonial.content}"</p>

                                <div className="pt-4 flex items-center gap-4 text-xs">
                                    {testimonial.isActive ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            <Eye className="h-3 w-3" /> Published
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-500 border border-slate-300">
                                            <EyeOff className="h-3 w-3" /> Hidden
                                        </span>
                                    )}
                                    {testimonial.featured && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-brand-success/10 text-amber-500 border border-amber-500/20">
                                            <Star className="h-3 w-3" /> Featured
                                        </span>
                                    )}
                                    <span className="text-slate-600">Order: {testimonial.order}</span>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col items-center justify-end gap-2 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                                <Link href={`/denmar-portal/testimonials/${testimonial.id}`}>
                                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <DeleteTestimonialButton id={testimonial.id} name={testimonial.name} />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-slate-500">
                    Showing {testimonials.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(page * ITEMS_PER_PAGE, totalCount)} of {totalCount} testimonials
                </p>
                <Suspense fallback={<div className="h-9" />}>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        basePath="/denmar-portal/testimonials"
                    />
                </Suspense>
            </div>
        </>
    )
}

export default async function TestimonialsPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1)
    const sort = params.sort || "order"
    const filter = params.filter || "all"

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
                    <p className="text-slate-500 mt-1">
                        Manage customer reviews and feedback
                    </p>
                </div>
                <Link href="/denmar-portal/testimonials/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Testimonial
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

            <Suspense fallback={<div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">Loading testimonials...</div>}>
                <TestimonialsList page={page} sort={sort} filter={filter} />
            </Suspense>
        </div>
    )
}

