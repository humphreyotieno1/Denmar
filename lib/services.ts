export interface Service {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  icon: string
  features: string[]
  price?: string
  duration?: string
  category: 'travel' | 'accommodation' | 'transportation' | 'activities' | 'planning' | 'adventure'
  featured: boolean
  image?: string
}

export interface Deal {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  originalPrice: string
  discountedPrice: string
  discount: number
  validUntil: string
  destinations: string[]
  image: string
  featured: boolean
  category: 'flight' | 'hotel' | 'package' | 'activity'
  terms: string[]
  highlights: string[]
}

export interface Package {
  id: string
  name: string
  slug: string
  destinationSlug: string
  country: string
  description: string
  shortDescription: string
  duration: string
  price: string
  includes: string[]
  excludes: string[]
  terms: string[]
  itinerary: DayItinerary[]
  featured: boolean
  image: string
  category: 'family & kids' | 'group & corporate' | 'honeymoon & anniversaries' | 'festive' | 'adventure' | 'business'
  bestTime: string
}

export interface DayItinerary {
  day: number
  title: string
  description: string
  activities: string[]
  accommodation?: string
  meals: string[]
}

// Data interfaces - content is now fetched from the database
export const services: Service[] = []
export const deals: Deal[] = []
export const packages: Package[] = []
export const allPackages: Package[] = []
