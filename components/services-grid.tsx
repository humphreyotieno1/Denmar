"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { services as servicesData, type Service } from "@/lib/services"
import { Pagination } from "@/components/pagination"
import { Badge } from "@/components/ui/badge"

export function ServicesGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const pageSize = 6

  // Filter services by category
  const filteredServices = selectedCategory === "all" 
    ? servicesData 
    : servicesData.filter(service => service.category === selectedCategory)

  // Paginate services
  const totalPages = Math.ceil(filteredServices.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentServices = filteredServices.slice(startIndex, endIndex)

  const categories = [
    { value: "all", label: "All Services" },
    { value: "travel", label: "Travel" },
    { value: "accommodation", label: "Accommodation" },
    { value: "transportation", label: "Transportation" },
    { value: "activities", label: "Activities" },
    { value: "planning", label: "Planning" }
  ]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      travel: "bg-brand-accent",
      accommodation: "bg-green-500",
      transportation: "bg-blue-500",
      activities: "bg-purple-500",
      planning: "bg-orange-500"
    }
    return colors[category] || "bg-gray-500"
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      travel: "🎒",
      accommodation: "🏨",
      transportation: "✈️",
      activities: "🎯",
      planning: "📋"
    }
    return icons[category] || "🔧"
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">
            TRAVEL SERVICES
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive travel services to make your journey seamless and unforgettable. From planning to execution, we've got you covered.
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative h-48 overflow-hidden group">
                  <div className={`absolute inset-0 ${getCategoryColor(service.category)}/10 flex items-center justify-center`}>
                    <span className="text-6xl">{service.icon}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge 
                      variant="secondary" 
                      className={`${getCategoryColor(service.category)} text-white border-0`}
                    >
                      {service.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Price and Duration */}
                  {(service.price || service.duration) && (
                    <div className="flex items-center justify-between mb-4">
                      {service.price && (
                        <div className="text-center">
                          <div className="text-sm text-gray-500">Starting from</div>
                          <div className="text-lg font-bold text-brand-accent">
                            {service.price}
                          </div>
                        </div>
                      )}
                      {service.duration && (
                        <div className="text-center">
                          <div className="text-sm text-gray-500">Duration</div>
                          <div className="text-sm font-medium text-gray-700">
                            {service.duration}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Key Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {service.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto pt-4">
                    <Button 
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white transition-all duration-200 hover:scale-105 active:scale-95"
                      asChild
                    >
                      <a href={`/services/${service.slug}`}>
                        Learn More
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {currentServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services found for the selected category.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination 
              totalItems={filteredServices.length}
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
              Need a Custom Travel Solution?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our travel experts are here to create personalized experiences just for you.
            </p>
            <Link href="/contact">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-brand-accent hover:bg-gray-100"
            >
              Contact Our Experts
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
