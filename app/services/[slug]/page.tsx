"use client"

import { notFound } from "next/navigation"
import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getServiceBySlug } from "@/lib/services"
import { useState, useEffect, use } from "react"
import { Star, CheckCircle, Clock, DollarSign, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export default function ServicePage({ params }: ServicePageProps) {
  const [service, setService] = useState<any>(null)

  const [settings, setSettings] = useState<any>(null)
  const [loadingSettings, setLoadingSettings] = useState(true)

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const serviceSlug = unwrappedParams.slug

  useEffect(() => {
    // Fetch service data
    const serviceData = getServiceBySlug(serviceSlug)
    if (!serviceData) {
      notFound()
    }
    setService(serviceData)

    // Fetch site settings
    fetch('/api/denmar-portal/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data)
        setLoadingSettings(false)
      })
      .catch(err => {
        console.error("Failed to fetch settings:", err)
        setLoadingSettings(false)
      })
  }, [serviceSlug])

  if (!service || loadingSettings) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <TopBanner settings={settings} />
        <Navbar settings={settings} />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer settings={settings} />
        <FloatingActions />
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      travel: "bg-brand-accent",
      accommodation: "bg-green-500",
      transportation: "bg-blue-500",
      activities: "bg-purple-500",
      planning: "bg-orange-500"
    }
    return colors[category] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner settings={settings} />
      <Navbar settings={settings} />

      <main>
        {/* Hero Section */}
        <section className="relative h-96">
          <div className="absolute inset-0">
            <div className={`w-full h-full ${getCategoryColor(service.category)}/20 flex items-center justify-center`}>
              <span className="text-8xl">{service.icon}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white">
              <Badge
                variant="secondary"
                className={`${getCategoryColor(service.category)} text-white border-0 mb-4`}
              >
                {service.category}
              </Badge>
              <h1 className="text-5xl font-bold mb-4">{service.name}</h1>
              <p className="text-xl max-w-3xl mx-auto px-4">{service.shortDescription}</p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.name }
            ]}
          />
        </div>

        {/* Service Details */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About {service.name}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Features Grid */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Duration */}
                {(service.price || service.duration) && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Service Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.price && (
                        <Card className="border-0 shadow-lg">
                          <CardContent className="p-6 text-center">
                            <DollarSign className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Starting Price</h4>
                            <div className="text-2xl font-bold text-brand-accent">{service.price}</div>
                          </CardContent>
                        </Card>
                      )}
                      {service.duration && (
                        <Card className="border-0 shadow-lg">
                          <CardContent className="p-6 text-center">
                            <Clock className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Duration</h4>
                            <div className="text-lg font-medium text-gray-700">{service.duration}</div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <span className="ml-2 text-gray-600 capitalize">{service.category}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Features:</span>
                      <span className="ml-2 text-gray-600">{service.features.length}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Featured:</span>
                      <span className="ml-2 text-gray-600">
                        {service.featured ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-6 space-y-3">
                    <Button
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white"
                      size="lg"
                    >
                      Get Quote
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      Contact Expert
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore Other Services
              </h2>
              <p className="text-xl text-gray-600">
                Discover more ways we can help with your travel needs
              </p>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-brand-accent hover:bg-brand-accent/90 text-white"
                asChild
              >
                <a href="/services">
                  View All Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
      <FloatingActions />
    </div>
  )
}
