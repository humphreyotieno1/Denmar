"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, Clock, DollarSign, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Destination } from "@/lib/destinations"

interface DestinationCardProps {
  destination: Destination
  countrySlug: string
  index?: number
}

export function DestinationCard({ destination, countrySlug, index = 0 }: DestinationCardProps) {
  const formatPrice = (price: number) => {
    return `From $${price.toLocaleString()}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/destinations/${countrySlug}/${destination.slug}`} className="h-full block">
        <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg flex flex-col">
          <div className="relative h-56 overflow-hidden flex-shrink-0">
            <Image
              src={destination.heroImage}
              alt={destination.name}
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {destination.featured && (
              <Badge className="absolute top-3 left-3 bg-brand-accent text-white border-0">
                Featured
              </Badge>
            )}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-white font-medium">
                {destination.rating}
              </span>
            </div>
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="text-lg font-bold">{destination.name}</h3>
            </div>
          </div>
          <CardContent className="p-4 flex-1 flex flex-col">
            <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-shrink-0">
              {destination.summary}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3 flex-shrink-0">
              {destination.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs px-2 py-1"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Highlights */}
            <div className="mb-3 flex-shrink-0">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Tag className="w-4 h-4" />
                <span className="font-medium">Highlights:</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">
                {destination.highlights.slice(0, 2).join(", ")}
              </p>
            </div>

            {/* Info Row */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{destination.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{destination.bestTime}</span>
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between mt-auto flex-shrink-0">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-bold text-green-600">
                  {formatPrice(destination.priceFrom)}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="group-hover:bg-brand-accent group-hover:text-white transition-colors"
              >
                View Details
              </Button>
            </div>

            {/* Reviews */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{destination.reviews.toLocaleString()} reviews</span>
                <span>Best time: {destination.bestTime.split('(')[0].trim()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
