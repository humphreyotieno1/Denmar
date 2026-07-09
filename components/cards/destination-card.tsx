"use client"

import { TravelCard } from "@/components/cards/travel-card"
import { Destination } from "@/lib/destinations"

interface DestinationCardProps {
  destination: Destination
  countrySlug: string
  index?: number
}

export function DestinationCard({ destination, countrySlug, index = 0 }: DestinationCardProps) {
  const price =
    destination.priceFrom > 0
      ? `From $${destination.priceFrom.toLocaleString()}`
      : undefined

  return (
    <TravelCard
      title={destination.name}
      description={destination.summary}
      image={destination.heroImage}
      imageAlt={`${destination.name} — ${destination.summary}`}
      href={`/destinations/${countrySlug}/${destination.slug}`}
      price={price}
      duration={destination.duration}
      badge={destination.featured ? "Featured" : undefined}
      exploreLabel="More Information"
      priority={index < 6}
    />
  )
}
