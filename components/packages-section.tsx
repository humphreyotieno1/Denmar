"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, DollarSign, ArrowRight } from "lucide-react"
import { packages } from "@/lib/services"

export function PackagesSection() {
  const featuredPackages = packages.filter(pkg => pkg.featured).slice(0, 3)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Travel Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked travel packages designed to create unforgettable experiences. 
            From luxury getaways to adventure escapes, we have the perfect package for every traveler.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
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

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 min-h-[2.5rem]">
                      {pkg.shortDescription}
                    </p>
                  </div>

                  {/* Package Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Group Size</div>
                      <div className="text-lg font-bold text-gray-900">{pkg.maxGroupSize}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Difficulty</div>
                      <div className="text-sm font-medium text-gray-700 capitalize">{pkg.difficulty}</div>
                    </div>
                  </div>

                  {/* Best Time */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium mb-1">Best Time to Visit</div>
                    <div className="text-sm text-blue-800">{pkg.bestTime}</div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      {pkg.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {pkg.originalPrice}
                        </div>
                      )}
                      <div className="text-2xl font-bold text-brand-accent">
                        {pkg.price}
                      </div>
                      {pkg.discount && (
                        <div className="text-sm text-green-600 font-medium">
                          {pkg.discount}% OFF
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white transition-all duration-200 hover:scale-105 active:scale-95"
                    asChild
                  >
                    <Link href={`/destinations/${pkg.destinationSlug}`}>
                      View Package
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-brand-accent to-brand-success rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Explore our complete collection of travel packages and find your perfect adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-brand-accent hover:bg-gray-100"
                asChild
              >
                <Link href="/destinations">
                  Browse All Destinations
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-accent"
                asChild
              >
                <Link href="/deals">
                  View Special Deals
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
