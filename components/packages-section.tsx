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

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredPackages.map((pkg, index: number) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="h-full"
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

                  {/* Package Info */}
                  <div className="grid grid-cols-2 gap-3 flex-shrink-0">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500">Group Size</div>
                      <div className="text-base font-semibold text-gray-900">{pkg.maxGroupSize}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500">Difficulty</div>
                      <div className="text-sm font-medium text-gray-700 capitalize">{pkg.difficulty}</div>
                    </div>
                  </div>

                  {/* Best Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-brand-accent" />
                    <span>Best time: {pkg.bestTime}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-xl font-bold text-green-600">
                        {pkg.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>Featured</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    asChild
                    className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white transition-all duration-200 hover:scale-105 active:scale-95 mt-auto flex-shrink-0"
                  >
                    <Link href={`/packages/${pkg.slug}`}>
                      View Package Details
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-brand-accent to-brand-success rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-3">
              Ready to Start Your Journey?
            </h3>
            <p className="mb-5 opacity-90">
              Explore our complete collection of travel packages
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                size="sm" 
                variant="secondary"
                className="bg-white text-brand-accent hover:bg-gray-100 text-sm"
                asChild
              >
                <Link href="/destinations">
                  Browse Destinations
                </Link>
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-brand-accent hover:bg-white hover:text-brand-accent text-sm"
                asChild
              >
                <Link href="/deals">
                  View Deals
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
