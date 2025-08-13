import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { DestinationDetail } from "@/components/destination-detail"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zimbabwe Travel Packages | Denmar Tours & Travel",
  description:
    "Explore the wonders of Zimbabwe with our travel packages. From the majestic Victoria Falls to the ruins of Great Zimbabwe, we'll take you on an unforgettable journey.",
  keywords: "Zimbabwe travel, Victoria Falls, Great Zimbabwe, Zimbabwe vacation, Zimbabwe packages",
}

const zimbabweData = {
  name: "Zimbabwe",
  tagline: "Land of Wonders",
  heroImage: "/denmar1.jpeg",
  gallery: [
    "/denmar2.jpeg",
    "/denmar3.jpeg",
    "/denmar1.jpeg",
    "/denmar2.jpeg",
  ],
  description:
    "Zimbabwe is a country of untold beauty, with its majestic Victoria Falls, ancient ruins, and diverse wildlife. From the mighty Zambezi River to the stunning Matobo Hills, Zimbabwe offers an unforgettable experience for every traveler.",
  highlights: [
    "Victoria Falls - one of the world's largest waterfalls",
    "Great Zimbabwe - ancient ruins and mysterious history",
    "Hwange National Park - home to over 100 mammal species",
    "Bulawayo - Zimbabwe's second-largest city with a rich history",
    "Matobo Hills - unique rock formations and ancient rock art",
  ],
  packages: [
    {
      name: "Zimbabwe Adventure",
      duration: "7 days",
      price: "$1,999",
      includes: ["4-star safari lodge", "Airport transfers", "Daily breakfast", "Victoria Falls tour", "Hwange National Park safari"],
    },
    {
      name: "Zimbabwe Explorer",
      duration: "10 days",
      price: "$2,999",
      includes: [
        "Luxury safari lodge",
        "Private city tour",
        "Fine dining experiences",
        "Great Zimbabwe tour",
        "Matobo Hills day trip",
      ],
    },
    {
      name: "Zimbabwe Wildlife Safari",
      duration: "14 days",
      price: "$4,999",
      includes: ["Premium safari lodge", "Safari game drives", "National park tour", "Cultural performances", "Spice farm visit"],
    },
  ],
  bestTime: "April to June, September to October",
  currency: "Zimbabwean Dollar (ZWL)",
  language: "English, Shona, Ndebele",
  timeZone: "UTC+2",
}

export default function ZimbabwePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <DestinationDetail destination={zimbabweData} />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
