import { Shield, DollarSign, Users, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: DollarSign,
    title: "Affordable Prices",
    description: "Best value for money with competitive pricing and exclusive deals for all destinations.",
    color: "text-brand-accent",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Your safety is our priority with comprehensive insurance and trusted local partners.",
    color: "text-brand-success",
  },
  {
    icon: Users,
    title: "Tailored Trips",
    description: "Personalized itineraries designed to match your preferences and travel style.",
    color: "text-blue-500",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you throughout your journey.",
    color: "text-purple-500",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-4">WHY CHOOSE DENMAR TOURS?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to making your travel dreams come true with exceptional service and unforgettable
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-brand-primary mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
