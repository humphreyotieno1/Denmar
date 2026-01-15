"use client"

import React, { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ChevronLeft, ChevronRight, Info, Plus, Heart, UtensilsCrossed } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'

const DetailRow = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <div className="flex items-start gap-2">
    <Icon className="mt-0.5 h-4 w-4 text-rose-500" />
    <span>{children}</span>
  </div>
)

interface ValentinesPackagesProps {
  packages?: any[]
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
    char: string;
  }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      size: 10 + Math.random() * 20,
      char: ['❤', '♥', '♡'][Math.floor(Math.random() * 3)]
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-300/30 animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: '-20px',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          {heart.char}
        </div>
      ))}
    </div>
  )
}

const AmbientGlow = () => {
  const [glows, setGlows] = useState<Array<{
    id: number;
    left: number;
    top: number;
    size: number;
    bg: string;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const colors = ['#f43f5e', '#ec4899', '#e11d48', '#be123c'];
    const newGlows = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 100 + Math.random() * 200,
      bg: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
    }));
    setGlows(newGlows);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {glows.map((glow) => (
        <div
          key={glow.id}
          className="absolute rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"
          style={{
            left: `${glow.left}%`,
            top: `${glow.top}%`,
            width: `${glow.size}px`,
            height: `${glow.size}px`,
            backgroundColor: glow.bg,
            animationDelay: `${glow.delay}s`,
            animationDuration: `${glow.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export function ValentinesPackages({ packages = [] }: ValentinesPackagesProps) {
  const featuredPackages = packages.slice(0, 6)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="py-20 bg-gradient-to-b from-rose-50/50 to-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100/40 via-transparent to-transparent pointer-events-none" />
      <FloatingHearts />
      <AmbientGlow />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 bg-rose-100 rounded-full mb-4">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Romantic <span className="text-rose-500">Getaways</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Celebrate love in the most breathtaking destinations. Whether it's a beach retreat or a safari adventure, find the perfect escape for you and your significant other.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative px-4 md:px-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-4 pb-2">
              {featuredPackages.map((pkg, index: number) => (
                <div key={pkg.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <article className="group h-full flex flex-col bg-white rounded-3xl shadow-sm border border-rose-100/50 overflow-hidden hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                        {pkg.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-0 shadow-sm backdrop-blur-sm">
                              Featured
                            </Badge>
                          </div>
                        )}

                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-sm border border-white/20">
                            {pkg.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-rose-500 transition-colors">
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-6">
                          {pkg.shortDescription}
                        </p>

                        <div className="space-y-3 mb-6 flex-1">
                          <DetailRow icon={UtensilsCrossed}>
                            {pkg.includes[0] || "Romantic Dining"}
                          </DetailRow>
                          <DetailRow icon={Clock}>{pkg.duration}</DetailRow>
                          <DetailRow icon={CalendarDays}>{pkg.bestTime || "Feb 2026"}</DetailRow>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                          <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Starting from</p>
                            <p className="text-lg font-bold text-rose-500">{pkg.price}</p>
                          </div>
                          <Button
                            asChild
                            className="bg-slate-900 hover:bg-rose-500 text-white rounded-full px-6 shadow-lg shadow-slate-200 hover:shadow-rose-200 transition-all duration-300"
                          >
                            <Link href={`/packages/${pkg.slug}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg border border-slate-100 flex items-center justify-center text-slate-700 hover:text-rose-500 hover:scale-110 transition-all duration-300 z-20 group ${featuredPackages.length <= 3 ? 'lg:hidden' : ''}`}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={scrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg border border-slate-100 flex items-center justify-center text-slate-700 hover:text-rose-500 hover:scale-110 transition-all duration-300 z-20 group ${featuredPackages.length <= 3 ? 'lg:hidden' : ''}`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/packages">
            <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 rounded-full px-8">
              View All Couple Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
