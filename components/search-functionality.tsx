"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, MapPin, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const searchSuggestions = [
  { type: "destination", name: "Bali, Indonesia", href: "/destinations/indonesia/bali", icon: MapPin },
  { type: "destination", name: "Paris, France", href: "/destinations/france/paris", icon: MapPin },
  { type: "destination", name: "Tokyo, Japan", href: "/destinations/japan/tokyo", icon: MapPin },
  { type: "destination", name: "Santorini, Greece", href: "/destinations/greece/santorini", icon: MapPin },
  { type: "destination", name: "Dubai, UAE", href: "/destinations/uae/dubai", icon: MapPin },
  { type: "service", name: "Flight Booking", href: "/services", icon: Plane },
  { type: "service", name: "Hotel Reservations", href: "/services", icon: Plane },
  { type: "service", name: "Tour Packages", href: "/services", icon: Plane },
]

interface SearchFunctionalityProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchFunctionality({ isOpen, onClose }: SearchFunctionalityProps) {
  const [query, setQuery] = useState("")
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.trim() === "") {
        setFilteredSuggestions(searchSuggestions)
      } else {
        const filtered = searchSuggestions.filter((suggestion) =>
          suggestion.name.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredSuggestions(filtered)
      }
    }, 300)
    return () => clearTimeout(debounce)
  }, [query])

  if (!isOpen) return null

  return (
    <div
      className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50 max-h-96 overflow-y-auto"
      role="dialog"
      aria-label="Search destinations and services"
    >
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search destinations, services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 w-full"
            aria-label="Search input"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-2">
        {filteredSuggestions.length > 0 ? (
          <div className="space-y-1">
            {filteredSuggestions.map((suggestion, index) => (
              <Link
                key={index}
                href={suggestion.href}
                onClick={onClose}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group focus:bg-gray-100 focus:outline-none"
                role="option"
                aria-selected={false}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-accent/10 group-hover:bg-brand-accent/20">
                  <suggestion.icon className="h-4 w-4 text-brand-accent" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{suggestion.name}</div>
                  <div className="text-sm text-gray-500 capitalize">{suggestion.type}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No results found for "{query}"</p>
            <p className="text-sm mt-2">Try searching for destinations or services</p>
          </div>
        )}
      </div>

      {query.trim() === "" && (
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            Popular searches: Bali, Paris, Tokyo, Flight Booking, Tour Packages
          </p>
        </div>
      )}
    </div>
  )
}