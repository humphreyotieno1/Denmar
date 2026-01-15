"use client"

import React, { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'

interface PackagesSectionProps {
  packages?: any[]
}

export function PackagesSection({ packages = [] }: PackagesSectionProps) {
  const featuredPackages = packages.slice(0, 6)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl font-bold text-brand-primary mb-3">
            FEATURED PACKAGES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked travel packages designed to create unforgettable experiences.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-3">
              {featuredPackages.map((pkg, index: number) => (
                <div key={pkg.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="h-full pb-6"
                  >
                    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="relative h-56">
                        <Image
                          src={pkg.image}
                          alt={`${pkg.name} travel package - ${pkg.category} holiday for ${pkg.duration}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          loading={index < 6 ? 'eager' : 'lazy'}
                          priority={index < 3}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {pkg.featured && (
                          <Badge className="absolute left-4 top-4 bg-brand-accent text-white border-0 shadow-lg">
                            Featured
                          </Badge>
                        )}
                        <div className="absolute right-4 top-4">
                          <Badge variant="secondary" className="border-0 bg-white/90 text-gray-800 capitalize">
                            {pkg.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
                          {pkg.duration}
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-6 p-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-brand-primary line-clamp-2 md:text-xl">
                            {pkg.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{pkg.shortDescription}</p>
                        </div>

                        <div className="flex-1">
                          {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-brand-accent" />
                            <span>Best time: {pkg.bestTime}</span>
                          </div> */}
                        </div>

                        <div className="mt-auto flex flex-col gap-4">
                          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
                            From {pkg.price} per person
                          </span>
                          <Button
                            asChild
                            className="w-full rounded-full bg-brand-primary text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-brand-primary/90 active:scale-95"
                          >
                            <Link href={`/packages/${pkg.slug}`}>Book Now</Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors z-10 ${featuredPackages.length <= 3 ? 'lg:hidden' : ''}`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors z-10 ${featuredPackages.length <= 3 ? 'lg:hidden' : ''}`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link href="/packages">
            <Button variant="outline" className="border-brand-accent text-brand-accent hover:bg-brand-accent/90">
              View All Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
