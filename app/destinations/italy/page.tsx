import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Italy Travel Packages | Denmar Tours & Travel",
  description:
    "Immerse yourself in the art, history, and cuisine of Italy with our curated travel packages.",
  keywords: "Italy travel, Italy vacation, Rome, Venice, culture, history",
}

const italyData = {
  name: "Italy",
  tagline: "A Journey Through Art and History",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Italy is a treasure trove of art, history, and culinary delights. From the ancient ruins of Rome to the romantic canals of Venice and the rolling hills of Tuscany, Italy offers an unforgettable journey through time and culture.",
  highlights: [
    "Exploring the Colosseum and Roman Forum",
    "Gondola rides in Venice",
    "Wine tasting in Tuscany",
    "Visiting the art-filled galleries of Florence",
    "Enjoying authentic Italian cuisine",
  ],
  packages: [
    {
      name: "Italian Highlights",
      duration: "10 days",
      price: "$3,799",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided city tours",
        "Wine tasting",
      ],
    },
    {
      name: "Rome & Amalfi Coast",
      duration: "8 days",
      price: "$2,999",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided historical tours",
        "Coastal excursions",
      ],
    },
    {
      name: "Tuscan Escape",
      duration: "7 days",
      price: "$2,699",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided vineyard tours",
        "Cooking classes",
      ],
    },
  ],
  bestTime: "April to June, September to October",
  currency: "Euro (EUR)",
  language: "Italian, English",
  timeZone: "UTC+1",
}

export default function ItalyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={italyData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}