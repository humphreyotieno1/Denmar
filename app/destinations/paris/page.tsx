import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Paris, France Travel Packages | Denmar Tours & Travel",
  description:
    "Discover the City of Love with our Paris travel packages. Iconic landmarks, world-class cuisine, and rich history await you.",
  keywords: "Paris travel, France vacation, Eiffel Tower, Louvre Museum, Paris packages",
}

const parisData = {
  name: "Paris, France",
  tagline: "The City of Love",
  heroImage: "/placeholder.svg?height=600&width=1200",
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  description:
    "Paris, the City of Light, captivates visitors with its timeless elegance, world-renowned landmarks, and unparalleled cultural richness. From the iconic Eiffel Tower to the artistic treasures of the Louvre, every corner of Paris tells a story of romance, art, and joie de vivre.",
  highlights: [
    "Iconic Eiffel Tower and panoramic city views",
    "World's largest art museum - The Louvre",
    "Romantic Seine River cruises",
    "Charming Montmartre and Sacré-Cœur",
    "Exquisite French cuisine and wine",
    "Historic Notre-Dame Cathedral",
  ],
  packages: [
    {
      name: "Paris Classic Experience",
      duration: "5 days",
      price: "$1,299",
      includes: ["4-star central hotel", "Airport transfers", "Daily breakfast", "Eiffel Tower tour", "Seine cruise"],
    },
    {
      name: "Romantic Paris Getaway",
      duration: "7 days",
      price: "$1,899",
      includes: [
        "Luxury boutique hotel",
        "Private city tour",
        "Fine dining experiences",
        "Versailles day trip",
        "Champagne tasting",
      ],
    },
    {
      name: "Paris Art & Culture",
      duration: "10 days",
      price: "$2,699",
      includes: ["Premium hotels", "Museum passes", "Art gallery tours", "Cooking classes", "Loire Valley excursion"],
    },
  ],
  bestTime: "April to June, September to October",
  currency: "Euro (EUR)",
  language: "French",
  timeZone: "UTC+1",
}

export default function ParisPage() {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={parisData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
