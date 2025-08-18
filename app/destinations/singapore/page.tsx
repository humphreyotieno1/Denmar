import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Singapore Travel Packages | Denmar Tours & Travel",
  description:
    "Experience the modern marvels and cultural diversity of Singapore with our curated travel packages.",
  keywords: "Singapore travel, Singapore vacation, city, gardens, culture",
}

const singaporeData = {
  name: "Singapore",
  tagline: "A City of Innovation and Beauty",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Singapore is a vibrant city-state blending futuristic architecture with lush gardens and rich cultural heritage. From the iconic Marina Bay Sands to the serene Gardens by the Bay, Singapore offers a perfect mix of innovation and tradition.",
  highlights: [
    "Exploring Marina Bay Sands and SkyPark",
    "Strolling through Gardens by the Bay",
    "Visiting Sentosa Island",
    "Shopping on Orchard Road",
    "Enjoying hawker center cuisine",
  ],
  packages: [
    {
      name: "Singapore City Explorer",
      duration: "5 days",
      price: "$2,299",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided city tours",
        "Gardens by the Bay entry",
      ],
    },
    {
      name: "Singapore & Sentosa",
      duration: "7 days",
      price: "$2,799",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Sentosa Island activities",
        "Guided tours",
      ],
    },
    {
      name: "Singapore Cultural Journey",
      duration: "6 days",
      price: "$2,499",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Cultural tours",
        "Food experiences",
      ],
    },
  ],
  bestTime: "February to April",
  currency: "Singapore Dollar (SGD)",
  language: "English, Mandarin, Malay, Tamil",
  timeZone: "UTC+8",
}

export default function SingaporePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={singaporeData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}