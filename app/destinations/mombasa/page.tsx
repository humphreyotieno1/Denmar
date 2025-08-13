import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mombasa, Kenya Travel Packages | Denmar Tours & Travel",
  description:
    "Relax on the beautiful beaches of Mombasa. Explore the historic Old Town, snorkel or dive in the crystal-clear waters of the Indian Ocean.",
  keywords: "Mombasa travel, Kenya vacation, Indian Ocean beaches, snorkeling, diving, Mombasa packages",
}

const mombasaData = {
  name: "Mombasa, Kenya",
  tagline: "Coastal Paradise",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Mombasa is a tropical coastal city in Kenya, known for its pristine beaches, coral reefs, and historic Old Town. Visitors can relax on the beach, snorkel or dive in the Indian Ocean, and explore the rich cultural heritage of the city.",
  highlights: [
    "Beautiful beaches with crystal-clear waters",
    "Historic Old Town with Arabic architecture",
    "Coral reefs and marine life",
    "Snorkeling and diving opportunities",
    "Fort Jesus, a UNESCO World Heritage Site",
  ],
  packages: [
    {
      name: "Mombasa Getaway",
      duration: "4 days",
      price: "$1,099",
      includes: ["Beachfront hotel", "Airport transfers", "Daily breakfast", "Snorkeling excursion"],
    },
    {
      name: "Coastal Adventure",
      duration: "7 days",
      price: "$1,999",
      includes: [
        "Luxury beach resort",
        "Private diving lessons",
        "Boat cruise",
        "Local cuisine cooking class",
        "Old Town tour",
      ],
    },
    {
      name: "Mombasa & Tsavo",
      duration: "10 days",
      price: "$2,999",
      includes: [
        "Premium accommodations",
        "Safari game drives",
        "National park tour",
        "Cultural performances",
        "Spice farm visit",
      ],
    },
  ],
  bestTime: "December to March (peak: January to February)",
  currency: "Kenyan Shilling (KES)",
  language: "English, Swahili",
  timeZone: "UTC+3",
}

export default function MombasaPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={mombasaData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
