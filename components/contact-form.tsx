"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, Plus, Minus, Users, Baby, Plane } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { trackContactFormSubmission } from "@/lib/facebook-pixel"
import { format, differenceInDays, addDays, isPast, parseISO } from "date-fns"

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be less than 50 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  destination: z.string().min(1, "Please select a destination"),
  travelDateFrom: z.string().min(1, "Please select travel date from"),
  travelDateTo: z.string().min(1, "Please select travel date to"),
  adults: z.number().min(1, "At least 1 adult required").max(100, "Maximum 100 adults"),
  children: z.number().min(0, "Children cannot be negative").max(100, "Maximum 100 children"),
  budget: z.string().min(1, "Please select your budget range"),
  message: z.string().min(1, "Message must be at least 1 character").max(1000, "Message must be less than 1000 characters"),
  otherDestination: z.string().optional(),
  website: z.string().optional(), // Honeypot field
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm({ countries = [] }: { countries?: any[] }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const today = format(new Date(), 'yyyy-MM-dd')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      adults: 1,
      children: 0,
      travelDateFrom: today,
    }
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    const destParam = searchParams.get('destination')
    if (destParam) {
      // Check if the destination exists in our dynamic list
      let found = false
      countries.forEach(country => {
        country.destinations.forEach((dest: any) => {
          if (dest.name.toLowerCase() === destParam.toLowerCase()) {
            setValue("destination", dest.name)
            found = true
          }
        })
      })

      // If not found in dynamic list, it might be a package name or custom destination
      if (!found) {
        setValue("destination", "other")
        setValue("otherDestination", destParam)
      }
    }
  }, [searchParams, countries, setValue])

  // Watch dates for duration calculation and validation
  const travelDateFrom = watch("travelDateFrom")
  const travelDateTo = watch("travelDateTo")

  const duration = travelDateFrom && travelDateTo 
    ? differenceInDays(parseISO(travelDateTo), parseISO(travelDateFrom))
    : 0

  const nights = duration > 0 ? duration : 0
  const days = duration > 0 ? duration + 1 : 0

  const handleAdultsChange = (increment: boolean) => {
    if (increment && adults < 100) {
      setAdults(adults + 1)
      setValue("adults", adults + 1)
    } else if (!increment && adults > 1) {
      setAdults(adults - 1)
      setValue("adults", adults - 1)
    }
  }

  const handleChildrenChange = (increment: boolean) => {
    if (increment && children < 100) {
      setChildren(children + 1)
      setValue("children", children + 1)
    } else if (!increment && children > 0) {
      setChildren(children - 1)
      setValue("children", children - 1)
    }
  }

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check: If 'website' field is filled, it's likely a bot
    if (data.website) {
      // console.warn("Bot submission detected via honeypot")
      // We still simulate success so the bot thinks it worked and doesn't try harder
      setIsSubmitted(true)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          destination: data.destination === 'other' ? data.otherDestination : data.destination,
          travelDateFrom: data.travelDateFrom,
          travelDateTo: data.travelDateTo,
          adults: data.adults,
          children: data.children,
          budget: data.budget,
          message: data.message,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        reset()
        setAdults(1)
        setChildren(0)
        // Track Facebook Pixel event
        trackContactFormSubmission('contact')
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error('Failed to send your message. Please try again or contact us directly.')
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
      <CardHeader className="p-6 pb-2 tablet:p-8 tablet:pb-6">
        <CardTitle className="font-heading text-2xl sm:text-3xl text-brand-primary mb-2 sm:mb-3">Get in Touch</CardTitle>
        <p className="text-gray-600 text-base sm:text-lg">Fill out the form below and we'll help you plan your perfect trip. Our travel experts will get back to you within 24 hours.</p>
      </CardHeader>
      <CardContent className="p-5 tablet:p-8 pt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot field - hidden from users but visible to bots */}
          <div className="hidden" aria-hidden="true">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="text"
              {...register("website")}
              tabIndex={-1}
              autoComplete="off"
              placeholder="If you're a human, leave this empty"
            />
          </div>

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
                placeholder="Enter phone number(+254xxxxxxxxx)"
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
                  {countries.map((country) => (
                    <div key={country.id}>
                      <div className="px-2 py-1.5 text-sm font-semibold text-gray-400 bg-gray-50/50 uppercase tracking-wider">
                        {country.name}
                      </div>
                      {country.destinations.map((dest: any) => (
                        <SelectItem key={dest.id} value={dest.name}>
                          {dest.name}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                  <SelectItem value="other">Other Destination (Specify)</SelectItem>
                </SelectContent>
              </Select>
              {errors.destination && <p className="text-sm text-red-500">{errors.destination.message}</p>}
            </div>

            {/* Other Destination Input - Dynamic */}
            {watch("destination") === "other" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                <Label htmlFor="otherDestination">Please specify your destination *</Label>
                <Input
                  id="otherDestination"
                  {...register("otherDestination", { required: watch("destination") === "other" })}
                  placeholder="Where would you like to go?"
                  className={errors.otherDestination ? "border-red-500" : ""}
                />
                {errors.otherDestination && <p className="text-sm text-red-500">Please specify your destination</p>}
              </div>
            )}
            <div className="space-y-2">
              <Label>Travel Date Range *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="travelDateFrom" className="text-sm font-medium text-gray-700">From</Label>
                  <div className="relative">
                    <Input
                      id="travelDateFrom"
                      type="date"
                      min={today}
                      {...register("travelDateFrom")}
                      className={`h-12 w-full transition-all duration-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent cursor-pointer ${
                        errors.travelDateFrom ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.travelDateFrom && <p className="text-sm text-red-500 mt-1">{errors.travelDateFrom.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="travelDateTo" className="text-sm font-medium text-gray-700">To</Label>
                  <div className="relative">
                    <Input
                      id="travelDateTo"
                      type="date"
                      min={travelDateFrom || today}
                      {...register("travelDateTo")}
                      className={`h-12 w-full transition-all duration-200 focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent cursor-pointer ${
                        errors.travelDateTo ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.travelDateTo && <p className="text-sm text-red-500 mt-1">{errors.travelDateTo.message}</p>}
                </div>
              </div>
              {/* Duration Display */}
              {duration > 0 && (
                <div className="mt-3 flex items-center gap-2 text-brand-primary font-semibold bg-brand-accent/10 p-3 rounded-lg border border-brand-accent/20 animate-in fade-in slide-in-from-top-1">
                  <Plane className="h-5 w-5 text-brand-accent" />
                  <span className="text-base">Trip Duration: {days} Days, {nights} Nights</span>
                </div>
              )}
            </div>
          </div>

          {/* Travelers Section */}
          <div className="space-y-4">
            <Label>Number of Travelers *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Adults */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-brand-accent" />
                  <Label className="text-sm font-medium">Adults (12+)</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAdultsChange(false)}
                    disabled={adults <= 1}
                    className="w-10 h-10 p-0 hover:bg-red-50 hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-bold text-brand-primary min-w-[3rem] text-center">
                    {adults}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAdultsChange(true)}
                    disabled={adults >= 100}
                    className="w-10 h-10 p-0 hover:bg-green-50 hover:border-green-300 hover:text-green-600 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {errors.adults && <p className="text-sm text-red-500">{errors.adults.message}</p>}
              </div>

              {/* Children */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Baby className="h-5 w-5 text-brand-accent" />
                  <Label className="text-sm font-medium">Children (0-12)</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleChildrenChange(false)}
                    disabled={children <= 0}
                    className="w-10 h-10 p-0 hover:bg-red-50 hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-2xl font-bold text-brand-primary min-w-[3rem] text-center">
                    {children}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleChildrenChange(true)}
                    disabled={children >= 100}
                    className="w-10 h-10 p-0 hover:bg-green-50 hover:border-green-300 hover:text-green-600 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {errors.children && <p className="text-sm text-red-500">{errors.children.message}</p>}
              </div>
            </div>
            
            {/* Total Travelers Display */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                Total Travelers: <span className="font-semibold text-brand-primary">{adults + children}</span>
                {adults > 0 && <span className="text-gray-500"> ({adults} adult{adults !== 1 ? 's' : ''}</span>}
                {children > 0 && <span className="text-gray-500">, {children} child{children !== 1 ? 'ren' : ''}</span>}
                {children > 0 && <span className="text-gray-500">)</span>}
              </p>
            </div>
          </div>

          {/* Budget */}
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
            className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold h-14 sm:h-16 text-lg transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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
