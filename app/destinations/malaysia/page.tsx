import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Malaysia Travel Packages | Denmar Tours & Travel",
  description:
    "Explore the diverse culture, stunning landscapes, and vibrant cities of Malaysia with our curated travel packages.",
  keywords: "Malaysia travel, Malaysia vacation, Kuala Lumpur, Borneo, beaches",
}

const malaysiaData = {
  name: "Malaysia",
  tagline: "Diverse Cultures and Natural Wonders",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Malaysia is a melting pot of cultures, with vibrant cities, lush rainforests, and pristine beaches. From the iconic Petronas Towers in Kuala Lumpur to the biodiverse jungles of Borneo, Malaysia offers a rich and varied travel experience.",
  highlights: [
    "Visiting the Petronas Twin Towers",
    "Exploring Borneo’s rainforests and wildlife",
    "Relaxing on Langkawi’s beaches",
    "Discovering George Town’s street art and food",
    "Diving in Sipadan",
  ],
  packages: [
    {
      name: "Malaysia Highlights",
      duration: "10 days",
      price: "$3,199",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided city tours",
        "Wildlife excursions",
      ],
    },
    {
      name: "Kuala Lumpur & Langkawi",
      duration: "7 days",
      price: "$2,499",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided city tours",
        "Beach activities",
      ],
    },
    {
      name: "Borneo Adventure",
      duration: "12 days",
      price: "$3,799",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided jungle tours",
        "Diving sessions",
      ],
    },
  ],
  bestTime: "March to October",
  currency: "Malaysian Ringgit (MYR)",
  language: "Malay, English",
  timeZone: "UTC+8",
}

export default function MalaysiaPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={malaysiaData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}