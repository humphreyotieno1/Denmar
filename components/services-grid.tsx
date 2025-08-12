import { Plane, Hotel, MapPin, Shield, FileText, Camera, Car, Utensils } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Plane,
    title: "Flight Booking",
    description: "Find and book the best flights at competitive prices with our extensive airline partnerships.",
    features: ["Best price guarantee", "24/7 booking support", "Flexible cancellation", "Seat selection"],
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description: "Choose from thousands of hotels worldwide, from budget-friendly to luxury accommodations.",
    features: ["Verified reviews", "Best rate guarantee", "Free cancellation", "Instant confirmation"],
    color: "text-brand-accent",
    bgColor: "bg-brand-accent/10",
  },
  {
    icon: MapPin,
    title: "Tour Packages",
    description: "Expertly crafted tour packages that showcase the best of each destination.",
    features: ["Expert local guides", "Small group sizes", "Cultural experiences", "All-inclusive options"],
    color: "text-brand-success",
    bgColor: "bg-brand-success/10",
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance to protect you and your investment during your trip.",
    features: ["Medical coverage", "Trip cancellation", "Lost luggage protection", "24/7 emergency assistance"],
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    description: "Expert guidance and support for visa applications and travel documentation.",
    features: ["Document review", "Application assistance", "Status tracking", "Express processing"],
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Camera,
    title: "Photography Tours",
    description: "Specialized photography tours led by professional photographers in stunning locations.",
    features: ["Professional guidance", "Exclusive locations", "Small groups", "Equipment rental"],
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    icon: Car,
    title: "Transportation",
    description: "Reliable ground transportation including airport transfers and private car rentals.",
    features: ["Airport transfers", "Private drivers", "Car rentals", "Group transportation"],
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Utensils,
    title: "Culinary Experiences",
    description: "Discover local flavors with our curated food tours and cooking classes.",
    features: ["Local food tours", "Cooking classes", "Wine tastings", "Market visits"],
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
]

export function ServicesGrid() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-6">COMPREHENSIVE TRAVEL SERVICES</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for the perfect trip, all in one place. Our expert team is here to make your travel
            dreams a reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg cursor-pointer"
            >
              <CardContent className="p-8">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${service.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>
                <h3 className="font-heading text-xl font-semibold text-brand-primary mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full ${service.color.replace("text-", "bg-")} mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="font-heading text-3xl font-bold text-brand-primary mb-6">Need a Custom Package?</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Can't find exactly what you're looking for? Our travel experts can create a personalized package tailored
              to your specific needs and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold px-8 py-4"
              >
                Request Custom Package
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 bg-transparent"
              >
                Speak with Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
