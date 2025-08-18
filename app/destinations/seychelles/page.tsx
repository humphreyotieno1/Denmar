import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Seychelles Travel Packages | Denmar Tours & Travel",
  description:
    "Relax on the pristine beaches and explore the turquoise waters of Seychelles with our luxury travel packages.",
  keywords: "Seychelles travel, Seychelles beaches, island getaway, luxury, snorkeling",
}

const seychellesData = {
  name: "Seychelles",
  tagline: "Paradise Found in the Indian Ocean",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Seychelles is a tropical paradise with crystal-clear waters, white sandy beaches, and lush rainforests. Perfect for honeymooners and nature lovers, this island nation offers unparalleled beauty and tranquility.",
  highlights: [
    "Relaxing on Anse Lazio and Anse Georgette beaches",
    "Snorkeling and diving in coral reefs",
    "Exploring Vallée de Mai Nature Reserve",
    "Island-hopping across Mahé, Praslin, and La Digue",
    "Enjoying luxury resorts and spa experiences",
  ],
  packages: [
    {
      name: "Seychelles Island Escape",
      duration: "7 days",
      price: "$3,599",
      includes: [
        "5-star resorts",
        "Airport transfers",
        "Daily breakfast",
        "Guided island tours",
        "Snorkeling excursions",
      ],
    },
    {
      name: "Seychelles Honeymoon",
      duration: "10 days",
      price: "$4,999",
      includes: [
        "5-star resorts",
        "Airport transfers",
        "Daily breakfast",
        "Romantic dinners",
        "Private boat tours",
      ],
    },
    {
      name: "Seychelles Adventure",
      duration: "9 days",
      price: "$4,199",
      includes: [
        "4-star hotels",
        "Airport transfers",
        "Daily breakfast",
        "Guided nature tours",
        "Diving sessions",
      ],
    },
  ],
  bestTime: "April to May, October to November",
  currency: "Seychellois Rupee (SCR)",
  language: "English, French, Seychellois Creole",
  timeZone: "UTC+4",
}

export default function SeychellesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />
      <main>
        <DestinationDetail destination={seychellesData} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}