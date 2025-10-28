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
import { DealsPopup } from "@/components/deals-popup"
import { ChristmasPackages } from "@/components/xmass-packages"

export const metadata: Metadata = {
  title: "Best Travel Agency in Kenya - Kenya Safari Tour Operator | Denmar Travel",
  description:
    "Kenya's premier travel agency offering affordable Kenya tour packages, luxury Kenya safaris, Masai Mara tours, and customized Kenya holidays. Best tour company in Kenya with 500+ satisfied clients. Book your Kenya travel package today!",
  keywords: "travel agency in Kenya, tour company in Kenya, Kenya safari tour operator, Kenya tour packages, Kenya holidays, best tour companies in Kenya, Kenya travel agency Nairobi, Kenya safari agency, luxury safari Kenya, Masai Mara safari packages, affordable Kenya tours",
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
      "Discover affordable, tailor-made travel packages with Denmar Tours & Travel—covering Kenya safaris, global adventures, and more. Book your dream trip today with 24/7 support!",
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

      <main className="pt-2">
        <HeroSection />
        <WhyUsSection />
        <TopDestinationsSection />
        <PackagesSection />
        <ChristmasPackages />
        <ReadyToPlanSection />
      </main>

      <Footer />
      <FloatingActions />
      <DealsPopup />
    </div>
  )
}
