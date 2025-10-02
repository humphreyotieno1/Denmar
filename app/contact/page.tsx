import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { ContactMap } from "@/components/contact-map"

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-col mt-4">
      <TopBanner />
      <Navbar />

      <main className="flex-grow">
        <ContactHero />
        <div className="py-12 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Talk To Us Today!</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions or ready to book your next adventure? Our team is here to help you plan the perfect trip.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Column - Contact Form */}
              <div className="lg:col-span-3">
                <div className="p-6 rounded-xl">
                  <ContactForm />
                </div>
              </div>
              
              {/* Right Column - Contact Info */}
              <div className="lg:col-span-2 lg:sticky lg:top-24 h-fit">
                <div className="p-6 rounded-xl">
                  <ContactInfo />
                </div>
              </div>
              
              {/* Full Width Map */}
              <div className="col-span-full mt-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <ContactMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
