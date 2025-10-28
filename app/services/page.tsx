import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { ServicesBanner } from "@/components/services-banner"
import { ServicesGrid } from "@/components/services-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Travel Services - Flight Booking, Hotels, Tours & More",
  description: "Comprehensive travel services from Denmar Tours & Travel. We offer flight booking, hotel reservations, car rental, travel insurance, visa assistance, and customized tour packages. Your one-stop travel solution.",
  keywords: "travel services, flight booking, hotel reservations, car rental, travel insurance, visa assistance, tour packages, travel agent services",
  openGraph: {
    title: "Travel Services - Flight Booking, Hotels, Tours & More",
    description: "Comprehensive travel services from Denmar Tours & Travel. Your one-stop travel solution.",
    images: ["/tablogo.png"],
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <ServicesBanner />
        <ServicesGrid />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
