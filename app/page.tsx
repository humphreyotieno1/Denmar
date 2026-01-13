import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WhyUsSection } from "@/components/why-us-section"
import { TopDestinationsSection } from "@/components/top-destinations-section"
import { PackagesSection } from "@/components/packages-section"
import { ReadyToPlanSection } from "@/components/ready-to-plan-section"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import type { Metadata } from "next"
import { DealsPopup } from "@/components/deals-popup"
// import { ChristmasPackages } from "@/components/xmass-packages"
import { ValentinesPackages } from "@/components/valentines"

export const metadata: Metadata = {
  title: "Best Travel Agency in Kenya - Kenya Safari Tour Operator | Denmar Travel",
  description:
    "Kenya's premier travel agency offering affordable Kenya tour packages, luxury Kenya safaris, Masai Mara tours, and customized Kenya holidays. Best tour company in Kenya with 500+ satisfied clients. Book your Kenya travel package today!",
  keywords: "travel agency in Kenya, tour company in Kenya, Kenya safari tour operator, Kenya tour packages, Kenya holidays, best tour companies in Kenya, Kenya travel agency Nairobi, Kenya safari agency, luxury safari Kenya, Masai Mara safari packages, affordable Kenya tours",
  authors: [{ name: "Denmar Tours & Travel" }],
  creator: "Denmar Tours & Travel",
  publisher: "Denmar Tours & Travel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Denmar Tours & Travel - Your Dream Trip Awaits",
    description:
      "Discover affordable, tailor-made travel packages with Denmar Tours & Travel—covering Kenya safaris, global adventures, and more. Book your dream trip today with 24/7 support!",
    images: ["/tablogo.png"],
  },
  icons: {
    icon: [
      {
        url: "/tablogo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/tablogo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
}

import { prisma } from "@/lib/db"
import { TestimonialsSection } from "@/components/testimonials-section"
// import { ServicesGrid } from "@/components/services-grid"

export default async function HomePage() {
  const [slides, settings, destinations, packages, testimonials, popups, services] = await Promise.all([
    prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.siteSettings.findUnique({
      where: { id: "settings" },
    }),
    prisma.destination.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      take: 8,
    }),
    prisma.package.findMany({
      where: { isActive: true, featured: true },
      orderBy: { order: "asc" },
      take: 6,
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.dealsPopup.findMany({
      where: { isActive: true },
      orderBy: { priority: "desc" },
    }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
  ])

  // Filter festive packages manually or with a query if category is used
  const festivePackages = await prisma.package.findMany({
    where: { isActive: true, category: "Adventure" },
    orderBy: { order: "asc" },
    take: 6,
  })

  // Map services to match interface
  const formattedServices = services.map((s: any) => ({
    ...s,
    features: s.features as unknown as string[],
    category: s.category as any,
    image: s.image || undefined,
    price: s.price || undefined,
    duration: s.duration || undefined,
  }))

  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner settings={settings} />
      <Navbar settings={settings} />

      <main className="pt-2">
        <HeroSection
          slides={slides}
          highlightPackages={packages.slice(0, 2).map((pkg: any) => ({
            title: pkg.name,
            duration: pkg.duration,
            price: pkg.price,
            image: pkg.image,
            link: `/packages/${pkg.slug}`
          }))}
        />
        <WhyUsSection />
        <TopDestinationsSection destinations={destinations} />
        <PackagesSection packages={packages} />
        {/* <ChristmasPackages packages={festivePackages} /> */}
        <ValentinesPackages packages={festivePackages} />
        {/* <section id="services">
          <ServicesGrid services={formattedServices} />
        </section> */}
        <TestimonialsSection testimonials={testimonials} />
        <ReadyToPlanSection />
      </main>

      <Footer settings={settings} />
      <FloatingActions />
      <DealsPopup deals={popups} />
    </div>
  )
}
