"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Phone, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
      {/* WhatsApp */}
      <Button
        size="lg"
        className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg w-14 h-14 p-0"
        asChild
      >
        <a
          href="https://wa.me/254793041888"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </Button>

      {/* Call */}
      <Button
        size="lg"
        className="rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg w-14 h-14 p-0"
        asChild
      >
        <a href="tel:+254793041888" aria-label="Call us">
          <Phone className="h-6 w-6" />
        </a>
      </Button>

      {/* Back to Top */}
      {showBackToTop && (
        <Button
          size="lg"
          onClick={scrollToTop}
          className="rounded-full bg-brand-accent hover:bg-brand-accent/90 text-brand-primary shadow-lg w-14 h-14 p-0"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
