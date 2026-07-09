"use client"

import { motion } from "framer-motion"
import { PackageCard } from "@/components/cards"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "@/components/ui/huge-icons"
import { Package } from "@/lib/services"

interface PackagesListingProps {
  countries: string[]
  categories: string[]
  filteredPackagesCount: number
  selectedCountry: string
  onCountryChange: (value: string) => void
  selectedCategory: string
  onCategoryChange: (value: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  currentPackages: Package[]
  onClearFilters: () => void
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function PackagesListing({
  countries,
  categories,
  filteredPackagesCount,
  selectedCountry,
  onCountryChange,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  currentPackages,
  onClearFilters,
  totalPages,
  currentPage,
  onPageChange,
}: PackagesListingProps) {
  return (
    <section className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200/80"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCountry} onValueChange={onCountryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country.charAt(0).toUpperCase() + country.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">
                {filteredPackagesCount} packages found
              </Badge>
            </div>
          </div>
        </motion.div>

        {currentPackages.length > 0 ? (
          <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200/80 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {currentPackages.map((pkg, index) => (
                <div key={pkg.id} className="border-b border-r border-gray-200/80 p-4">
                  <PackageCard pkg={pkg} index={index} />
                </div>
              ))}
            </div>
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
            <Button onClick={onClearFilters} variant="outline">
              Clear Filters
            </Button>
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center items-center space-x-2"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className={currentPage === page ? "bg-brand-accent text-white" : ""}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
