"use client"

import React, { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, ChevronLeft, ChevronRight, DollarSign } from "lucide-react"
import { packages } from "@/lib/services"
import useEmblaCarousel from 'embla-carousel-react'

export function ChristmasPackages() {
  const featuredPackages = packages.filter(pkg => pkg.category === 'festive').slice(0, 6)
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
            FESTIVE SEASON PACKAGES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Christmas Packages do not get any better. Explore with us during the festive season.
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
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                      <div className="relative h-56 overflow-hidden flex-shrink-0">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          fill
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Featured Badge */}
                        {pkg.featured && (
                          <Badge className="absolute top-3 left-3 bg-brand-accent text-white border-0">
                            Featured
                          </Badge>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-white/90 text-gray-800 border-0 capitalize">
                            {pkg.category}
                          </Badge>
                        </div>

                        {/* Duration */}
                        <div className="absolute bottom-3 left-3 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {pkg.duration}
                        </div>
                      </div>

                      <CardContent className="p-5 space-y-4 flex-1 flex flex-col">
                        <div className="space-y-2 flex-shrink-0">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                            {pkg.name}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {pkg.shortDescription}
                          </p>
                        </div>

                        {/* Best Time */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 flex-shrink-0">
                          <MapPin className="w-4 h-4 text-brand-accent" />
                          <span>Best time: {pkg.bestTime}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between flex-shrink-0 mt-auto">
                          <div className="flex items-center">
                            {/* <DollarSign className="w-4 h-4 text-brand-accent mr-1" /> */}
                            <span className="text-lg font-bold text-green-600">
                              From {pkg.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">/person</span>
                          </div>
                          <Link 
                            href={`/packages/${pkg.slug}`}
                            className="inline-flex items-center text-sm font-medium text-brand-accent hover:text-brand-primary transition-colors"
                          >
                            View Details <ChevronRight className="w-4 h-4 ml-1" />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors z-10"
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
