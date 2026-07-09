"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote, Facebook, Instagram, Youtube, Linkedin, Globe } from "@/components/ui/huge-icons"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface TestimonialsSectionProps {
  testimonials?: any[]
}

const sourceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  Instagram,
  YouTube: Youtube,
  Youtube,
  LinkedIn: Linkedin,
  Linkedin,
}

export function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState<any | null>(null)
  const loopTestimonials = useMemo(
    () => (testimonials.length > 1 ? [...testimonials, ...testimonials] : testimonials),
    [testimonials],
  )

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.offsetWidth * 0.85
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || testimonials.length < 2) return

    let frame = 0
    const speedPerFrame = 0.45

    const tick = () => {
      if (!isPaused && container) {
        container.scrollLeft += speedPerFrame
        const resetAt = container.scrollWidth / 2
        if (container.scrollLeft >= resetAt) {
          container.scrollLeft -= resetAt
        }
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isPaused, testimonials.length])

  if (!testimonials.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl">What Our Travelers Say</h2>
            <p className="mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
              Real stories from guests who have explored Kenya and beyond with Denmar.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            {testimonials.length > 1 ? "Auto-scrolling reviews" : "Guest review"}
          </p>
        </div>

        <div
          className="relative rounded-3xl p-4 sm:p-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 rounded-full border-gray-200 bg-white/95 text-gray-700 shadow-md transition-all hover:border-brand-secondary hover:text-brand-secondary md:flex"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="scrollbar-hide -mx-2 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-2 py-2 sm:gap-5"
          >
            {loopTestimonials.map((testimonial: any, index: number) => (
              <TestimonialCardItem
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
                index={index}
                onReadMore={() => setActiveTestimonial(testimonial)}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 rounded-full border-gray-200 bg-white/95 text-gray-700 shadow-md transition-all hover:border-brand-secondary hover:text-brand-secondary md:flex"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">Ready to create your own amazing travel story?</p>
          <Link href='/contact'>
            <Button
              size="lg"
              className="bg-brand-accent rounded-full hover:bg-brand-accent/40 text-brand-primary font-semibold px-8 py-4"
            >
              Start Planning Your Trip
            </Button>
          </Link>
        </div>
      </div>

      {activeTestimonial && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Review by ${activeTestimonial.name}`}
          onClick={() => setActiveTestimonial(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-xl font-bold text-brand-primary">{activeTestimonial.name}</h3>
              <button
                type="button"
                className="text-sm font-semibold text-gray-500 transition-colors hover:text-brand-accent"
                onClick={() => setActiveTestimonial(null)}
              >
                Close
              </button>
            </div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {activeTestimonial.location} • {activeTestimonial.source}
            </p>
            <p className="text-sm leading-relaxed text-gray-700">“{activeTestimonial.content}”</p>
          </div>
        </div>
      )}
    </section>
  )
}

function TestimonialCardItem({
  testimonial,
  index,
  onReadMore,
}: {
  testimonial: any
  index: number
  onReadMore: () => void
}) {
  const SourceIcon = sourceIconMap[testimonial.source] ?? Globe
  const content = testimonial.content
  const maxLength = 160
  const isLong = content?.length > maxLength
  const displayText = isLong ? `${content.substring(0, maxLength)}...` : content

  return (
    <motion.article
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.05 }}
      className="flex h-[332px] w-[280px] flex-shrink-0 snap-center flex-col sm:h-[342px] sm:w-[320px] lg:w-[340px]"
    >
      <Card className="group flex h-full flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <CardContent className="flex h-full flex-1 flex-col gap-5 p-6">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex min-h-[58px] items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="48px"
                  />
                  <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-brand-accent text-white shadow-sm">
                    <SourceIcon className="h-3 w-3" />
                  </span>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    {testimonial.location}
                  </div>
                  <p className="text-base font-semibold text-brand-primary">{testimonial.name}</p>
                  {testimonial.trip && (
                    <p className="text-xs text-brand-accent">{testimonial.trip}</p>
                  )}
                </div>
              </div>
              <Quote className="h-8 w-8 flex-shrink-0 text-brand-accent/70" />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-3">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
                    <SourceIcon className="h-3 w-3" />
                    {testimonial.source}
                  </span>
                </div>

                <div className="min-h-[88px]">
                  <p className="line-clamp-4 text-sm leading-relaxed text-gray-600">
                    “{displayText}”
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-1">
                {isLong ? (
                  <button
                    type="button"
                    onClick={onReadMore}
                    className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-accent transition-colors hover:text-brand-primary"
                  >
                    Read More
                  </button>
                ) : (
                  <span className="text-[12px] opacity-0">Read More</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  )
}
