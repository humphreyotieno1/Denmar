import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thailand Travel Packages | Denmar Tours & Travel",
  description:
    "Discover the vibrant culture, stunning beaches, and ancient temples of Thailand with our curated travel packages.",
  keywords: "Thailand travel, Thailand vacation, beaches, temples, culture",
}

const thailandData = {
  name: "Thailand",
  tagline: "Land of Smiles and Exotic Wonders",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Thailand offers a captivating blend of vibrant city life, serene beaches, and rich cultural heritage. From the bustling markets of Bangkok to the tranquil islands of Phuket and Koh Samui, Thailand is a destination that enchants every traveler.",
  highlights: [
    "Exploring the Grand Palace and Wat Arun in Bangkok",
    "Relaxing on the pristine beaches of Phuket and Krabi",
    "Visiting ancient temples in Chiang Mai",
    "Enjoying vibrant nightlife and street food markets",
    "Island-hopping in the Andaman Sea",
  ],
  packages: [
    {
      name: "Thailand Discovery",
      duration: "10 days",
      price: "$2,799",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided temple tours",
        "Island-hopping excursions",
      ],
    },
    {
      name: "Bangkok & Beaches",
      duration: "8 days",
      price: "$1,999",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided city tours",
        "Beach resort stay",
      ],
    },
    {
      name: "Northern Thailand Adventure",
      duration: "12 days",
      price: "$3,199",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided cultural tours",
        "Elephant sanctuary visit",
      ],
    },
  ],
  bestTime: "November to February",
  currency: "Thai Baht (THB)",
  language: "Thai, English",
  timeZone: "UTC+7",
}

export default function ThailandPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={thailandData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}