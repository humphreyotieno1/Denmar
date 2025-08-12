import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tokyo, Japan Travel Packages | Denmar Tours & Travel",
  description:
    "Experience modern Tokyo with traditional culture. Cherry blossoms, temples, technology, and amazing food await in Japan's capital.",
  keywords: "Tokyo travel, Japan vacation, cherry blossoms, temples, Tokyo packages, Japanese culture",
}

const tokyoData = {
  name: "Tokyo, Japan",
  tagline: "Where Tradition Meets Innovation",
  heroImage: "/placeholder.svg?height=600&width=1200",
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  description:
    "Tokyo seamlessly blends ancient traditions with cutting-edge modernity, creating a unique urban experience. From serene temples and beautiful gardens to bustling districts and innovative technology, Tokyo offers endless discoveries for every traveler.",
  highlights: [
    "Stunning cherry blossoms in spring",
    "Ancient temples and shrines",
    "World-class cuisine and sushi",
    "Vibrant neighborhoods like Shibuya",
    "Traditional tea ceremonies",
    "Modern architecture and technology",
  ],
  packages: [
    {
      name: "Tokyo Discovery",
      duration: "6 days",
      price: "$1,599",
      includes: ["Modern hotel", "JR Pass", "Temple tours", "Sushi experience", "Airport transfers"],
    },
    {
      name: "Cultural Tokyo Journey",
      duration: "9 days",
      price: "$2,299",
      includes: [
        "Traditional ryokan",
        "Tea ceremony",
        "Mount Fuji day trip",
        "Cooking classes",
        "Cultural performances",
      ],
    },
    {
      name: "Ultimate Tokyo Experience",
      duration: "12 days",
      price: "$3,199",
      includes: [
        "Luxury accommodations",
        "Private guides",
        "Kyoto extension",
        "Hot spring resort",
        "Exclusive experiences",
      ],
    },
  ],
  bestTime: "March to May (cherry blossoms), September to November",
  currency: "Japanese Yen (JPY)",
  language: "Japanese",
  timeZone: "UTC+9",
}

export default function TokyoPage() {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={tokyoData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
