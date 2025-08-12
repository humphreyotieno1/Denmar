import Link from "next/link"
import { MapPin, Star, Clock, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const destinations = [
  {
    id: "bali",
    name: "Bali, Indonesia",
    image: "/placeholder.svg?height=300&width=400",
    description: "Tropical paradise with stunning beaches, ancient temples, and vibrant culture.",
    price: "From $899",
    duration: "7-14 days",
    rating: 4.9,
    reviews: 1247,
    badge: "Hot Deal",
    badgeColor: "bg-red-500",
    highlights: ["Beautiful beaches", "Ancient temples", "Rice terraces", "Vibrant nightlife"],
  },
  {
    id: "paris",
    name: "Paris, France",
    image: "/placeholder.svg?height=300&width=400",
    description: "The city of love with iconic landmarks, world-class cuisine, and rich history.",
    price: "From $1,299",
    duration: "5-10 days",
    rating: 4.8,
    reviews: 2156,
    badge: "Popular",
    badgeColor: "bg-brand-accent",
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine River", "French cuisine"],
  },
  {
    id: "tokyo",
    name: "Tokyo, Japan",
    image: "/placeholder.svg?height=300&width=400",
    description: "Modern metropolis blending traditional culture with cutting-edge technology.",
    price: "From $1,599",
    duration: "6-12 days",
    rating: 4.9,
    reviews: 987,
    badge: "New",
    badgeColor: "bg-brand-success",
    highlights: ["Cherry blossoms", "Modern technology", "Traditional temples", "Amazing food"],
  },
  {
    id: "santorini",
    name: "Santorini, Greece",
    image: "/placeholder.svg?height=300&width=400",
    description: "Breathtaking sunsets, white-washed buildings, and crystal-clear waters.",
    price: "From $1,199",
    duration: "4-8 days",
    rating: 4.7,
    reviews: 834,
    badge: "Romantic",
    badgeColor: "bg-pink-500",
    highlights: ["Stunning sunsets", "White architecture", "Wine tasting", "Volcanic beaches"],
  },
  {
    id: "dubai",
    name: "Dubai, UAE",
    image: "/placeholder.svg?height=300&width=400",
    description: "Luxury destination with world-class shopping, dining, and entertainment.",
    price: "From $1,099",
    duration: "4-7 days",
    rating: 4.8,
    reviews: 1456,
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    highlights: ["Burj Khalifa", "Luxury shopping", "Desert safari", "Modern architecture"],
  },
  {
    id: "maldives",
    name: "Maldives",
    image: "/placeholder.svg?height=300&width=400",
    description: "Ultimate tropical getaway with overwater villas and pristine beaches.",
    price: "From $2,299",
    duration: "5-10 days",
    rating: 4.9,
    reviews: 678,
    badge: "Exclusive",
    badgeColor: "bg-brand-secondary",
    highlights: ["Overwater villas", "Crystal clear waters", "Coral reefs", "Luxury resorts"],
  },
  {
    id: "iceland",
    name: "Iceland",
    image: "/placeholder.svg?height=300&width=400",
    description: "Land of fire and ice with stunning natural wonders and unique landscapes.",
    price: "From $1,799",
    duration: "6-10 days",
    rating: 4.8,
    reviews: 543,
    badge: "Adventure",
    badgeColor: "bg-blue-500",
    highlights: ["Northern Lights", "Geysers", "Waterfalls", "Glaciers"],
  },
  {
    id: "peru",
    name: "Peru",
    image: "/placeholder.svg?height=300&width=400",
    description: "Ancient civilizations, breathtaking landscapes, and rich cultural heritage.",
    price: "From $1,399",
    duration: "8-14 days",
    rating: 4.7,
    reviews: 721,
    badge: "Cultural",
    badgeColor: "bg-orange-500",
    highlights: ["Machu Picchu", "Inca Trail", "Amazon rainforest", "Colonial cities"],
  },
  {
    id: "thailand",
    name: "Thailand",
    image: "/placeholder.svg?height=300&width=400",
    description: "Exotic beaches, ancient temples, bustling markets, and delicious cuisine.",
    price: "From $799",
    duration: "7-14 days",
    rating: 4.8,
    reviews: 1834,
    badge: "Best Value",
    badgeColor: "bg-green-500",
    highlights: ["Tropical beaches", "Buddhist temples", "Street food", "Floating markets"],
  },
]

export function DestinationsGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-6">POPULAR DESTINATIONS</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our handpicked destinations, each offering unique experiences and unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg"
            >
              <div className="relative">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-4 left-4 ${destination.badgeColor} text-white`}>
                  {destination.badge}
                </Badge>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                  <span className="text-xs text-gray-500">({destination.reviews})</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="h-4 w-4 text-brand-accent" />
                  <h3 className="font-heading text-xl font-semibold text-brand-primary">{destination.name}</h3>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{destination.description}</p>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{destination.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Duration and Price */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-brand-success">{destination.price}</span>
                  <Link href={`/destinations/${destination.id}`}>
                    <Button className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary">Explore</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="font-heading text-3xl font-bold text-brand-primary mb-6">
              Can't Find Your Dream Destination?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We offer custom travel packages to destinations worldwide. Tell us where you want to go, and we'll make it
              happen.
            </p>
            <Button
              size="lg"
              className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold px-8 py-4"
            >
              Request Custom Destination
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
