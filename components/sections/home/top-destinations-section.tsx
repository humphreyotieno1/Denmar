"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "@/components/ui/huge-icons"
import Link from "next/link"
import { TravelCard } from "@/components/cards/travel-card"
import { ArrowRight } from "@/components/ui/huge-icons"

interface TopDestinationsSectionProps {
  destinations?: any[]
}

export function TopDestinationsSection({ destinations = [] }: TopDestinationsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
    }

    handleScroll()
    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [destinations.length])

  const scrollByOffset = (offset: number) => {
    scrollContainerRef.current?.scrollBy({ left: offset, behavior: "smooth" })
  }

  const displayDestinations = destinations.map((d) => ({
    id: d.id,
    name: d.name,
    description: d.summary || d.description || "",
    image: d.heroImage || d.images?.[0] || "/placeholder.svg",
    price: d.priceFrom ? `$${d.priceFrom}` : undefined,
    duration: d.duration,
    badge: d.featured ? "Featured" : undefined,
    href: `/destinations/${d.country?.slug || "kenya"}/${d.slug}`,
  }))

  return (
    <section className="relative bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
              Popular Destinations
            </h2>
            <p className="mt-2 max-w-2xl text-base text-gray-600">
              Coast, safari and city escapes — each ready to tailor to your travel dates.
            </p>
          </div>
          <Link
            href="/destinations"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-secondary hover:text-brand-primary"
          >
            Explore all destinations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:gap-5"
          >
            {displayDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className="w-[280px] shrink-0 snap-start sm:w-[300px]"
              >
                <TravelCard
                  title={destination.name}
                  description={destination.description}
                  image={destination.image}
                  href={destination.href}
                  price={destination.price}
                  duration={destination.duration}
                  badge={destination.badge}
                  exploreLabel="More Information"
                  priority={index < 4}
                  sizes="(max-width: 768px) 280px, 300px"
                />
              </div>
            ))}
          </div>

          {canScrollLeft && (
            <button
              type="button"
              className="absolute -left-2 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-primary shadow-md transition hover:bg-gray-50 sm:flex md:-left-5"
              onClick={() => scrollByOffset(-320)}
              aria-label="Scroll destinations left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              className="absolute -right-2 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-primary shadow-md transition hover:bg-gray-50 sm:flex md:-right-5"
              onClick={() => scrollByOffset(320)}
              aria-label="Scroll destinations right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
