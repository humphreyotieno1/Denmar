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

import { prisma } from "@/lib/db"
import { Service } from "@/lib/services"

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const [servicesData, settings] = await Promise.all([
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.siteSettings.findUnique({
      where: { id: "settings" },
    }),
  ])

  // Map to Service interface
  const services: Service[] = servicesData.map(s => ({
    ...s,
    features: s.features as unknown as string[],
    category: s.category as any,
    image: s.image || undefined,
    price: s.price || undefined,
    duration: s.duration || undefined,
  }))

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner settings={settings} />
      <Navbar settings={settings} />

      <main>
        <ServicesBanner />
        <ServicesGrid services={services} />
      </main>

      <Footer settings={settings} />
      <FloatingActions />
    </div>
  )
}
