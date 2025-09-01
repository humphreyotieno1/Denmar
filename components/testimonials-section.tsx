"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const testimonials = [
  {
    id: 1,
    name: "Grace Wangeci",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Very good service and highly recommended",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 2,
    name: "Wycliffe Okoth",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Well planned and timely trip to Diani. Arranged for transfers and were always available for any clarification or assistance. Had a great experience with Denmar Tours and Travel",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Diani Beach",
  },
  {
    id: 3,
    name: "Kasweety Kayte",
    location: "Embu, Kenya",
    rating: 5,
    text: "World class experience…. especially the UAE tour and holiday",
    image: "/placeholder.svg?height=80&width=80",
    trip: "UAE Tour",
  },
  {
    id: 4,
    name: "Faith Wanjira",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Denmar Tours & Travel is the best and most reliable tour partner. After spending hours and hours on the internet looking up for holiday ideas I found them. The experience I had with Alex was best in class from the beginning to the end. Everything was thoroughly laid out,all my queries answered in details and the followed up was great. There were no surprises and the whole trip went as planned. I would definitely recommend Denmar Tours & Travel for all your vacation planning needs.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 5,
    name: "Tony Kamau",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "TI highly recommend Denmar. They are hands on and will keep you posted on everything. They organized my honeymoon and later and trip to diani. They are truly wonderful to work with. Thanks Alex and Dennis.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 6,
    name: "Aine Faith Twebanze",
    location: "Algiers, Algeria",
    rating: 5,
    text: "I recommend EVERYTHING about Denmar Tours & Travel. Their Professionalism and Care is off the chart.. Thank you so much Denmar, you made our honeymoon the best we could possibly have. The resort you recommended was top notch and beautiful. Denmar Tours & Travel took care of us and of all our needs. The staff are all so professional and caring. I can't even say enough of a Thank you. God bless you guys. ❤️❤️❤️❤️",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 7,
    name: "Atie Nyodero",
    location: "Siaya, Kenya",
    rating: 5,
    text: "Thanks a lot for your hospitality Denmar Tours for making our vacation in Kenya with my family worthwhile,will always come back with more friends.The best tours and travel agency I have used.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 8,
    name: "Omian Ramo",
    location: "Siaya, Kenya",
    rating: 5,
    text: "Fast, efficiency and reliable agent .The packages are amazing and has been done accordingly as per the voucher.I have enjoyed my stay in Dubai hopefully visiting soon again.Your kind services are not taken for granted .will soon visit again with my fam and obviously through denmar.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Dubai, UAE",
  },
  {
    id: 9,
    name: "Shikoh Kimani Mbugua",
    location: "Mombasa, Kenya",
    rating: 5,
    text: "My family has vacationed hassle free courtesy of Denmar Tours & Travel...their efficiency and customer service is top notch ..i highly recommend Denmar tours for all your travel needs.Thank you Denmar tours & Travel!",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 10,
    name: "Peris Sonia",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Making our little ones happy by organising great holidays and adventures, Anytime #Denmar Tours & Travel.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 11,
    name: "Lydiah Gatambu",
    location: "Mombasa, Kenya",
    rating: 5,
    text: "Would totally recommend Denmar Tours & Travel. Their efficiency, reliability and and great customer service keeps me going back. Thanks for always going an extra mile to ensure my trips are enjoyable and successful. Keep up the good job 👍👍",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 12,
    name: "Stevo Ngure",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Who knew Travels/Vacations and adventure would be so easy with Denmar tours and Travel. I have done several vacation with Denmar and they are the best .Denmar is your go to travel agency.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 13,
    name: "Kabura Essie",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "I have used Denmar Tours and Travel on a number of occasions and haven't been disappointed. a few instances is I used them when I first visited Dubai and everything was well planned out, our itinerary was perfect and we had a great time with my mum. they also book flights to different destinations and most recently booked my flights to the US. Their team is just awesome and are available all the time.  Denmar is your go to travel agency and I have never been disappointed!",
    image: "/placeholder.svg?height=80&width=80",
    trip: "USA",
  },
  {
    id: 14,
    name: "Harriet Ngei",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Greatful for choosing Denmar Tours & Travel for vacation needs. I sure will use them again.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
  },
  {
    id: 15,
    name: "Loyc Giturwa",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Who knew travels/ vacations would be this easy. Just name the destination and Denmar will come to the rescue! I have done several vacations with Denmar (Dubai , Coast, Masai Mara) and I leave each trip already thinking of the next one! I would definitely recommend their services.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Dubai, Coast, Masai Mara",
  },
  {
    id: 16,
    name: "Kiriga Kimani",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Denmar Tours &Travels facilitated our visit to Meru national park. Their services are top notch and we would highly recommend them. Kudos Denmar.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Meru National Park",
  },
  {
    id: 17,
    name: "Marion Nganga",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Denmar Tours & Travel are synonymous to efficiency, reliability and fun. They made my whole travelling experience to Dubai very easy and valuable back in 2019. My experience at Wild Wadi Water Park was one of my favourite parts of the tour.  I'll definitely revisit! I really had fun and would highly recommend them to any one. Get in touch with Denmar today and have all your travel needs met, just like mine!",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Dubai",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + itemsPerView >= testimonials.length ? 0 : prev + itemsPerView))
    }, 6000)
    return () => clearInterval(timer)
  }, [itemsPerView])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= testimonials.length ? 0 : prev + itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - itemsPerView) : Math.max(0, prev - itemsPerView),
    )
  }

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-6">WHAT OUR TRAVELERS SAY</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experiences
            with Denmar Tours & Travel.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="flex items-center space-x-2 bg-transparent"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / itemsPerView) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                className={`w-3 h-3 rounded-full transition-all ${
                  Math.floor(currentIndex / itemsPerView) === index ? "bg-brand-accent" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="flex items-center space-x-2 bg-transparent"
            disabled={currentIndex + itemsPerView >= testimonials.length}
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-brand-accent mb-4" />

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{testimonial.text}"</p>

                {/* Customer Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-brand-primary">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <div className="text-sm text-brand-accent font-medium">{testimonial.trip}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">Ready to create your own amazing travel story?</p>
          <Link href='/contact'>
          <Button
            size="lg"
            className="bg-brand-accent hover:bg-brand-accent/40 text-brand-primary font-semibold px-8 py-4"
          >
            Start Planning Your Trip
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
