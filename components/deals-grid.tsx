import { Calendar, Clock, Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const deals = [
  {
    id: 1,
    title: "Early Bird Bali Special",
    destination: "Bali, Indonesia",
    image: "/placeholder.svg?height=300&width=400",
    originalPrice: "$1,299",
    salePrice: "$899",
    discount: "30% OFF",
    duration: "7 days / 6 nights",
    validUntil: "March 31, 2024",
    description:
      "Experience the magic of Bali with this incredible early bird offer including flights, accommodation, and tours.",
    includes: ["Round-trip flights", "4-star resort", "Daily breakfast", "Temple tours", "Airport transfers"],
    badge: "Limited Time",
    badgeColor: "bg-red-500",
    rating: 4.9,
    reviews: 234,
  },
  {
    id: 2,
    title: "European Summer Escape",
    destination: "Paris & Rome",
    image: "/placeholder.svg?height=300&width=400",
    originalPrice: "$2,499",
    salePrice: "$1,899",
    discount: "25% OFF",
    duration: "10 days / 9 nights",
    validUntil: "April 15, 2024",
    description: "Explore two of Europe's most romantic cities with this amazing summer package deal.",
    includes: ["Round-trip flights", "Hotels in city center", "High-speed train", "City tours", "Museum passes"],
    badge: "Best Seller",
    badgeColor: "bg-brand-accent",
    rating: 4.8,
    reviews: 456,
  },
  {
    id: 3,
    title: "Tokyo Cherry Blossom",
    destination: "Tokyo, Japan",
    image: "/placeholder.svg?height=300&width=400",
    originalPrice: "$1,899",
    salePrice: "$1,499",
    discount: "20% OFF",
    duration: "8 days / 7 nights",
    validUntil: "February 28, 2024",
    description: "Witness the breathtaking cherry blossoms in Tokyo with this exclusive spring package.",
    includes: ["Round-trip flights", "Traditional ryokan", "JR Pass", "Cherry blossom tours", "Cultural experiences"],
    badge: "Seasonal",
    badgeColor: "bg-pink-500",
    rating: 4.9,
    reviews: 189,
  },
  {
    id: 4,
    title: "Maldives Luxury Retreat",
    destination: "Maldives",
    image: "/placeholder.svg?height=300&width=400",
    originalPrice: "$3,999",
    salePrice: "$2,999",
    discount: "25% OFF",
    duration: "6 days / 5 nights",
    validUntil: "May 31, 2024",
    description: "Indulge in luxury with overwater villas and world-class amenities in the Maldives.",
    includes: ["Seaplane transfers", "Overwater villa", "All meals included", "Spa treatments", "Water sports"],
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    rating: 5.0,
    reviews: 78,
  },
  {
    id: 5,
    title: "Dubai Shopping Festival",
    destination: "Dubai, UAE",
    image: "/placeholder.svg?height=300&width=400",
    originalPrice: "$1,599",
    salePrice: "$1,199",
    discount: "25% OFF",
    duration: "5 days / 4 nights",
    validUntil: "March 15, 2024",
    description: "Experience Dubai's famous shopping festival with exclusive deals and entertainment.",
    includes: ["Round-trip flights", "5-star hotel", "Shopping vouchers", "Desert safari", "Burj Khalifa tickets"],
    badge: "Festival Special",
    badgeColor: "bg-brand-success",
    rating: 4.7,
    reviews: 312,
  },
  {
    id: 6,
    title: "Greek Island Hopping",
    destination: "Santorini & Mykonos",
    image: "/placeholder.svg?height=300&width=400",
    originalPrice: "$2,199",
    salePrice: "$1,699",
    discount: "23% OFF",
    duration: "9 days / 8 nights",
    validUntil: "April 30, 2024",
    description: "Discover the beauty of Greek islands with this comprehensive island-hopping package.",
    includes: ["Round-trip flights", "Island ferries", "Boutique hotels", "Sunset tours", "Wine tastings"],
    badge: "Island Special",
    badgeColor: "bg-blue-500",
    rating: 4.8,
    reviews: 267,
  },
]

export function DealsGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-6">EXCLUSIVE TRAVEL DEALS</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss out on these incredible offers! Limited-time deals on our most popular destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <Card
              key={deal.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg"
            >
              <div className="relative">
                <img
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-4 left-4 ${deal.badgeColor} text-white`}>{deal.badge}</Badge>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  {deal.discount}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{deal.rating}</span>
                  <span className="text-xs text-gray-500">({deal.reviews})</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-4 w-4 text-brand-accent" />
                  <span className="text-sm text-gray-600">{deal.destination}</span>
                </div>

                <h3 className="font-heading text-xl font-semibold text-brand-primary mb-3">{deal.title}</h3>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{deal.description}</p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-brand-success">{deal.salePrice}</span>
                  <span className="text-lg text-gray-400 line-through">{deal.originalPrice}</span>
                </div>

                {/* Duration and Valid Until */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{deal.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Until {deal.validUntil}</span>
                  </div>
                </div>

                {/* Includes */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Package Includes:</p>
                  <div className="space-y-1">
                    {deal.includes.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mr-2" />
                        {item}
                      </div>
                    ))}
                    {deal.includes.length > 3 && (
                      <div className="text-xs text-brand-accent">+{deal.includes.length - 3} more included</div>
                    )}
                  </div>
                </div>

                <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold">
                  Book This Deal
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="font-heading text-3xl font-bold text-brand-primary mb-6">Never Miss a Deal!</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive deals, flash sales, and special
              offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
              <Button className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold px-8 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
