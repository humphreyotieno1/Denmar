"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Send, Phone, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const quoteSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  destination: z.string().min(1),
  travelDateFrom: z.string().min(1, "Check-in date is required"),
  travelDateTo: z.string().min(1, "Check-out date is required"),
  travelers: z.string().min(1, "Number of travelers is required"),
  budget: z.string().min(1, "Budget range is required"),
})

type QuoteFormData = z.infer<typeof quoteSchema>

interface MiniQuoteFormProps {
  defaultDestination: string
}

export function MiniQuoteForm({ defaultDestination }: MiniQuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const today = new Date().toISOString().split("T")[0]

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      destination: defaultDestination,
    },
  })

  // Ensure destination is set if it changes or on mount
  useEffect(() => {
    if (defaultDestination) {
      setValue("destination", defaultDestination)
    }
  }, [defaultDestination, setValue])

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          destination: data.destination,
          travelDateFrom: data.travelDateFrom,
          travelDateTo: data.travelDateTo,
          adults: parseInt(data.travelers.split('-')[0]) || 1,
          children: 0,
          budget: data.budget,
          message: `QUICK QUOTE REQUEST FROM DESTINATION PAGE.\nTravelers: ${data.travelers}\nBudget Range: ${data.budget}`,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(result.message || "Quote request sent! Check your email for confirmation.")
        setIsSuccess(true)
        reset()
      } else {
        throw new Error(result.error || "Failed to send")
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const travelDateFrom = watch("travelDateFrom")

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 space-y-6"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Request Sent!</h3>
          <p className="text-slate-600">
            Thank you for reaching out. Our travel specialists will contact you with a customized quote for <strong>{defaultDestination}</strong> within 24 hours.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
          className="rounded-xl border-slate-200"
        >
          Send another request
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName" 
            placeholder="John"
            {...register("firstName")} 
            className={errors.firstName ? "border-red-500" : ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName" 
            placeholder="Doe"
            {...register("lastName")} 
            className={errors.lastName ? "border-red-500" : ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          type="email"
          placeholder="john@example.com"
          {...register("email")} 
          className={errors.email ? "border-red-500" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <Input 
          id="destination" 
          value={watch("destination")}
          readOnly 
          className="bg-gray-50 font-medium cursor-default focus-visible:ring-0" 
        />
        {/* Hidden field to ensure RHF picks up the value for submission if register has issues with readOnly */}
        <input type="hidden" {...register("destination")} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="travelDateFrom">Check-in</Label>
          <Input 
            id="travelDateFrom" 
            type="date" 
            min={today}
            {...register("travelDateFrom")} 
            className={errors.travelDateFrom ? "border-red-500 text-xs" : "text-xs"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="travelDateTo">Check-out</Label>
          <Input 
            id="travelDateTo" 
            type="date" 
            min={travelDateFrom || today}
            {...register("travelDateTo")} 
            className={errors.travelDateTo ? "border-red-500 text-xs" : "text-xs"}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="travelers">Travelers</Label>
          <Select onValueChange={(value) => setValue("travelers", value)}>
            <SelectTrigger className={errors.travelers ? "border-red-500" : ""}>
              <SelectValue placeholder="How many?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Person</SelectItem>
              <SelectItem value="2">2 People</SelectItem>
              <SelectItem value="3-5">3-5 People</SelectItem>
              <SelectItem value="6+">Group (6+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (USD)</Label>
          <Select onValueChange={(value) => setValue("budget", value)}>
            <SelectTrigger className={errors.budget ? "border-red-500" : ""}>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500-1500">$500 - $1500</SelectItem>
              <SelectItem value="1500-3000">$1500 - $3000</SelectItem>
              <SelectItem value="3000+">$3000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            id="phone" 
            placeholder="+254..." 
            className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
            {...register("phone")}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold h-12 rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Get My Quote Now
            <Send className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </form>
  )
}
