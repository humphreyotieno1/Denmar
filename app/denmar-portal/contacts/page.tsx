import { Suspense } from "react"
import { prisma } from "@/lib/db"
import { Users, Mail, Phone, Calendar, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { Pagination } from "@/components/admin/pagination"
import { ListFilters } from "@/components/admin/list-filters"

const ITEMS_PER_PAGE = 10

const SORT_OPTIONS = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
]

const FILTER_OPTIONS = [
    { value: "all", label: "All Submissions" },
]

interface PageProps {
    searchParams: Promise<{ page?: string; sort?: string; filter?: string }>
}

function getOrderBy(sort: string) {
    switch (sort) {
        case "newest":
            return { submittedAt: "desc" as const }
        case "oldest":
            return { submittedAt: "asc" as const }
        default:
            return { submittedAt: "desc" as const }
    }
}

async function ContactsList({ page, sort, filter }: { page: number; sort: string; filter: string }) {
    const orderBy = getOrderBy(sort)
    const contactModel: any = prisma.contactSubmission

    const [submissions, totalCount] = await Promise.all([
        contactModel.findMany({
            orderBy: orderBy,
            skip: (page - 1) * ITEMS_PER_PAGE,
            take: ITEMS_PER_PAGE,
        }),
        contactModel.count(),
    ])

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <>
            <div className="space-y-4">
                {submissions.length === 0 ? (
                    <div className="p-12 bg-white border border-slate-200 rounded-xl text-center text-slate-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No contact submissions yet.</p>
                    </div>
                ) : (
                    submissions.map((sub: any) => (
                        <div key={sub.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <Users className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">{sub.name}</h3>
                                            <p className="text-brand-accent font-medium text-sm">{sub.subject}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-xs">
                                        <div className="flex items-center gap-2 text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-full">
                                            <Mail className="h-3.5 w-3.5 text-slate-600" />
                                            {sub.email}
                                        </div>
                                        {sub.phone && (
                                            <div className="flex items-center gap-2 text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-full">
                                                <Phone className="h-3.5 w-3.5 text-slate-600" />
                                                {sub.phone}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-full">
                                            <Calendar className="h-3.5 w-3.5 text-slate-600" />
                                            {format(new Date(sub.submittedAt), "MMM d, yyyy HH:mm")}
                                        </div>
                                    </div>
                                </div>

                                <div className="pl-0 md:pl-16">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Message</h4>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{sub.message}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-slate-500">
                    Showing {submissions.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(page * ITEMS_PER_PAGE, totalCount)} of {totalCount} submissions
                </p>
                <Suspense fallback={<div className="h-9" />}>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        basePath="/denmar-portal/contacts"
                    />
                </Suspense>
            </div>
        </>
    )
}

export default async function ContactsPage({ searchParams }: PageProps) {
    const params = await searchParams
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1)
    const sort = params.sort || "newest"
    const filter = params.filter || "all"

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Contact Submissions</h1>
                    <p className="text-slate-500 mt-1">
                        Review inquiries and messages from website visitors
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

            <Suspense fallback={<div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">Loading submissions...</div>}>
                <ContactsList page={page} sort={sort} filter={filter} />
            </Suspense>
        </div>
    )
}
