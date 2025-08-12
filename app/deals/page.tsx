import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DealsHero } from "@/components/deals-hero"
import { DealsGrid } from "@/components/deals-grid"

export default function DealsPage() {
  return (
    <div className="min-h-screen">
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
