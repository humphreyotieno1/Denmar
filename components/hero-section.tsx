"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Plane, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface HeroSlide {
  id: string
  image: string
  eyebrow: string | null
  title: string
  highlight: string | null
  subtitle: string
  buttonText: string
  buttonLink: string
}

const heroStats = [
  { label: "Countries", value: "35+", icon: <MapPin className="h-4 w-4" /> },
  { label: "Custom Itineraries", value: "500+", icon: <Plane className="h-4 w-4" /> },
  { label: "Guest Satisfaction", value: "4.9/5", icon: <Sparkles className="h-4 w-4" /> },
]

interface HighlightPackage {
  title: string
  duration: string
  price: string
  image: string
  link: string
}

interface HeroSectionProps {
  slides: HeroSlide[]
  highlightPackages?: HighlightPackage[]
}

export function HeroSection({ slides, highlightPackages = [] }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (slides.length > 0) {
      startTimer()
    }
    return () => clearTimer()
  }, [slides.length])

  const startTimer = () => {
    clearTimer()
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
  }

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleMouseEnter = () => {
    clearTimer()
  }

  const handleMouseLeave = () => {
    if (slides.length > 0) {
      startTimer()
    }
  }

  if (slides.length === 0) return null

  return (
    <section
      className="relative min-h-[640px] mt-18 sm:min-h-[740px] lg:min-h-[820px] overflow-hidden pb-16 sm:pb-20 lg:pb-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${index === currentSlide
            ? "opacity-100 scale-100"
            : "opacity-0 scale-105 pointer-events-none"
            }`}
        >
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={`${slide.eyebrow || ""} - ${slide.title} ${slide.highlight ?? ""} travel experience with Denmar Tours`}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
              quality={90}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/40 via-black/10 to-transparent sm:hidden" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-8 pt-16 sm:justify-center sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
            <div className="w-full text-white lg:w-3/5">
              {slide.eyebrow && (
                <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/80">
                  {slide.eyebrow}
                </div>
              )}
              <h1 className="mt-6 font-heading text-[34px] font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-[68px] lg:leading-[1.05]">
                {slide.title} {slide.highlight && <span className="text-brand-accent">{slide.highlight}</span>}
              </h1>
              <p className="mt-5 text-sm text-white/85 sm:text-lg md:text-xl lg:max-w-2xl">
                {slide.subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-accent text-brand-primary hover:bg-brand-accent/90 shadow-xl shadow-brand-accent/30"
                >
                  <Link href={slide.buttonLink || "#"}>{slide.buttonText}</Link>
                </Button>
              </div>

              <div className="mt-10 hidden lg:grid lg:grid-cols-3 lg:gap-10">
                {heroStats.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-white/85">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-white">{item.value}</div>
                      <div className="text-xs uppercase tracking-[0.28em] text-white/60">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 hidden grid-cols-3 gap-3 rounded-2xl bg-white/10 px-4 py-4 text-center text-white/85 backdrop-blur md:grid md:grid-cols-3 lg:hidden">
                {heroStats.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                      {item.icon}
                    </div>
                    <div className="text-base font-semibold text-white">{item.value}</div>
                    <div className="text-[9px] uppercase tracking-[0.32em] text-white/60">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 mx-auto w-full max-w-sm rounded-3xl bg-white/15 p-[1px] backdrop-blur sm:hidden">
                <div className="rounded-[calc(1.5rem-2px)] bg-white/95 p-4 shadow-xl shadow-black/15">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-brand-primary">Featured Inspirations</h2>
                    <Link
                      href="/deals"
                      className="text-[10px] font-medium uppercase tracking-[0.36em] text-brand-success hover:text-brand-success/80"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="mt-1 text-[13px] text-slate-600">
                    Curated journeys ready to customise with your travel designer.
                  </div>
                  <div className="mt-5 space-y-3">
                    {highlightPackages.map((pkg) => (
                      <Link
                        key={pkg.title}
                        href={pkg.link}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm transition hover:shadow-md"
                      >
                        <div className="relative h-14 w-16 overflow-hidden rounded-xl">
                          <Image src={pkg.image} alt={pkg.title} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-brand-primary">{pkg.title}</div>
                          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                            <span>{pkg.duration}</span>
                            <span className="font-semibold text-brand-success">{pkg.price}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="mt-4 w-full bg-brand-success text-white hover:bg-brand-success/90"
                  >
                    <Link href="/contact">Request Quote</Link>
                  </Button>
                </div>
              </div>
            </div>

            <aside className="hidden w-full max-w-md rounded-3xl bg-white/15 p-[1px] backdrop-blur-sm lg:mt-0 lg:block lg:w-2/5">
              <div className="rounded-[calc(1.5rem-2px)] bg-white/95 p-6 shadow-2xl shadow-black/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-brand-primary">Featured Inspirations</h2>
                  <Link
                    href="/deals"
                    className="text-xs font-medium uppercase tracking-[0.3em] text-brand-success hover:text-brand-success/80"
                  >
                    View All
                  </Link>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Curated journeys ready to customise with your personal travel designer.
                </p>

                <div className="mt-6 space-y-4">
                  {highlightPackages.map((pkg) => (
                    <Link
                      key={pkg.title}
                      href={pkg.link}
                      className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative h-16 w-20 overflow-hidden rounded-xl">
                        <Image src={pkg.image} alt={pkg.title} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-brand-primary group-hover:text-brand-success">
                          {pkg.title}
                        </div>
                        <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                          <span>{pkg.duration}</span>
                          <span className="font-semibold text-brand-success">{pkg.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-brand-success/50 bg-brand-success/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-success">Need something bespoke?</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Share your wish-list and our planners will craft a complimentary itinerary in under 24 hours.
                  </p>
                  <Button asChild size="sm" className="mt-4 w-full bg-brand-success text-white hover:bg-brand-success/90">
                    <Link href="/contact">Plan with Denmar</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 p-2 text-white transition hover:bg-white/25 lg:left-8"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 p-2 text-white transition hover:bg-white/25 lg:right-8"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${index === currentSlide ? "w-10 bg-brand-success" : "w-5 bg-white/50 hover:bg-white/80"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
