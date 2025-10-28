import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DealsHero } from "@/components/deals-hero"
import { DealsGrid } from "@/components/deals-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Special Travel Deals & Offers - Book Now",
  description: "Discover exclusive travel deals and special offers from Denmar Tours & Travel. Save on Kenya safaris, beach holidays, city breaks, and more. Book your dream vacation today!",
  keywords: "travel deals, Kenya travel offers, safari deals, beach holiday offers, travel discounts, special offers, cheap travel packages, last minute deals",
  openGraph: {
    title: "Special Travel Deals & Offers - Book Now",
    description: "Discover exclusive travel deals and special offers from Denmar Tours & Travel. Book your dream vacation today!",
    images: ["/tablogo.png"],
  },
}

export default function DealsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DealsHero />
        <DealsGrid />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
