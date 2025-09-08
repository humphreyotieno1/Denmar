"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import type { Package } from "@/lib/services"

interface PackageCardProps {
  pkg: Package
  index?: number
}

export function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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

          {/* Package Details */}
          <div className="space-y-2 flex-shrink-0">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span>Best time: {pkg.bestTime}</span>
            </div>
            

        </div>

          {/* Price */}
          <div className="flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-green-600">
                From {pkg.price}
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
  )
}
