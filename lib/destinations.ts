export interface Country {
  id: string
  name: string
  slug: string
  heroImage: string
  summary: string
  description: string
  region: string
  popularDestinations: number
  featured: boolean
}

export interface Destination {
  id: string
  countrySlug: string
  slug: string
  name: string
  images: string[]
  heroImage: string
  tags: string[] // beach, safari, city, cultural, adventure, luxury
  priceFrom: number
  priceTo?: number
  summary: string
  description: string
  coords?: { lat: number; lng: number }
  highlights: string[]
  bestTime: string
  duration: string
  rating: number
  reviews: number
  featured: boolean
}

export interface Package {
  id: string
  destinationSlug: string
  name: string
  duration: string
  price: string
  includes: string[]
  featured: boolean
}

// Runtime data - content is now fetched dynamically from the database using Prisma.
// The hardcoded data has been migrated to the database.
export const countries: Country[] = []
export const destinations: Destination[] = []
export const packages: Package[] = []

// Helper functions (placeholder exports for compatibility)
export function getCountryBySlug(slug: string): Country | undefined {
  return undefined
}

export function getDestinationsByCountry(countrySlug: string): Destination[] {
  return []
}

export function getDestinationBySlug(countrySlug: string, slug: string): Destination | undefined {
  return undefined
}

export function getPackagesByDestination(destinationSlug: string): Package[] {
  return []
}

export function getFeaturedCountries(): Country[] {
  return []
}

export function getFeaturedDestinations(): Destination[] {
  return []
}

export function getDestinationsByTag(tag: string): Destination[] {
  return []
}

export function searchDestinations(query: string): Destination[] {
  return []
}

