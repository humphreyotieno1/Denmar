"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, X } from "lucide-react"
import { FaTiktok } from "react-icons/fa"

export function TopBanner() {
  const [showPromo, setShowPromo] = useState(true)

  return (
    <div className="bg-brand-success text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-white/90">
            <span className="hidden inline-block uppercase tracking-[0.2em] text-[10px] text-white/70">
              Denmar Tours & Travel
            </span>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-white/80" strokeWidth={1.5} />
              <a href="tel:+254793041888" className="hover:text-white transition-colors">
                +254 793 041 888
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <Mail className="h-4 w-4 text-white/80" strokeWidth={1.5} />
              <a href="mailto:info@denmartravel.co.ke" className="hover:text-white transition-colors">
                info@denmartravel.co.ke
              </a>
            </div>
            {showPromo && (
              <div className="hidden md:flex items-center gap-2 text-white/90">
                <span className="text-sm tracking-wide">
                  | 🌟 Book your dream vacation now and save big! |
                </span>
                <button
                  onClick={() => setShowPromo(false)}
                  className="hover:opacity-70 p-1"
                  aria-label="Close banner"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex w-full items-center justify-end gap-3 text-white/80 sm:w-auto">
            <span className="hidden sm:inline-block uppercase tracking-[0.3em] text-[10px] text-white/60">
              Follow Us
            </span>
            <SocialLink href="https://facebook.com/denmartravel" label="Facebook">
              <Facebook className="h-4 w-4" target="_blank" strokeWidth={1.6} />
            </SocialLink>
            <SocialLink href="https://instagram.com/denmar_travel" label="Instagram">
              <Instagram className="h-4 w-4" target="_blank" strokeWidth={1.6} />
            </SocialLink>
            <SocialLink href="https://x.com/DenmarTravel" label="Twitter">
              <Twitter className="h-4 w-4" target="_blank" strokeWidth={1.6} />
            </SocialLink>
            <SocialLink href="https://www.youtube.com/c/dennisGathitu/videos" label="YouTube">
              <Youtube className="h-4 w-4" target="_blank" strokeWidth={1.6} />
            </SocialLink>
            <SocialLink href="https://www.tiktok.com/@denmar_travel" label="TikTok">
              <FaTiktok className="h-4 w-4" target="_blank" strokeWidth={1.6} />
            </SocialLink>
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} aria-label={label} className="hover:text-white transition-colors" target="_blank">
      {children}
    </Link>
  )
}
