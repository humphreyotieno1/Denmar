"use client"

import { Shield, DollarSign, Plane, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const features = [
  {
    icon: DollarSign,
    title: "Save Money",
    description: "Get special rates. Shop around, we'll beat the lowest price!",
    color: "text-brand-accent",
    bg: "bg-brand-accent/10"
  },
  {
    icon: Plane,
    title: "Get the Best",
    description: "You drive to adventures, we get it. We deliver the best to you.",
    color: "text-brand-accent",
    bg: "bg-brand-accent/10"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "We ensure the safety and security of all our customers",
    color: "text-brand-success",
    bg: "bg-brand-success/10"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support to assist you throughout your journey.",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl font-bold text-brand-primary mb-4">
            WHY TRAVEL WITH <span className="text-brand-accent">DENMAR TOURS</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to making your travel dreams come true with exceptional service and unforgettable experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bg} mb-6 transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-brand-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
