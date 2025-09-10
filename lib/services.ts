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
  category: 'family & kids' | 'group & corporate' | 'honeymoon & anniversaries' | 'festive' | 'adventure'
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
    id: "dubai-holiday",
    name: "5-Day Dubai Holiday with Your Kids",
    slug: "dubai-holiday",
    destinationSlug: "dubai",
    country: "UAE",
    description: "Experience the ultimate getaway in Dubai with luxurious beachfront resort, crystal-clear waters, and rich cultural heritage. Perfect for relaxation and adventure.",
    shortDescription: "Travel to Dubai with your kids for a memorable holiday",
    duration: "5 days / 4 nights",
    price: "$1,330",
    includes: [
      "Return Economy Class Flight Tickets",
      "5 Days Luxury Accommodation in Dubai",
      "Return Airport Transfers",
      "Dubai Half Day City Tour",
      "Desert Safari with BBQ Dinner",
      "Marina Dhow Cruise Dinner",
      "Ski Dubai Classic Snow",
      "All Taxes Except the Tourist Dirham Fee"
    ],
    excludes: [
      "Visa Fee",
      "Travel Insurance",
      "Tips and gratuities",
      "Optional activities",
      "Tips and gratuities"
    ],
    terms: [
      "Valid for travel between 1st October - 20th December 2025",
      "Flight Rates are subject to change & availability",
      "Rates are per person sharing",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Arrive in Dubai and transfer to your hotel. Welcome dinner and orientation.",
        activities: ["Meet and Assist at the Airport", "Transfer to Hotel", "Hotel check-in"],
        accommodation: "Hotel",
        meals: [""]
      },
      {
        day: 2,
        title: "Dubai City Tour and Ski Dubai Classic Snow",
        description: "Half day Dubai City Tour and Ski Dubai Classic Snow",
        activities: ["Dubai City Tour", "Ski Dubai Classic Snow"],
        accommodation: "Hotel",
        meals: ["Breakfast"]
      },
      {
        day: 3,
        title: "Desert Safari",
        description: "Desert Safari with BBQ Dinner",
        activities: ["Desert Safari", "BBQ Dinner"],
        accommodation: "Hotel",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Marina Dhow Cruise Dinner",
        description: "Marina Dhow Cruise Dinner",
        activities: ["Marina Dhow Cruise Dinner"],
        accommodation: "Hotel",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Check Out",
        description: "Check Out and Transfer to Airport",
        activities: ["Check Out", "Transfer to Airport"],
        accommodation: "Hotel",
        meals: ["Breakfast"]
      },
    ],
    featured: true,
    image: "/package1.jpeg",
    category: "family & kids",
    bestTime: "1st October - 20th December 2025"
  },
  {
    id: "three-day-mombasa-getaway",
    name: "Three Day Mombasa Getaway",
    slug: "three-day-mombasa-getaway",
    destinationSlug: "mombasa",
    country: "Kenya",
    description: "Explore Mombasa with our three-day getaway package. Enjoy water sports, cultural experiences, and relaxation at a luxurious lodge.",
    shortDescription: "Thrilling adventure in Mombasa",
    duration: "3 days / 2 nights",
    price: "Ksh 18,000",
    includes: [
      "2 Nights Accomodation",
      "Meals as indicated on the poster",
      "Access to hotel amenities",
      "Government taxes"
    ],
    excludes: [
      "Transport",
      "Tips and Gratitudes",
      "Extra night rates upon request",
      "Kids rates provided upon request"
    ],
    itinerary: [
      {
        day: 1,
        title: "",
        description: "",
        activities: [""],
        accommodation: "",
        meals: [""]
      }
    ],
    featured: true,
    image: "/packages/mombasapackage.jpeg",
    category: "adventure",
    bestTime: "15th September - 30th November 2025",
    terms: [
      "Valid for travel between 15th - 30th November 2025",
      "Rates are per person sharing",
      "Rates are subject to change and availabiltiy",
    ]
  },
  {
    id: "magical-holiday-zanzibar",
    name: "Magical Holiday Zanzibar",
    slug: "magical-holiday-zanzibar",
    destinationSlug: "zanzibar",
    country: "Tanzania",
    description: "Explore Zanzibar with our magical holiday package. Enjoy water sports, cultural experiences, and relaxation at a luxurious lodge.",
    shortDescription: "Thrilling adventure in Zanzibar",
    duration: "5 days / 4 nights",
    price: "$1020",
    includes: [
      "4 Nights Accomodation",
      "Return economy class flight tickets",
      "Meal plan on half board basis",
      "Mnemba Island Tour",
      "Snorkelling + Safari Blu Tour",
      "Prison Island Tour + Stone Town Tour",
      "All Taxes except infrastructure tax"
    ],
    excludes: [
      "Tips and Gratitudes",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Arrive in Zanzibar and transfer to your hotel. Welcome dinner and orientation.",
        activities: ["Meet and Assist at the Airport", "Transfer to Hotel", "Hotel check-in", "Welcome Dinner", "Orientation"],
        accommodation: "Hotel",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 2,
        title: "Mnemba Island Tour",
        description: "Mnemba Island Tour",
        activities: ["Mnemba Island Tour"],
        accommodation: "Hotel",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 3,
        title: "Snorkelling + Safari Blu Tour",
        description: "Snorkelling + Safari Blu Tour",
        activities: ["Snorkelling + Safari Blu Tour"],
        accommodation: "Hotel",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 4,
        title: "Prison Island Tour + Stone Town Tour",
        description: "Prison Island Tour + Stone Town Tour",
        activities: ["Prison Island Tour + Stone Town Tour"],
        accommodation: "Hotel",
        meals: ["Breakfast", "Dinner"]
      },
      {
        day: 5,
        title: "Departure",
        description: "Departure from Zanzibar",
        activities: ["Departure from Zanzibar"],
        accommodation: "Hotel",
        meals: [""]
      }
    ],
    featured: true,
    image: "/packages/zanzibarpackage.jpeg",
    category: "adventure",
    bestTime: "1st November - 30th November 2025",
    terms: [
      "Valid for travel between 1st November - 30th November 2025",
      "Rates are per person sharing",
      "Rates are subject to change and availabiltiy",
    ]
  },
  {
    id: "three-day-mombasa-with-sgr",
    name: "Three Day Mombasa with SGR",
    slug: "three-day-mombasa-with-sgr",
    destinationSlug: "mombasa",
    country: "Kenya",
    description: "Explore Mombasa with SGR. Enjoy water sports, cultural experiences, and relaxation at a luxurious lodge.",
    shortDescription: "Thrilling adventure in Mombasa",
    duration: "3 days / 2 nights",
    price: "Ksh 20,000",
    includes: [
      "2 Nights Accomodation",
      "Meals as indicated on the poster",
      "Return Economy Class SGR Tickets",
      "Access to hotel amenities",
      "Government taxes"
    ],
    excludes: [
      "Transport",
      "Tips and Gratitudes",
      "Extra night rates upon request",
      "Kids rates provided upon request"
    ],
    itinerary: [
      {
        day: 1,
        title: "",
        description: "",
        activities: [""],
        accommodation: "",
        meals: [""]
      }
    ],
    featured: true,
    image: "/packages/mombasawithsgrpackage.jpeg",
    category: "adventure",
    bestTime: "15th September - 30th November 2025",
    terms: [
      "Valid for travel between 15th - 30th November 2025",
      "Rates are per person sharing",
      "Rates are subject to change and availabiltiy",
    ]
  },
  {
    id: "self-drive-malindi-watamu-package",
    name: "Self Drive Malindi Watamu Package",
    slug: "self-drive-malindi-watamu-package",
    destinationSlug: "malindi-watamu",
    country: "Kenya",
    description: "Explore Malindi and Watamu with our self-drive package. Enjoy water sports, cultural experiences, and relaxation at a luxurious lodge.",
    shortDescription: "Thrilling adventure in Malindi and Watamu",
    duration: "3 days / 2 nights",
    price: "Ksh 21,250",
    includes: [
      "2 Nights Accomodation",
      "Meals as indicated on the poster",
      "Access to hotel amenities",
      "Government taxes"
    ],
    excludes: [
      "Transport",
      "Tips and Gratitudes",
      "Extra night rates upon request",
      "Kids rates provided upon request"
    ],
    itinerary: [
      {
        day: 1,
        title: "",
        description: "",
        activities: [""],
        accommodation: "",
        meals: [""]
      }
    ],
    featured: true,
    image: "/packages/malindiwatamupackage.jpeg",
    category: "adventure",
    bestTime: "15th September - 30th November 2025",
    terms: [
      "Valid for travel between 15th - 30th November 2025",
      "Rates are per person sharing",
      "Rates are subject to change and availabiltiy",
    ]
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
