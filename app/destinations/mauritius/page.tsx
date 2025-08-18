import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mauritius Travel Packages | Denmar Tours & Travel",
  description:
    "Unwind on the idyllic beaches and explore the vibrant culture of Mauritius with our tailored travel packages.",
  keywords: "Mauritius travel, Mauritius beaches, island vacation, luxury, culture",
}

const mauritiusData = {
  name: "Mauritius",
  tagline: "Tropical Bliss and Cultural Charm",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Mauritius is a jewel in the Indian Ocean, known for its stunning beaches, turquoise lagoons, and rich multicultural heritage. From relaxing resorts to vibrant markets, Mauritius offers a perfect blend of relaxation and adventure.",
  highlights: [
    "Relaxing on Le Morne and Flic en Flac beaches",
    "Exploring Black River Gorges National Park",
    "Visiting the colorful markets of Port Louis",
    "Snorkeling in Blue Bay Marine Park",
    "Discovering the Chamarel Seven Coloured Earth",
  ],
  packages: [
    {
      name: "Mauritius Beach Getaway",
      duration: "7 days",
      price: "$3,299",
      includes: [
        "5-star resorts",
        "Airport transfers",
        "Daily breakfast",
        "Beach activities",
        "Guided market tours",
      ],
    },
    {
      name: "Mauritius Luxury Escape",
      duration: "10 days",
      price: "$4,799",
      includes: [
        "5-star resorts",
        "Airport transfers",
        "Daily breakfast",
        "Private tours",
        "Spa treatments",
      ],
    },
    {
      name: "Mauritius Adventure",
      duration: "9 days",
      price: "$3,999",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided nature hikes",
        "Snorkeling excursions",
      ],
    },
  ],
  bestTime: "May to December",
  currency: "Mauritian Rupee (MUR)",
  language: "English, French, Mauritian Creole",
  timeZone: "UTC+4",
}

export default function MauritiusPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={mauritiusData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}