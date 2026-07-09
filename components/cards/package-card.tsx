"use client"

import type { Package } from "@/lib/services"
import { TravelCard } from "@/components/cards/travel-card"

interface PackageCardProps {
  pkg: Package
  index?: number
  className?: string
}

export function PackageCard({ pkg, index = 0, className = "" }: PackageCardProps) {
  return (
    <TravelCard
      title={pkg.name}
      description={pkg.shortDescription}
      image={pkg.image || "/placeholder.svg"}
      imageAlt={`${pkg.name} — ${pkg.duration}`}
      href={`/packages/${pkg.slug}`}
      price={pkg.price}
      duration={pkg.duration}
      badge={pkg.featured ? "Featured" : undefined}
      exploreLabel="View Package"
      className={className}
      priority={index < 3}
    />
  )
}
