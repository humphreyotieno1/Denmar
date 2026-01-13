"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, Info, Plus, UtensilsCrossed } from "lucide-react"
import type { Package } from "@/lib/services"

interface PackageCardProps {
  pkg: Package
  index?: number
  className?: string
}

const DetailRow = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <div className="flex items-start gap-2 text-sm text-gray-600">
    <Icon className="mt-0.5 h-4 w-4 text-brand-accent" />
    <span>{children}</span>
  </div>
)

export function PackageCard({ pkg, index = 0, className = "" }: PackageCardProps) {
  const highlights = pkg.includes.slice(0, 2)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${className}`}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={pkg.image || "/placeholder.svg"}
          alt={pkg.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {pkg.featured && (
          <Badge className="absolute left-4 top-4 bg-brand-accent text-white border-0 shadow-lg">Featured</Badge>
        )}

        <div className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
          {pkg.duration}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-brand-primary md:text-xl">{pkg.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{pkg.shortDescription}</p>
        </div>

        <div className="flex-1 space-y-2">
          <DetailRow icon={UtensilsCrossed}>{highlights[0] ?? "All inclusive getaway"}</DetailRow>
          <DetailRow icon={Clock}>{pkg.duration}</DetailRow>
          {/* <DetailRow icon={CalendarDays}>{`Best time: ${pkg.bestTime}`}</DetailRow> */}
          {highlights[1] && <DetailRow icon={Plus}>{highlights[1]}</DetailRow>}
          {pkg.terms[0] && <DetailRow icon={Info}>{pkg.terms[0]}</DetailRow>}
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            From ${pkg.price} per person
          </span>
          <Button
            asChild
            className="w-full rounded-full bg-brand-primary text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-brand-primary/90 active:scale-95"
          >
            <Link href={`/packages/${pkg.slug}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
