"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface DealsPopupProps {
  deals?: any[]
}

export function DealsPopup({ deals = [] }: DealsPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Map database deals to the UI format
  const displayDeals = deals.map((d) => ({
    id: d.id,
    image: d.image || "/placeholder.svg",
    title: d.title,
    subtitle: d.subtitle,
    discount: d.discount || "",
    href: d.link
  }))

  useEffect(() => {
    if (displayDeals.length === 0) return

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
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        const lastSeen = localStorage.getItem("deals-popup-seen")
        const oneHourAgo = Date.now() - 60 * 60 * 1000

        if (!lastSeen || parseInt(lastSeen) < oneHourAgo) {
          setIsOpen(true)
          localStorage.setItem("deals-popup-seen", Date.now().toString())
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [displayDeals.length])

  useEffect(() => {
    if (isOpen && displayDeals.length > 0) {
      // Auto-advance slides every 6 seconds
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % displayDeals.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isOpen, displayDeals.length])

  const closePopup = () => {
    setIsOpen(false)
    localStorage.setItem("deals-popup-seen", new Date().getTime().toString())
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displayDeals.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displayDeals.length) % displayDeals.length)
  }

  if (!isOpen || displayDeals.length === 0) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closePopup}
      />

      {/* Popup Content */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
        </button>

        {/* Carousel */}
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
          {displayDeals.map((poster, index) => (
            <div
              key={poster.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
                }`}
            >
              <Image
                src={poster.image}
                alt={poster.title || `Deal ${index + 1} Image`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white z-20">
                <div className="max-w-2xl ml-0 sm:ml-0 md:ml-4">
                  {poster.discount && (
                    <div className="inline-block bg-brand-accent text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-4">
                      {poster.discount}
                    </div>
                  )}
                  {poster.title && (
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-3">
                      {poster.title}
                    </h2>
                  )}
                  {poster.subtitle && (
                    <p className="text-sm sm:text-lg md:text-xl opacity-90 mb-4 sm:mb-6">
                      {poster.subtitle}
                    </p>
                  )}
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg transform hover:scale-105 transition-all duration-200"
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
            className="hidden md:block absolute left-2 top-[calc(50%-4rem)] -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2.5 transform hover:scale-110 transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-2 top-[calc(50%-4rem)] -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full p-2.5 transform hover:scale-110 transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

          {/* Mobile Navigation */}
          <button
            onClick={prevSlide}
            className="md:hidden absolute left-3 top-6 z-30 bg-black/40 hover:bg-black/60 rounded-full p-1.5 transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="md:hidden absolute right-3 top-6 z-30 bg-black/40 hover:bg-black/60 rounded-full p-1.5 transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
            {displayDeals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                  ? "bg-brand-accent scale-125"
                  : "bg-white/50 hover:bg-white/80"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-3 sm:p-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Don't miss out on these amazing deals! Limited time offers available.
          </p>
        </div>
      </div>
    </div>
  )
}
