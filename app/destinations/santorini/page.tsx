import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Santorini, Greece Travel Packages | Denmar Tours & Travel",
  description:
    "Experience breathtaking sunsets and white-washed buildings in Santorini. Romantic Greek island getaway with crystal-clear waters.",
  keywords: "Santorini travel, Greece vacation, Greek islands, sunsets, romantic getaway, Santorini packages",
}

const santoriniData = {
  name: "Santorini, Greece",
  tagline: "Island of Endless Sunsets",
  heroImage: "/placeholder.svg?height=600&width=1200",
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  description:
    "Santorini captivates visitors with its dramatic volcanic landscape, iconic white-washed buildings, and world-famous sunsets. This romantic Greek island offers a perfect blend of natural beauty, ancient history, and Mediterranean charm.",
  highlights: [
    "World-famous sunset views from Oia",
    "Iconic white and blue architecture",
    "Unique volcanic beaches",
    "Excellent local wines and cuisine",
    "Ancient Akrotiri archaeological site",
    "Romantic cliffside villages",
  ],
  packages: [
    {
      name: "Santorini Romance",
      duration: "4 days",
      price: "$1,199",
      includes: ["Cliffside hotel", "Sunset tour", "Wine tasting", "Caldera cruise", "Airport transfers"],
    },
    {
      name: "Greek Island Escape",
      duration: "7 days",
      price: "$1,899",
      includes: ["Luxury cave hotel", "Private tours", "Cooking classes", "Volcano excursion", "Spa treatments"],
    },
    {
      name: "Santorini & Mykonos",
      duration: "10 days",
      price: "$2,799",
      includes: [
        "Premium accommodations",
        "Island hopping",
        "Private yacht charter",
        "Fine dining",
        "Cultural experiences",
      ],
    },
  ],
  bestTime: "April to October (peak: June to September)",
  currency: "Euro (EUR)",
  language: "Greek",
  timeZone: "UTC+2",
}

export default function SantoriniPage() {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={santoriniData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
