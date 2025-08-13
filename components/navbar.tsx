"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const destinations = [
  { name: "Africa", href: "/destinations/africa", image: "/denmar1.jpeg" },
  { name: "Dubai, UAE", href: "/destinations/dubai", image: "/denmar2.jpeg" },
  { name: "Europe", href: "/destinations/europe", image: "/denmar3.jpeg" },
  { name: "Mombasa, Kenya", href: "/destinations/mombasa", image: "/denmar1.jpeg" },
  { name: "Zimbabwe", href: "/destinations/zimbabwe", image: "/denmar2.jpeg" },
  { name: "Nairobi, Kenya", href: "/destinations/nairobi", image: "/denmar2.jpeg" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
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
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsDestinationsOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleDestinations = () => {
    setIsDestinationsOpen(!isDestinationsOpen)
  }

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
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
            <Link href="/" className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg">
              About Us
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg">
              Services
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-brand-success transition-colors font-bold text-lg">
                <span>Destinations</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-64 mt-2 origin-top animate-fade-in-down"
              >
                {destinations.map((destination) => (
                  <DropdownMenuItem key={destination.name} asChild>
                    <Link
                      href={destination.href}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-all duration-200"
                    >
                      <Image
                        src={destination.image}
                        alt={`${destination.name} preview`}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <span className="text-md font-semibold">{destination.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/deals" className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg">
              Deals
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-brand-success transition-colors font-bold text-lg">
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
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

      <div
        ref={mobileMenuRef}
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
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
                className="flex items-center justify-between w-full px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 text-lg font-bold rounded-md focus:outline-none transition-all duration-200"
                onClick={toggleDestinations}
              >
                <span className="text-lg font-bold">Destinations</span>
                <ChevronRight
                  className={`h-5 w-5 transition-transform duration-200 ${isDestinationsOpen ? "rotate-90" : ""
                    }`}
                />
              </button>
              <div
                className={`pl-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ${isDestinationsOpen ? "max-h-96" : "max-h-0"
                  }`}
              >
                {destinations.map((destination) => (
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
                    />
                    <span className="text-md font-semibold">{destination.name}</span>
                  </MobileNavLink>
                ))}
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