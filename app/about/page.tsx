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
  title: "About Us - Denmar Tours & Travel",
  description: "Learn about Denmar Tours & Travel, Kenya's premier travel agency specializing in safaris, beach holidays, and tailor-made travel experiences. Your dream trip awaits with our expert team.",
  keywords: "Denmar Travel, travel agency Kenya, about us, travel company, Kenya tours, expert travel planning, travel specialists",
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
