import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dubai, UAE Travel Packages | Denmar Tours & Travel",
  description:
    "Discover luxury and innovation in Dubai. World-class shopping, dining, entertainment, and modern architecture in the UAE.",
  keywords: "Dubai travel, UAE vacation, Burj Khalifa, luxury shopping, desert safari, Dubai packages",
}

const dubaiData = {
  name: "Dubai, UAE",
  tagline: "City of Gold and Innovation",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Dubai represents the pinnacle of modern luxury and innovation, where futuristic skyscrapers meet traditional Arabian culture. This cosmopolitan city offers world-class shopping, dining, entertainment, and architectural marvels that defy imagination.",
  highlights: [
    "Iconic Burj Khalifa - world's tallest building",
    "Luxury shopping at Dubai Mall",
    "Thrilling desert safari adventures",
    "World-class dining and nightlife",
    "Beautiful beaches and resorts",
    "Traditional souks and cultural sites",
  ],
  packages: [
    {
      name: "Dubai Highlights",
      duration: "4 days",
      price: "$1,099",
      includes: ["5-star hotel", "Burj Khalifa tickets", "Desert safari", "Dubai Mall tour", "Airport transfers"],
    },
    {
      name: "Luxury Dubai Experience",
      duration: "6 days",
      price: "$1,899",
      includes: ["Luxury resort", "Private city tour", "Fine dining experiences", "Spa treatments", "Yacht cruise"],
    },
    {
      name: "Ultimate Dubai Adventure",
      duration: "8 days",
      price: "$2,699",
      includes: [
        "Premium accommodations",
        "Helicopter tour",
        "Private shopping guide",
        "Exclusive experiences",
        "Abu Dhabi day trip",
      ],
    },
  ],
  bestTime: "November to March (cooler weather)",
  currency: "UAE Dirham (AED)",
  language: "Arabic, English",
  timeZone: "UTC+4",
}

export default function DubaiPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={dubaiData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
