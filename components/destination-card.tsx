"use client"

import type { ElementType, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Star, Clock, Tag, CalendarDays, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Destination } from "@/lib/destinations"

interface DestinationCardProps {
  destination: Destination
  countrySlug: string
  index?: number
}

const DetailRow = ({ icon: Icon, children }: { icon: ElementType; children: ReactNode }) => (
  <div className="flex items-start gap-2 text-sm text-gray-600">
    <Icon className="mt-0.5 h-4 w-4 text-brand-accent" />
    <span>{children}</span>
  </div>
)

export function DestinationCard({ destination, countrySlug, index = 0 }: DestinationCardProps) {
  const formatPrice = (price: number) => {
    return `From $${price.toLocaleString()}`
  }

  const primaryHighlight = destination.highlights[0]
  const secondaryHighlight = destination.highlights[1]
  const tertiaryHighlight = destination.highlights[2]
  const displayTags = destination.tags.slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.article
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
        initial={{ opacity: 1 }}
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
          {destination.featured && (
            <Badge className="absolute left-4 top-4 bg-brand-accent text-white border-0 shadow-lg">
              Featured
            </Badge>
          )}
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/85 px-2 py-1 text-xs font-semibold text-[#3d3a2c] shadow">
            <Star className="h-3.5 w-3.5 text-yellow-500" />
            {destination.rating.toFixed(1)}
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <span className="uppercase text-[10px] tracking-[0.3em] text-white/70">Inspiration</span>
            <h3 className="text-lg font-semibold md:text-xl">{destination.name}</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 p-6">
          <div className="space-y-3">
            {!!displayTags.length && (
              <div className="flex flex-wrap gap-2">
                {displayTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full border-0 bg-brand-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-brand-accent"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-600 line-clamp-3">{destination.summary}</p>
          </div>

          <div className="flex-1 space-y-3">
            <DetailRow icon={Star}>
              Rated {destination.rating.toFixed(1)} ({destination.reviews.toLocaleString()} reviews)
            </DetailRow>
            <DetailRow icon={Clock}>{destination.duration}</DetailRow>
            <DetailRow icon={CalendarDays}>{`Best time: ${destination.bestTime}`}</DetailRow>
            {primaryHighlight && <DetailRow icon={Tag}>{primaryHighlight}</DetailRow>}
            {secondaryHighlight && <DetailRow icon={Info}>{secondaryHighlight}</DetailRow>}
            {tertiaryHighlight && <DetailRow icon={MapPin}>{tertiaryHighlight}</DetailRow>}
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {formatPrice(destination.priceFrom)} per person
            </span>
            <Button
              asChild
              className="w-full rounded-full bg-brand-primary text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-brand-primary/90 active:scale-95"
            >
              <Link href={`/destinations/${countrySlug}/${destination.slug}`}>Explore Destination</Link>
            </Button>
            <p className="text-xs text-gray-500">
              Tailor this escape with our travel specialists for your ideal dates.
            </p>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}
