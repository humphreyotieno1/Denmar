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
    <div className="min-h-screen overflow-x-hidden flex flex-col">
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="p-6 rounded-xl">
                  <ContactForm />
                </div>
                <div className="p-6 rounded-xl">
                  <ContactMap />
                </div>
              </div>
              
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="p-6 rounded-xl">
                  <ContactInfo />
                </div>
                
                <div className="bg-white mt-6 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex justify-between"><span>Monday - Friday</span> <span>6:00 AM - 5:00 PM</span></p>
                    <p className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 1:00 PM</span></p>
                    <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
                  </div>
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
