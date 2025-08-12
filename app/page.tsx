import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WhyUsSection } from "@/components/why-us-section"
import { TopDestinationsSection } from "@/components/top-destinations-section"
import { ReadyToPlanSection } from "@/components/ready-to-plan-section"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Plan your dream vacation with Denmar Tours & Travel. Discover amazing destinations, affordable packages, and exceptional service for unforgettable travel experiences.",
  openGraph: {
    title: "Denmar Tours & Travel - Your Dream Trip Awaits",
    description:
      "Plan your dream vacation with Denmar Tours & Travel. Discover amazing destinations, affordable packages, and exceptional service.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navbar />

      <main>
        <HeroSection />
        <WhyUsSection />
        <TopDestinationsSection />
        <ReadyToPlanSection />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
