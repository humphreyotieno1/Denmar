"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Pagination } from "@/components/pagination"
import { Badge } from "@/components/ui/badge"

interface ServicesGridProps {
  services?: any[]
  showTitle?: boolean
}

export function ServicesGrid({ services = [], showTitle = true }: ServicesGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const pageSize = 6

  // Filter services by category
  const filteredServices = selectedCategory === "all"
    ? services
    : services.filter(service => service.category === selectedCategory)

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
              className={`${selectedCategory === category.value
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
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200">
                    {/* Fallback pattern or color if no image load */}
                  </div>
                  <img
                    src={service.image || "/placeholder-service.jpg"}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      className="bg-brand-accent text-white border-0 shadow-md"
                    >
                      {service.category}
                    </Badge>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2 text-shadow-sm">
                      {service.name}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                      {service.shortDescription}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      {service.features?.slice(0, 3).map((feature: string, idx: number) => (
                        <span key={idx} className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
