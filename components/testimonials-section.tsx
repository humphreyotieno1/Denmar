"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Quote, Facebook, Instagram, Youtube, Linkedin, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Grace Wangeci",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Very good service and highly recommended",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 2,
    name: "Wycliffe Okoth",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Well planned and timely trip to Diani. Arranged for transfers and were always available for any clarification or assistance. Had a great experience with Denmar Tours and Travel",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Diani Beach",
    source: "Facebook"
  },
  {
    id: 3,
    name: "Kasweety Kayte",
    location: "Embu, Kenya",
    rating: 5,
    text: "World class experience…. especially the UAE tour and holiday",
    image: "/placeholder.svg?height=80&width=80",
    trip: "UAE Tour",
    source: "Facebook"
  },
  {
    id: 4,
    name: "Faith Wanjira",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Denmar Tours & Travel is the best and most reliable tour partner. After spending hours and hours on the internet looking up for holiday ideas I found them. The experience I had with Alex was best in class from the beginning to the end. Everything was thoroughly laid out,all my queries answered in details and the followed up was great. There were no surprises and the whole trip went as planned. I would definitely recommend Denmar Tours & Travel for all your vacation planning needs.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 5,
    name: "Tony Kamau",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "TI highly recommend Denmar. They are hands on and will keep you posted on everything. They organized my honeymoon and later and trip to diani. They are truly wonderful to work with. Thanks Alex and Dennis.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 6,
    name: "Aine Faith Twebanze",
    location: "Algiers, Algeria",
    rating: 5,
    text: "I recommend EVERYTHING about Denmar Tours & Travel. Their Professionalism and Care is off the chart.. Thank you so much Denmar, you made our honeymoon the best we could possibly have. The resort you recommended was top notch and beautiful. Denmar Tours & Travel took care of us and of all our needs. The staff are all so professional and caring. I can't even say enough of a Thank you. God bless you guys. ❤️❤️❤️❤️",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 7,
    name: "Atie Nyodero",
    location: "Siaya, Kenya",
    rating: 5,
    text: "Thanks a lot for your hospitality Denmar Tours for making our vacation in Kenya with my family worthwhile,will always come back with more friends.The best tours and travel agency I have used.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 8,
    name: "Omian Ramo",
    location: "Siaya, Kenya",
    rating: 5,
    text: "Fast, efficiency and reliable agent .The packages are amazing and has been done accordingly as per the voucher.I have enjoyed my stay in Dubai hopefully visiting soon again.Your kind services are not taken for granted .will soon visit again with my fam and obviously through denmar.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Dubai, UAE",
    source: "Facebook"
  },
  {
    id: 9,
    name: "Shikoh Kimani Mbugua",
    location: "Mombasa, Kenya",
    rating: 5,
    text: "My family has vacationed hassle free courtesy of Denmar Tours & Travel...their efficiency and customer service is top notch ..i highly recommend Denmar tours for all your travel needs.Thank you Denmar tours & Travel!",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 10,
    name: "Peris Sonia",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Making our little ones happy by organising great holidays and adventures, Anytime #Denmar Tours & Travel.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 11,
    name: "Lydiah Gatambu",
    location: "Mombasa, Kenya",
    rating: 5,
    text: "Would totally recommend Denmar Tours & Travel. Their efficiency, reliability and and great customer service keeps me going back. Thanks for always going an extra mile to ensure my trips are enjoyable and successful. Keep up the good job 👍👍",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 12,
    name: "Stevo Ngure",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Who knew Travels/Vacations and adventure would be so easy with Denmar tours and Travel. I have done several vacation with Denmar and they are the best .Denmar is your go to travel agency.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 13,
    name: "Kabura Essie",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "I have used Denmar Tours and Travel on a number of occasions and haven't been disappointed. a few instances is I used them when I first visited Dubai and everything was well planned out, our itinerary was perfect and we had a great time with my mum. they also book flights to different destinations and most recently booked my flights to the US. Their team is just awesome and are available all the time.  Denmar is your go to travel agency and I have never been disappointed!",
    image: "/placeholder.svg?height=80&width=80",
    trip: "USA",
    source: "Facebook"
  },
  {
    id: 14,
    name: "Harriet Ngei",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Greatful for choosing Denmar Tours & Travel for vacation needs. I sure will use them again.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "",
    source: "Facebook"
  },
  {
    id: 15,
    name: "Loyc Giturwa",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Who knew travels/ vacations would be this easy. Just name the destination and Denmar will come to the rescue! I have done several vacations with Denmar (Dubai , Coast, Masai Mara) and I leave each trip already thinking of the next one! I would definitely recommend their services.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Dubai, Coast, Masai Mara",
    source: "Facebook"
  },
  {
    id: 16,
    name: "Kiriga Kimani",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Denmar Tours &Travels facilitated our visit to Meru national park. Their services are top notch and we would highly recommend them. Kudos Denmar.",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Meru National Park",
    source: "Facebook"
  },
  {
    id: 17,
    name: "Marion Nganga",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "Denmar Tours & Travel are synonymous to efficiency, reliability and fun. They made my whole travelling experience to Dubai very easy and valuable back in 2019. My experience at Wild Wadi Water Park was one of my favourite parts of the tour.  I'll definitely revisit! I really had fun and would highly recommend them to any one. Get in touch with Denmar today and have all your travel needs met, just like mine!",
    image: "/placeholder.svg?height=80&width=80",
    trip: "Dubai",
    source: "Facebook"
  },
]

const sourceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  Instagram,
  YouTube: Youtube,
  Youtube,
  LinkedIn: Linkedin,
  Linkedin,
}

export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.offsetWidth * 0.9
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

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
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-gray-400">
            Slide to explore reviews
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-gray-300">Swipe →</span>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-hide"
        >
          {testimonials.map((testimonial, index) => {
            const SourceIcon = sourceIconMap[testimonial.source] ?? Globe

            return (
              <motion.article
                key={testimonial.id}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                initial={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className="flex h-full w-[280px] flex-shrink-0 snap-center sm:w-[320px] lg:w-[360px]"
              >
                <Card className="group flex h-full flex-1 flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <CardContent className="flex h-full flex-col justify-between gap-8 p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="rounded-full object-cover"
                            sizes="56px"
                          />
                          <span className="absolute -bottom-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white bg-brand-accent text-white shadow-md">
                            <SourceIcon className="h-3.5 w-3.5" />
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">
                            {testimonial.location}
                          </div>
                          <p className="text-lg font-semibold text-brand-primary">{testimonial.name}</p>
                          {testimonial.trip && (
                            <p className="text-sm text-brand-accent">
                              {testimonial.trip}
                            </p>
                          )}
                        </div>
                      </div>
                      <Quote className="h-10 w-10 text-brand-accent/80" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
                          <SourceIcon className="h-3.5 w-3.5" />
                          {testimonial.source}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-gray-600">
                      “{testimonial.text}”
                    </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            )
          })}
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
