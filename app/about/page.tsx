import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { AboutHeroBanner } from "@/components/about-hero-banner"
import { ShowYouWorldSection } from "@/components/show-you-world-section"
import { StorySection } from "@/components/story-section"
import { TestimonialsSection } from "@/components/testimonials-section"

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
