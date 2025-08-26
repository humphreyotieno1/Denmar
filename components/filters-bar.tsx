"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Destination } from "@/lib/destinations"

interface FiltersBarProps {
  destinations: Destination[]
  onFilterChange: (filteredDestinations: Destination[]) => void
  className?: string
}

export function FiltersBar({ destinations, onFilterChange, className = "" }: FiltersBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [showFilters, setShowFilters] = useState(false)

  // Get unique tags from all destinations
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    destinations.forEach(dest => dest.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags).sort()
  }, [destinations])

  // Get price range from destinations
  const priceRangeData = useMemo(() => {
    const prices = destinations.map(dest => dest.priceFrom)
    return [Math.min(...prices), Math.max(...prices)]
  }, [destinations])

  // Apply filters
  const filteredDestinations = useMemo(() => {
    return destinations.filter(destination => {
      // Search query filter
      const matchesSearch = searchQuery === "" || 
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => destination.tags.includes(tag))

      // Price filter
      const matchesPrice = destination.priceFrom >= priceRange[0] && 
        destination.priceFrom <= priceRange[1]

      return matchesSearch && matchesTags && matchesPrice
    })
  }, [destinations, searchQuery, selectedTags, priceRange])

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filteredDestinations)
  }, [filteredDestinations, onFilterChange])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setPriceRange([0, 10000])
  }

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || 
    priceRange[0] > 0 || priceRange[1] < 10000

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {filteredDestinations.length}
            </Badge>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="space-y-4 pt-4 border-t">
          {/* Tags Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Experience Type</h4>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer capitalize ${
                    selectedTags.includes(tag) 
                      ? "bg-brand-accent text-white" 
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-600">Min Price</label>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  min={0}
                  max={priceRange[1]}
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600">Max Price</label>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  min={priceRange[0]}
                  max={10000}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="pt-4 border-t">
              <h4 className="font-medium text-gray-900 mb-2">Active Filters</h4>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: "{searchQuery}"
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => setSearchQuery("")}
                    />
                  </Badge>
                )}
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => toggleTag(tag)}
                    />
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Price: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => setPriceRange([0, 10000])}
                    />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="pt-4 border-t">
        <p className="text-sm text-gray-600">
          Showing {filteredDestinations.length} of {destinations.length} destinations
        </p>
      </div>
    </div>
  )
}
