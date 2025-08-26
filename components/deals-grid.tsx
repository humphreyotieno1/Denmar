"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Star, MapPin, Percent } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { deals as dealsData, type Deal } from "@/lib/services"
import { Pagination } from "@/components/pagination"

export function DealsGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const pageSize = 6

  // Filter deals by category
  const filteredDeals = selectedCategory === "all" 
    ? dealsData 
    : dealsData.filter(deal => deal.category === selectedCategory)

  // Paginate deals
  const totalPages = Math.ceil(filteredDeals.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentDeals = filteredDeals.slice(startIndex, endIndex)

  const categories = [
    { value: "all", label: "All Deals" },
    { value: "package", label: "Packages" },
    { value: "flight", label: "Flights" },
    { value: "hotel", label: "Hotels" },
    { value: "activity", label: "Activities" }
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      package: "bg-brand-accent",
      flight: "bg-blue-500",
      hotel: "bg-green-500",
      activity: "bg-purple-500"
    }
    return colors[category] || "bg-gray-500"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Exclusive Travel Deals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover incredible savings on your next adventure. Limited time offers on flights, hotels, and packages worldwide.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.value)
                setCurrentPage(1)
              }}
              className={`${
                selectedCategory === category.value 
                  ? "bg-brand-accent text-white border-brand-accent" 
                  : "hover:bg-gray-100"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative h-48 overflow-hidden group">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={`${getCategoryColor(deal.category)} text-white border-0 text-sm font-bold`}>
                      <Percent className="w-3 h-3 mr-1" />
                      {deal.discount}% OFF
                    </Badge>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800 border-0">
                      {deal.category}
                    </Badge>
                  </div>

                  {/* Valid Until */}
                  <div className="absolute bottom-3 left-3 text-white text-xs bg-black/50 px-2 py-1 rounded">
                    Valid until {formatDate(deal.validUntil)}
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
                      {deal.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 min-h-[2.5rem]">
                      {deal.shortDescription}
                    </p>
                  </div>

                  {/* Destinations */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {deal.destinations.slice(0, 2).map((dest, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {dest}
                        </Badge>
                      ))}
                      {deal.destinations.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{deal.destinations.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 line-through">
                        {deal.originalPrice}
                      </div>
                      <div className="text-2xl font-bold text-brand-accent">
                        {deal.discountedPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Save</div>
                      <div className="text-lg font-bold text-green-600">
                        ${parseInt(deal.originalPrice.replace(/[^0-9]/g, '')) - parseInt(deal.discountedPrice.replace(/[^0-9]/g, ''))}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">What's Included:</div>
                    <div className="flex flex-wrap gap-1">
                      {deal.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {deal.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{deal.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white transition-all duration-200 hover:scale-105 active:scale-95"
                    asChild
                  >
                    <a href={`/deals/${deal.slug}`}>
                      View Deal Details
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {currentDeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No deals found for the selected category.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination 
              totalItems={filteredDeals.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={(page) => {
                setCurrentPage(page)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-brand-accent to-brand-success rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Don't Miss Out on These Amazing Deals!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to our newsletter and be the first to know about exclusive offers and flash sales.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-brand-accent hover:bg-gray-100"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
