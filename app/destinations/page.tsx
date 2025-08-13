import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationsBanner } from "@/components/destinations-banner"
import { DestinationsGrid } from "@/components/destinations-grid"

export default function DestinationsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationsBanner />
        <DestinationsGrid />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
