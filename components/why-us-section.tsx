"use client"

import { Shield, DollarSign, Plane, Clock, Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const features = [
  {
    icon: DollarSign,
    title: "Best-Value Journeys",
    description: "Preferential rates with leading airlines, hotels and experiences across Africa, the Middle East and Europe.",
    gradient: "from-amber-100 via-white to-amber-50",
    accent: "text-amber-500",
  },
  {
    icon: Plane,
    title: "Tailor-Made Itineraries",
    description: "Dedicated travel designers craft every detail around your preferred pace, interests and travel style.",
    gradient: "from-sky-100 via-white to-sky-50",
    accent: "text-sky-500",
  },
  {
    icon: Shield,
    title: "Seamless & Safe",
    description: "Government licensed, fully insured and backed by trusted local partners for 24/7 on-ground assistance.",
    gradient: "from-emerald-100 via-white to-emerald-50",
    accent: "text-emerald-500",
  },
  {
    icon: Clock,
    title: "Support That Never Sleeps",
    description: "Your personal concierge is a call, text or WhatsApp away before departure, in-destination and after you return.",
    gradient: "from-purple-100 via-white to-purple-50",
    accent: "text-purple-500",
  },
]


const FloatingShape = ({ style, className = "" }: { style: React.CSSProperties; className?: string }) => (
  <motion.div
    className={`absolute rounded-full ${className}`}
    style={style}
    animate={{
      y: [0, 15, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse",
    }}
  />
);

export function WhyUsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-white"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingShape 
          className="bg-brand-accent/10 w-64 h-64 -left-32 -top-32" 
          style={{ filter: 'blur(5px)' }}
        />
        <FloatingShape 
          className="bg-brand-success/10 w-80 h-80 -right-40 -bottom-40" 
          style={{ filter: 'blur(5px)' }}
        />
        <FloatingShape 
          className="bg-blue-500/10 w-40 h-40 right-1/4 top-1/4" 
          style={{ filter: 'blur(5px)' }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-success/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.4em] text-brand-success">
            Why Denmar
          </span>
          <h2 className="mt-6 font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
            The travel partner that keeps every promise
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg md:text-xl max-w-3xl mx-auto">
            From the first idea to the moment you return home, Denmar curates bespoke experiences backed by industry-leading support.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
            >
              <div className={`group h-full overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br ${feature.gradient} p-[1px] shadow-lg transition-shadow duration-300 hover:shadow-2xl`}>
                <div className="flex h-full flex-col rounded-[calc(1.5rem-2px)] bg-white/80 p-6 backdrop-blur">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ${feature.accent}`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-brand-primary">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                  <div className="mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-brand-success to-brand-accent opacity-0 transition-all duration-300 group-hover:w-24 group-hover:opacity-100" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-brand-success/20 bg-brand-success/5 px-6 py-8 text-center shadow-inner sm:flex-row sm:justify-between sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div>
            <h3 className="font-heading text-xl font-semibold text-brand-primary">
              Let’s design your next signature escape with Denmar Tours & Travel
            </h3>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Share a few details and our travel specialists will reply within 24 hours with curated ideas.
            </p>
          </div>
          <Button asChild size="lg" className="bg-brand-success text-white hover:bg-brand-success/90">
            <a href="/contact">Chat with us</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
