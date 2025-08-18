import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "South Africa Travel Packages | Denmar Tours & Travel",
  description:
    "Experience the diverse landscapes, wildlife, and vibrant culture of South Africa with our expertly crafted travel packages.",
  keywords: "South Africa travel, South Africa safari, Cape Town, wildlife, culture",
}

const southAfricaData = {
  name: "South Africa",
  tagline: "A World in One Country",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "South Africa is a land of breathtaking diversity, from the iconic Table Mountain to the vast Kruger National Park. Discover vibrant cities, world-class winelands, and incredible wildlife safaris in this captivating destination.",
  highlights: [
    "Big Five safaris in Kruger National Park",
    "Exploring Cape Town and Table Mountain",
    "Wine tasting in Stellenbosch and Franschhoek",
    "Visiting the historic Robben Island",
    "Scenic drives along the Garden Route",
  ],
  packages: [
    {
      name: "South Africa Safari & City",
      duration: "12 days",
      price: "$4,199",
      includes: [
        "4-star lodges and hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided safari tours",
        "City and cultural tours",
      ],
    },
    {
      name: "Cape Town & Winelands",
      duration: "8 days",
      price: "$2,799",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided city tours",
        "Wine tasting experiences",
      ],
    },
    {
      name: "Garden Route Adventure",
      duration: "10 days",
      price: "$3,499",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided scenic drives",
        "Outdoor activities",
      ],
    },
  ],
  bestTime: "May to September",
  currency: "South African Rand (ZAR)",
  language: "English, Afrikaans, Zulu",
  timeZone: "UTC+2",
}

export default function SouthAfricaPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={southAfricaData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
