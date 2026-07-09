"use client"

import { TopBanner, Navbar, Footer, FloatingActions, Breadcrumbs } from "@/components/layout"
import { useState, useMemo } from "react"
import { Package } from "@/lib/services"
import { PackagesHero } from "@/components/sections/listing/packages-hero"
import { PackagesListing } from "@/components/sections/listing/packages-listing"

interface PackagesContentProps {
    packages: Package[]
    settings: any
    navCountries?: any[]
    heroImage: string
}

export function PackagesContent({ packages, settings, navCountries, heroImage }: PackagesContentProps) {
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
        // { label: "Home", href: "/" },
        { label: "Packages", href: "/packages" }
    ]

    return (
        <div className="min-h-screen overflow-x-hidden">
            <TopBanner settings={settings} />
            <Navbar settings={settings} countries={navCountries} />

            <main className="pt-16">
                {/* Breadcrumbs */}
                <div className="bg-gray-50 py-4">
                    <div className="max-w-6xl mx-auto px-4">
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>
                </div>

                <PackagesHero heroImage={heroImage} />
                <PackagesListing
                    countries={countries}
                    categories={categories}
                    filteredPackagesCount={filteredPackages.length}
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    currentPackages={currentPackages}
                    onClearFilters={() => {
                        setSearchQuery("")
                        setSelectedCountry("all")
                        setSelectedCategory("all")
                    }}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </main>

            <Footer settings={settings} />
            <FloatingActions />
        </div>
    )
}
