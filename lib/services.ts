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
  category: 'travel' | 'accommodation' | 'transportation' | 'activities' | 'planning'
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
  description: string
  shortDescription: string
  duration: string
  price: string
  originalPrice?: string
  discount?: number
  includes: string[]
  excludes: string[]
  itinerary: DayItinerary[]
  featured: boolean
  image: string
  category: 'budget' | 'standard' | 'luxury' | 'adventure' | 'cultural'
  maxGroupSize: number
  difficulty: 'easy' | 'moderate' | 'challenging'
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

// Services Data
export const services: Service[] = [
  {
    id: "flight-booking",
    name: "Flight Booking",
    slug: "flight-booking",
    description: "Comprehensive flight booking services with the best prices and flexible options. We partner with major airlines to offer competitive rates and excellent customer service.",
    shortDescription: "Best flight deals with flexible booking options",
    icon: "✈️",
    features: [
      "24/7 booking support",
      "Price match guarantee",
      "Flexible date options",
      "Multi-city itineraries",
      "Loyalty program integration",
      "Cancellation protection"
    ],
    category: "transportation",
    featured: true
  },
  {
    id: "hotel-reservations",
    name: "Hotel Reservations",
    slug: "hotel-reservations",
    description: "Luxury and budget accommodation options worldwide. From boutique hotels to all-inclusive resorts, we ensure comfortable stays at competitive prices.",
    shortDescription: "Luxury and budget accommodation worldwide",
    icon: "🏨",
    features: [
      "Verified hotel reviews",
      "Best rate guarantee",
      "Free cancellation options",
      "Loyalty program benefits",
      "Group booking discounts",
      "Special amenities access"
    ],
    price: "From $50/night",
    category: "accommodation",
    featured: true
  },
  {
    id: "vacation-packages",
    name: "Vacation Packages",
    slug: "vacation-packages",
    description: "All-inclusive vacation packages that combine flights, accommodation, and activities. Save money and enjoy hassle-free travel planning.",
    shortDescription: "All-inclusive packages for stress-free travel",
    icon: "🎒",
    features: [
      "Customizable packages",
      "All-inclusive options",
      "Group discounts",
      "Travel insurance included",
      "24/7 support",
      "Flexible payment plans"
    ],
    price: "From $999",
    category: "travel",
    featured: true
  },
  {
    id: "travel-insurance",
    name: "Travel Insurance",
    slug: "travel-insurance",
    description: "Comprehensive travel insurance coverage for peace of mind. Protect your investment against unexpected cancellations, medical emergencies, and travel disruptions.",
    shortDescription: "Comprehensive coverage for worry-free travel",
    icon: "🛡️",
    features: [
      "Trip cancellation coverage",
      "Medical emergency protection",
      "Baggage loss coverage",
      "Flight delay compensation",
      "24/7 emergency assistance",
      "Pre-existing condition coverage"
    ],
    price: "From $49",
    category: "planning",
    featured: false
  },
  {
    id: "guided-tours",
    name: "Guided Tours",
    slug: "guided-tours",
    description: "Expert-led guided tours with local knowledge and insider access. Experience destinations like a local with our professional tour guides.",
    shortDescription: "Expert-led tours with local knowledge",
    icon: "👥",
    features: [
      "Local expert guides",
      "Small group sizes",
      "Skip-the-line access",
      "Cultural insights",
      "Flexible itineraries",
      "Photo opportunities"
    ],
    price: "From $99",
    category: "activities",
    featured: false
  },
  {
    id: "car-rental",
    name: "Car Rental",
    slug: "car-rental",
    description: "Reliable car rental services worldwide with flexible pickup and drop-off options. Choose from economy to luxury vehicles for your travel needs.",
    shortDescription: "Reliable car rental worldwide",
    icon: "🚗",
    features: [
      "Wide vehicle selection",
      "Flexible pickup/drop-off",
      "Insurance options",
      "GPS navigation",
      "Child seat options",
      "One-way rentals"
    ],
    price: "From $25/day",
    category: "transportation",
    featured: false
  }
]

