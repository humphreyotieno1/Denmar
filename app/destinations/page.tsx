import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationsBanner } from "@/components/destinations-banner"
import { CountryGrid } from "@/components/country-grid"
import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kenya Destinations - Masai Mara, Amboseli, Diani Beach Tours | Denmar",
  description: "Explore amazing Kenya destinations with Denmar Tours & Travel - Masai Mara safaris, Amboseli tours, Diani beach holidays, Mount Kenya climbing, Lake Nakuru safaris. Book your Kenya travel package today.",
  keywords: "Kenya destinations, Masai Mara safari packages, Amboseli National Park tours, Diani beach holidays, Mount Kenya climbing, Kenya travel packages, Kenya safari agency, Tsavo National Park tours, Lamu island holidays",
  openGraph: {
    title: "Travel Destinations - Explore Amazing Places Worldwide",
    description: "Discover incredible travel destinations worldwide with Denmar Tours & Travel. Find your perfect destination today.",
    images: ["/tablogo.png"],
  },
}

import { prisma } from "@/lib/db"

export default async function DestinationsPage() {
  const modelCountry: any = prisma.country
  const modelSettings: any = prisma.siteSettings

  const [countriesData, settings, allCountriesForNav] = await Promise.all([
    modelCountry.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    modelSettings.findUnique({
      where: { id: "settings" },
    }),
    modelCountry.findMany({
      where: { isActive: true },
      include: { destinations: { where: { isActive: true } } },
      orderBy: { order: "asc" },
    })
  ])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner settings={settings} />
      <Navbar settings={settings} countries={allCountriesForNav as any} />

      <main>
        <DestinationsBanner />
        <Suspense fallback={
          <div className="py-16 px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading destinations...</p>
          </div>
        }>
          <CountryGrid
            countries={countriesData as any}
            showViewAll={false}
            enablePagination
            pageSize={12}
            title="All Destinations"
            subtitle="Explore our complete collection of destinations across the world"
          />
        </Suspense>
      </main>

      <Footer settings={settings} />
      <FloatingActions />
    </div>
  )
}
