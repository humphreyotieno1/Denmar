"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Deal {
  id: number
  title: string
  destination: string
  image: string
  originalPrice: string
  salePrice: string
  discount: string
  duration: string
  validUntil: string
  description: string
  includes: string[]
  badge: string
  badgeColor: string
  rating: number
  reviews: number
}

const deals: Deal[] = [
  {
    id: 1,
    title: "Thailand Cultural Journey",
    destination: "Thailand",
    image: "/denmar1.jpeg",
    originalPrice: "$2,799",
    salePrice: "$1,999",
    discount: "28% OFF",
    duration: "10 days / 9 nights",
    validUntil: "March 31, 2026",
    description: "Immerse yourself in Thailand’s vibrant culture with temple tours and beach relaxation.",
    includes: ["Round-trip flights", "4-star hotels", "Daily breakfast", "Guided temple tours", "Beach activities"],
    badge: "Cultural",
    badgeColor: "bg-blue-500",
    rating: 4.8,
    reviews: 567,
  },
  {
    id: 2,
    title: "South Africa Safari Special",
    destination: "South Africa",
    image: "/denmar2.jpeg",
    originalPrice: "$4,199",
    salePrice: "$2,999",
    discount: "29% OFF",
    duration: "12 days / 11 nights",
    validUntil: "April 15, 2026",
    description: "Experience thrilling safaris and scenic beauty in South Africa’s iconic landscapes.",
    includes: ["Round-trip flights", "4-star lodges", "Daily breakfast", "Guided safaris", "City tours"],
    badge: "Adventure",
    badgeColor: "bg-brand-success",
    rating: 4.9,
    reviews: 432,
  },
  {
    id: 3,
    title: "Seychelles Island Escape",
    destination: "Seychelles",
    image: "/denmar3.jpeg",
    originalPrice: "$4,999",
    salePrice: "$3,599",
    discount: "28% OFF",
    duration: "7 days / 6 nights",
    validUntil: "May 31, 2026",
    description: "Relax in luxury with pristine beaches and turquoise waters in Seychelles.",
    includes: ["Seaplane transfers", "5-star resorts", "Daily breakfast", "Snorkeling", "Spa treatments"],
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    rating: 4.9,
    reviews: 298,
  },
  {
    id: 4,
    title: "Mauritius Beach Getaway",
    destination: "Mauritius",
    image: "/denmar1.jpeg",
    originalPrice: "$4,299",
    salePrice: "$3,299",
    discount: "23% OFF",
    duration: "7 days / 6 nights",
    validUntil: "June 30, 2026",
    description: "Unwind on Mauritius’ stunning beaches with vibrant markets and nature tours.",
    includes: ["Round-trip flights", "5-star resorts", "Daily breakfast", "Market tours", "Snorkeling"],
    badge: "Romantic",
    badgeColor: "bg-pink-500",
    rating: 4.8,
    reviews: 345,
  },
  {
    id: 5,
    title: "Italian Art & History Tour",
    destination: "Italy",
    image: "/denmar2.jpeg",
    originalPrice: "$3,799",
    salePrice: "$2,699",
    discount: "29% OFF",
    duration: "10 days / 9 nights",
    validUntil: "April 30, 2026",
    description: "Explore Italy’s iconic cities with art, history, and culinary delights.",
    includes: ["Round-trip flights", "4-star hotels", "Daily breakfast", "Guided city tours", "Wine tasting"],
    badge: "Cultural",
    badgeColor: "bg-blue-500",
    rating: 4.9,
    reviews: 678,
  },
  {
    id: 6,
    title: "China Ancient Wonders",
    destination: "China",
    image: "/denmar3.jpeg",
    originalPrice: "$3,999",
    salePrice: "$2,799",
    discount: "30% OFF",
    duration: "12 days / 11 nights",
    validUntil: "March 31, 2026",
    description: "Discover China’s ancient heritage and modern marvels in this epic journey.",
    includes: ["Round-trip flights", "4-star hotels", "Daily breakfast", "Great Wall tour", "River cruise"],
    badge: "Adventure",
    badgeColor: "bg-brand-success",
    rating: 4.8,
    reviews: 512,
  },
  {
    id: 7,
    title: "Turkey Cultural Escape",
    destination: "Turkey",
    image: "/denmar1.jpeg",
    originalPrice: "$3,299",
    salePrice: "$2,499",
    discount: "24% OFF",
    duration: "7 days / 6 nights",
    validUntil: "May 15, 2026",
    description: "Experience Turkey’s unique blend of East and West with historic sites and balloon rides.",
    includes: ["Round-trip flights", "4-star hotels", "Daily breakfast", "Cappadocia balloon ride", "City tours"],
    badge: "Unique",
    badgeColor: "bg-orange-500",
    rating: 4.7,
    reviews: 389,
  },
  {
    id: 8,
    title: "Singapore City Break",
    destination: "Singapore",
    image: "/denmar2.jpeg",
    originalPrice: "$2,799",
    salePrice: "$2,299",
    discount: "18% OFF",
    duration: "5 days / 4 nights",
    validUntil: "March 15, 2026",
    description: "Explore Singapore’s futuristic skyline and vibrant cultural districts.",
    includes: ["Round-trip flights", "4-star hotels", "Daily breakfast", "Marina Bay tour", "Sentosa activities"],
    badge: "City Break",
    badgeColor: "bg-teal-500",
    rating: 4.8,
    reviews: 423,
  },
  {
    id: 9,
    title: "Maldives Luxury Retreat",
    destination: "Maldives",
    image: "/denmar3.jpeg",
    originalPrice: "$6,499",
    salePrice: "$4,799",
    discount: "26% OFF",
    duration: "7 days / 6 nights",
    validUntil: "June 30, 2026",
    description: "Indulge in luxury with overwater villas and pristine waters in the Maldives.",
    includes: ["Seaplane transfers", "5-star villas", "All meals", "Spa treatments", "Snorkeling"],
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    rating: 5.0,
    reviews: 276,
  },
  {
    id: 10,
    title: "Malaysia Adventure",
    destination: "Malaysia",
    image: "/denmar1.jpeg",
    originalPrice: "$3,199",
    salePrice: "$2,499",
    discount: "22% OFF",
    duration: "10 days / 9 nights",
    validUntil: "April 30, 2026",
    description: "Explore Malaysia’s vibrant cities, rainforests, and stunning beaches.",
    includes: ["Round-trip flights", "4-star hotels", "Daily breakfast", "Jungle tours", "City tours"],
    badge: "Diverse",
    badgeColor: "bg-green-500",
    rating: 4.7,
    reviews: 356,
  },
]

