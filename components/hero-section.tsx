"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroSlides = [
  {
    id: 1,
    image: "/denmar1.jpeg",
    title: "Discover Paradise",
    subtitle: "Escape to breathtaking destinations around the world",
    cta: "Plan Your Dream Trip",
  },
  {
    id: 2,
    image: "/denmar2.jpeg",
    title: "Adventure Awaits",
    subtitle: "Experience thrilling adventures in stunning locations",
    cta: "Explore Adventures",
  },
  {
    id: 3,
    image: "/denmar3.jpeg",
    title: "Cultural Journeys",
    subtitle: "Immerse yourself in rich cultures and ancient traditions",
    cta: "Discover Culture",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-[calc(100vh-10rem)] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
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
              <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
                {slide.subtitle}
              </p>
              <Button
                size="lg"
                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold px-8 py-4 text-lg animate-fade-in-up animation-delay-400"
              >
                {slide.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all"
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
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-brand-accent" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
