"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const destinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "/placeholder.svg?height=300&width=400",
    description: "Tropical paradise with stunning beaches, ancient temples, and vibrant culture.",
    price: "From $899",
    rating: 4.9,
    badge: "Hot Deal",
    badgeColor: "bg-red-500",
  },
  {
    id: 2,
    name: "Paris, France",
    image: "/placeholder.svg?height=300&width=400",
    description: "The city of love with iconic landmarks, world-class cuisine, and rich history.",
    price: "From $1,299",
    rating: 4.8,
    badge: "Popular",
    badgeColor: "bg-brand-accent",
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    image: "/placeholder.svg?height=300&width=400",
    description: "Modern metropolis blending traditional culture with cutting-edge technology.",
    price: "From $1,599",
    rating: 4.9,
    badge: "New",
    badgeColor: "bg-brand-success",
  },
  {
    id: 4,
    name: "Santorini, Greece",
    image: "/placeholder.svg?height=300&width=400",
    description: "Breathtaking sunsets, white-washed buildings, and crystal-clear waters.",
    price: "From $1,199",
    rating: 4.7,
    badge: "Romantic",
    badgeColor: "bg-pink-500",
  },
  {
    id: 5,
    name: "Dubai, UAE",
    image: "/placeholder.svg?height=300&width=400",
    description: "Luxury destination with world-class shopping, dining, and entertainment.",
    price: "From $1,099",
    rating: 4.8,
    badge: "Luxury",
    badgeColor: "bg-purple-500",
  },
  {
    id: 6,
    name: "Maldives",
    image: "/placeholder.svg?height=300&width=400",
    description: "Ultimate tropical getaway with overwater villas and pristine beaches.",
    price: "From $2,299",
    rating: 4.9,
    badge: "Exclusive",
    badgeColor: "bg-brand-secondary",
  },
]

export function TopDestinationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= destinations.length ? 0 : prev + itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, destinations.length - itemsPerView) : Math.max(0, prev - itemsPerView),
    )
  }

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-4">TOP DESTINATIONS</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular destinations and start planning your next adventure.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="flex items-center space-x-2 bg-transparent"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="flex items-center space-x-2 bg-transparent"
              disabled={currentIndex + itemsPerView >= destinations.length}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleDestinations.map((destination) => (
              <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-4 left-4 ${destination.badgeColor} text-white`}>
                    {destination.badge}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-brand-accent" />
                    <h3 className="font-heading text-xl font-semibold text-brand-primary">{destination.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-success">{destination.price}</span>
                    <Button className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="lg:hidden mt-8">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {destinations.map((destination) => (
                <Card
                  key={destination.id}
                  className="flex-shrink-0 w-80 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-4 left-4 ${destination.badgeColor} text-white`}>
                      {destination.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-heading text-lg font-semibold text-brand-primary mb-2">{destination.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-brand-success">{destination.price}</span>
                      <Button size="sm" className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
