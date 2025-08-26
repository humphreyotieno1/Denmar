"use client"

import { notFound } from "next/navigation"
import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FiltersBar } from "@/components/filters-bar"
import { DestinationCard } from "@/components/destination-card"
import { getCountryBySlug, getDestinationsByCountry } from "@/lib/destinations"
import { Pagination } from "@/components/pagination"
import { useState, useEffect, use } from "react"
import type { Metadata } from "next"

interface CountryPageProps {
  params: Promise<{ country: string }>
}





export default function CountryPage({ params }: CountryPageProps) {
  const [filteredDestinations, setFilteredDestinations] = useState<any[]>([])
  const [country, setCountry] = useState<any>(null)
  const [destinations, setDestinations] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const countrySlug = unwrappedParams.country

  useEffect(() => {
    const countryData = getCountryBySlug(countrySlug)
    if (!countryData) {
      notFound()
    }
    setCountry(countryData)
    
    const destinationsData = getDestinationsByCountry(countrySlug)
    setDestinations(destinationsData)
    setFilteredDestinations(destinationsData)
  }, [countrySlug])

  if (!country || !destinations.length) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <TopBanner />
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading destination information...</p>
          </div>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-96">
          <div className="absolute inset-0">
            <img
              src={country.heroImage}
              alt={country.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white">
              <h1 className="font-heading text-5xl font-bold mb-4">{country.name}</h1>
              <p className="text-xl max-w-2xl mx-auto px-4">{country.summary}</p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs 
            items={[
              { label: "Destinations", href: "/destinations" },
              { label: country.name }
            ]} 
          />
        </div>

        {/* Country Info */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">About {country.name}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {country.description}
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-brand-accent">{country.popularDestinations}</div>
                    <div className="text-sm text-gray-600">Destinations</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-brand-accent">{country.region}</div>
                    <div className="text-sm text-gray-600">Region</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-brand-accent">
                      {destinations.filter(d => d.featured).length}
                    </div>
                    <div className="text-sm text-gray-600">Featured</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-brand-accent">
                      {Math.round(destinations.reduce((acc, d) => acc + d.rating, 0) / destinations.length * 10) / 10}
                    </div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                  <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Region:</span>
                      <span className="ml-2 text-gray-600">{country.region}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Destinations:</span>
                      <span className="ml-2 text-gray-600">{country.popularDestinations}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Featured:</span>
                      <span className="ml-2 text-gray-600">
                        {country.featured ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
                Destinations in {country.name}
              </h2>
              <p className="text-xl text-gray-600">
                Discover amazing places and experiences in {country.name}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <FiltersBar 
                  destinations={destinations}
                  onFilterChange={setFilteredDestinations}
                />
              </div>

              {/* Destinations Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredDestinations
                    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    .map((destination, index) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                      countrySlug={countrySlug}
                      index={index}
                    />
                  ))}
                </div>

                {filteredDestinations.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No destinations found.</p>
                  </div>
                )}

                {/* Pagination */}
                {filteredDestinations.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination 
                      totalItems={filteredDestinations.length}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={(page) => {
                        setCurrentPage(page)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
