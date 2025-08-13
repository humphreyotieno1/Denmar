import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"

const nairobiData = {
  name: "Nairobi, Kenya",
  tagline: "The Green City in the Sun",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Nairobi is a vibrant and cosmopolitan city that offers a unique blend of African, Asian, and European influences. From the majestic Giraffe Centre to the bustling streets of the city centre, Nairobi provides an unforgettable experience for every type of traveler.",
  highlights: [
    "Visit the Giraffe Centre and feed the giraffes",
    "Explore the vibrant city centre with its many shops and restaurants",
    "Visit the National Museum to learn about Kenya's history and culture",
    "Take a safari tour to the nearby Nairobi National Park",
    "Visit the Elephant Orphanage and learn about conservation efforts",
    "Experience the city's vibrant nightlife with its many bars and clubs",
  ],
  packages: [
    {
      name: "Nairobi City Break",
      duration: "4 days",
      price: "$699",
      includes: ["3-star hotel", "Airport transfers", "Daily breakfast", "Giraffe Centre tour"],
    },
    {
      name: "Nairobi Safari Adventure",
      duration: "7 days",
      price: "$1,499",
      includes: [
        "4-star safari lodge",
        "Nairobi National Park safari",
        "Elephant Orphanage visit",
        "Giraffe Centre tour",
        "Daily meals and drinks",
      ],
    },
    {
      name: "Luxury Nairobi Experience",
      duration: "10 days",
      price: "$2,999",
      includes: [
        "5-star luxury hotel",
        "Private city tour",
        "Spa treatments",
        "Fine dining experiences",
        "Safari tour to the Maasai Mara National Reserve",
      ],
    },
  ],
  bestTime: "June to October (dry season)",
  currency: "Kenyan Shilling (KES)",
  language: "Swahili, English",
  timeZone: "UTC+3",
}

export default function NairobiPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={nairobiData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
