import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Europe Travel Packages | Denmar Tours & Travel",
  description:
    "Explore the beauty of Europe with our travel packages. Discover iconic landmarks, world-class cuisine, and rich history across the continent.",
  keywords: "Europe travel, Europe vacation, Europe packages, European tours",
}

const europeData = {
  name: "Europe",
  tagline: "The Cradle of Civilization",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Europe is a treasure trove of history, art, architecture, and culture. From the iconic landmarks of Paris to the ancient ruins of Rome, the scenic beauty of Santorini to the vibrant streets of Barcelona, every corner of Europe is a testament to the region's rich heritage.",
  highlights: [
    "Iconic landmarks like the Eiffel Tower and Big Ben",
    "World-class museums like the Louvre and Uffizi Gallery",
    "Romantic river cruises in Paris and Amsterdam",
    "Charming towns and villages in Italy, Greece, and Spain",
    "Exquisite cuisine and wine in France, Italy, and Portugal",
    "Historic sites like the Colosseum and Acropolis",
  ],
  packages: [
    {
      name: "European Highlights",
      duration: "10 days",
      price: "$2,499",
      includes: ["Premium hotels", "Airport transfers", "Daily breakfast", "Guided city tours", "River cruise"],
    },
    {
      name: "Italy, Greece, and Spain",
      duration: "14 days",
      price: "$3,499",
      includes: [
        "Luxury boutique hotels",
        "Private city tours",
        "Fine dining experiences",
        "Vatican City tour",
        "Island hopping in Greece",
      ],
    },
    {
      name: "Ultimate European Adventure",
      duration: "21 days",
      price: "$4,999",
      includes: ["Premium hotels", "Museum passes", "Art gallery tours", "Cooking classes", "Loire Valley excursion"],
    },
  ],
  bestTime: "April to June, September to October",
  currency: "Euro (EUR)",
  language: "English, French, German, Italian, Spanish, Greek, Portuguese",
  timeZone: "UTC+1",
}

export default function EuropePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={europeData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
