"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, MapPin} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface Destination {
  id: number
  name: string
  image: string
  description: string
  price: string
  rating: number
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
    rating: 4.9,
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
    rating: 4.8,
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
    rating: 4.9,
    badge: "New",
    badgeColor: "bg-brand-success",
    href: "/destinations/uae/dubai",
  },
  {
    id: 4,
    name: "Africa",
    image: "/top/Africa.jpg",
    description: "Explore the diverse and rich culture of Africa with its ancient landmarks, modern cities, and vibrant nightlife.",
    price: "From $1000",
    rating: 4.7,
    badge: "Romantic",
    badgeColor: "bg-pink-500",
    href: "/destinations/africa",
  },
  {
    id: 5,
    name: "Diani - Mombasa, Kenya",
    image: "/top/diani.jpg",
    description: "Tour the beautiful beaches of Mombasa with its rich history, modern architecture, and diverse culture.",
    price: "From $1000",
    rating: 4.8,
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
    rating: 4.9,
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
    rating: 4.7,
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
    rating: 4.8,
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
    rating: 4.9,
    badge: "New",
    badgeColor: "bg-brand-success",
    href: "/destinations/south-africa",
  },
  {
    id: 10,
    name: "Mauritius",
    image: "/top/mauritius.jpg",
    description: "Discover the beauty of Mauritius with its crystal clear waters and lush landscapes.",
    price: "From $1000",
    rating: 4.7,
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
    rating: 4.8,
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
    rating: 4.9,
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
    rating: 4.7,
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
    rating: 4.8,
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
    rating: 4.9,
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
    rating: 4.7,
    badge: "Popular",
    badgeColor: "bg-brand-success",
    href: "/destinations/malaysia/kuala-lumpur",
  },

]

// Floating shape component for background elements
const FloatingShape = ({ className = "", delay = 0, duration = 10, y = 20 }) => (
  <motion.div
    className={`absolute rounded-full ${className}`}
    initial={{ y: 0, opacity: 0.1 }}
    animate={{ 
      y: [0, y, 0],
      opacity: [0.1, 0.15, 0.1]
    }}
    transition={{ 
      duration,
      delay,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
  />
)

export function TopDestinationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardWidth = 320 // Reduced to w-80 (20rem) for better responsiveness
  const gap = 16 // gap-4 = 1rem = 16px

  // Update currentIndex based on scroll position
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))
      setCurrentIndex(newIndex)
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => scrollContainer.removeEventListener("scroll", handleScroll)
  }, [cardWidth, gap])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        prevSlide()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex])

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return
    const scrollPosition = index * (cardWidth + gap)
    scrollContainerRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    })
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const nextIndex = Math.min(currentIndex + 1, destinations.length - 1)
    scrollToIndex(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = Math.max(currentIndex - 1, 0)
    scrollToIndex(prevIndex)
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-blue-50 to-teal-70">
      {/* Background Elements (clipped to section) */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingShape className="w-80 h-80 left-0 top-0 bg-brand-accent/15" delay={0} duration={8} y={20} />
        <FloatingShape className="w-64 h-64 right-1/2 bottom-0 bg-brand-success/15" delay={0.5} duration={10} y={15} />
        <FloatingShape className="w-48 h-48 right-1/3 top-1/4 bg-blue-400/15" delay={1} duration={12} y={10} />
        <FloatingShape className="w-48 h-48 left-1/3 bottom-1/4 bg-blue-400/15" delay={1} duration={12} y={10} />

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-brand-primary/25"
            style={{
              left: `${20 + Math.random() * 60}%`, // Constrain to avoid edges
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, 15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-4">
            TOP DESTINATIONS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular destinations and start planning your next adventure.
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* Horizontal Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
            tabIndex={0}
            role="region"
            aria-label="Destinations carousel"
          >
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="flex-shrink-0 w-80 snap-center" // Reduced to w-80
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden group">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      sizes="(max-width: 768px) 320px, 320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={false}
                    />
                    <Badge
                      className={`absolute top-4 left-4 ${destination.badgeColor} text-white border-0 transform group-hover:scale-110 transition-transform duration-300 z-10`}
                    >
                      {destination.badge}
                    </Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 transform group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-5 bg-gradient-to-b from-white to-gray-50">
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="h-5 w-5 text-brand-accent flex-shrink-0" />
                      <h3 className="font-heading text-lg font-bold text-brand-primary line-clamp-1">
                        {destination.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 min-h-[3.5rem]">
                      {destination.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-brand-success">
                        {destination.price}
                      </span>
                      <Link href={destination.href}>  
                        <Button
                          className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold hover:shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                          size="sm"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Floating Navigation Arrows */}
          <AnimatePresence>
            {currentIndex > 0 && (
              <motion.div
                key="prev-arrow"
                className="absolute top-1/2 -translate-y-1/2 left-2 z-10"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                  aria-label="Previous destination"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </motion.div>
            )}
            {currentIndex < destinations.length - 1 && (
              <motion.div
                key="next-arrow"
                className="absolute top-1/2 -translate-y-1/2 right-2 z-10"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                  aria-label="Next destination"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-6">
            {destinations.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-brand-accent w-6"
                    : "bg-gray-300 hover:bg-gray-400 w-2"
                }`}
                aria-label={`Go to destination ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}