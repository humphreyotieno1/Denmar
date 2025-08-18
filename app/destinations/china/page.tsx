import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "China Travel Packages | Denmar Tours & Travel",
  description:
    "Discover the ancient wonders and modern marvels of China with our expertly curated travel packages.",
  keywords: "China travel, China vacation, Great Wall, culture, history",
}

const chinaData = {
  name: "China",
  tagline: "Ancient Heritage Meets Modern Marvels",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "China is a land of contrasts, where ancient history meets cutting-edge modernity. From the majestic Great Wall to the bustling streets of Shanghai, China offers a rich tapestry of culture, cuisine, and landscapes.",
  highlights: [
    "Walking the Great Wall of China",
    "Exploring the Forbidden City in Beijing",
    "Cruising the Yangtze River",
    "Visiting the Terracotta Army in Xi’an",
    "Experiencing Shanghai’s skyline",
  ],
  packages: [
    {
      name: "China Explorer",
      duration: "12 days",
      price: "$3,999",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided historical tours",
        "River cruise",
      ],
    },
    {
      name: "Beijing & Shanghai",
      duration: "8 days",
      price: "$2,799",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided city tours",
        "High-speed train",
      ],
    },
    {
      name: "Silk Road Adventure",
      duration: "14 days",
      price: "$4,499",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided cultural tours",
        "Desert excursions",
      ],
    },
  ],
  bestTime: "March to May, September to November",
  currency: "Chinese Yuan (CNY)",
  language: "Mandarin, English",
  timeZone: "UTC+8",
}

export default function ChinaPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={chinaData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}