export function DealsGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3 // Matches 3x2 grid on lg screens
  const totalPages = Math.ceil(deals.length / itemsPerPage)

  // Calculate the slice of deals to display
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentDeals = deals.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="font-heading text-4xl font-bold text-brand-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            EXCLUSIVE TRAVEL DEALING
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Don't miss out on these incredible offers! Limited-time deals on our most popular destinations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg min-h-[500px] flex flex-col">
                <div className="relative">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 aspect-[5/3]"
                    priority={index < 3}
                  />
                  <Badge className={`absolute top-4 left-4 ${deal.badgeColor} text-white`}>{deal.badge}</Badge>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                    {deal.discount}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{deal.rating}</span>
                    <span className="text-xs text-gray-500">({deal.reviews})</span>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-brand-accent" />
                    <span className="text-sm text-gray-600">{deal.destination}</span>
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-brand-primary mb-3">{deal.title}</h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{deal.description}</p>

                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-brand-success">{deal.salePrice}</span>
                    <span className="text-lg text-gray-400 line-through">{deal.originalPrice}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{deal.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Until {deal.validUntil}</span>
                    </div>
                  </div>

                  <div className="mb-6 flex-grow">
                    <p className="text-sm font-medium text-gray-700 mb-2">Package Includes:</p>
                    <div className="space-y-1">
                      {deal.includes.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mr-2" />
                          {item}
                        </div>
                      ))}
                      {deal.includes.length > 3 && (
                        <div className="text-xs text-brand-accent">+{deal.includes.length - 3} more included</div>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold mt-auto"
                    aria-label={`Book ${deal.title}`}
                  >
                    Book This Deal
                  </Button>
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

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="font-heading text-3xl font-bold text-brand-primary mb-6">Never Miss a Deal!</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive deals, flash sales, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
                aria-label="Email for newsletter"
              />
              <Button
                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold px-8 py-3"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}