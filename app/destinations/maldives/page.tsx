import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Maldives Travel Packages | Denmar Tours & Travel",
  description:
    "Escape to the tropical paradise of the Maldives with our luxury travel packages.",
  keywords: "Maldives travel, Maldives vacation, beaches, luxury, overwater villas",
}

const maldivesData = {
  name: "Maldives",
  tagline: "Ultimate Tropical Luxury",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "The Maldives is a dreamy destination with overwater villas, crystal-clear waters, and vibrant marine life. Perfect for honeymoons and relaxation, this island paradise offers unparalleled luxury and natural beauty.",
  highlights: [
    "Staying in overwater villas",
    "Snorkeling and diving in coral reefs",
    "Relaxing on private island beaches",
    "Enjoying sunset cruises",
    "Spa treatments in luxury resorts",
  ],
  packages: [
    {
      name: "Maldives Luxury Escape",
      duration: "7 days",
      price: "$4,999",
      includes: [
        "5-star resorts",
        "Airport transfers",
        "Daily breakfast",
        "Snorkeling excursions",
        "Spa treatments",
      ],
    },
    {
      name: "Maldives Honeymoon",
      duration: "10 days",
      price: "$6,499",
      includes: [
        "5-star overwater villas",
        "Airport transfers",
        "Daily breakfast",
        "Romantic dinners",
        "Private boat tours",
      ],
    },
    {
      name: "Maldives Adventure",
      duration: "8 days",
      price: "$4,799",
      includes: [
        "4-star resorts",
        "Airport transfers",
        "Daily breakfast",
        "Diving sessions",
        "Island-hopping tours",
      ],
    },
  ],
  bestTime: "November to April",
  currency: "Maldivian Rufiyaa (MVR)",
  language: "Dhivehi, English",
  timeZone: "UTC+5",
}

export default function MaldivesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={maldivesData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}