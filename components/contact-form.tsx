"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle } from "lucide-react"

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  destination: z.string().min(1, "Please select a destination"),
  travelDate: z.string().min(1, "Please select a travel date"),
  travelers: z.string().min(1, "Please select number of travelers"),
  budget: z.string().min(1, "Please select your budget range"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", data)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error("Form submission error:", error)
      // You can add toast notification here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-brand-success" />
          </div>
          <h3 className="font-heading text-3xl font-bold text-brand-primary mb-4">Thank You!</h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
            Your message has been sent successfully. Our travel experts will get back to you within 24 hours with personalized travel recommendations.
          </p>
        </div>
        <Button
          onClick={() => setIsSubmitted(false)}
          className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-3 text-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
        >
          Send Another Message
        </Button>
      </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="font-heading text-3xl text-brand-primary mb-3">Get in Touch</CardTitle>
        <p className="text-gray-600 text-lg">Fill out the form below and we'll help you plan your perfect trip. Our travel experts will get back to you within 24 hours.</p>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="Enter your first name"
                className={`transition-all duration-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent ${
                  errors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300"
                }`}
              />
              {errors.firstName && <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.firstName.message}
              </p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Enter your last name"
                className={`transition-all duration-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent ${
                  errors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300"
                }`}
              />
              {errors.lastName && <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.lastName.message}
              </p>}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className={`transition-all duration-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent ${
                  errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.email.message}
              </p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="Enter your phone number"
                className={`transition-all duration-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent ${
                  errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300"
                }`}
              />
              {errors.phone && <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.phone.message}
              </p>}
            </div>
          </div>

          {/* Travel Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Preferred Destination *</Label>
              <Select onValueChange={(value) => setValue("destination", value)}>
                <SelectTrigger className={errors.destination ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bali">Bali, Indonesia</SelectItem>
                  <SelectItem value="paris">Paris, France</SelectItem>
                  <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                  <SelectItem value="santorini">Santorini, Greece</SelectItem>
                  <SelectItem value="dubai">Dubai, UAE</SelectItem>
                  <SelectItem value="maldives">Maldives</SelectItem>
                  <SelectItem value="other">Other (specify in message)</SelectItem>
                </SelectContent>
              </Select>
              {errors.destination && <p className="text-sm text-red-500">{errors.destination.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelDate">Preferred Travel Date *</Label>
              <Input
                id="travelDate"
                type="date"
                {...register("travelDate")}
                className={`transition-all duration-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent ${
                  errors.travelDate ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300"
                }`}
              />
              {errors.travelDate && <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.travelDate.message}
              </p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="travelers">Number of Travelers *</Label>
              <Select onValueChange={(value) => setValue("travelers", value)}>
                <SelectTrigger className={errors.travelers ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select travelers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Traveler</SelectItem>
                  <SelectItem value="2">2 Travelers</SelectItem>
                  <SelectItem value="3-4">3-4 Travelers</SelectItem>
                  <SelectItem value="5-8">5-8 Travelers</SelectItem>
                  <SelectItem value="9+">9+ Travelers</SelectItem>
                </SelectContent>
              </Select>
              {errors.travelers && <p className="text-sm text-red-500">{errors.travelers.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range *</Label>
              <Select onValueChange={(value) => setValue("budget", value)}>
                <SelectTrigger className={errors.budget ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1000">Under $1,000</SelectItem>
                  <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                  <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="over-10000">Over $10,000</SelectItem>
                </SelectContent>
              </Select>
              {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Tell us about your dream trip, special requirements, or any questions you have..."
              rows={5}
              className={`transition-all duration-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent resize-none ${
                errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300"
              }`}
            />
            {errors.message && <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {errors.message.message}
            </p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold py-4 text-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Sending Message...
              </div>
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
