"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSlide {
  id: number
  image: string
  title: string
  subtitle: string
  cta: string
  ctaLink?: string // Optional link for CTA button
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/denmar1.jpeg",
    title: "The Bold and Daring",
    subtitle: "Escape to breathtaking destinations around the world",
    cta: "Plan Your Dream Trip",
    ctaLink: "/destinations",
  },
  {
    id: 2,
    image: "/denmar2.jpeg",
    title: "Adventure Awaits",
    subtitle: "Experience thrilling adventures in stunning locations",
    cta: "Explore Adventures",
    ctaLink: "/destinations",
  },
  {
    id: 3,
    image: "/denmar3.jpeg",
    title: "Cultural Journeys",
    subtitle: "Immerse yourself in rich cultures and ancient traditions",
    cta: "Discover Culture",
    ctaLink: "/destinations",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll effect
  useEffect(() => {
    startTimer()
    return () => clearTimer()
  }, [])

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
  }

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  // Handle hover to pause/resume carousel
  const handleMouseEnter = () => {
    clearTimer()
  }

  const handleMouseLeave = () => {
    startTimer()
  }

  return (
    <section
      className="relative h-[calc(100vh-10rem)] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
                {slide.subtitle}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-brand-accent hover:bg-brand-accent/100 text-brand-primary font-semibold px-8 py-4 text-lg transform hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in-up animation-delay-400"
              >
                <Link href={slide.ctaLink || "#"}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transform hover:scale-110 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transform hover:scale-110 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-brand-success scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}