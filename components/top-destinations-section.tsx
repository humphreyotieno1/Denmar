"use client"

import { useRef, useState, useEffect } from "react"
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface TopDestinationsSectionProps {
  destinations?: any[]
}

export function TopDestinationsSection({ destinations = [] }: TopDestinationsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
    }

    handleScroll()
    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollByOffset = (offset: number) => {
    scrollContainerRef.current?.scrollBy({ left: offset, behavior: "smooth" })
  }

  // Map database destinations to the UI format
  const displayDestinations = destinations.map((d) => ({
    id: d.id,
    name: d.name,
    image: d.heroImage || d.images[0] || "/placeholder.svg",
    description: d.summary || d.description,
    price: `From $${d.priceFrom}`,
    badge: d.featured ? "Featured" : "Popular",
    badgeColor: d.featured ? "bg-brand-accent" : "bg-brand-success",
    href: `/destinations/${d.slug}`,
  }))

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">
            Popular Tours
          </span>
          <h2 className="mt-6 font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
            Handpicked getaways guests can’t stop talking about
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg md:text-xl max-w-3xl mx-auto">
            Browse a curated mix of coast, safari and city escapes — each itinerary ready to tailor to your preferred travel dates.
          </p>
        </motion.div>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
          >
            {displayDestinations.map((destination, index) => (
              <motion.article
                key={destination.id}
                className="group flex h-[360px] w-[280px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl sm:h-[420px] sm:w-[300px] md:h-[440px] md:w-[320px]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 300px, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs ${destination.badgeColor} text-white shadow-lg`}>
                    {destination.badge}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-400">
                      <MapPin className="h-4 w-4 text-brand-accent" />
                      <span>{destination.name}</span>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-gray-600 line-clamp-4">
                      {destination.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="text-xs text-gray-500">
                      <span className="font-semibold text-brand-success">{destination.price}</span>
                    </span>
                    <Link
                      href={destination.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-accent"
                    >
                      More Information
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                key="left-arrow"
                type="button"
                className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:scale-110 sm:flex"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => scrollByOffset(-320)}
                aria-label="Scroll destinations left"
              >
                <ChevronLeft className="h-5 w-5 text-brand-primary" />
              </motion.button>
            )}
            {canScrollRight && (
              <motion.button
                key="right-arrow"
                type="button"
                className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:scale-110 sm:flex"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => scrollByOffset(320)}
                aria-label="Scroll destinations right"
              >
                <ChevronRight className="h-5 w-5 text-brand-primary" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
