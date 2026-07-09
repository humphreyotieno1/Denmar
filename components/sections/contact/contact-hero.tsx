import Image from "next/image"
import { getRandomDestinationImage } from "@/lib/random-hero-image"

export function ContactHero() {
  const heroImage = getRandomDestinationImage()

  return (
    <section className="relative overflow-hidden py-16 text-white">
      <Image
        src={heroImage}
        alt="Contact hero background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/90 to-gray-900/85" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading text-3xl md:text-5xl font-bold mb-5">Contact Us</h1>
        <p className="text-lg md:text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
          Ready to start planning your dream vacation? Get in touch with our travel experts who are here to help you
          every step of the way.
        </p>
      </div>
    </section>
  )
}
