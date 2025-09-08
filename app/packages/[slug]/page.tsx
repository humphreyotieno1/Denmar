"use client"

import { notFound } from "next/navigation"
import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PackageCard } from "@/components/package-card"
import { packages } from "@/lib/services"
import { useState, useEffect, use } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, Clock, DollarSign, Calendar, Users, CheckCircle, X, ArrowRight, Share2, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface PackagePageProps {
  params: Promise<{ slug: string }>
}

export default function PackagePage({ params }: PackagePageProps) {
  const [packageData, setPackageData] = useState<any>(null)
  const [relatedPackages, setRelatedPackages] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const slug = unwrappedParams.slug

  useEffect(() => {
    const pkg = packages.find(p => p.slug === slug)
    
    if (!pkg) {
      notFound()
    }
    
    setPackageData(pkg)
    
    // Get related packages (same category, excluding current)
    const related = packages
      .filter(p => p.category === pkg.category && p.id !== pkg.id)
      .slice(0, 3)
    
    setRelatedPackages(related)
  }, [slug])

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: packageData?.name || "Package", href: `/packages/${slug}` }
  ]

  if (!packageData) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <TopBanner />
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh] pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading package information...</p>
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

      <main className="pt-16">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-6xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Package Image */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <Image
                    src={packageData.image}
                    alt={packageData.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  

                  {/* Featured Badge */}
                  {packageData.featured && (
                    <Badge className="absolute top-4 left-4 bg-brand-accent text-white border-0">
                      Featured Package
                    </Badge>
                  )}
                </motion.div>
              </div>

              {/* Package Info */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-brand-primary mb-2">
                        {packageData.name}
                      </h1>
                      <p className="text-gray-600 text-lg">
                        {packageData.description}
                      </p>
                    </div>

                    {/* Package Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-brand-accent" />
                        <span className="text-gray-700">{packageData.duration}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-brand-accent" />
                        <span className="text-gray-700">Best time: {packageData.bestTime}</span>
                      </div>
                      
                    </div>

                    {/* Price */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-green-600">
                            From {packageData.price}
                          </div>
                          <div className="text-sm text-gray-600">per person sharing</div>
                        </div>
                        {packageData.featured && (
                          <Badge className="bg-red-500 text-white text-lg px-3 py-1">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        size="lg" 
                        className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white"
                        asChild
                      >
                        <a href="/contact">
                          Book This Package
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </a>
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="w-full border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white"
                        asChild
                      >
                        <a href="/contact">
                          Get Custom Quote
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Package Details Tabs */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "itinerary", label: "Itinerary" },
                  { id: "includes", label: "What's Included" },
                  { id: "terms", label: "Terms & Conditions" }
                ].map(tab => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                    className={activeTab === tab.id ? "bg-brand-accent text-white" : ""}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-primary mb-4">Package Overview</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {packageData.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Package Highlights</h4>
                        <ul className="space-y-2">
                          {packageData.includes.slice(0, 5).map((item: string, index: number) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Quick Facts</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{packageData.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Group Size:</span>
                            <span className="font-medium">Up to {packageData.maxGroupSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Difficulty:</span>
                            <span className="font-medium capitalize">{packageData.difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span className="font-medium capitalize">{packageData.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "itinerary" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-primary mb-6">Daily Itinerary</h3>
                    <div className="space-y-6">
                      {packageData.itinerary.map((day: any, index: number) => (
                        <Card key={index} className="border-l-4 border-l-brand-accent">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center font-bold">
                                {day.day}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                  {day.title}
                                </h4>
                                <p className="text-gray-700 mb-4">
                                  {day.description}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-2">Activities</h5>
                                    <ul className="space-y-1">
                                      {day.activities.map((activity: string, actIndex: number) => (
                                        <li key={actIndex} className="flex items-center gap-2 text-sm text-gray-600">
                                          <CheckCircle className="w-3 h-3 text-green-500" />
                                          {activity}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-2">Meals</h5>
                                    <div className="flex flex-wrap gap-1">
                                      {day.meals.map((meal: string, mealIndex: number) => (
                                        <Badge key={mealIndex} variant="secondary" className="text-xs">
                                          {meal}
                                        </Badge>
                                      ))}
                                    </div>
                                    {day.accommodation && (
                                      <>
                                        <h5 className="font-medium text-gray-900 mb-2 mt-3">Accommodation</h5>
                                        <p className="text-sm text-gray-600">{day.accommodation}</p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "includes" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-primary mb-6">What's Included</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Included in Package
                        </h4>
                        <ul className="space-y-3">
                          {packageData.includes.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                          <X className="w-5 h-5" />
                          Not Included
                        </h4>
                        <ul className="space-y-3">
                          {packageData.excludes.map((item: string, index: number) => (
                            <li key={index} className="flex items-start gap-3">
                              <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "terms" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-primary mb-6">Terms & Conditions</h3>
                    <div className="space-y-4">
                      {packageData.terms.map((term: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-brand-accent text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{term}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Packages */}
        {relatedPackages.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-brand-primary mb-4">
                  Similar Packages
                </h2>
                <p className="text-lg text-gray-600">
                  Explore more {packageData.category} packages you might enjoy
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPackages.map((pkg, index) => (
                  <PackageCard key={pkg.id} pkg={pkg} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <FloatingActions />

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
              onClick={() => setIsImageModalOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <Image
              src={packageData.image}
              alt={packageData.name}
              width={1200}
              height={800}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}
