"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SearchFunctionality } from "@/components/search-functionality"
import Image from "next/image"

const destinations = [
  { name: "Bali, Indonesia", href: "/destinations/bali" },
  { name: "Paris, France", href: "/destinations/paris" },
  { name: "Tokyo, Japan", href: "/destinations/tokyo" },
  { name: "Santorini, Greece", href: "/destinations/santorini" },
  { name: "Dubai, UAE", href: "/destinations/dubai" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle click outside to close mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    // Add event listener when menu is open
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden' // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = 'auto' // Re-enable scrolling when menu is closed
    }

    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
            <Image src="/denmar.png" alt="Logo" width={200} height={200} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-brand-success transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-brand-success transition-colors font-medium">
              About Us
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-brand-success transition-colors font-medium">
              Services
            </Link>

            {/* Destinations Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-brand-success transition-colors font-medium">
                <span>Destinations</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                {destinations.map((destination) => (
                  <DropdownMenuItem key={destination.name} asChild>
                    <Link href={destination.href} className="w-full">
                      {destination.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/deals" className="text-gray-700 hover:text-brand-success transition-colors font-medium">
              Deals
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-brand-success transition-colors font-medium">
              Contact Us
            </Link>
          </div>

          {/* Right Side - Search */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex"
                aria-label="Search destinations and services"
              >
                <Search className="h-4 w-4" />
              </Button>
              <SearchFunctionality isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            </div>

            {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
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
          
          <nav className="flex-1 p-4 space-y-1">
            <MobileNavLink href="/" onClick={closeMobileMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={closeMobileMenu}>
              About Us
            </MobileNavLink>
            <MobileNavLink href="/services" onClick={closeMobileMenu}>
              Services
            </MobileNavLink>
            
            <div className="mt-2">
              <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700">
                Destinations
                <ChevronRight className="h-4 w-4" />
              </div>
              <div className="pl-4 mt-1 space-y-1">
                {destinations.map((destination) => (
                  <MobileNavLink 
                    key={destination.name} 
                    href={destination.href} 
                    onClick={closeMobileMenu}
                    className="pl-3 text-sm"
                  >
                    {destination.name}
                  </MobileNavLink>
                ))}
              </div>
            </div>
            
            <MobileNavLink href="/deals" onClick={closeMobileMenu}>
              Deals
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={closeMobileMenu}>
              Contact Us
            </MobileNavLink>
          </nav>
          
          <div className="p-4 border-t">
            <div className="relative">
              <SearchFunctionality isOpen={true} onClose={closeMobileMenu} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
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

// Mobile Navigation Link Component
function MobileNavLink({ 
  href, 
  onClick, 
  children,
  className = ""
}: { 
  href: string; 
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
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
