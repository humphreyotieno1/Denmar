import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DealsHero } from "@/components/deals-hero"
import { DealsGrid } from "@/components/deals-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Kenya Travel Deals & Safari Package Offers | Denmar Travel",
  description: "Exclusive Kenya travel deals and Masai Mara safari offers from Kenya's best travel agency. Save on Kenya tour packages, affordable Kenya safaris, beach holidays, and luxury Kenya tours. Book your Kenya holiday today with special discounts!",
  keywords: "Kenya travel deals, Kenya safari offers, affordable Kenya tours, Masai Mara deals, Kenya tour discounts, best Kenya travel packages, Kenya holiday deals, cheap Kenya safaris, Kenya travel specials",
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
