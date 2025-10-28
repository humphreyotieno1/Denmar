import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { AboutHeroBanner } from "@/components/about-hero-banner"
import { ShowYouWorldSection } from "@/components/show-you-world-section"
import { StorySection } from "@/components/story-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Kenya's Best Travel Agency | Denmar Tours & Travel",
  description: "Denmar Tours & Travel is Kenya's premier destination management company (DMC Kenya) specializing in customized Kenya tours, Masai Mara safaris, luxury travel experiences, and beach holidays. Trusted Kenya holiday planner with 10+ years experience.",
  keywords: "destination management company Kenya, DMC Kenya, Kenya tour packages, best tour companies in Kenya, Kenya holiday planners, luxury safari Kenya, Kenya travel experts, Kenya tour operator, Kenya travel agency, Kenya safari company",
  openGraph: {
    title: "About Us - Denmar Tours & Travel",
    description: "Learn about Denmar Tours & Travel, Kenya's premier travel agency specializing in safaris, beach holidays, and tailor-made travel experiences.",
    images: ["/tablogo.png"],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <TopBanner />
      <Navbar />

      <main>
        <AboutHeroBanner />
        <ShowYouWorldSection />
        <StorySection />
        <TestimonialsSection />
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
