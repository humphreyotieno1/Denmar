"use client"

import { useState } from "react"
import { type Deal } from "@/lib/services"
import { TravelCard } from "@/components/cards/travel-card"
import { Pagination } from "@/components/shared/pagination"
import { Button } from "@/components/ui/button"

interface DealsGridProps {
  deals: Deal[]
}

export function DealsGrid({ deals }: DealsGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const pageSize = 6

  const filteredDeals =
    selectedCategory === "all"
      ? deals
      : deals.filter((deal) => deal.category === selectedCategory)

  const totalPages = Math.ceil(filteredDeals.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const currentDeals = filteredDeals.slice(startIndex, startIndex + pageSize)

  const categories = [
    { value: "all", label: "All Deals" },
    { value: "package", label: "Packages" },
    { value: "flight", label: "Flights" },
    { value: "hotel", label: "Hotels" },
    { value: "activity", label: "Activities" },
  ]

  return (
    <section className="bg-white py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
            Exclusive Travel Deals
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base text-gray-600">
            Limited-time offers on packages and getaways — prices shown per person sharing.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.value)
                setCurrentPage(1)
              }}
              className={
                selectedCategory === category.value
                  ? "bg-brand-secondary rounded-full text-white hover:bg-brand-secondary/90"
                  : "border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {currentDeals.map((deal, index) => (
            <TravelCard
              key={deal.id}
              title={deal.title}
              description={deal.shortDescription}
              image={deal.image}
              href={`/deals/${deal.slug}`}
              price={deal.discountedPrice}
              badge={`${deal.discount}% OFF`}
              duration={
                deal.validUntil
                  ? `Valid until ${new Date(deal.validUntil).toLocaleDateString("en-KE", { month: "short", day: "numeric", year: "numeric" })}`
                  : undefined
              }
              exploreLabel="View Deal"
              priority={index < 3}
            />
          ))}
        </div>

        {currentDeals.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No deals found for the selected category.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              totalItems={filteredDeals.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={(page) => {
                setCurrentPage(page)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