// Deals Data
export const deals: Deal[] = [
  {
    id: "turkish-airlines",
    title: "Turkish Airlines",
    slug: "turkish-airlines",
    description: "Enjoy Discounts on all flight network & Flexible Ticket Fee with Turkish Airlines",
    shortDescription: "Massive Discounts & Flexible Ticket Fee",
    originalPrice: "$2,999",
    discountedPrice: "$2,199",
    discount: 40,
    validUntil: "2026-08-30",
    destinations: ["Turkey", "Istanbul", "Ankara"],
    image: "/deal1.jpeg",
    featured: true,
    category: "flight",
    terms: [
      "Booking Period Till 30th December 2025",
      "Travel Period Till 30th August 2026",
      "Upto 40% off for all flight network",
      "Subject to availability"
    ],
    highlights: [
      "Upto 40% off for all flight network",
      "Flexible ticket fee",
      "Travel Period Till 30th August 2026",
      "Booking Period Till 30th December 2025",
      "Subject to availability"
    ]
  },
  {
    id: "dubai-luxury-escape",
    title: "Dubai Luxury Escape",
    slug: "dubai-luxury-escape",
    description: "Indulge in the ultimate Dubai experience with our luxury package. Stay at 5-star hotels, enjoy desert adventures, and explore the city's iconic landmarks.",
    shortDescription: "Ultimate Dubai luxury experience",
    originalPrice: "$3,499",
    discountedPrice: "$2,799",
    discount: 20,
    validUntil: "2024-12-31",
    destinations: ["UAE", "Dubai"],
    image: "/top/dubai.jpg",
    featured: true,
    category: "package",
    terms: [
      "Valid for travel between Feb-May 2025",
      "Minimum 2 passengers",
      "Non-refundable",
      "Subject to availability"
    ],
    highlights: [
      "5-star hotel accommodation",
      "Desert safari experience",
      "Burj Khalifa access",
      "Shopping vouchers",
      "Airport transfers",
      "Half-day city tour"
    ]
  },
  {
    id: "zanzibar-beach-retreat",
    title: "Zanzibar Beach Retreat",
    slug: "zanzibar-beach-retreat",
    description: "Escape to the pristine beaches of Zanzibar with our beach retreat package. Enjoy crystal-clear waters, white sand beaches, and tropical paradise.",
    shortDescription: "Pristine Zanzibar beach paradise",
    originalPrice: "$1,899",
    discountedPrice: "$1,499",
    discount: 21,
    validUntil: "2024-12-31",
    destinations: ["Tanzania", "Zanzibar"],
    image: "/top/zanzibar.jpg",
    featured: true,
    category: "package",
    terms: [
      "Valid for travel between Jun-Oct 2025",
      "Minimum 2 passengers",
      "Non-refundable",
      "Subject to availability"
    ],
    highlights: [
      "Beachfront resort",
      "Water sports included",
      "Spice farm tour",
      "Stone Town exploration",
      "All meals included",
      "Airport transfers"
    ]
  },
  {
    id: "thailand-cultural-journey",
    title: "Thailand Cultural Journey",
    slug: "thailand-cultural-journey",
    description: "Immerse yourself in Thai culture with our comprehensive cultural journey. Visit ancient temples, explore bustling markets, and experience authentic Thai hospitality.",
    shortDescription: "Comprehensive Thai cultural experience",
    originalPrice: "$1,599",
    discountedPrice: "$1,299",
    discount: 19,
    validUntil: "2024-12-31",
    destinations: ["Thailand", "Bangkok", "Chiang Mai"],
    image: "/top/thailand.jpg",
    featured: false,
    category: "package",
    terms: [
      "Valid for travel between Nov-Apr 2025",
      "Minimum 2 passengers",
      "Non-refundable",
      "Subject to availability"
    ],
    highlights: [
      "Cultural workshops",
      "Temple visits",
      "Market exploration",
      "Thai cooking class",
      "Traditional massage",
      "Local guide included"
    ]
  }
]

