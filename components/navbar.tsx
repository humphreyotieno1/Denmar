"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { TopBanner } from "./top-banner"

// Grouped destinations for better organization
const groupedDestinations = [
  {
    region: "Africa & Indian Ocean",
    destinations: [
      { name: "Kenya", href: "/destinations/kenya", image: "/denmar1.jpeg", subDestinations: [
        { name: "Mombasa", href: "/destinations/kenya/mombasa" },
        { name: "Diani Beach", href: "/destinations/kenya/diani" },
        { name: "Nairobi", href: "/destinations/kenya/nairobi" },
        { name: "Amboseli", href: "/destinations/kenya/amboseli" },
        { name: "Lake Naivasha", href: "/destinations/kenya/naivasha" },
      ]},
      { name: "Tanzania", href: "/destinations/tanzania", image: "/denmar2.jpeg", subDestinations: [
        { name: "Zanzibar", href: "/destinations/tanzania/zanzibar" },
      ]},
      { name: "South Africa", href: "/destinations/south-africa", image: "/denmar3.jpeg", subDestinations: [
        { name: "Cape Town", href: "/destinations/south-africa/cape-town" },
      ]},
      { name: "Seychelles", href: "/destinations/seychelles", image: "/denmar2.jpeg", subDestinations: [
        { name: "Mahe Island", href: "/destinations/seychelles/mahe" },
      ]},
      { name: "Mauritius", href: "/destinations/mauritius", image: "/denmar1.jpeg", subDestinations: [
        { name: "Port Louis", href: "/destinations/mauritius/port-louis" },
      ]},
    ],
  },
  {
    region: "Asia & Middle East",
    destinations: [
      { name: "UAE", href: "/destinations/uae", image: "/denmar2.jpeg", subDestinations: [
        { name: "Dubai", href: "/destinations/uae/dubai" },
      ]},
      { name: "Thailand", href: "/destinations/thailand", image: "/denmar1.jpeg", subDestinations: [
        { name: "Bangkok", href: "/destinations/thailand/bangkok" },
      ]},
      { name: "China", href: "/destinations/china", image: "/denmar3.jpeg", subDestinations: [
        { name: "Beijing", href: "/destinations/china/beijing" },
      ]},
      { name: "Singapore", href: "/destinations/singapore", image: "/denmar2.jpeg", subDestinations: [
        { name: "Singapore City", href: "/destinations/singapore/singapore-city" },
      ]},
      { name: "Malaysia", href: "/destinations/malaysia", image: "/denmar1.jpeg", subDestinations: [
        { name: "Kuala Lumpur", href: "/destinations/malaysia/kuala-lumpur" },
      ]},
      { name: "Maldives", href: "/destinations/maldives", image: "/denmar3.jpeg", subDestinations: [
        { name: "Male", href: "/destinations/maldives/male" },
      ]},
    ],
  },
  {
    region: "Europe",
    destinations: [
      { name: "Europe", href: "/destinations/europe", image: "/denmar3.jpeg", subDestinations: [
        { name: "Paris", href: "/destinations/europe/paris" },
      ]},
      { name: "Italy", href: "/destinations/italy", image: "/denmar2.jpeg", subDestinations: [
        { name: "Rome", href: "/destinations/italy/rome" },
      ]},
      { name: "Turkey", href: "/destinations/turkey", image: "/denmar1.jpeg", subDestinations: [
        { name: "Istanbul", href: "/destinations/turkey/istanbul" },
      ]},
    ],
  },
]

