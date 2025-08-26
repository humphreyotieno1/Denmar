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

// Sample data - this can later be moved to a CMS
export const countries: Country[] = [
  {
    id: "kenya",
    name: "Kenya",
    slug: "kenya",
    heroImage: "/top/mombasa.jpg",
    summary: "Experience the magic of Kenya with its diverse landscapes, wildlife safaris, and pristine beaches.",
    description: "From the bustling capital of Nairobi to the pristine beaches of Mombasa and Diani, Kenya offers an incredible mix of urban culture, wildlife adventures, and coastal relaxation. Discover the Great Rift Valley, witness the Great Migration in the Masai Mara, and explore the historic coastal towns.",
    region: "East Africa",
    popularDestinations: 8,
    featured: true,
  },
  {
    id: "tanzania",
    name: "Tanzania",
    slug: "tanzania",
    heroImage: "/top/diani.jpg",
    summary: "Discover the natural wonders of Tanzania, from the Serengeti to the spice islands of Zanzibar.",
    description: "Tanzania is home to some of Africa's most iconic destinations including the Serengeti National Park, Mount Kilimanjaro, and the pristine beaches of Zanzibar. Experience world-class safaris, climb Africa's highest peak, or relax on tropical beaches.",
    region: "East Africa",
    popularDestinations: 6,
    featured: true,
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    slug: "uae",
    heroImage: "/denmar3.jpeg",
    summary: "Experience the perfect blend of tradition and modernity in the UAE's stunning cities.",
    description: "The UAE offers a fascinating mix of ancient traditions and cutting-edge innovation. From the towering skyscrapers of Dubai to the cultural heritage of Abu Dhabi, discover luxury shopping, desert adventures, and world-class dining.",
    region: "Middle East",
    popularDestinations: 4,
    featured: true,
  },
  {
    id: "thailand",
    name: "Thailand",
    slug: "thailand",
    heroImage: "/denmar1.jpeg",
    summary: "Immerse yourself in the Land of Smiles with its rich culture, stunning beaches, and vibrant cities.",
    description: "Thailand captivates visitors with its golden temples, pristine beaches, bustling markets, and warm hospitality. From the cultural heart of Bangkok to the tropical paradise of Phuket, every corner offers unique experiences.",
    region: "Southeast Asia",
    popularDestinations: 7,
    featured: true,
  },
  {
    id: "south-africa",
    name: "South Africa",
    slug: "south-africa",
    heroImage: "/denmar2.jpeg",
    summary: "Explore the Rainbow Nation's diverse landscapes, wildlife, and rich cultural heritage.",
    description: "South Africa offers an incredible variety of experiences from the vibrant city life of Cape Town and Johannesburg to the wildlife-rich Kruger National Park. Discover stunning coastlines, world-class wines, and fascinating history.",
    region: "Southern Africa",
    popularDestinations: 5,
    featured: false,
  },
  {
    id: "seychelles",
    name: "Seychelles",
    slug: "seychelles",
    heroImage: "/denmar3.jpeg",
    summary: "Escape to paradise with pristine beaches, crystal-clear waters, and lush tropical landscapes.",
    description: "The Seychelles archipelago offers some of the world's most beautiful beaches, perfect for honeymoons and luxury getaways. Experience island-hopping, water sports, and the unique Creole culture.",
    region: "Indian Ocean",
    popularDestinations: 3,
    featured: false,
  },
  {
    id: "mauritius",
    name: "Mauritius",
    slug: "mauritius",
    heroImage: "/denmar1.jpeg",
    summary: "Discover the perfect blend of beach relaxation and cultural experiences in Mauritius.",
    description: "Mauritius combines pristine beaches with rich cultural diversity, offering everything from water sports and hiking to exploring colonial architecture and local markets.",
    region: "Indian Ocean",
    popularDestinations: 4,
    featured: false,
  },
  {
    id: "italy",
    name: "Italy",
    slug: "italy",
    heroImage: "/denmar2.jpeg",
    summary: "Experience the art, history, and cuisine of Italy's most iconic destinations.",
    description: "From the ancient ruins of Rome to the romantic canals of Venice and the rolling hills of Tuscany, Italy offers an unparalleled cultural and culinary journey through history.",
    region: "Europe",
    popularDestinations: 6,
    featured: false,
  },
  {
    id: "china",
    name: "China",
    slug: "china",
    heroImage: "/denmar1.jpeg",
    summary: "Discover ancient wonders and modern marvels in China's vibrant cities.",
    description: "China offers an incredible blend of ancient traditions and modern innovation. From the Great Wall and Forbidden City to the bustling streets of Shanghai and the natural beauty of Guilin, every region tells a unique story.",
    region: "Asia",
    popularDestinations: 5,
    featured: false,
  },
  {
    id: "turkey",
    name: "Turkey",
    slug: "turkey",
    heroImage: "/denmar2.jpeg",
    summary: "Explore where East meets West with Turkey's rich history and diverse landscapes.",
    description: "Turkey bridges two continents, offering a fascinating mix of cultures, ancient ruins, stunning coastlines, and vibrant cities. From the historic streets of Istanbul to the otherworldly landscapes of Cappadocia.",
    region: "Europe/Asia",
    popularDestinations: 4,
    featured: false,
  },
  {
    id: "singapore",
    name: "Singapore",
    slug: "singapore",
    heroImage: "/denmar3.jpeg",
    summary: "Experience modern marvels and cultural diversity in vibrant Singapore.",
    description: "Singapore is a modern city-state that seamlessly blends cutting-edge technology with rich cultural heritage. Discover world-class shopping, diverse cuisine, and stunning architecture in this clean and efficient metropolis.",
    region: "Southeast Asia",
    popularDestinations: 3,
    featured: false,
  },
  {
    id: "maldives",
    name: "Maldives",
    slug: "maldives",
    heroImage: "/denmar1.jpeg",
    summary: "Escape to luxury with overwater villas and crystal-clear waters.",
    description: "The Maldives is the ultimate tropical paradise, featuring pristine white sand beaches, crystal-clear turquoise waters, and luxurious overwater accommodations. Perfect for honeymoons and exclusive getaways.",
    region: "Indian Ocean",
    popularDestinations: 2,
    featured: false,
  },
  {
    id: "malaysia",
    name: "Malaysia",
    slug: "malaysia",
    heroImage: "/denmar2.jpeg",
    summary: "Explore diverse cultures, rainforests, and vibrant cities in Malaysia.",
    description: "Malaysia offers a perfect blend of natural beauty, cultural diversity, and modern development. From the bustling streets of Kuala Lumpur to the pristine beaches of Langkawi and the ancient rainforests of Borneo.",
    region: "Southeast Asia",
    popularDestinations: 4,
    featured: false,
  },
  {
    id: "europe",
    name: "Europe",
    slug: "europe",
    heroImage: "/denmar3.jpeg",
    summary: "Discover the rich history, culture, and diversity of Europe's most iconic destinations.",
    description: "Europe offers an incredible variety of experiences from the romantic streets of Paris to the ancient ruins of Rome, the scenic fjords of Norway, and the vibrant culture of Barcelona. Each country has its own unique charm and history.",
    region: "Europe",
    popularDestinations: 8,
    featured: false,
  },
]

