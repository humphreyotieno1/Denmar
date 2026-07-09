import Image from "next/image"
import { getRandomDestinationImage } from "@/lib/random-hero-image"

export function DestinationsBanner() {
  const heroImage = getRandomDestinationImage()

  return (
    <section className="relative overflow-hidden py-16 text-white">
      <Image
        src={heroImage}
        alt="Destinations hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-success/85 to-brand-secondary/85" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5">Explore Destinations</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
          Discover breathtaking destinations around the world. From tropical paradises to bustling cities, ancient
          wonders to modern marvels - your next adventure awaits.
        </p>
      </div>
    </section>
  )
}
