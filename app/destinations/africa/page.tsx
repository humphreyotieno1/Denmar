import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Africa Travel Packages | Denmar Tours & Travel",
  description:
    "Explore the vast savannas, majestic mountains, and vibrant cities of Africa with our expertly curated travel packages.",
  keywords: "Africa travel, Africa vacation, safari, wildlife, culture",
}

const africaData = {
  name: "Africa",
  tagline: "Wild Beauty and Endless Adventure",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Africa is a continent of contrasts, where the wild beauty of the savannas and mountains meets the vibrant energy of its cities. From the majestic lions of the Serengeti to the stunning Victoria Falls, Africa is a destination that will leave you in awe.",
  highlights: [
    "Wildlife safaris in the Serengeti and Maasai Mara",
    "Scenic flights over the Victoria Falls",
    "Cultural experiences in Morocco and Egypt",
    "Hiking and trekking in the Atlas Mountains",
    "Exploring the vibrant cities of Cape Town and Lagos",
  ],
  packages: [
    {
      name: "Africa Explorer",
      duration: "14 days",
      price: "$3,999",
      includes: [
        "4-star safari lodges",
        "Airport transfers",
        "Daily breakfast",
        "Guided safari tours",
        "Scenic flights",
      ],
    },
    {
      name: "Morocco Cultural Odyssey",
      duration: "10 days",
      price: "$2,499",
      includes: [
        "4-star riads",
        "Airport transfers",
        "Daily breakfast",
        "Guided city tours",
        "Cooking classes",
      ],
    },
    {
      name: "Egyptian Adventure",
      duration: "12 days",
      price: "$3,299",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided tours of the Pyramids and museums",
        "Nile River cruise",
      ],
    },
  ],
  bestTime: "June to October, December to March",
  currency: "US Dollar (USD)",
  language: "English, French, Arabic, Portuguese",
  timeZone: "UTC+0 to UTC+3",
}

export default function AfricaPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={africaData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
