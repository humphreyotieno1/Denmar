"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { TopBanner } from "./top-banner"
import { usePathname } from "next/navigation"

// Grouped destinations for better organization
const groupedDestinations = [
  {
    region: "Africa & Indian Ocean",
    destinations: [
      { name: "Kenya", href: "/destinations/kenya", image: "/top/amboseli.jpg", subDestinations: [
        { name: "Mombasa", href: "/destinations/kenya/mombasa" },
        { name: "Diani Beach", href: "/destinations/kenya/diani" },
        { name: "Nairobi", href: "/destinations/kenya/nairobi" },
        { name: "Amboseli", href: "/destinations/kenya/amboseli" },
        { name: "Lake Naivasha", href: "/destinations/kenya/naivasha" },
      ]},
      { name: "Tanzania", href: "/destinations/tanzania", image: "/top/zanzibar.jpg", subDestinations: [
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
      { name: "UAE", href: "/destinations/uae", image: "/top/dubai.jpg", subDestinations: [
        { name: "Dubai", href: "/destinations/uae/dubai" },
      ]},
      { name: "Thailand", href: "/destinations/thailand", image: "/top/thailand.jpg", subDestinations: [
        { name: "Bangkok", href: "/destinations/thailand/bangkok" },
      ]},
      { name: "China", href: "/destinations/china", image: "/top/china.jpg", subDestinations: [
        { name: "Beijing", href: "/destinations/china/beijing" },
      ]},
      { name: "Singapore", href: "/destinations/singapore", image: "/top/singapore.jpg", subDestinations: [
        { name: "Singapore City", href: "/destinations/singapore/singapore-city" },
      ]},
      { name: "Malaysia", href: "/destinations/malaysia", image: "/top/malaysia.jpg", subDestinations: [
        { name: "Kuala Lumpur", href: "/destinations/malaysia/kuala-lumpur" },
      ]},
      { name: "Maldives", href: "/destinations/maldives", image: "/top/maldives.jpg", subDestinations: [
        { name: "Male", href: "/destinations/maldives/male" },
      ]},
    ],
  },
  {
    region: "Europe",
    destinations: [
      { name: "Europe", href: "/destinations/europe", image: "/top/paris.jpg", subDestinations: [
        { name: "Paris", href: "/destinations/europe/paris" },
      ]},
      { name: "Italy", href: "/destinations/italy", image: "/top/italy.jpg", subDestinations: [
        { name: "Rome", href: "/destinations/italy/rome" },
      ]},
      { name: "Turkey", href: "/destinations/turkey", image: "/top/turkey.jpg", subDestinations: [
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
  const globalSearchRef = useRef<HTMLDivElement>(null)
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null)
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false)
  const [focusWithinMegaMenu, setFocusWithinMegaMenu] = useState(false)
  const desktopMenuRef = useRef<HTMLDivElement>(null)

  // Memoize grouped destinations to prevent re-renders
  const memoizedDestinations = useMemo(() => groupedDestinations, [])
  const featuredColumns = useMemo(
    () =>
      memoizedDestinations.map((group) => ({
        title: group.region,
        items: group.destinations,
      })),
    [memoizedDestinations]
  )

  const featuredHighlights = useMemo(
    () => [
      {
        title: "African Safaris",
        description: "Tailor-made safari adventures across Kenya, Tanzania, and South Africa.",
        href: "/destinations/kenya",
      },
      {
        title: "Middle East Wonders",
        description: "Luxurious city escapes and desert experiences from Dubai to Qatar.",
        href: "/destinations/uae/dubai",
      },
      {
        title: "European Classics",
        description: "Romantic getaways and cultural tours across Europe’s timeless capitals.",
        href: "/destinations/europe",
      },
    ],
    []
  )

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

      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target as Node)
      ) {
        setActiveDesktopDropdown(null)
        setIsMegaMenuVisible(false)
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
        setActiveDesktopDropdown(null)
        setIsMegaMenuVisible(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMobileMenuOpen, isGlobalSearchOpen])

  const pathname = usePathname()

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
        className={cn(
          "relative bg-white border-b border-[#d6c98f]/60",
          "shadow-[0_10px_24px_rgba(60,50,20,0.08)]"
        )}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          <Link
            href="/"
            className="flex items-center"
            onClick={closeMobileMenu}
          >
            <Image
              src="/denmar.png"
              alt="Denmar Travel Logo"
              width={120}
              height={48}
              className="object-contain"
              priority
            />
          </Link>

          <div
            className="hidden lg:flex flex-1 items-center justify-center gap-8"
            ref={desktopMenuRef}
          >
            <DesktopNavLink href="/" isActive={pathname === "/"}>
              Home
            </DesktopNavLink>
            <DesktopNavLink href="/about" isActive={pathname.startsWith("/about")}
            >
              Our Company
            </DesktopNavLink>
            <DesktopDropdown
              label="Destinations"
              isActive={activeDesktopDropdown === "destinations" && isMegaMenuVisible}
              isCurrent={pathname.startsWith("/destinations")}
              onOpen={() => {
                setActiveDesktopDropdown("destinations")
                setIsMegaMenuVisible(true)
              }}
              onClose={() => {
                setActiveDesktopDropdown(null)
                setIsMegaMenuVisible(false)
              }}
              onFocusChange={(value) => setFocusWithinMegaMenu(value)}
            />
            <DesktopNavLink
              href="/packages"
              isActive={pathname.startsWith("/packages") || pathname.startsWith("/deals")}
            >
              Packages
            </DesktopNavLink>
            <DesktopNavLink href="/deals" isActive={pathname === "/deals"}>
              Deals
            </DesktopNavLink>
            <DesktopNavLink href="/contact" isActive={pathname.startsWith("/contact")}
            >
              Contact Us
            </DesktopNavLink>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleGlobalSearch}
              className="flex items-center gap-2 text-[#3d3a2c] hover:text-brand-success"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
              <span className="uppercase tracking-[0.2em] text-[11px]">Search</span>
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleGlobalSearch}
              className="text-[#3d3a2c] hover:text-brand-success"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="sm"
              className="p-2"
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

      {activeDesktopDropdown === "destinations" && isMegaMenuVisible && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+1px)] bg-white shadow-2xl border-t border-[#d6c98f]/60"
          onMouseEnter={() => setIsMegaMenuVisible(true)}
          onMouseLeave={() => {
            if (!focusWithinMegaMenu) {
              setIsMegaMenuVisible(false)
              setActiveDesktopDropdown(null)
            }
          }}
  >
    <div
      className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10"
      onFocusCapture={() => setFocusWithinMegaMenu(true)}
      onBlurCapture={() => setFocusWithinMegaMenu(false)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredColumns.map((column) => (
                <div key={column.title}>
                  <h4 className="uppercase text-xs tracking-[0.3em] text-[#787159] mb-4">
                    {column.title}
                  </h4>
                  <ul className="space-y-3">
                    {column.items.map((destination) => (
                      <li key={destination.name}>
                        <Link
                          href={destination.href}
                    className="group flex items-start gap-3"
                          onClick={() => {
                            setActiveDesktopDropdown(null)
                            setIsMegaMenuVisible(false)
                          }}
                        >
                          <span className="mt-1 text-[#d4a441]">›</span>
                          <div>
                            <span className="block text-sm font-medium text-[#3d3a2c] group-hover:text-brand-success transition-colors">
                              {destination.name}
                            </span>
                            {destination.subDestinations?.length ? (
                              <span className="block text-xs text-[#948d74]">
                                {destination.subDestinations.map((sub) => sub.name).join(" · ")}
                              </span>
                            ) : null}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
      <div className="hidden sm:block bg-[#f9f5e5] rounded-xl overflow-hidden shadow-inner">
        <div className="relative h-44">
          <Image
            src="/top/dubai.jpg"
            alt="Featured Destination"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 300px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="uppercase text-xs tracking-[0.4em] mb-1">Dream Getaways</p>
            <p className="text-sm font-semibold">Escape to Dubai this season with exclusive rates</p>
          </div>
        </div>
        <div className="p-5 space-y-5">
          <p className="uppercase text-xs tracking-[0.3em] text-[#a88734]">
            Featured Experiences
          </p>
          {featuredHighlights.map((highlight) => (
            <Link
              key={highlight.title}
              href={highlight.href}
              className="group block rounded-lg p-3 hover:bg-white/70 transition-colors"
              onClick={() => {
                setActiveDesktopDropdown(null)
                setIsMegaMenuVisible(false)
              }}
            >
              <p className="text-sm font-semibold text-[#3d3a2c] group-hover:text-brand-success">
                {highlight.title}
              </p>
              <p className="text-xs text-[#8c856c] mt-1 leading-relaxed">
                {highlight.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
          </div>
        </div>
      )}

      <div
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#d6c98f]/50 bg-[#f7f4ea]">
            <span className="text-sm font-semibold tracking-[0.2em] text-[#3d3a2c] uppercase">
              Menu
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#3d3a2c]"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
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

            <MobileNavLink href="/" onClick={closeMobileMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={closeMobileMenu}>
              Our Company
            </MobileNavLink>
            <MobileNavLink href="/packages" onClick={closeMobileMenu}>
              Packages
            </MobileNavLink>
            <div className="mt-2">
              <button
                className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-[#3d3a2c] hover:bg-[#f7f4ea] rounded-md focus:outline-none focus:ring-2 focus:ring-brand-success"
                onClick={toggleDestinations}
                aria-expanded={isDestinationsOpen}
                aria-controls="mobile-destinations-menu"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.18em]">Destinations</span>
                <ChevronRight
                  className={cn("h-5 w-5 transition-transform duration-200", isDestinationsOpen ? "rotate-90" : "")}
                />
              </button>
              <div
                className={cn(
                  "pl-4 mt-2 space-y-2 overflow-hidden transition-all duration-300",
                  isDestinationsOpen ? "max-h-[70vh]" : "max-h-0"
                )}
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

            <MobileNavLink href="/deals" onClick={closeMobileMenu}>
              Deals
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={closeMobileMenu}>
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

function DesktopNavLink({
  href,
  isActive = false,
  children,
  className,
}: {
  href: string
  isActive?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex flex-col items-center gap-1 uppercase tracking-[0.25em] text-[11px] text-[#3d3a2c] transition-colors",
        isActive ? "text-brand-success" : "hover:text-brand-success",
        className
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "block h-0.5 w-full bg-brand-success origin-center scale-x-0 transition-transform duration-300",
          isActive ? "scale-x-100" : "group-hover:scale-x-100"
        )}
      />
    </Link>
  )
}

function DesktopDropdown({
  label,
  isActive,
  isCurrent,
  onOpen,
  onClose,
  onFocusChange,
}: {
  label: string
  isActive: boolean
  isCurrent?: boolean
  onOpen: () => void
  onClose: () => void
  onFocusChange: (value: boolean) => void
}) {
  return (
    <div className="relative inline-flex flex-col items-center gap-1">
      <button
        className={cn(
          "group flex items-center gap-2",
          "uppercase tracking-[0.25em] text-[11px] text-[#3d3a2c] transition-colors",
          isCurrent ? "text-brand-success" : "hover:text-brand-success"
        )}
        onMouseEnter={onOpen}
        onFocus={() => {
          onOpen()
          onFocusChange(true)
        }}
        onMouseLeave={() => {
          if (!isActive) {
            onClose()
          }
        }}
        onBlur={() => {
          onFocusChange(false)
          onClose()
        }}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200 text-[#3d3a2c]",
            isActive ? "rotate-180 text-brand-success" : "",
            isCurrent && "text-brand-success"
          )}
        />
      </button>
      <span
        className={cn(
          "block h-0.5 w-full bg-brand-success origin-center scale-x-0 transition-transform duration-300",
          isCurrent ? "scale-x-100" : isActive ? "scale-x-100" : "group-hover:scale-x-100"
        )}
      />
    </div>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
  className,
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
      className={cn(
        "block px-3 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#3d3a2c] hover:bg-[#f7f4ea] rounded-md",
        className
      )}
    >
      {children}
    </Link>
  )
}