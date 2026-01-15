"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import {
    Search,
    Command,
    Package,
    MapPin,
    Tag,
    Wrench,
    Loader2,
    X,
} from "lucide-react"

interface SearchResult {
    id: string
    type: "package" | "destination" | "deal" | "service"
    title: string
    subtitle: string
    href: string
}

const typeIcons = {
    package: Package,
    destination: MapPin,
    deal: Tag,
    service: Wrench,
}

const typeLabels = {
    package: "Package",
    destination: "Destination",
    deal: "Deal",
    service: "Service",
}

export function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    // Keyboard shortcut to open (Cmd+K or Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setIsOpen(true)
            }
            if (e.key === "Escape") {
                setIsOpen(false)
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
        } else {
            setQuery("")
            setResults([])
            setSelectedIndex(0)
        }
    }, [isOpen])

    // Search with debounce
    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([])
            return
        }

        const timeoutId = setTimeout(async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`/api/denmar-portal/search?q=${encodeURIComponent(query)}`)
                if (response.ok) {
                    const data = await response.json()
                    setResults(data.results || [])
                    setSelectedIndex(0)
                }
            } catch (error) {
                console.error("Search error:", error)
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query])

    const handleSelect = useCallback((result: SearchResult) => {
        setIsOpen(false)
        router.push(result.href)
    }, [router])

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setSelectedIndex((i) => Math.max(i - 1, 0))
        } else if (e.key === "Enter" && results[selectedIndex]) {
            handleSelect(results[selectedIndex])
        }
    }

    const searchModal = isOpen && typeof document !== "undefined" ? createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-[9999]"
                onClick={() => setIsOpen(false)}
            />

            {/* Command Palette */}
            <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-[9999] mx-4 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center px-4 border-b border-slate-200">
                    <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search packages, destinations, deals..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 px-3 py-4 text-sm outline-none placeholder:text-slate-400 bg-transparent"
                    />
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 text-slate-400 animate-spin flex-shrink-0" />
                    ) : query ? (
                        <button onClick={() => setQuery("")} className="p-1 hover:bg-slate-100 rounded flex-shrink-0">
                            <X className="h-4 w-4 text-slate-400" />
                        </button>
                    ) : null}
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto">
                    {results.length === 0 && query.length >= 2 && !isLoading ? (
                        <div className="px-4 py-8 text-center text-sm text-slate-500">
                            No results found for &quot;{query}&quot;
                        </div>
                    ) : results.length > 0 ? (
                        <ul className="py-2">
                            {results.map((result, index) => {
                                const Icon = typeIcons[result.type]
                                return (
                                    <li key={result.id}>
                                        <button
                                            onClick={() => handleSelect(result)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${index === selectedIndex ? "bg-slate-100" : "hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
                                                <Icon className="h-4 w-4 text-slate-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">
                                                    {result.title}
                                                </p>
                                                <p className="text-xs text-slate-500 truncate">
                                                    {typeLabels[result.type]} • {result.subtitle}
                                                </p>
                                            </div>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : query.length < 2 ? (
                        <div className="px-4 py-8 text-center text-sm text-slate-500">
                            Type at least 2 characters to search
                        </div>
                    ) : null}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                        <span>↑↓ Navigate</span>
                        <span>↵ Select</span>
                    </div>
                    <span>ESC to close</span>
                </div>
            </div>
        </>,
        document.body
    ) : null

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
                <Search className="h-4 w-4" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white rounded text-xs font-medium text-slate-400 border border-slate-200">
                    <Command className="h-3 w-3" />K
                </kbd>
            </button>
            {searchModal}
        </>
    )
}
