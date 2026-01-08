"use client"

import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PackageCard } from "@/components/package-card"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Package } from "@/lib/services"

interface PackagesContentProps {
    packages: Package[]
    settings: any
}

export function PackagesContent({ packages, settings }: PackagesContentProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("all")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 9

    // Get unique countries
    const countries = useMemo(() => {
        const uniqueCountries = [...new Set(packages.map(pkg => pkg.country))]
        return uniqueCountries
    }, [packages])

    // Get unique categories
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(packages.map(pkg => pkg.category))]
        return uniqueCategories
    }, [packages])

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

        // Country filter
        if (selectedCountry !== "all") {
            filtered = filtered.filter(pkg => pkg.country === selectedCountry)
        }

        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(pkg => pkg.category === selectedCategory)
        }

        return filtered
    }, [searchQuery, selectedCountry, selectedCategory, packages])

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
            <TopBanner settings={settings} />
            <Navbar settings={settings} />

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

                                {/* Country Filter */}
                                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Countries" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Countries</SelectItem>
                                        {countries.map(country => (
                                            <SelectItem key={country} value={country}>
                                                {country.charAt(0).toUpperCase() + country.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

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
                                        setSelectedCountry("all")
                                        setSelectedCategory("all")
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

            <Footer settings={settings} />
            <FloatingActions />
        </div>
    )
}
