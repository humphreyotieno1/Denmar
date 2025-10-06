"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface DealPoster {
  id: number
  image: string
  title: string
  subtitle: string
  discount: string
  href: string
}

const dealPosters: DealPoster[] = [
  {
    id: 1,
    image: "/deals/turkishairlines.jpeg",
    title: "Turkish Airlines",
    subtitle: "Enjoy Massive Discounts & Flexible Ticket Fee",
    discount: "Upto 40% OFF",
    href: "/deals/turkish-airlines"
  },
  {
    id: 2,
    image: "/deals/christmas.jpg",
    title: "Christmas Special",
    subtitle: "Ultimate Christmas luxury experience",
    discount: "25% OFF",
    href: "/packages"
  },
  {
    id:3,
    image: "/deals/customerservice.jpeg",
    title: "Customer Service Week",
    subtitle: "Happy Customer Service Week",
    discount: "Customer Service",
    href: "/contact"
  }
]

export function DealsPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasSeenPopup, setHasSeenPopup] = useState(false)

  useEffect(() => {
    // Check if user has seen the popup in the last hour
    const popupSeen = localStorage.getItem("deals-popup-seen")
    const now = new Date().getTime()
    const oneHourInMs = 60 * 60 * 1000 // 1 hour in milliseconds
    
    let shouldShowPopup = true
    
    if (popupSeen) {
      const lastSeen = parseInt(popupSeen)
      // Show popup again if it's been more than 1 hour
      if (now - lastSeen < oneHourInMs) {
        shouldShowPopup = false
      }
    }
    
    if (shouldShowPopup) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        // Only show if it's been more than an hour since last seen
        const lastSeen = localStorage.getItem("deals-popup-seen")
        const oneHourAgo = Date.now() - 60 * 60 * 1000
        
        if (!lastSeen || parseInt(lastSeen) < oneHourAgo) {
          setIsOpen(true)
          localStorage.setItem("deals-popup-seen", Date.now().toString())
        }
      }, 3000) // Show after 3 seconds
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Auto-advance slides every 4 seconds
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % dealPosters.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isOpen])

  const closePopup = () => {
    setIsOpen(false)
    setHasSeenPopup(true)
    // Store current timestamp when popup is closed
    localStorage.setItem("deals-popup-seen", new Date().getTime().toString())
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dealPosters.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dealPosters.length) % dealPosters.length)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closePopup}
      />
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Close popup"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>

        {/* Carousel */}
        <div className="relative h-96 sm:h-[500px]">
          {dealPosters.map((poster, index) => (
            <div
              key={poster.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={poster.image}
                alt={poster.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <div className="max-w-2xl">
                  <div className="inline-block bg-brand-accent text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    {poster.discount}
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold mb-3">
                    {poster.title}
                  </h2>
                  <p className="text-lg sm:text-xl opacity-90 mb-6">
                    {poster.subtitle}
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold px-6 py-3 text-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Link href={poster.href} onClick={closePopup}>
                      View Deal
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transform hover:scale-110 transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transform hover:scale-110 transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {dealPosters.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-brand-accent scale-125"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">
            Don't miss out on these amazing deals! Limited time offers available.
          </p>
        </div>
      </div>
    </div>
  )
}
