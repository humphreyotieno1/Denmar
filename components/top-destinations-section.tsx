"use client"

import { useRef, useState, useEffect } from "react"
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface Destination {
  id: number
  name: string
  image: string
  description: string
  price: string
  badge: string
  badgeColor: string
  href: string
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Nairobi, Kenya",
    image: "/top/nairobi.jpg",
    description: "Discover the vibrant city of Nairobi with its rich history, modern architecture, and diverse culture.",
    price: "From $1000",
    badge: "Hot Deal",
    badgeColor: "bg-red-500",
    href: "/destinations/kenya/nairobi",
  },
  {
    id: 2,
    name: "Europe",
    image: "/top/europe.jpg",
    description: "Explore the diverse and rich culture of Europe with its ancient landmarks, modern cities, and vibrant nightlife.",
    price: "From $1000",
    badge: "Popular",
    badgeColor: "bg-brand-accent",
    href: "/destinations/europe",
  },
  {
    id: 3,
    name: "Dubai, UAE",
    image: "/top/dubai.jpg",
    description: "Modern metropolis with world-class shopping, dining, and entertainment.",
    price: "From $1000",
    badge: "Popular",
    badgeColor: "bg-brand-success",
    href: "/destinations/uae/dubai",
  },
  {
    id: 4,
    name: "Africa",
    image: "/top/Africa.jpg",
    description: "Explore the diverse and rich culture of Africa with its ancient landmarks, modern cities, and vibrant nightlife.",
    price: "From $1000",
    badge: "Cultural",
    badgeColor: "bg-green-500",

    href: "/destinations/africa",
  },
  {
    id: 5,
    name: "Diani - Mombasa, Kenya",
    image: "/top/diani.jpg",
    description: "Tour the beautiful beaches of Mombasa with its rich history, modern architecture, and diverse culture.",
    price: "From $1000",
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    href: "/destinations/kenya/diani",
  },
  {
    id: 6,
    name: "Zanzibar, Tanzania",
    image: "/top/zanzibar.jpg",
    description: "Travel and get to experience the beauty of Zanzibar and Tanzania.",
    price: "From $1000",
    badge: "Exclusive",
    badgeColor: "bg-brand-secondary",
    href: "/destinations/tanzania/zanzibar",
  },
  {
    id: 7,
    name: "Thailand",
    image: "/top/thailand.jpg",
    description: "Explore the rich culture and beauty of Thailand.",
    price: "From $1000",
    badge: "Popular",
    badgeColor: "bg-brand-success",
    href: "/destinations/thailand/bangkok",
  },
  {
    id: 8,
    name: "Seychelles",
    image: "/top/seychelles.jpg",
    description: "Discover the crystal clear waters and beautiful beaches of Seychelles.",
    price: "From $1000",
    badge: "Romantic",
    badgeColor: "bg-pink-500",
    href: "/destinations/seychelles/mahe",
  },
  {
    id: 9,
    name: "South Africa",
    image: "/top/southafrica.jpg",
    description: "Travel and get to experience the beauty of South Africa.",
    price: "From $1000",
    badge: "Featured",
    badgeColor: "bg-brand-success",
    href: "/destinations/south-africa",
  },
  {
    id: 10,
    name: "Mauritius",
    image: "/top/mauritius.jpg",
    description: "Discover the beauty of Mauritius with its crystal clear waters and lush landscapes.",
    price: "From $1000",
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    href: "/destinations/mauritius/port-louis",
  },
  {
    id: 11,
    name: "Italy",
    image: "/top/italy.jpg",
    description: "Experience the rich history and culture of Italy.",
    price: "From $1000",
    badge: "Exclusive",
    badgeColor: "bg-brand-secondary",
    href: "/destinations/italy/rome",
  },
  {
    id: 12,
    name: "China",
    image: "/top/china.jpg",
    description: "Discover the rich history and culture of China.",
    price: "From $1000",
    badge: "New",
    badgeColor: "bg-brand-success",
    href: "/destinations/china/beijing",
  },
  {
    id: 13,
    name: "Turkey",
    image: "/top/turkey.jpg",
    description: "Explore the rich history and culture of Turkey.",
    price: "From $1000",
    badge: "Romantic",
    badgeColor: "bg-pink-500",
    href: "/destinations/turkey/istanbul",
  },
  {
    id: 14,
    name: "Singapore",
    image: "/top/singapore.jpg",
    description: "Experience the vibrant culture and modern architecture of Singapore.",
    price: "From $1000",
    badge: "Luxury",
    badgeColor: "bg-purple-500",
    href: "/destinations/singapore/singapore-city",
  },
  {
    id: 15,
    name: "Maldives",
    image: "/top/maldives.jpg",
    description: "Discover the beautiful beaches and crystal clear waters of the Maldives.",
    price: "From $1000",
    badge: "Exclusive",
    badgeColor: "bg-brand-secondary",
    href: "/destinations/maldives/male",
  },
  {
    id: 16,
    name: "Malaysia",
    image: "/top/malaysia.jpg",
    description: "Explore the diverse culture and natural beauty of Malaysia.",
    price: "From $1000",
    badge: "Popular",
    badgeColor: "bg-brand-success",
    href: "/destinations/malaysia/kuala-lumpur",
  },

]

export function TopDestinationsSection() {
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
            {destinations.map((destination, index) => (
              <motion.article
                key={destination.id}
                className="group w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl sm:w-[300px] md:w-[320px]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 300px, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs ${destination.badgeColor} text-white shadow-lg`}>
                    {destination.badge}
                  </Badge>
                </div>

                <div className="flex flex-col gap-4 p-6">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-gray-400">
                      <MapPin className="h-4 w-4 text-brand-accent" />
                      <span>{destination.name}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-4">
                      {destination.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="text-xs text-gray-500">
                      From <span className="font-semibold text-brand-success">{destination.price}</span>
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