"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote, Facebook, Instagram, Youtube, Linkedin, Globe } from "lucide-react"
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

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.offsetWidth * 0.9
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl mb-6">What Our Travelers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experiences
            with Denmar Tours & Travel.
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-gray-400">
            Slide to explore reviews
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-gray-300 md:hidden">Swipe →</span>
        </div>

        {/* Testimonials Grid with Overlay Controls */}
        <div className="relative group">
          {/* Left Caret */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-14 w-14 rounded-full border-gray-200 bg-white/90 backdrop-blur-sm text-gray-700 shadow-xl hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide items-stretch px-4 -mx-4 md:px-6 md:-mx-6"
          >
            {testimonials.map((testimonial: any, index: number) => (
              <TestimonialCardItem key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>

          {/* Right Caret */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-10 hidden md:flex h-14 w-14 rounded-full border-gray-200 bg-white/90 backdrop-blur-sm text-gray-700 shadow-xl hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">Ready to create your own amazing travel story?</p>
          <Link href='/contact'>
            <Button
              size="lg"
              className="bg-brand-accent hover:bg-brand-accent/40 text-brand-primary font-semibold px-8 py-4"
            >
              Start Planning Your Trip
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function TestimonialCardItem({ testimonial, index }: { testimonial: any; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const SourceIcon = sourceIconMap[testimonial.source] ?? Globe
  const content = testimonial.content
  const maxLength = 160
  const isLong = content?.length > maxLength

  const displayText = !isExpanded && isLong 
    ? `${content.substring(0, maxLength)}...` 
    : content

  return (
    <motion.article
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.45, delay: index * 0.12 }}
      className="flex flex-col h-full min-h-[440px] w-[280px] flex-shrink-0 snap-center sm:w-[320px] lg:w-[360px]"
    >
      <Card className="group flex h-full flex-1 flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <CardContent className="flex flex-col flex-1 gap-8 p-8">
          <div className="flex flex-col flex-1 gap-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="56px"
                  />
                  <span className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white bg-brand-accent text-white shadow-md">
                    <SourceIcon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
                    {testimonial.location}
                  </div>
                  <p className="text-lg font-semibold text-brand-primary">{testimonial.name}</p>
                  {testimonial.trip && (
                    <p className="text-sm text-brand-accent">{testimonial.trip}</p>
                  )}
                </div>
              </div>
              <Quote className="h-10 w-10 text-brand-accent/80 flex-shrink-0" />
            </div>

            <div className="flex flex-col flex-1 justify-between gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
                    <SourceIcon className="h-3.5 w-3.5" />
                    {testimonial.source}
                  </span>
                </div>

                <div className="relative">
                  <p className="text-sm leading-relaxed text-gray-600">
                    “{displayText}”
                  </p>
                </div>
              </div>

              {isLong && (
                <div className="mt-auto pt-2">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-brand-accent text-[13px] font-bold uppercase tracking-wider hover:underline focus:outline-none"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  )
}
