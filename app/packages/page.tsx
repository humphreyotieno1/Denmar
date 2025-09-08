"use client"

import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PackageCard } from "@/components/package-card"
import { packages } from "@/lib/services"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, SortAsc, SortDesc } from "lucide-react"

export default function PackagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(packages.map(pkg => pkg.category))]
    return uniqueCategories
  }, [])

  // Filter and sort packages
  const filteredPackages = useMemo(() => {
    let filtered = packages

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(pkg => 
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(pkg => pkg.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case "featured":
        filtered = filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case "price-low":
        filtered = filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''))
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''))
          return priceA - priceB
        })
        break
      case "price-high":
        filtered = filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, ''))
          const priceB = parseInt(b.price.replace(/[^0-9]/g, ''))
          return priceB - priceA
        })
        break
      case "duration":
        filtered = filtered.sort((a, b) => {
          const durationA = parseInt(a.duration.split(' ')[0])
          const durationB = parseInt(b.duration.split(' ')[0])
          return durationA - durationB
        })
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredPackages.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const currentPackages = filteredPackages.slice(startIndex, startIndex + pageSize)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" }
  ]

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main className="pt-16">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="font-heading text-4xl font-bold text-brand-primary mb-4">
                Travel Packages
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our carefully curated travel packages designed to create unforgettable experiences. 
                From luxury getaways to adventure escapes, find the perfect package for your next journey.
              </p>
            </motion.div>

            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search packages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>

                {/* Results Count */}
                <div className="flex items-center justify-center">
                  <Badge variant="secondary" className="text-sm">
                    {filteredPackages.length} packages found
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Packages Grid */}
            {currentPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentPackages.map((pkg, index) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No packages found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
                <Button 
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSortBy("featured")
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-center items-center space-x-2"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-brand-accent text-white" : ""}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
