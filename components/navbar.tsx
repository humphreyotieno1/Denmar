"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { SearchFunctionality } from "@/components/search-functionality"

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-heading text-xl font-bold text-brand-primary">DENMAR</div>
            <div className="text-brand-accent font-heading text-xl font-bold">TOURS</div>
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

          {/* Right Side - Search & Theme Toggle */}
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

            {/* Theme Toggle */}
            <ModeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-brand-success transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-brand-success transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-brand-success transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <div className="pl-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Destinations</p>
                {destinations.map((destination) => (
                  <Link
                    key={destination.name}
                    href={destination.href}
                    className="block py-1 text-gray-600 hover:text-brand-success transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {destination.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/deals"
                className="text-gray-700 hover:text-brand-success transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-brand-success transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Mobile Search */}
              <div className="pt-4 border-t">
                <div className="relative">
                  <SearchFunctionality isOpen={true} onClose={() => {}} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
