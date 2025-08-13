import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Users, Award } from "lucide-react"
import Link from "next/link"

export function ShowYouWorldSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-primary mb-6">
                LET US SHOW YOU THE WORLD
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                At Denmar Tours & Travel, we believe that travel is more than just visiting new places—it's about
                creating life-changing experiences that broaden your perspective and enrich your soul.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With over a decade of experience in the travel industry, we've helped thousands of travelers discover
                the beauty, culture, and wonder that our world has to offer. From exotic tropical paradises to bustling
                metropolitan cities, we craft personalized journeys that match your dreams and exceed your expectations.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-accent/10 mb-3 mx-auto">
                  <Globe className="h-6 w-6 text-brand-accent" />
                </div>
                <div className="text-2xl font-bold text-brand-primary">50+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-success/10 mb-3 mx-auto">
                  <Users className="h-6 w-6 text-brand-success" />
                </div>
                <div className="text-2xl font-bold text-brand-primary">10K+</div>
                <div className="text-sm text-gray-600">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3 mx-auto">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-brand-primary">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>

            <Link href='/services'>
            <Button
              size="lg"
              className="bg-brand-accent hover:bg-brand-accent/40 text-brand-primary font-semibold px-8 py-4"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/denmar.png"
                alt="Happy travelers exploring the world"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-success rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-brand-primary">Award Winning</div>
                  <div className="text-sm text-gray-600">Travel Agency 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
