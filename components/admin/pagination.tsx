"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
    currentPage: number
    totalPages: number
    basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    const searchParams = useSearchParams()

    if (totalPages <= 1) return null

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page.toString())
        return `${basePath}?${params.toString()}`
    }

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (currentPage > 3) {
                pages.push("...")
            }

            // Show pages around current
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (!pages.includes(i)) {
                    pages.push(i)
                }
            }

            if (currentPage < totalPages - 2) {
                pages.push("...")
            }

            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages)
            }
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                asChild={currentPage > 1}
                className="h-9 w-9 p-0"
            >
                {currentPage > 1 ? (
                    <Link href={createPageUrl(currentPage - 1)} aria-label="Previous page">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                ) : (
                    <span><ChevronLeft className="h-4 w-4" /></span>
                )}
            </Button>

            {/* Page Numbers */}
            {pageNumbers.map((page, idx) => (
                <span key={idx}>
                    {page === "..." ? (
                        <span className="px-2 text-slate-400">...</span>
                    ) : (
                        <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            asChild={currentPage !== page}
                            className={`h-9 w-9 p-0 ${currentPage === page ? "bg-brand-primary hover:bg-brand-primary/90" : ""}`}
                        >
                            {currentPage !== page ? (
                                <Link href={createPageUrl(page as number)}>{page}</Link>
                            ) : (
                                <span>{page}</span>
                            )}
                        </Button>
                    )}
                </span>
            ))}

            {/* Next Button */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                asChild={currentPage < totalPages}
                className="h-9 w-9 p-0"
            >
                {currentPage < totalPages ? (
                    <Link href={createPageUrl(currentPage + 1)} aria-label="Next page">
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                ) : (
                    <span><ChevronRight className="h-4 w-4" /></span>
                )}
            </Button>
        </div>
    )
}
