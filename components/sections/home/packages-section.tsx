"use client"

import React, { useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "@/components/ui/huge-icons"
import useEmblaCarousel from "embla-carousel-react"
import { PackageCard } from "@/components/cards/package-card"
import { Button } from "@/components/ui/button"

interface PackagesSectionProps {
  packages?: any[]
}

export function PackagesSection({ packages = [] }: PackagesSectionProps) {
  const featuredPackages = packages.slice(0, 6)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-12">
          <h2 className="font-heading text-2xl font-bold text-brand-primary sm:text-3xl">
            Featured Packages
          </h2>
          <p className="mt-2 max-w-2xl text-base text-gray-600">
            Handpicked itineraries with clear pricing — tailor any package to your dates.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-3">
              {featuredPackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="flex-[0_0_100%] px-3 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
                >
                  <PackageCard pkg={pkg} index={index} className="h-full" />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            className={`absolute -left-2 top-[38%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-primary shadow-md transition hover:bg-gray-50 md:-left-5 ${featuredPackages.length <= 4 ? "lg:hidden" : ""}`}
            aria-label="Previous packages"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className={`absolute -right-2 top-[38%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-primary shadow-md transition hover:bg-gray-50 md:-right-5 ${featuredPackages.length <= 4 ? "lg:hidden" : ""}`}
            aria-label="Next packages"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="border-brand-secondary rounded-full text-brand-secondary hover:bg-brand-secondary hover:text-white"
          >
            <Link href="/packages">Explore All Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
