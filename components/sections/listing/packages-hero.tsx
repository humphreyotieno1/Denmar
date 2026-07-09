"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PackagesHeroProps {
  heroImage: string
}

export function PackagesHero({ heroImage }: PackagesHeroProps) {
  return (
    <section className="relative overflow-hidden py-16">
      <Image
        src={heroImage}
        alt="Packages hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-brand-primary/45 to-white/95" />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl mb-4">
            Kenya Safari &amp; Holiday Packages from Nairobi
          </h1>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
            Browse affordable Kenya safaris, Dubai holiday packages, Zanzibar trips, beach escapes, and more.
            All packages include expert support and flexible travel dates from Nairobi.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
