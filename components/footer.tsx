import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-brand-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <span className="text-gray-300">123 Travel Street, Adventure City</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-brand-accent" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-brand-accent" />
                <span className="text-gray-300">info@denmartours.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-brand-accent">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                Home
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-brand-accent transition-colors text-sm">
                About Us
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
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary">Subscribe</Button>
            </div>
            <div className="flex space-x-4 pt-4">
              <Link href="#" className="text-gray-300 hover:text-brand-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-brand-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-brand-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-brand-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Denmar Tours & Travel. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
