import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Turkey Travel Packages | Denmar Tours & Travel",
  description:
    "Explore the rich history and stunning landscapes of Turkey with our curated travel packages.",
  keywords: "Turkey travel, Turkey vacation, Istanbul, Cappadocia, history",
}

const turkeyData = {
  name: "Turkey",
  tagline: "Where East Meets West",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Turkey bridges Europe and Asia with its rich history, vibrant culture, and diverse landscapes. From the ancient ruins of Ephesus to the surreal landscapes of Cappadocia and the bustling bazaars of Istanbul, Turkey is a traveler’s delight.",
  highlights: [
    "Exploring Istanbul’s Hagia Sophia and Blue Mosque",
    "Hot air balloon rides in Cappadocia",
    "Visiting the ancient city of Ephesus",
    "Relaxing on the Turquoise Coast",
    "Shopping in the Grand Bazaar",
  ],
  packages: [
    {
      name: "Turkey Highlights",
      duration: "10 days",
      price: "$3,299",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided historical tours",
        "Balloon ride",
      ],
    },
    {
      name: "Istanbul & Cappadocia",
      duration: "7 days",
      price: "$2,499",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided city tours",
        "Cultural experiences",
      ],
    },
    {
      name: "Turkish Riviera Escape",
      duration: "9 days",
      price: "$2,999",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided coastal tours",
        "Boat trips",
      ],
    },
  ],
  bestTime: "April to May, September to November",
  currency: "Turkish Lira (TRY)",
  language: "Turkish, English",
  timeZone: "UTC+3",
}

export default function TurkeyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={turkeyData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}