"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before showing to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isVisible || !isMounted) return null

  return (
    <div className="bg-brand-success text-brand-primary py-2 px-4 text-center text-sm font-medium w-full">
      <div className="max-w-7xl mx-auto relative">
        <p className="inline-block">
          🌟 Book your dream vacation now and save big!
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-70 p-1"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