// Packages Data (Enhanced)
export const packages: Package[] = [
  {
    id: "mombasa-beach-paradise",
    name: "Mombasa Beach Paradise",
    slug: "mombasa-beach-paradise",
    destinationSlug: "mombasa",
    description: "Experience the ultimate beach getaway in Mombasa with pristine beaches, crystal-clear waters, and rich cultural heritage. Perfect for relaxation and adventure.",
    shortDescription: "Ultimate beach getaway in Mombasa",
    duration: "7 days / 6 nights",
    price: "$1,299",
    originalPrice: "$1,599",
    discount: 19,
    includes: [
      "Return flights from Nairobi",
      "5-star beachfront resort",
      "All meals included",
      "Airport transfers",
      "Beach activities",
      "City tour with guide",
      "Snorkeling equipment",
      "Travel insurance"
    ],
    excludes: [
      "International flights",
      "Personal expenses",
      "Optional excursions",
      "Tips and gratuities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Arrive in Mombasa and transfer to your beachfront resort. Welcome dinner and orientation.",
        activities: ["Airport pickup", "Resort check-in", "Welcome dinner"],
        accommodation: "Beachfront Resort",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Beach Relaxation",
        description: "Full day at the beach with optional water sports and beach activities.",
        activities: ["Beach relaxation", "Water sports", "Beach volleyball"],
        accommodation: "Beachfront Resort",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Mombasa City Tour",
        description: "Explore the historic Old Town, Fort Jesus, and local markets with a professional guide.",
        activities: ["Old Town tour", "Fort Jesus visit", "Market exploration"],
        accommodation: "Beachfront Resort",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Marine Adventure",
        description: "Snorkeling adventure in the coral reefs and optional deep-sea fishing.",
        activities: ["Snorkeling", "Coral reef exploration", "Fishing (optional)"],
        accommodation: "Beachfront Resort",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Cultural Experience",
        description: "Visit local villages, learn about Swahili culture, and enjoy traditional music.",
        activities: ["Village visit", "Cultural workshop", "Traditional music"],
        accommodation: "Beachfront Resort",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Free Day",
        description: "Relax at the resort or choose from optional activities like spa treatments or boat trips.",
        activities: ["Resort relaxation", "Spa treatments (optional)", "Boat trips (optional)"],
        accommodation: "Beachfront Resort",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 7,
        title: "Departure",
        description: "Check out and transfer to airport for departure.",
        activities: ["Check-out", "Airport transfer"],
        meals: ["Breakfast"]
      }
    ],
    featured: true,
    image: "/top/mombasa.jpg",
    category: "luxury",
    maxGroupSize: 8,
    difficulty: "easy",
    bestTime: "December to March"
  },
  {
    id: "diani-adventure-escape",
    name: "Diani Adventure Escape",
    slug: "diani-adventure-escape",
    destinationSlug: "diani",
    description: "Thrilling adventure package in Diani with water sports, hiking, and cultural experiences. Perfect for active travelers seeking excitement.",
    shortDescription: "Thrilling adventure in Diani",
    duration: "5 days / 4 nights",
    price: "$899",
    includes: [
      "Return flights from Nairobi",
      "Adventure lodge accommodation",
      "All meals included",
      "Professional adventure guide",
      "Water sports equipment",
      "Hiking gear",
      "Cultural activities",
      "Travel insurance"
    ],
    excludes: [
      "International flights",
      "Personal expenses",
      "Optional activities",
      "Tips and gratuities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description: "Arrive in Diani and meet your adventure guide. Equipment fitting and safety briefing.",
        activities: ["Airport pickup", "Lodge check-in", "Safety briefing"],
        accommodation: "Adventure Lodge",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Water Sports Day",
        description: "Full day of water sports including kayaking, paddleboarding, and snorkeling.",
        activities: ["Kayaking", "Paddleboarding", "Snorkeling"],
        accommodation: "Adventure Lodge",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Hiking Adventure",
        description: "Guided hiking through Shimba Hills with wildlife spotting and scenic views.",
        activities: ["Hiking", "Wildlife spotting", "Scenic photography"],
        accommodation: "Adventure Lodge",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Cultural Immersion",
        description: "Visit local communities, learn traditional crafts, and enjoy local cuisine.",
        activities: ["Community visit", "Craft workshop", "Local cuisine"],
        accommodation: "Adventure Lodge",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Check out and transfer to airport for departure.",
        activities: ["Check-out", "Airport transfer"],
        meals: ["Breakfast"]
      }
    ],
    featured: true,
    image: "/top/diani.jpg",
    category: "adventure",
    maxGroupSize: 6,
    difficulty: "moderate",
    bestTime: "June to October"
  }
]

// Helper functions
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug)
}

export function getDealBySlug(slug: string): Deal | undefined {
  return deals.find(deal => deal.slug === slug)
}

export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find(pkg => pkg.slug === slug)
}

export function getPackagesByDestination(destinationSlug: string): Package[] {
  return packages.filter(pkg => pkg.destinationSlug === destinationSlug)
}

export function getPackagesByDestinationSlug(destinationSlug: string): Package[] {
  return packages.filter(pkg => pkg.destinationSlug === destinationSlug)
}

export function getFeaturedServices(): Service[] {
  return services.filter(service => service.featured)
}

export function getFeaturedDeals(): Deal[] {
  return deals.filter(deal => deal.featured)
}

export function getFeaturedPackages(): Package[] {
  return packages.filter(pkg => pkg.featured)
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return services.filter(service => service.category === category)
}

export function getDealsByCategory(category: Deal['category']): Deal[] {
  return deals.filter(deal => deal.category === category)
}

export function getPackagesByCategory(category: Package['category']): Package[] {
  return packages.filter(pkg => pkg.category === category)
}

export function searchServices(query: string): Service[] {
  const lowercaseQuery = query.toLowerCase()
  return services.filter(service => 
    service.name.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.shortDescription.toLowerCase().includes(lowercaseQuery)
  )
}

export function searchDeals(query: string): Deal[] {
  const lowercaseQuery = query.toLowerCase()
  return deals.filter(deal => 
    deal.title.toLowerCase().includes(lowercaseQuery) ||
    deal.description.toLowerCase().includes(lowercaseQuery) ||
    deal.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    deal.destinations.some(dest => dest.toLowerCase().includes(lowercaseQuery))
  )
}

export function searchPackages(query: string): Package[] {
  const lowercaseQuery = query.toLowerCase()
  return packages.filter(pkg => 
    pkg.name.toLowerCase().includes(lowercaseQuery) ||
    pkg.description.toLowerCase().includes(lowercaseQuery) ||
    pkg.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    pkg.destinationSlug.toLowerCase().includes(lowercaseQuery)
  )
}
