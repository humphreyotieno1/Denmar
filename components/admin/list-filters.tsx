"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"
import { ArrowUpDown, Filter } from "lucide-react"

export type SortOption = {
    value: string
    label: string
}

export type FilterOption = {
    value: string
    label: string
}

interface ListFiltersProps {
    sortOptions: SortOption[]
    filterOptions?: FilterOption[]
    filterLabel?: string
    defaultSort?: string
}

export function ListFilters({
    sortOptions,
    filterOptions,
    filterLabel = "Status",
    defaultSort
}: ListFiltersProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentSort = searchParams.get("sort") || defaultSort || sortOptions[0]?.value
    const currentFilter = searchParams.get("filter") || "all"

    const updateParams = useCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === "all" || value === defaultSort) {
            params.delete(key)
        } else {
            params.set(key, value)
        }
        // Reset to page 1 when filters change
        params.delete("page")
        router.push(`${pathname}?${params.toString()}`)
    }, [router, pathname, searchParams, defaultSort])

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-slate-400" />
                <select
                    value={currentSort}
                    onChange={(e) => updateParams("sort", e.target.value)}
                    className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filter Dropdown (optional) */}
            {filterOptions && filterOptions.length > 0 && (
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <select
                        value={currentFilter}
                        onChange={(e) => updateParams("filter", e.target.value)}
                        className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    >
                        <option value="all">All {filterLabel}</option>
                        {filterOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}
