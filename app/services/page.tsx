import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { ServicesBanner } from "@/components/services-banner"
import { ServicesGrid } from "@/components/services-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kenya Travel Services - Flight Booking, Safari Tours, Hotels | Denmar",
  description: "Complete Kenya travel services from Denmar Tours & Travel. Kenya safari tours, Masai Mara packages, flight booking, hotel reservations, Kenya travel insurance, visa assistance, and customized Kenya tour packages. Kenya's one-stop travel solution.",
  keywords: "Kenya travel services, Kenya safari tours, Masai Mara packages, Kenya flight booking, Kenya hotel reservations, Kenya travel insurance, Kenya visa assistance, Kenya tour packages, affordable Kenya tours, Kenya travel agent",
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
