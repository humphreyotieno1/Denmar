"use client"

import { notFound } from "next/navigation"
import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getDealBySlug } from "@/lib/services"
import { useState, useEffect, use } from "react"
import { Star, MapPin, Calendar, Percent, ArrowRight, CheckCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface DealPageProps {
  params: Promise<{ slug: string }>
}

export default function DealPage({ params }: DealPageProps) {
  const [deal, setDeal] = useState<any>(null)

  // Unwrap params using React.use()
  const unwrappedParams = use(params)
  const dealSlug = unwrappedParams.slug

  useEffect(() => {
    const dealData = getDealBySlug(dealSlug)
    if (!dealData) {
      notFound()
    }
    setDeal(dealData)
  }, [dealSlug])

  if (!deal) {
    return (
      <div className="min-h-screen overflow-x-hidden">
        <TopBanner />
        <Navbar />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading deal information...</p>
          </div>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      package: "bg-brand-accent",
      flight: "bg-blue-500",
      hotel: "bg-green-500",
      activity: "bg-purple-500"
    }
    return colors[category] || "bg-gray-500"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateSavings = () => {
    const original = parseInt(deal.originalPrice.replace(/[^0-9]/g, ''))
    const discounted = parseInt(deal.discountedPrice.replace(/[^0-9]/g, ''))
    return original - discounted
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-96">
          <div className="absolute inset-0">
            <Image
              src={deal.image}
              alt={deal.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white">
              <Badge 
                variant="secondary" 
                className={`${getCategoryColor(deal.category)} text-white border-0 mb-4`}
              >
                {deal.category}
              </Badge>
              <h1 className="text-5xl font-bold mb-4">{deal.title}</h1>
              <p className="text-xl max-w-3xl mx-auto px-4">{deal.shortDescription}</p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs 
            items={[
              { label: "Deals", href: "/deals" },
              { label: deal.title }
            ]} 
          />
        </div>

        {/* Deal Details */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Deal</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {deal.description}
                </p>

                {/* Destinations */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Destinations</h3>
                  <div className="flex flex-wrap gap-2">
                    {deal.destinations.map((dest: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {dest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deal.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Terms & Conditions</h3>
                  <div className="space-y-2">
                    {deal.terms.map((term: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Summary</h3>
                  
                  {/* Pricing */}
                  <div className="mb-6 p-4 bg-white rounded-lg border">
                    <div className="text-center mb-4">
                      <div className="text-sm text-gray-500 line-through">
                        {deal.originalPrice}
                      </div>
                      <div className="text-3xl font-bold text-brand-accent">
                        {deal.discountedPrice}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        Save ${calculateSavings()}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Badge className={`${getCategoryColor(deal.category)} text-white border-0 text-sm font-bold`}>
                        <Percent className="w-3 h-3 mr-1" />
                        {deal.discount}% OFF
                      </Badge>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <span className="ml-2 text-gray-600 capitalize">{deal.category}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Valid Until:</span>
                      <span className="ml-2 text-gray-600">{formatDate(deal.validUntil)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Destinations:</span>
                      <span className="ml-2 text-gray-600">{deal.destinations.length}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Highlights:</span>
                      <span className="ml-2 text-gray-600">{deal.highlights.length}</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <Link href="/contact">
                    <Button 
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white"
                      size="lg"
                    >
                      Book This Deal
                    </Button>
                    </Link>

                    {/* <Button 
                      variant="outline" 
                      className="w-full"
                      size="lg"
                    >
                      
                      Contact Sales
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Deals */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                More Amazing Deals
              </h2>
              <p className="text-xl text-gray-600">
                Don't miss out on other incredible offers
              </p>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-brand-accent hover:bg-brand-accent/90 text-white"
                asChild
              >
                <a href="/deals">
                  View All Deals
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
