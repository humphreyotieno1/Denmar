"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Country } from "@/lib/destinations"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface CountryGridProps {
  countries: Country[]
  showViewAll?: boolean
  maxItems?: number
  title?: string
  subtitle?: string
  enablePagination?: boolean
  pageSize?: number
}

export function CountryGrid({ 
  countries, 
  showViewAll = false, 
  maxItems, 
  title = "Top Destinations",
  subtitle = "Discover amazing places around the world",
  enablePagination = false,
  pageSize = 8,
}: CountryGridProps) {
  const allCountries = maxItems ? countries.slice(0, maxItems) : countries

  // Client-side pagination
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [loadedImages, setLoadedImages] = React.useState<Set<string>>(new Set())

  // Read initial page from query string
  React.useEffect(() => {
    if (!enablePagination) return
    try {
      const qp = searchParams?.get("page")
      const parsed = qp ? parseInt(qp, 10) : 1
      if (!Number.isNaN(parsed) && parsed > 0) {
        setCurrentPage(parsed)
      }
    } catch (error) {
      // Handle case where searchParams might not be available during SSR
      console.warn("Could not read search params:", error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enablePagination])
  const totalPages = enablePagination ? Math.max(1, Math.ceil(allCountries.length / pageSize)) : 1
  const startIndex = enablePagination ? (currentPage - 1) * pageSize : 0
  const endIndex = enablePagination ? startIndex + pageSize : allCountries.length
  const displayCountries = enablePagination ? allCountries.slice(startIndex, endIndex) : allCountries

  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(clamped)
    // Persist to query string without full navigation
    if (enablePagination) {
      try {
        const params = new URLSearchParams(searchParams?.toString() || "")
        params.set("page", String(clamped))
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      } catch (error) {
        console.warn("Could not update search params:", error)
      }
    }
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayCountries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/destinations/${country.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    {/* Skeleton backdrop */}
                    <div className={`absolute inset-0 animate-pulse bg-gray-200 ${
                      loadedImages.has(country.id) ? "opacity-0" : "opacity-100"
                    }`} />
                    <Image
                      src={country.heroImage}
                      alt={country.name}
                      fill
                      className={`object-cover group-hover:scale-110 transition-transform duration-500 transition-opacity ${
                        loadedImages.has(country.id) ? "opacity-100" : "opacity-0"
                      }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      onLoadingComplete={() => {
                        setLoadedImages(prev => new Set(prev).add(country.id))
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {country.featured && (
                      <Badge className="absolute top-3 left-3 bg-brand-accent text-white border-0">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{country.region}</span>
                      </div>
                      <h3 className="text-lg font-bold line-clamp-1">{country.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3 min-h-[2.5rem]">
                      {country.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {country.popularDestinations} destinations
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="group-hover:bg-brand-accent group-hover:text-white transition-colors"
                      >
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center">
            <Link href="/destinations">
              <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white">
                View All Destinations
              </Button>
            </Link>
          </div>
        )}

        {/* Pagination Controls */}
        {enablePagination && totalPages > 0 && (
          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <div className="text-sm text-gray-600">
              Showing {allCountries.length === 0 ? 0 : startIndex + 1}
              –{Math.min(endIndex, allCountries.length)} of {allCountries.length}
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
                      page === currentPage
                        ? "bg-brand-accent text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                    aria-label={`Go to page ${page}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
