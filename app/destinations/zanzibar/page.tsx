import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zanzibar Travel Packages | Denmar Tours & Travel",
  description:
    "Experience the vibrant culture of Zanzibar with our travel packages. From the stunning beaches to the historic city center, we'll take you on an unforgettable adventure.",
  keywords: "Zanzibar travel, Zanzibar vacation, beaches, spice island, Zanzibar packages",
}

const zanzibarData = {
  name: "Zanzibar",
  tagline: "Spice Island",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Zanzibar is a tropical paradise, with its stunning beaches, vibrant culture, and rich history. From the crystal-clear waters of Stone Town to the bustling marketplaces of the city center, we'll take you on an unforgettable journey.",
  highlights: [
    "Beaches - from powdery white to golden pebble",
    "Historic city center - with its colorful spice markets and ancient ruins",
    "Snorkeling - explore the coral reefs and marine life",
    "Spice island cuisine - with its unique flavors and aromas",
    "Dhow cruises - explore the island's coastline by traditional sailing vessel",
  ],
  packages: [
    {
      name: "Zanzibar Beach Getaway",
      duration: "7 days",
      price: "$1,999",
      includes: ["4-star hotel", "Airport transfers", "Daily breakfast", "Beach activities", "Snorkeling tour"],
    },
    {
      name: "Zanzibar Cultural Experience",
      duration: "10 days",
      price: "$2,999",
      includes: ["Luxury hotel", "Private city tour", "Fine dining experiences", "Spice island cooking class", "Dhow cruise"],
    },
    {
      name: "Zanzibar Wildlife Safari",
      duration: "14 days",
      price: "$4,999",
      includes: ["Premium hotel", "Safari game drives", "National park tour", "Cultural performances", "Dhow cruise"],
    },
  ],
  bestTime: "April to September",
  currency: "Zanzibar Rupees (TZS)",
  language: "Swahili, English, Arabic",
  timeZone: "UTC+3",
}

export default function ZanzibarPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={zanzibarData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