export const destinations: Destination[] = [
  // Kenya destinations
  {
    id: "mombasa",
    countrySlug: "kenya",
    slug: "mombasa",
    name: "Mombasa",
    images: ["/top/mombasa.jpg", "/denmar2.jpeg", "/denmar3.jpeg"],
    heroImage: "/top/mombasa.jpg",
    tags: ["beach", "cultural", "historic"],
    priceFrom: 1099,
    priceTo: 2999,
    summary: "Coastal paradise with pristine beaches and rich history",
    description: "Mombasa is a tropical coastal city in Kenya, known for its pristine beaches, coral reefs, and historic Old Town. Visitors can relax on the beach, snorkel or dive in the Indian Ocean, and explore the rich cultural heritage of the city.",
    coords: { lat: -4.0435, lng: 39.6682 },
    highlights: [
      "Beautiful beaches with crystal-clear waters",
      "Historic Old Town with Arabic architecture",
      "Coral reefs and marine life",
      "Snorkeling and diving opportunities",
      "Fort Jesus, a UNESCO World Heritage Site",
    ],
    bestTime: "December to March (peak: January to February)",
    duration: "4-10 days",
    rating: 4.8,
    reviews: 1247,
    featured: true,
  },
  {
    id: "diani",
    countrySlug: "kenya",
    slug: "diani",
    name: "Diani Beach",
    images: ["/top/diani.jpg", "/denmar1.jpeg", "/denmar2.jpeg"],
    heroImage: "/top/diani.jpg",
    tags: ["beach", "luxury", "adventure"],
    priceFrom: 1299,
    priceTo: 3499,
    summary: "Luxury beach resort destination with water sports",
    description: "Diani Beach is one of Kenya's most beautiful and exclusive beach destinations, offering pristine white sand, crystal-clear waters, and world-class resorts. Perfect for honeymoons, family vacations, and adventure seekers.",
    coords: { lat: -4.3167, lng: 39.5833 },
    highlights: [
      "Pristine white sand beaches",
      "Luxury beach resorts",
      "Water sports and diving",
      "Dolphin watching tours",
      "Local Swahili culture",
    ],
    bestTime: "December to March (peak: January to February)",
    duration: "5-12 days",
    rating: 4.9,
    reviews: 892,
    featured: true,
  },
  {
    id: "nairobi",
    countrySlug: "kenya",
    slug: "nairobi",
    name: "Nairobi",
    images: ["/denmar1.jpeg", "/denmar2.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar1.jpeg",
    tags: ["city", "cultural", "urban"],
    priceFrom: 899,
    priceTo: 1999,
    summary: "Vibrant capital city with modern amenities and wildlife experiences",
    description: "Nairobi, Kenya's capital, offers a unique blend of urban sophistication and natural wonders. Visit the Nairobi National Park for a safari experience just minutes from the city center, explore local markets, and enjoy the vibrant nightlife.",
    coords: { lat: -1.2921, lng: 36.8219 },
    highlights: [
      "Nairobi National Park safari",
      "Karen Blixen Museum",
      "Giraffe Centre",
      "Local markets and cuisine",
      "Modern shopping and entertainment",
    ],
    bestTime: "January to March, July to October",
    duration: "3-7 days",
    rating: 4.7,
    reviews: 1563,
    featured: false,
  },
  {
    id: "naivasha",
    countrySlug: "kenya",
    slug: "naivasha",
    name: "Lake Naivasha",
    images: ["/top/naivasha.jpg", "/denmar1.jpeg", "/denmar2.jpeg"],
    heroImage: "/top/naivasha.jpg",
    tags: ["nature", "adventure", "wildlife"],
    priceFrom: 799,
    priceTo: 1899,
    summary: "Freshwater lake surrounded by wildlife and adventure activities",
    description: "Lake Naivasha is a freshwater lake in the Great Rift Valley, surrounded by wildlife and offering various outdoor activities. Perfect for nature lovers, bird watchers, and those seeking adventure in a peaceful setting.",
    coords: { lat: -0.7771, lng: 36.4351 },
    highlights: [
      "Boat safaris on the lake",
      "Bird watching (400+ species)",
      "Hiking in Hell's Gate National Park",
      "Cycling adventures",
      "Wildlife viewing",
    ],
    bestTime: "June to October, January to March",
    duration: "2-5 days",
    rating: 4.6,
    reviews: 734,
    featured: false,
  },
  {
    id: "amboseli",
    countrySlug: "kenya",
    slug: "amboseli",
    name: "Amboseli National Park",
    images: ["/top/amboseli.jpg", "/denmar2.jpeg", "/denmar3.jpeg"],
    heroImage: "/top/amboseli.jpg",
    tags: ["safari", "wildlife", "nature"],
    priceFrom: 1499,
    priceTo: 3999,
    summary: "Iconic safari destination with views of Mount Kilimanjaro",
    description: "Amboseli National Park is famous for its large elephant herds and stunning views of Mount Kilimanjaro. The park offers excellent wildlife viewing opportunities and breathtaking landscapes that make for unforgettable safari experiences.",
    coords: { lat: -2.6531, lng: 37.2602 },
    highlights: [
      "Large elephant herds",
      "Mount Kilimanjaro views",
      "Game drives and safaris",
      "Bird watching",
      "Cultural Maasai village visits",
    ],
    bestTime: "June to October, January to March",
    duration: "3-7 days",
    rating: 4.9,
    reviews: 1123,
    featured: true,
  },
  {
    id: "tsavo",
    countrySlug: "kenya",
    slug: "tsavo",
    name: "Tsavo National Park",
    images: ["/top/tsavo.jpg", "/denmar1.jpeg", "/denmar2.jpeg"],
    heroImage: "/top/tsavo.jpg",
    tags: ["safari", "wildlife", "adventure"],
    priceFrom: 1299,
    priceTo: 3499,
    summary: "One of Kenya's largest parks with diverse wildlife",
    description: "Tsavo National Park is one of Kenya's largest and most diverse wildlife areas, divided into Tsavo East and Tsavo West. The park offers excellent game viewing, dramatic landscapes, and a more remote safari experience.",
    coords: { lat: -2.3333, lng: 38.5833 },
    highlights: [
      "Diverse wildlife viewing",
      "Dramatic landscapes",
      "Less crowded than other parks",
      "Bird watching",
      "Cultural experiences",
    ],
    bestTime: "June to October, January to March",
    duration: "3-7 days",
    rating: 4.7,
    reviews: 856,
    featured: false,
  },
  {
    id: "samburu",
    countrySlug: "kenya",
    slug: "samburu",
    name: "Samburu National Reserve",
    images: ["/top/samburu.jpg", "/denmar2.jpeg", "/denmar3.jpeg"],
    heroImage: "/top/samburu.jpg",
    tags: ["safari", "wildlife", "cultural"],
    priceFrom: 1399,
    priceTo: 3799,
    summary: "Remote wilderness with unique wildlife and cultural experiences",
    description: "Samburu National Reserve offers a more remote and authentic safari experience with unique wildlife species and rich cultural heritage. The reserve is known for its dramatic landscapes and traditional Samburu culture.",
    coords: { lat: 0.6667, lng: 37.5333 },
    highlights: [
      "Unique wildlife species",
      "Traditional Samburu culture",
      "Dramatic landscapes",
      "Less touristy experience",
      "Excellent bird watching",
    ],
    bestTime: "June to October, January to March",
    duration: "3-6 days",
    rating: 4.8,
    reviews: 623,
    featured: false,
  },
  {
    id: "malindi",
    countrySlug: "kenya",
    slug: "malindi",
    name: "Malindi",
    images: ["/top/malindi.jpg", "/denmar1.jpeg", "/denmar2.jpeg"],
    heroImage: "/top/malindi.jpg",
    tags: ["beach", "historic", "cultural"],
    priceFrom: 999,
    priceTo: 2499,
    summary: "Historic coastal town with beautiful beaches and Italian influence",
    description: "Malindi is a historic coastal town with beautiful beaches, rich history, and Italian cultural influence. It offers a more relaxed alternative to Mombasa with excellent seafood, water sports, and cultural sites.",
    coords: { lat: -3.2208, lng: 40.1167 },
    highlights: [
      "Beautiful beaches",
      "Historic sites and monuments",
      "Italian cultural influence",
      "Fresh seafood cuisine",
      "Water sports and diving",
    ],
    bestTime: "December to March (peak: January to February)",
    duration: "4-8 days",
    rating: 4.6,
    reviews: 445,
    featured: false,
  },

  // Tanzania destinations
  {
    id: "zanzibar",
    countrySlug: "tanzania",
    slug: "zanzibar",
    name: "Zanzibar",
    images: ["/denmar2.jpeg", "/denmar1.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar2.jpeg",
    tags: ["beach", "cultural", "historic"],
    priceFrom: 1299,
    priceTo: 3499,
    summary: "Spice island paradise with rich history and pristine beaches",
    description: "Zanzibar is a tropical paradise known for its spice trade history, pristine beaches, and rich cultural heritage. Explore Stone Town's historic architecture, relax on white sand beaches, and experience the unique blend of African, Arab, and European influences.",
    coords: { lat: -6.1659, lng: 39.2026 },
    highlights: [
      "Historic Stone Town",
      "Pristine white sand beaches",
      "Spice farm tours",
      "Traditional dhow sailing",
      "Rich cultural heritage",
    ],
    bestTime: "June to October, January to March",
    duration: "5-10 days",
    rating: 4.9,
    reviews: 1347,
    featured: true,
  },

  // UAE destinations
  {
    id: "dubai",
    countrySlug: "uae",
    slug: "dubai",
    name: "Dubai",
    images: ["/denmar3.jpeg", "/denmar1.jpeg", "/denmar2.jpeg"],
    heroImage: "/denmar3.jpeg",
    tags: ["city", "luxury", "modern"],
    priceFrom: 1499,
    priceTo: 4999,
    summary: "Modern metropolis with world-class shopping and entertainment",
    description: "Dubai is a futuristic city that seamlessly blends tradition with innovation. Experience luxury shopping, iconic architecture like the Burj Khalifa, desert adventures, and world-class dining and entertainment.",
    coords: { lat: 25.2048, lng: 55.2708 },
    highlights: [
      "Burj Khalifa",
      "Luxury shopping malls",
      "Desert safari adventures",
      "Palm Jumeirah",
      "Modern architecture",
    ],
    bestTime: "November to April",
    duration: "5-10 days",
    rating: 4.8,
    reviews: 2156,
    featured: true,
  },

  // Thailand destinations
  {
    id: "bangkok",
    countrySlug: "thailand",
    slug: "bangkok",
    name: "Bangkok",
    images: ["/denmar1.jpeg", "/denmar2.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar1.jpeg",
    tags: ["city", "cultural", "urban"],
    priceFrom: 899,
    priceTo: 2499,
    summary: "Vibrant capital with rich culture and modern amenities",
    description: "Bangkok is a bustling metropolis that offers a perfect blend of traditional Thai culture and modern urban life. Visit ancient temples, explore vibrant markets, and enjoy world-class street food and shopping.",
    coords: { lat: 13.7563, lng: 100.5018 },
    highlights: [
      "Grand Palace and temples",
      "Floating markets",
      "Street food culture",
      "Modern shopping malls",
      "Vibrant nightlife",
    ],
    bestTime: "November to April",
    duration: "4-8 days",
    rating: 4.7,
    reviews: 1876,
    featured: true,
  },

  // South Africa destinations
  {
    id: "cape-town",
    countrySlug: "south-africa",
    slug: "cape-town",
    name: "Cape Town",
    images: ["/denmar2.jpeg", "/denmar1.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar2.jpeg",
    tags: ["city", "cultural", "nature"],
    priceFrom: 1299,
    priceTo: 3499,
    summary: "Stunning coastal city with iconic Table Mountain",
    description: "Cape Town is one of the world's most beautiful cities, nestled between the Atlantic Ocean and the iconic Table Mountain. Experience world-class dining, stunning beaches, and rich cultural heritage.",
    coords: { lat: -33.9249, lng: 18.4241 },
    highlights: [
      "Table Mountain",
      "Robben Island",
      "V&A Waterfront",
      "Cape Point",
      "Wine regions",
    ],
    bestTime: "September to April",
    duration: "5-10 days",
    rating: 4.8,
    reviews: 2341,
    featured: true,
  },

  // Seychelles destinations
  {
    id: "mahe",
    countrySlug: "seychelles",
    slug: "mahe",
    name: "Mahe Island",
    images: ["/denmar3.jpeg", "/denmar1.jpeg", "/denmar2.jpeg"],
    heroImage: "/denmar3.jpeg",
    tags: ["beach", "luxury", "nature"],
    priceFrom: 2499,
    priceTo: 5999,
    summary: "Main island paradise with pristine beaches and luxury resorts",
    description: "Mahe is the largest and most developed island in the Seychelles archipelago, offering pristine beaches, lush mountains, and world-class luxury resorts. Perfect for both adventure and relaxation.",
    coords: { lat: -4.6796, lng: 55.4920 },
    highlights: [
      "Anse Lazio Beach",
      "Victoria city tour",
      "Morne Seychellois National Park",
      "Luxury resorts",
      "Island hopping",
    ],
    bestTime: "April to October",
    duration: "7-12 days",
    rating: 4.9,
    reviews: 892,
    featured: true,
  },

  // Mauritius destinations
  {
    id: "port-louis",
    countrySlug: "mauritius",
    slug: "port-louis",
    name: "Port Louis",
    images: ["/denmar1.jpeg", "/denmar2.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar1.jpeg",
    tags: ["city", "cultural", "historic"],
    priceFrom: 999,
    priceTo: 2499,
    summary: "Vibrant capital with rich history and cultural diversity",
    description: "Port Louis is the bustling capital of Mauritius, offering a fascinating mix of colonial architecture, vibrant markets, and cultural diversity. Experience the island's rich history and modern development.",
    coords: { lat: -20.1609, lng: 57.5012 },
    highlights: [
      "Central Market",
      "Fort Adelaide",
      "Blue Penny Museum",
      "Champ de Mars",
      "Cultural diversity",
    ],
    bestTime: "May to December",
    duration: "3-7 days",
    rating: 4.6,
    reviews: 567,
    featured: false,
  },

  // Italy destinations
  {
    id: "rome",
    countrySlug: "italy",
    slug: "rome",
    name: "Rome",
    images: ["/denmar2.jpeg", "/denmar1.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar2.jpeg",
    tags: ["city", "cultural", "historic"],
    priceFrom: 1299,
    priceTo: 3499,
    summary: "Eternal City with ancient ruins and Renaissance art",
    description: "Rome is a living museum where ancient history meets modern life. Explore the Colosseum, Vatican City, and countless historic sites while enjoying world-class cuisine and vibrant street life.",
    coords: { lat: 41.9028, lng: 12.4964 },
    highlights: [
      "Colosseum",
      "Vatican Museums",
      "Trevi Fountain",
      "Roman Forum",
      "Italian cuisine",
    ],
    bestTime: "April to June, September to October",
    duration: "5-10 days",
    rating: 4.9,
    reviews: 3456,
    featured: true,
  },

  // China destinations
  {
    id: "beijing",
    countrySlug: "china",
    slug: "beijing",
    name: "Beijing",
    images: ["/denmar1.jpeg", "/denmar2.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar1.jpeg",
    tags: ["city", "cultural", "historic"],
    priceFrom: 999,
    priceTo: 2999,
    summary: "Ancient capital with imperial palaces and modern innovation",
    description: "Beijing is China's historic heart, home to the Forbidden City, Great Wall, and countless cultural treasures. Experience the perfect blend of ancient traditions and modern development.",
    coords: { lat: 39.9042, lng: 116.4074 },
    highlights: [
      "Great Wall of China",
      "Forbidden City",
      "Temple of Heaven",
      "Summer Palace",
      "Hutong neighborhoods",
    ],
    bestTime: "March to May, September to November",
    duration: "5-10 days",
    rating: 4.7,
    reviews: 1892,
    featured: true,
  },

  // Turkey destinations
  {
    id: "istanbul",
    countrySlug: "turkey",
    slug: "istanbul",
    name: "Istanbul",
    images: ["/denmar2.jpeg", "/denmar1.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar2.jpeg",
    tags: ["city", "cultural", "historic"],
    priceFrom: 899,
    priceTo: 2499,
    summary: "Where East meets West in a city of two continents",
    description: "Istanbul is a mesmerizing city that bridges Europe and Asia, offering a unique blend of cultures, stunning architecture, and rich history. From the Hagia Sophia to the Grand Bazaar.",
    coords: { lat: 41.0082, lng: 28.9784 },
    highlights: [
      "Hagia Sophia",
      "Blue Mosque",
      "Grand Bazaar",
      "Bosphorus cruise",
      "Turkish cuisine",
    ],
    bestTime: "March to May, September to November",
    duration: "5-8 days",
    rating: 4.8,
    reviews: 2134,
    featured: true,
  },

  // Singapore destinations
  {
    id: "singapore-city",
    countrySlug: "singapore",
    slug: "singapore-city",
    name: "Singapore City",
    images: ["/denmar3.jpeg", "/denmar1.jpeg", "/denmar2.jpeg"],
    heroImage: "/denmar3.jpeg",
    tags: ["city", "modern", "cultural"],
    priceFrom: 1299,
    priceTo: 3999,
    summary: "Modern city-state with cutting-edge technology and diverse culture",
    description: "Singapore is a futuristic city that seamlessly blends technology with tradition. Experience world-class shopping, diverse cuisine, stunning architecture, and efficient urban planning.",
    coords: { lat: 1.3521, lng: 103.8198 },
    highlights: [
      "Marina Bay Sands",
      "Gardens by the Bay",
      "Sentosa Island",
      "Chinatown",
      "Hawker food centers",
    ],
    bestTime: "February to April, July to September",
    duration: "4-7 days",
    rating: 4.8,
    reviews: 1678,
    featured: true,
  },

  // Maldives destinations
  {
    id: "male",
    countrySlug: "maldives",
    slug: "male",
    name: "Male",
    images: ["/denmar1.jpeg", "/denmar2.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar1.jpeg",
    tags: ["beach", "luxury", "island"],
    priceFrom: 2999,
    priceTo: 7999,
    summary: "Capital island with luxury resorts and pristine beaches",
    description: "Male is the vibrant capital of the Maldives, offering a perfect blend of local culture and luxury tourism. Experience the authentic Maldivian way of life alongside world-class amenities.",
    coords: { lat: 4.1755, lng: 73.5093 },
    highlights: [
      "Male Friday Mosque",
      "National Museum",
      "Artificial Beach",
      "Luxury resorts",
      "Water sports",
    ],
    bestTime: "November to April",
    duration: "7-12 days",
    rating: 4.9,
    reviews: 1234,
    featured: true,
  },

  // Malaysia destinations
  {
    id: "kuala-lumpur",
    countrySlug: "malaysia",
    slug: "kuala-lumpur",
    name: "Kuala Lumpur",
    images: ["/denmar2.jpeg", "/denmar1.jpeg", "/denmar3.jpeg"],
    heroImage: "/denmar2.jpeg",
    tags: ["city", "cultural", "modern"],
    priceFrom: 799,
    priceTo: 1999,
    summary: "Dynamic capital with iconic towers and cultural diversity",
    description: "Kuala Lumpur is Malaysia's vibrant capital, known for its iconic Petronas Towers, diverse culture, and excellent food scene. Experience the perfect blend of tradition and modernity.",
    coords: { lat: 3.1390, lng: 101.6869 },
    highlights: [
      "Petronas Towers",
      "Batu Caves",
      "KL Tower",
      "Chinatown",
      "Malaysian cuisine",
    ],
    bestTime: "March to October",
    duration: "4-8 days",
    rating: 4.6,
    reviews: 1456,
    featured: false,
  },

  // Europe destinations
  {
    id: "paris",
    countrySlug: "europe",
    slug: "paris",
    name: "Paris",
    images: ["/denmar3.jpeg", "/denmar1.jpeg", "/denmar2.jpeg"],
    heroImage: "/denmar3.jpeg",
    tags: ["city", "cultural", "romantic"],
    priceFrom: 1499,
    priceTo: 3999,
    summary: "City of Light with iconic landmarks and romantic atmosphere",
    description: "Paris is the epitome of romance and culture, home to the Eiffel Tower, Louvre Museum, and countless historic sites. Experience the magic of the French capital with its world-class cuisine and art.",
    coords: { lat: 48.8566, lng: 2.3522 },
    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame Cathedral",
      "Champs-Élysées",
      "French cuisine",
    ],
    bestTime: "April to June, September to October",
    duration: "5-10 days",
    rating: 4.9,
    reviews: 4567,
    featured: true,
  },
]

export const packages: Package[] = [
  {
    id: "mombasa-getaway",
    destinationSlug: "mombasa",
    name: "Mombasa Getaway",
    duration: "4 days",
    price: "$1,099",
    includes: ["Beachfront hotel", "Airport transfers", "Daily breakfast", "Snorkeling excursion"],
    featured: true,
  },
  {
    id: "coastal-adventure",
    destinationSlug: "mombasa",
    name: "Coastal Adventure",
    duration: "7 days",
    price: "$1,999",
    includes: [
      "Luxury beach resort",
      "Private diving lessons",
      "Boat cruise",
      "Local cuisine cooking class",
      "Old Town tour",
    ],
    featured: false,
  },
  {
    id: "mombasa-tsavo",
    destinationSlug: "mombasa",
    name: "Mombasa & Tsavo",
    duration: "10 days",
    price: "$2,999",
    includes: [
      "Premium accommodations",
      "Safari game drives",
      "National park tour",
      "Cultural performances",
      "Spice farm visit",
    ],
    featured: true,
  },
]

// Helper functions
export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find(country => country.slug === slug)
}

export function getDestinationsByCountry(countrySlug: string): Destination[] {
  return destinations.filter(destination => destination.countrySlug === countrySlug)
}

export function getDestinationBySlug(countrySlug: string, slug: string): Destination | undefined {
  return destinations.find(destination => 
    destination.countrySlug === countrySlug && destination.slug === slug
  )
}

export function getPackagesByDestination(destinationSlug: string): Package[] {
  return packages.filter(pkg => pkg.destinationSlug === destinationSlug)
}

export function getFeaturedCountries(): Country[] {
  return countries.filter(country => country.featured)
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter(destination => destination.featured)
}

export function getDestinationsByTag(tag: string): Destination[] {
  return destinations.filter(destination => destination.tags.includes(tag))
}

export function searchDestinations(query: string): Destination[] {
  const lowercaseQuery = query.toLowerCase()
  return destinations.filter(destination =>
    destination.name.toLowerCase().includes(lowercaseQuery) ||
    destination.summary.toLowerCase().includes(lowercaseQuery) ||
    destination.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}
