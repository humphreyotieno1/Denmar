"use client"

import { notFound } from "next/navigation"
import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { DestinationCard } from "@/components/destination-card"
import { getCountryBySlug, getDestinationBySlug, getDestinationsByCountry, getPackagesByDestination } from "@/lib/destinations"
import { useState, useEffect, use } from "react"
import type { Metadata } from "next"
import { Star, MapPin, Clock, DollarSign, Calendar, Users, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface DestinationPageProps {
  params: Promise<{ country: string; slug: string }>
}





export default function DestinationPage({ params }: DestinationPageProps) {
  const [country, setCountry] = useState<any>(null)
  const [destination, setDestination] = useState<any>(null)
  const [packages, setPackages] = useState<any[]>([])
  const [relatedDestinations, setRelatedDestinations] = useState<any[]>([])

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const countrySlug = unwrappedParams.country
  const destinationSlug = unwrappedParams.slug

  useEffect(() => {
    const countryData = getCountryBySlug(countrySlug)
    const destinationData = getDestinationBySlug(countrySlug, destinationSlug)
    
    if (!countryData || !destinationData) {
      notFound()
    }
    
    setCountry(countryData)
    setDestination(destinationData)
    
    const packagesData = getPackagesByDestination(destinationData.slug)
    const relatedDestinationsData = getDestinationsByCountry(countrySlug)
      .filter(d => d.slug !== destinationData.slug)
      .slice(0, 3)
    
    setPackages(packagesData)
    setRelatedDestinations(relatedDestinationsData)
  }, [countrySlug, destinationSlug])

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  if (!country || !destination) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <TopBanner />
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading destination information...</p>
          </div>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-96">
          <div className="absolute inset-0">
            <img
              src={destination.heroImage}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
              <p className="text-xl max-w-2xl mx-auto px-4">{destination.summary}</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg">{destination.rating}</span>
                </div>
                <span className="text-lg">•</span>
                <span className="text-lg">{destination.reviews.toLocaleString()} reviews</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs 
            items={[
              { label: "Destinations", href: "/destinations" },
              { label: country.name, href: `/destinations/${country.slug}` },
              { label: destination.name }
            ]} 
          />
        </div>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {destination.description}
                  </p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Clock className="w-6 h-6 text-brand-accent mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{destination.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-green-600">
                      {formatPrice(destination.priceFrom)}
                    </div>
                    <div className="text-sm text-gray-600">Starting from</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-brand-accent mx-auto mb-2" />
                    <div className="text-sm font-bold text-gray-900">Best Time</div>
                    <div className="text-xs text-gray-600">{destination.bestTime}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-400 fill-current mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">{destination.rating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience Type</h3>
                  <div className="flex flex-wrap gap-2">
                                      {destination.tags.map((tag: string) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-sm px-3 py-1 capitalize"
                    >
                      {tag}
                    </Badge>
                  ))}
                  </div>
                </div>

                {/* Gallery */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {destination.images.slice(0, 6).map((image: string, index: number) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${destination.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Sticky Enquiry CTA */}
                <div className="sticky top-6 space-y-6">
                  {/* Quick Enquiry */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Plan Your Trip?</h3>
                      <p className="text-gray-600 mb-6">
                        Get in touch with our travel experts to start planning your perfect {destination.name} adventure.
                      </p>
                      <div className="space-y-3">
                        <Button className="w-full bg-brand-accent hover:bg-brand-accent/90">
                          Enquire Now
                        </Button>
                        <Button variant="outline" className="w-full">
                          Download Brochure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Facts */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Country:</span>
                          <span className="font-medium">{country.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Region:</span>
                          <span className="font-medium">{country.region}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Best Time:</span>
                          <span className="font-medium text-sm">{destination.bestTime.split('(')[0].trim()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{destination.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Starting Price:</span>
                          <span className="font-medium text-green-600">{formatPrice(destination.priceFrom)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        {packages.length > 0 && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Travel Packages</h2>
                <p className="text-xl text-gray-600">
                  Choose from our carefully curated packages for {destination.name}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <Card key={pkg.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        {pkg.featured && (
                          <Badge className="mb-2 bg-brand-accent text-white">Featured</Badge>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                        <p className="text-gray-600 text-sm">{pkg.duration}</p>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-green-600">{pkg.price}</span>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">What's Included:</h4>
                        <ul className="space-y-1">
                          {pkg.includes.map((item: string, index: number) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full bg-brand-accent hover:bg-brand-accent/90">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Destinations */}
        {relatedDestinations.length > 0 && (
          <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">More Destinations in {country.name}</h2>
                <p className="text-xl text-gray-600">
                  Explore other amazing places in {country.name}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedDestinations.map((dest, index) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    countrySlug={countrySlug}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