// Global search data
const globalSearchData = [
  // Destinations
  { type: "destination", name: "Mombasa", href: "/destinations/kenya/mombasa", image: "/top/mombasa.jpg" },
  { type: "destination", name: "Diani Beach", href: "/destinations/kenya/diani", image: "/top/diani.jpg" },
  { type: "destination", name: "Amboseli", href: "/destinations/kenya/amboseli", image: "/top/amboseli.jpg" },
  { type: "destination", name: "Lake Naivasha", href: "/destinations/kenya/naivasha", image: "/top/naivasha.jpg" },
  { type: "destination", name: "Tsavo", href: "/destinations/kenya/tsavo", image: "/top/tsavo.jpg" },
  { type: "destination", name: "Samburu", href: "/destinations/kenya/samburu", image: "/top/samburu.jpg" },
  { type: "destination", name: "Malindi", href: "/destinations/kenya/malindi", image: "/top/malindi.jpg" },
  { type: "destination", name: "Zanzibar", href: "/destinations/tanzania/zanzibar", image: "/denmar2.jpeg" },
  { type: "destination", name: "Cape Town", href: "/destinations/south-africa/cape-town", image: "/denmar3.jpeg" },
  { type: "destination", name: "Dubai", href: "/destinations/uae/dubai", image: "/denmar2.jpeg" },
  { type: "destination", name: "Bangkok", href: "/destinations/thailand/bangkok", image: "/denmar1.jpeg" },
  { type: "destination", name: "Paris", href: "/destinations/europe/paris", image: "/denmar3.jpeg" },
  { type: "destination", name: "Rome", href: "/destinations/italy/rome", image: "/denmar2.jpeg" },
  { type: "destination", name: "Istanbul", href: "/destinations/turkey/istanbul", image: "/denmar1.jpeg" },
  // Services
  { type: "service", name: "Flight Booking", href: "/services", image: "/denmar1.jpeg" },
  { type: "service", name: "Hotel Reservations", href: "/services", image: "/denmar2.jpeg" },
  { type: "service", name: "Tour Packages", href: "/services", image: "/denmar3.jpeg" },
  { type: "service", "name": "Car Rental", href: "/services", image: "/denmar1.jpeg" },
  { type: "service", name: "Travel Insurance", href: "/services", image: "/denmar2.jpeg" },
  // Deals
  { type: "deal", name: "Kenya Safari Package", href: "/deals", image: "/top/amboseli.jpg" },
  { type: "deal", name: "Beach Holiday Special", href: "/deals", image: "/top/diani.jpg" },
  { type: "deal", name: "City Break Deals", href: "/deals", image: "/denmar3.jpeg" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false)
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false)
  const [globalSearchQuery, setGlobalSearchQuery] = useState("")
  const [destinationsSearchQuery, setDestinationsSearchQuery] = useState("")
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const globalSearchRef = useRef<HTMLDivElement>(null)

  // Memoize grouped destinations to prevent re-renders
  const memoizedDestinations = useMemo(() => groupedDestinations, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
        setIsDestinationsOpen(false)
      }
      
      if (
        globalSearchRef.current &&
        !globalSearchRef.current.contains(event.target as Node)
      ) {
        setIsGlobalSearchOpen(false)
        setGlobalSearchQuery("")
      }
    }

    if (isMobileMenuOpen || isGlobalSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen, isGlobalSearchOpen])

  // Handle keyboard accessibility for dropdown
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false)
          setIsDestinationsOpen(false)
          menuButtonRef.current?.focus()
        }
        if (isGlobalSearchOpen) {
          setIsGlobalSearchOpen(false)
          setGlobalSearchQuery("")
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen, isGlobalSearchOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsDestinationsOpen(false)
    setDestinationsSearchQuery("")
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const toggleDestinations = () => setIsDestinationsOpen(!isDestinationsOpen)
  const toggleGlobalSearch = () => setIsGlobalSearchOpen(!isGlobalSearchOpen)

  // Filter global search results
  const filteredGlobalSearch = globalSearchData.filter(item =>
    item.name.toLowerCase().includes(globalSearchQuery.toLowerCase())
  )

  // Filter destinations for mini search (independent from global search)
  const filteredDestinations = memoizedDestinations
    .flatMap((group) =>
      group.destinations.flatMap((dest) => {
        const mainMatch = dest.name.toLowerCase().includes(destinationsSearchQuery.toLowerCase())
        const subMatches = dest.subDestinations?.filter((sub) =>
          sub.name.toLowerCase().includes(destinationsSearchQuery.toLowerCase())
        ) || []
        
        if (mainMatch) {
          return [dest]
        } else if (subMatches.length > 0) {
          return subMatches.map(sub => ({
            ...dest,
            name: sub.name,
            href: sub.href,
            image: dest.image
          }))
        }
        return []
      })
    )

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <TopBanner />
      <nav
        className={`bg-white transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : ""
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
            <Image
              src="/denmar.png"
              alt="Denmar Travel Logo"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg"
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg"
            >
              Services
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center space-x-1 text-gray-700 hover:text-brand-success transition-colors font-bold text-lg focus:outline-none focus:ring-2 focus:ring-brand-success rounded"
                aria-expanded={isDestinationsOpen}
                aria-controls="destinations-menu"
              >
                <span>Destinations</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                ref={dropdownRef}
                align="center"
                className="w-80 mt-2 bg-white rounded-lg shadow-lg p-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                id="destinations-menu"
              >
                {memoizedDestinations.map((group) => (
                  <div key={group.region} className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-2 mb-2">
                      {group.region}
                    </h3>
                    {group.destinations.map((destination) => (
                      <div key={destination.name} className="mb-2">
                        <DropdownMenuItem asChild>
                          <Link
                            href={destination.href}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-success"
                          >
                            <Image
                              src={destination.image}
                              alt={`${destination.name} preview`}
                              width={80}
                              height={80}
                              className="rounded-md object-cover"
                              loading="lazy"
                            />
                            <div className="flex-1">
                              <span className="text-md font-semibold block">{destination.name}</span>
                              {destination.subDestinations && destination.subDestinations.length > 0 && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {destination.subDestinations.slice(0, 2).map(sub => sub.name).join(", ")}
                                  {destination.subDestinations.length > 2 && "..."}
                                </div>
                              )}
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        {destination.subDestinations && destination.subDestinations.length > 0 && (
                          <div className="ml-4 space-y-1">
                            {destination.subDestinations.map((subDest) => (
                              <DropdownMenuItem key={subDest.name} asChild>
                                <Link
                                  href={subDest.href}
                                  className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                  <ChevronRight className="w-3 h-3 text-gray-400" />
                                  <span>{subDest.name}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/deals"
              className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg"
            >
              Deals
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Global Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleGlobalSearch}
              className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-brand-success"
              aria-label="Global search"
            >
              <Search className="h-5 w-5" />
              <span className="hidden lg:inline">Search</span>
            </Button>

            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Global Search Dropdown */}
      {isGlobalSearchOpen && (
        <div
          ref={globalSearchRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-50"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search destinations, services, deals..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full text-lg"
                autoFocus
              />
            </div>
            
            {globalSearchQuery.trim() === "" ? (
              <div className="text-center text-gray-500 py-8">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Start typing to search across our website</p>
                <p className="text-sm mt-2">Search for destinations, services, deals, and more</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {filteredGlobalSearch.map((item, index) => (
                  <Link
                    key={`${item.type}-${index}`}
                    href={item.href}
                    onClick={() => {
                      setIsGlobalSearchOpen(false)
                      setGlobalSearchQuery("")
                    }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500 capitalize">{item.type}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div
        ref={mobileMenuRef}
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Menu</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMobileMenu}
                className="p-1"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-4">
            {/* Mobile Global Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search across website..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {globalSearchQuery.trim() !== "" && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Search Results:</h4>
                <div className="space-y-2">
                  {filteredGlobalSearch.slice(0, 5).map((item, index) => (
                    <Link
                      key={`mobile-${item.type}-${index}`}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{item.type}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <MobileNavLink href="/" className="text-lg font-bold" onClick={closeMobileMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" className="text-lg font-bold" onClick={closeMobileMenu}>
              About Us
            </MobileNavLink>
            <MobileNavLink href="/services" className="text-lg font-bold" onClick={closeMobileMenu}>
              Services
            </MobileNavLink>

            <div className="mt-2">
              <button
                className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 text-lg font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-brand-success"
                onClick={toggleDestinations}
                aria-expanded={isDestinationsOpen}
                aria-controls="mobile-destinations-menu"
              >
                <span className="text-lg font-bold">Destinations</span>
                <ChevronRight
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isDestinationsOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
              <div
                className={`pl-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ${
                  isDestinationsOpen ? "max-h-[70vh]" : "max-h-0"
                }`}
                id="mobile-destinations-menu"
              >
                {/* Mini Search for Destinations */}
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={destinationsSearchQuery}
                    onChange={(e) => setDestinationsSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 pl-10 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-success"
                    aria-label="Search destinations"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                
                {/* Show filtered destinations if searching, otherwise show all */}
                {destinationsSearchQuery.trim() !== "" ? (
                  // Show filtered destinations from global search
                  filteredDestinations.slice(0, 10).map((destination) => (
                    <MobileNavLink
                      key={destination.name}
                      href={destination.href}
                      onClick={closeMobileMenu}
                      className="pl-3 text-sm flex items-center space-x-3"
                    >
                      <Image
                        src={destination.image}
                        alt={`${destination.name} preview`}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                        loading="lazy"
                      />
                      <span className="text-md font-semibold">{destination.name}</span>
                    </MobileNavLink>
                  ))
                ) : (
                  // Show all destinations grouped by region
                  memoizedDestinations.map((group) => (
                    <div key={group.region} className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide px-2">
                        {group.region}
                      </h3>
                      {group.destinations.map((destination) => (
                        <div key={destination.name}>
                          <MobileNavLink
                            href={destination.href}
                            onClick={closeMobileMenu}
                            className="pl-3 text-sm flex items-center space-x-3"
                          >
                            <Image
                              src={destination.image}
                              alt={`${destination.name} preview`}
                              width={40}
                              height={40}
                              className="rounded-md object-cover"
                              loading="lazy"
                            />
                            <span className="text-md font-semibold">{destination.name}</span>
                          </MobileNavLink>
                          {destination.subDestinations && destination.subDestinations.length > 0 && (
                            <div className="ml-6 mt-1 space-y-1">
                              {destination.subDestinations.map((subDest) => (
                                <MobileNavLink
                                  key={subDest.name}
                                  href={subDest.href}
                                  onClick={closeMobileMenu}
                                  className="pl-3 text-sm flex items-center space-x-2 text-gray-600"
                                >
                                  <ChevronRight className="w-3 h-3 text-gray-400" />
                                  <span>{subDest.name}</span>
                                </MobileNavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>

            <MobileNavLink href="/deals" className="text-lg font-bold" onClick={closeMobileMenu}>
              Deals
            </MobileNavLink>
            <MobileNavLink href="/contact" className="text-lg font-bold" onClick={closeMobileMenu}>
              Contact Us
            </MobileNavLink>
          </nav>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
    </header>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
  className = "",
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-brand-success transition-colors ${className}`}
    >
      {children}
    </Link>
  )
}