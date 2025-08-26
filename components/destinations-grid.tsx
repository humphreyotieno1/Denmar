"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, Clock, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Destination {
  id: string
  name: string
  image: string
  description: string
  price: string
  duration: string
  rating: number
  reviews: number
  badge: string
  badgeColor: string
  highlights: string[]
  href: string
}

const destinations: Destination[] = [
  {
    id: "thailand",
    name: "Thailand",
    image: "/denmar1.jpeg",
    description: "Discover vibrant culture, stunning beaches, and ancient temples in the Land of Smiles.",
    price: "From $1,999",
    duration: "7-12 days",
    rating: 4.8,
    reviews: 1567,
    badge: "Popular",
    badgeColor: "bg-brand-accent",
    highlights: ["Grand Palace", "Phuket beaches", "Chiang Mai temples", "Street food markets"],
    href: "/destinations/thailand/bangkok",
  },
  {
    id: "south-africa",
    name: "South Africa",
    image: "/denmar2.jpeg",
    description: "Experience diverse landscapes, wildlife safaris, and vibrant culture in South Africa.",
    price: "From $2,799",
    duration: "8-14 days",
    rating: 4.9,
    reviews: 1234,
    badge: "Hot Deal",
    badgeColor: "bg-red-500",
    highlights: ["Kruger safaris", "Table Mountain", "Stellenbosch wines", "Garden Route"],
    href: "/destinations/south-africa",
  },
  {
    id: "seychelles",
    name: "Seychelles",
    image: "/denmar3.jpeg",
    description: "Relax on pristine beaches and explore turquoise waters in this tropical paradise. Explore now.",
    price: "From $3,599",
    duration: "7-10 days",
    rating: 4.9,
    reviews: 892,
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    highlights: ["Anse Lazio", "Coral reefs", "Vallée de Mai", "Island-hopping"],
    href: "/destinations/seychelles",
  },
  {
    id: "mauritius",
    name: "Mauritius",
    image: "/denmar1.jpeg",
    description: "Unwind on idyllic beaches and explore the vibrant culture of Mauritius.",
    price: "From $3,299",
    duration: "7-10 days",
    rating: 4.8,
    reviews: 1045,
    badge: "Romantic",
    badgeColor: "bg-pink-500",
    highlights: ["Le Morne", "Black River Gorges", "Port Louis markets", "Blue Bay"],
    href: "/destinations/mauritius",
  },
  {
    id: "italy",
    name: "Italy",
    image: "/denmar2.jpeg",
    description: "Immerse yourself in the art, history, and cuisine of Italy’s iconic cities.",
    price: "From $2,699",
    duration: "7-12 days",
    rating: 4.9,
    reviews: 1789,
    badge: "Cultural",
    badgeColor: "bg-blue-500",
    highlights: ["Colosseum", "Venice canals", "Tuscan vineyards", "Italian cuisine"],
    href: "/destinations/italy",
  },
  {
    id: "china",
    name: "China",
    image: "/denmar3.jpeg",
    description: "Discover ancient wonders and modern marvels in China’s vibrant cities.",
    price: "From $2,799",
    duration: "8-14 days",
    rating: 4.8,
    reviews: 1345,
    badge: "Adventure",
    badgeColor: "bg-brand-success",
    highlights: ["Great Wall", "Forbidden City", "Yangtze cruise", "Terracotta Army"],
    href: "/destinations/china",
  },
  {
    id: "turkey",
    name: "Turkey",
    image: "/denmar1.jpeg",
    description: "Explore where East meets West with Turkey’s history and landscapes.",
    price: "From $2,499",
    duration: "7-10 days",
    rating: 4.7,
    reviews: 987,
    badge: "Unique",
    badgeColor: "bg-orange-500",
    highlights: ["Hagia Sophia", "Cappadocia balloons", "Ephesus ruins", "Grand Bazaar"],
    href: "/destinations/turkey",
  },
  {
    id: "singapore",
    name: "Singapore",
    image: "/denmar2.jpeg",
    description: "Experience modern marvels and cultural diversity in vibrant Singapore.",
    price: "From $2,299",
    duration: "5-7 days",
    rating: 4.8,
    reviews: 1123,
    badge: "City Break",
    badgeColor: "bg-teal-500",
    highlights: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island", "Hawker food"],
    href: "/destinations/singapore",
  },
  {
    id: "maldives",
    name: "Maldives",
    image: "/denmar3.jpeg",
    description: "Escape to luxury with overwater villas and crystal-clear waters.",
    price: "From $4,799",
    duration: "6-10 days",
    rating: 5.0,
    reviews: 678,
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    highlights: ["Overwater villas", "Coral reefs", "Sunset cruises", "Spa retreats"],
    href: "/destinations/maldives",
  },
  {
    id: "malaysia",
    name: "Malaysia",
    image: "/denmar1.jpeg",
    description: "Explore diverse cultures, rainforests, and vibrant cities in Malaysia.",
    price: "From $2,499",
    duration: "7-12 days",
    rating: 4.7,
    reviews: 945,
    badge: "Diverse",
    badgeColor: "bg-green-500",
    highlights: ["Petronas Towers", "Borneo jungles", "Langkawi beaches", "George Town"],
    href: "/destinations/malaysia",
  },
]

export function DestinationsGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3 // Show 3 items per page for consistency
  const totalPages = Math.ceil(destinations.length / itemsPerPage)

  // Calculate the slice of destinations to display
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentDestinations = destinations.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="font-heading text-4xl font-bold text-brand-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            POPULAR DESTINATIONS
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore our handpicked destinations, each offering unique experiences and unforgettable memories.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg min-h-[500px] flex flex-col">
                <div className="relative">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={400}
                    height={240}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300 aspect-[5/3]"
                    priority={index < 3}
                  />
                  <Badge className={`absolute top-4 left-4 ${destination.badgeColor} text-white`}>
                    {destination.badge}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                    <span className="text-xs text-gray-500">({destination.reviews})</span>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-4 w-4 text-brand-accent" />
                    <h3 className="font-heading text-xl font-semibold text-brand-primary">{destination.name}</h3>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{destination.description}</p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {highlight}
                        </span>
                      ))}
                      {destination.highlights.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{destination.highlights.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{destination.reviews} reviews</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-brand-success">{destination.price}</span>
                    <Link href={destination.href}>
                      <Button className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary" aria-label={`Explore ${destination.name}`}>
                        Explore
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1"
              aria-label="Previous page"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <motion.button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentPage === index + 1
                    ? "bg-brand-accent text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label={`Go to page ${index + 1}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1"
              aria-label="Next page"
            >
              Next
            </Button>
          </div>
        )}

        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="font-heading text-3xl font-bold text-brand-primary mb-6">
              Can't Find Your Dream Destination?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We offer custom travel packages to destinations worldwide. Tell us where you want to go, and we'll make it happen.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold px-8 py-4"
                aria-label="Request custom destination"
              >
                Request Custom Destination
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}