"use client"

import { useRef } from "react"
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
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-6">WHAT OUR TRAVELERS SAY</h2>
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
          <span className="text-xs uppercase tracking-[0.3em] text-gray-300">Swipe →</span>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-hide"
        >
          {testimonials.map((testimonial: any, index: number) => {
            const SourceIcon = sourceIconMap[testimonial.source] ?? Globe

            return (
              <motion.article
                key={testimonial.id}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                initial={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className="flex h-full w-[280px] flex-shrink-0 snap-center sm:w-[320px] lg:w-[360px]"
              >
                <Card className="group flex h-full flex-1 flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <CardContent className="flex h-full flex-col justify-between gap-8 p-8">
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
                            <p className="text-sm text-brand-accent">
                              {testimonial.trip}
                            </p>
                          )}
                        </div>
                      </div>
                      <Quote className="h-10 w-10 text-brand-accent/80" />
                    </div>

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

                      <p className="text-sm leading-relaxed text-gray-600">
                        “{testimonial.content}”
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            )
          })}
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
