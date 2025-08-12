"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "Denmar Tours made our honeymoon in Bali absolutely perfect! Every detail was taken care of, from the beautiful resort to the amazing cultural tours. We couldn't have asked for a better experience.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Bali Honeymoon Package",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Toronto, Canada",
    rating: 5,
    text: "The Japan cultural tour exceeded all my expectations. The guides were knowledgeable, the accommodations were excellent, and I got to experience authentic Japanese culture in ways I never imagined.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Japan Cultural Experience",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    text: "As a solo female traveler, I was initially nervous about my trip to Morocco. Denmar Tours ensured I felt safe and supported throughout my journey. The experience was life-changing!",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Morocco Adventure Tour",
  },
  {
    id: 4,
    name: "David & Lisa Thompson",
    location: "London, UK",
    rating: 5,
    text: "Our family trip to Costa Rica was incredible! The kids loved the wildlife tours, and we appreciated how well-organized everything was. Denmar Tours really knows how to cater to families.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Costa Rica Family Adventure",
  },
  {
    id: 5,
    name: "Raj Patel",
    location: "Mumbai, India",
    rating: 5,
    text: "The European grand tour was a dream come true. Visiting 8 countries in 3 weeks seemed overwhelming, but Denmar Tours made it seamless. Every city, every experience was perfectly planned.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "European Grand Tour",
  },
  {
    id: 6,
    name: "Amanda Foster",
    location: "Sydney, Australia",
    rating: 5,
    text: "The African safari was the adventure of a lifetime! Seeing the Big Five in their natural habitat was breathtaking. The accommodations were luxurious and the guides were exceptional.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "African Safari Experience",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + itemsPerView >= testimonials.length ? 0 : prev + itemsPerView))
    }, 6000)
    return () => clearInterval(timer)
  }, [itemsPerView])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= testimonials.length ? 0 : prev + itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - itemsPerView) : Math.max(0, prev - itemsPerView),
    )
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-6">WHAT OUR TRAVELERS SAY</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experiences
            with Denmar Tours & Travel.
          </p>
        </div>

        {/* Navigation */}
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
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`w-3 h-3 rounded-full transition-all ${
                  Math.floor(currentIndex / itemsPerView) === index ? "bg-brand-accent" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="flex items-center space-x-2 bg-transparent"
            disabled={currentIndex + itemsPerView >= testimonials.length}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-brand-accent mb-4" />

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{testimonial.text}"</p>

                {/* Customer Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-brand-primary">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <div className="text-sm text-brand-accent font-medium">{testimonial.trip}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">Ready to create your own amazing travel story?</p>
          <Button
            size="lg"
            className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold px-8 py-4"
          >
            Start Planning Your Trip
          </Button>
        </div>
      </div>
    </section>
  )
}
