import { MessageSquare, Phone, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const ctaOptions = [
  {
    icon: MessageSquare,
    title: "Get a Quote",
    description: "Tell us your dream destination and we'll create a personalized quote for you.",
    buttonText: "Request Quote",
    color: "bg-brand-accent hover:bg-brand-accent/90 text-brand-primary",
  },
  {
    icon: Phone,
    title: "Contact Us",
    description: "Speak directly with our travel experts for personalized recommendations.",
    buttonText: "Call Now",
    color: "bg-brand-success hover:bg-brand-success/90 text-white",
  },
  {
    icon: Package,
    title: "Browse Packages",
    description: "Explore our curated travel packages designed for every type of traveler.",
    buttonText: "View Packages",
    color: "bg-brand-secondary hover:bg-brand-secondary/90 text-white",
  },
]

export function ReadyToPlanSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-primary to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">READY TO PLAN YOUR NEXT ADVENTURE?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Let us help you create unforgettable memories. Choose how you'd like to get started with your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ctaOptions.map((option, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <option.icon className="h-8 w-8 text-brand-accent" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-4">{option.title}</h3>
                <p className="text-white/80 mb-6 leading-relaxed">{option.description}</p>
                <Button className={`w-full ${option.color} font-semibold`}>{option.buttonText}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <p className="text-lg mb-6 opacity-90">Or explore all our services and destinations</p>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-brand-primary px-8 py-4 bg-transparent"
          >
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  )
}
