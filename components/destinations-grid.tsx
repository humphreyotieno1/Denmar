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
    id: "africa",
    name: "Africa",
    image: "/denmar1.jpeg",
    description: "Experience the vibrant culture, stunning landscapes, and incredible wildlife of Africa.",
    price: "From $899",
    duration: "7-14 days",
    rating: 4.9,
    reviews: 1247,
    badge: "Hot Deal",
    badgeColor: "bg-red-500",
    highlights: ["Wildlife reserves", "Vibrant culture", "Stunning landscapes", "Adventure activities"],
    href: "/destinations/africa",
  },
  {
    id: "dubai",
    name: "Dubai, UAE",
    image: "/denmar2.jpeg",
    description: "Explore the iconic landmarks, luxurious shopping malls, and world-class cuisine of Dubai.",
    price: "From $1,299",
    duration: "5-10 days",
    rating: 4.8,
    reviews: 2156,
    badge: "Popular",
    badgeColor: "bg-brand-accent",
    highlights: ["Burj Khalifa", "Luxury shopping", "Desert safari", "Modern architecture"],
    href: "/destinations/dubai",
  },
  {
    id: "europe",
    name: "Europe",
    image: "/denmar3.jpeg",
    description: "Discover the rich history, stunning landscapes, and vibrant culture of Europe.",
    price: "From $1,599",
    duration: "6-12 days",
    rating: 4.9,
    reviews: 987,
    badge: "New",
    badgeColor: "bg-brand-success",
    highlights: ["Historic landmarks", "Stunning landscapes", "Vibrant culture", "World-class cuisine"],
    href: "/destinations/europe",
  },
  {
    id: "mombasa",
    name: "Mombasa, Kenya",
    image: "/denmar1.jpeg",
    description: "Relax on the stunning beaches, explore the historic Old Town, and experience the vibrant culture of Mombasa.",
    price: "From $1,199",
    duration: "4-8 days",
    rating: 4.7,
    reviews: 834,
    badge: "Romantic",
    badgeColor: "bg-pink-500",
    highlights: ["Stunning beaches", "Historic Old Town", "Vibrant culture", "Water sports"],
    href: "/destinations/mombasa",
  },
  {
    id: "nairobi",
    name: "Nairobi, Kenya",
    image: "/denmar2.jpeg",
    description: "Explore the vibrant city of Nairobi, with its world-class shopping, dining, and entertainment.",
    price: "From $1,099",
    duration: "4-7 days",
    rating: 4.8,
    reviews: 1456,
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    highlights: ["World-class shopping", "Luxury dining", "Modern architecture", "Entertainment"],
    href: "/destinations/nairobi",
  },
  {
    id: "zimbabwe",
    name: "Zimbabwe, Tanzania",
    image: "/denmar3.jpeg",
    description: "Experience the incredible wildlife, stunning landscapes, and adventure activities of Zimbabwe.",
    price: "From $2,299",
    duration: "5-10 days",
    rating: 4.9,
    reviews: 678,
    badge: "Exclusive",
    badgeColor: "bg-brand-secondary",
    highlights: ["Wildlife reserves", "Stunning landscapes", "Adventure activities", "Luxury resorts"],
    href: "/destinations/zimbabwe",
  },
]

export function DestinationsGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3 // Show 6 items (2x3 grid on lg screens)
  const totalPages = Math.ceil(destinations.length / itemsPerPage)

  // Calculate the slice of destinations to display
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentDestinations = destinations.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top on page change
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
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
                <div className="relative">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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

                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-4 w-4 text-brand-accent" />
                    <h3 className="font-heading text-xl font-semibold text-brand-primary">{destination.name}</h3>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>

                  {/* Highlights */}
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

                  {/* Duration and Price */}
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

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-success">{destination.price}</span>
                    <Link href={destination.href}>
                      <Button className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary">Explore</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="font-heading text-3xl font-bold text-brand-primary mb-6">
              Can't Find Your Dream Destination?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We offer custom travel packages to destinations worldwide. Tell us where you want to go, and we'll make it
              happen.
            </p>
            <Link href="/contact">
            <Button
              size="lg"
              className="bg-brand-accent hover:bg-brand-accent/40 text-brand-primary font-semibold px-8 py-4"
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