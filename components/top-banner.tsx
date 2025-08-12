"use client"

import { X } from "lucide-react"
import { useState } from "react"

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-brand-accent text-brand-primary py-2 px-4 text-center text-sm font-medium relative">
      <p>🌟 Special Offer: Book your dream vacation now and save up to 30%! Limited time only.</p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70"
        aria-label="Close banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
