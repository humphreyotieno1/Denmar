"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaTiktok } from 'react-icons/fa'
import { toast } from "@/components/ui/toast"
import { trackNewsletterSignup, trackPhoneClick, trackWhatsAppClick } from "@/lib/analytics"
import { trackNewsletterSignup as trackFacebookNewsletter, trackPhoneClick as trackFacebookPhone, trackWhatsAppClick as trackFacebookWhatsApp } from "@/lib/facebook-pixel"

interface FooterProps {
  settings: any
}

export function Footer({ settings }: FooterProps) {
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
          // Track successful newsletter signup
          trackNewsletterSignup(email, 'footer')
          trackFacebookNewsletter()
          toast.success(data.message)
            ; (document.getElementById('footer-email') as HTMLInputElement).value = ''
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

  const handlePhoneClick = (phoneNumber: string) => {
    trackPhoneClick(phoneNumber, 'footer')
    trackFacebookPhone(phoneNumber)
  }

  return (
    <footer className="bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="font-heading text-xl font-bold text-white">
                {settings?.siteName?.split(' ')[0] || 'DENMAR'}
              </div>
              <div className="text-brand-accent font-heading text-xl font-bold">
                {settings?.siteName?.split(' ').slice(1).join(' ') || 'TOURS'}
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {settings?.siteDescription || 'Your trusted travel partner for unforgettable adventures.'}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-brand-accent flex-shrink-0" />
                <span className="text-gray-300">
                  {settings?.address || '3rd Floor Office - Design Center Building, Tausi Road, Westlands, Nairobi, Kenya'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-brand-accent flex-shrink-0" />
                <a
                  href={`tel:${settings?.contactPhone || '+254793041888'}`}
                  className="text-gray-300 hover:text-brand-accent transition-colors"
                  onClick={() => handlePhoneClick(settings?.contactPhone || '+254793041888')}
                >
                  {settings?.contactPhone || '+254 793 041 888'}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-brand-accent flex-shrink-0" />
                <a
                  href={`mailto:${settings?.contactEmail || 'info@denmartravel.co.ke'}`}
                  className="text-gray-300 hover:text-brand-accent transition-colors"
                >
                  {settings?.contactEmail || 'info@denmartravel.co.ke'}
                </a>
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
              {settings?.socialFacebook && (
                <Link href={settings.socialFacebook} target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
              )}
              {settings?.socialInstagram && (
                <Link href={settings.socialInstagram} target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
              {settings?.socialTwitter && (
                <Link href={settings.socialTwitter} target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
              )}

              {settings?.socialYoutube && (
                <Link href={settings.socialYoutube} target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
              )}
              {settings?.socialTiktok && (
                <Link href={settings.socialTiktok} target="_blank" className="text-gray-300 hover:text-brand-accent transition-colors">
                  <FaTiktok className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {`  ${new Date().getFullYear()} ${settings?.siteName || 'Denmar Tours & Travel'}. All rights reserved.`} | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
