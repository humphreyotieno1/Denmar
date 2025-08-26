import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationsBanner } from "@/components/destinations-banner"
import { CountryGrid } from "@/components/country-grid"
import { countries } from "@/lib/destinations"
import { Suspense } from "react"

export default function DestinationsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationsBanner />
        <Suspense fallback={
          <div className="py-16 px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading destinations...</p>
          </div>
        }>
          <CountryGrid 
            countries={countries}
            showViewAll={false}
            enablePagination
            pageSize={12}
            title="All Destinations"
            subtitle="Explore our complete collection of destinations across the world"
          />
        </Suspense>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
