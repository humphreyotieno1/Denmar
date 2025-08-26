import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WhyUsSection } from "@/components/why-us-section"
import { TopDestinationsSection } from "@/components/top-destinations-section"
import { PackagesSection } from "@/components/packages-section"
import { ReadyToPlanSection } from "@/components/ready-to-plan-section"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Denmar Tours & Travel - Your Dream Trip Awaits",
  description:
    "Plan your dream vacation with Denmar Tours & Travel. Discover amazing destinations, affordable packages, and exceptional service for unforgettable travel experiences.",
  keywords: "travel agency, vacation packages, tours, flights, hotels, travel deals, destinations, travel planning",
  authors: [{ name: "Denmar Tours & Travel" }],
  creator: "Denmar Tours & Travel",
  publisher: "Denmar Tours & Travel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Denmar Tours & Travel - Your Dream Trip Awaits",
    description:
      "Plan your dream vacation with Denmar Tours & Travel. Discover amazing destinations, affordable packages, and exceptional service.",
    images: ["/tablogo.png"],
  },
  icons: {
    icon: [
      {
        url: "/tablogo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/tablogo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <HeroSection />
        <WhyUsSection />
        <TopDestinationsSection />
        <PackagesSection />
        <ReadyToPlanSection />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
