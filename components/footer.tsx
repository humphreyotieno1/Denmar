"use client"  

import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaTiktok } from 'react-icons/fa'
import { toast } from "@/components/ui/toast"

export function Footer() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async () => {
    const email = (document.getElementById('footer-email') as HTMLInputElement)?.value
    if (email) {
      setIsLoading(true)
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, firstName: 'Guest' })
        })
        
        const data = await response.json()
        
        if (data.success) {
          toast.success(data.message)
          ;(document.getElementById('footer-email') as HTMLInputElement).value = ''
        } else {
          toast.error(data.message || 'Failed to subscribe. Please try again.')
        }
      } catch {
        toast.error('Failed to subscribe. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <footer className="bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="font-heading text-xl font-bold text-white">DENMAR</div>
              <div className="text-brand-accent font-heading text-xl font-bold">TOURS</div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted travel partner for unforgettable adventures. We create personalized experiences that turn
              your travel dreams into reality.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-brand-accent" />
                <span className="text-gray-300">3rd Floor Office - Design Center Building, Tausi Road, Westlands, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-brand-accent" />
                <span className="text-gray-300">+254 793 041 888</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-brand-accent" />
                <span className="text-gray-300">info@denmartravel.co.ke</span>
              </div>
            </div>
          </div>

          {/* Top Destinations */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-brand-accent">Top Destinations</h3>
            <div className="space-y-2">
              <Link href="/destinations/nairobi" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Nairobi
              </Link>
              <Link href="/destinations/europe" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Europe
              </Link>
              <Link href="/destinations/dubai" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Dubai and UAE
              </Link>
              <Link href="/destinations/africa" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Africa
              </Link>
              <Link href="/destinations/zimbabwe" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Zimbabwe
              </Link>
              <Link href="/destinations/mombasa" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Mombasa
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-brand-accent">The Company</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                About Us
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Customer Reviews
              </Link>
              <Link href="/terms" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Terms & Conditions
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Services
              </Link>
              <Link href="/deals" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Special Deals
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-brand-accent">Our Services</h3>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Flight Booking</p>
              <p className="text-gray-300 text-sm">Hotel Reservations</p>
              <p className="text-gray-300 text-sm">Tour Packages</p>
              <p className="text-gray-300 text-sm">Travel Insurance</p>
              <p className="text-gray-300 text-sm">Visa Assistance</p>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-brand-accent">Stay Connected</h3>
            <p className="text-gray-300 text-sm">Subscribe to our newsletter for travel tips and exclusive deals.</p>
            
            {/* Simple Newsletter Form for Footer */}
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                id="footer-email"
                disabled={isLoading}
              />
              <Button 
                className="bg-brand-accent hover:bg-brand-accent/40 text-brand-primary w-full"
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            
            <div className="flex space-x-4 pt-4">
              <Link href="https://www.facebook.com/denmartravel" target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/denmar_travel" target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://www.youtube.com/c/dennisGathitu/videos" target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/DenmarTravel" target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://www.tiktok.com/@denmar_travel" target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                <FaTiktok className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {`  ${new Date().getFullYear()} Denmar Tours & Travel. All rights reserved.`} | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
