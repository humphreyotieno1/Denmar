import { Calendar, DollarSign, Globe, Clock, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Package {
  name: string
  duration: string
  price: string
  includes: string[]
}

interface DestinationData {
  name: string
  tagline: string
  heroImage: string
  gallery: string[]
  description: string
  highlights: string[]
  packages: Package[]
  bestTime: string
  currency: string
  language: string
  timeZone: string
}

interface DestinationDetailProps {
  destination: DestinationData
}

export function DestinationDetail({ destination }: DestinationDetailProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${destination.heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
            <p className="text-xl md:text-2xl opacity-90">{destination.tagline}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-brand-primary mb-6">About {destination.name}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{destination.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-brand-primary mb-6">What Makes It Special</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-brand-accent mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-brand-primary mb-6">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {destination.gallery.map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${destination.name} gallery ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Packages */}
              <div>
                <h3 className="font-heading text-2xl font-bold text-brand-primary mb-6">Travel Packages</h3>
                <div className="space-y-6">
                  {destination.packages.map((pkg, index) => (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h4 className="font-heading text-xl font-semibold text-brand-primary mb-2">{pkg.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{pkg.duration}</span>
                              </div>
                              <div className="text-2xl font-bold text-brand-success">{pkg.price}</div>
                            </div>
                          </div>
                          <Button className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold mt-4 md:mt-0">
                            Book Now
                          </Button>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Package Includes:</p>
                          <div className="flex flex-wrap gap-2">
                            {pkg.includes.map((item, itemIndex) => (
                              <Badge key={itemIndex} variant="secondary" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Quick Info */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-brand-primary mb-6">Quick Info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-brand-accent" />
                      <div>
                        <div className="font-medium text-gray-900">Best Time to Visit</div>
                        <div className="text-sm text-gray-600">{destination.bestTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-brand-success" />
                      <div>
                        <div className="font-medium text-gray-900">Currency</div>
                        <div className="text-sm text-gray-600">{destination.currency}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-gray-900">Language</div>
                        <div className="text-sm text-gray-600">{destination.language}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="font-medium text-gray-900">Time Zone</div>
                        <div className="text-sm text-gray-600">{destination.timeZone}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact CTA */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-brand-primary to-gray-900 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-heading text-xl font-semibold mb-4">Need Help Planning?</h3>
                  <p className="text-white/80 mb-6">
                    Our travel experts are here to help you create the perfect itinerary for your trip.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold">
                      Get Free Consultation
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white text-white hover:bg-white hover:text-brand-primary bg-transparent"
                    >
                      Call Us Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-brand-primary mb-6">Traveler Reviews</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold">4.9</span>
                      <span className="text-sm text-gray-600">(1,247 reviews)</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      "Absolutely amazing experience! The beaches were pristine and the cultural tours were
                      fascinating."
                    </div>
                    <div className="text-xs text-gray-500">- Sarah M., New York</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
