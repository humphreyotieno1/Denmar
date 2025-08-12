import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"

const baliData = {
  name: "Bali, Indonesia",
  tagline: "Island of the Gods",
  heroImage: "/placeholder.svg?height=600&width=1200",
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  description:
    "Bali is a tropical paradise that offers the perfect blend of natural beauty, rich culture, and spiritual tranquility. From pristine beaches and lush rice terraces to ancient temples and vibrant arts scene, Bali provides an unforgettable experience for every type of traveler.",
  highlights: [
    "Beautiful beaches with crystal clear waters",
    "Ancient Hindu temples and spiritual sites",
    "Stunning rice terraces in Ubud",
    "Vibrant nightlife and beach clubs",
    "Traditional Balinese culture and arts",
    "World-class spas and wellness retreats",
  ],
  packages: [
    {
      name: "Bali Beach Escape",
      duration: "7 days",
      price: "$899",
      includes: ["4-star beachfront hotel", "Airport transfers", "Daily breakfast", "Sunset dinner cruise"],
    },
    {
      name: "Cultural Bali Experience",
      duration: "10 days",
      price: "$1,299",
      includes: [
        "Boutique hotels",
        "Temple tours",
        "Cooking classes",
        "Traditional performances",
        "Ubud rice terrace tour",
      ],
    },
    {
      name: "Luxury Bali Retreat",
      duration: "14 days",
      price: "$2,499",
      includes: [
        "5-star luxury resorts",
        "Private villa",
        "Spa treatments",
        "Private tours",
        "Fine dining experiences",
      ],
    },
  ],
  bestTime: "April to October (dry season)",
  currency: "Indonesian Rupiah (IDR)",
  language: "Indonesian, Balinese",
  timeZone: "UTC+8",
}

export default function BaliPage() {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={baliData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
