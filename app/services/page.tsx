import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { ServicesBanner } from "@/components/services-banner"
import { ServicesGrid } from "@/components/services-grid"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
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
