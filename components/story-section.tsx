import { Target, Eye, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To create extraordinary travel experiences that inspire, educate, and connect people with the world's most beautiful destinations while ensuring sustainable and responsible tourism practices.",
    color: "text-brand-accent",
    bgColor: "bg-brand-accent/10",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be the world's most trusted travel partner, known for our personalized service, attention to detail, and commitment to making every journey a transformative experience that creates lasting memories.",
    color: "text-brand-success",
    bgColor: "bg-brand-success/10",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We believe in integrity, excellence, and genuine care for our travelers. Every decision we make is guided by our commitment to safety, sustainability, and creating authentic connections between cultures.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
]

export function StorySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-6">OUR STORY</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Founded in 2009 by a group of passionate travelers, Denmar Tours & Travel began as a small dream to share
            the world's wonders with fellow adventurers. What started as a local travel agency has grown into a global
            network of travel experts, but our core mission remains the same: to turn your travel dreams into
            unforgettable realities.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center h-full">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${value.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-brand-primary mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Story Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading text-3xl font-bold text-brand-primary mb-6">Why We Do What We Do</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Travel has the unique power to break down barriers, build understanding, and create connections that
                  transcend borders. We've witnessed firsthand how a single journey can change someone's perspective,
                  inspire new passions, and create lifelong memories.
                </p>
                <p>
                  Our team of travel experts doesn't just book trips—we craft experiences. Each itinerary is carefully
                  designed to showcase the authentic beauty, culture, and spirit of every destination we offer.
                </p>
                <p>
                  From the moment you contact us to the day you return home, we're with you every step of the way,
                  ensuring your journey is seamless, safe, and absolutely extraordinary.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Our dedicated travel team"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-brand-accent text-brand-primary rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm font-medium">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
