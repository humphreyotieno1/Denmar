import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ContactInfo() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="font-heading text-2xl text-brand-primary">Contact Information</CardTitle>
        <p className="text-gray-600">Get in touch with us through any of these channels.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Office Address */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-accent/10">
            <MapPin className="h-6 w-6 text-brand-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-brand-primary mb-1">Office Address</h3>
            <p className="text-gray-600">
              3rd Floor
              <br />
              Design Center
              <br />
              Tausi Lane, Westlands
              <br />
              Nairobi, Kenya
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-success/10">
            <Phone className="h-6 w-6 text-brand-success" />
          </div>
          <div>
            <h3 className="font-semibold text-brand-primary mb-1">Phone Numbers</h3>
            <p className="text-gray-600">
              Main: +254 793 041 888
              <br />
              Emergency: +254 793 041 888
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-brand-primary mb-1">Email Addresses</h3>
            <p className="text-gray-600">
              General: info@denmartravel.co.ke
              <br />
              Bookings: bookings@denmartravel.co.ke
              <br />
              Support: support@denmartravel.co.ke
            </p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100">
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-brand-primary mb-1">Business Hours</h3>
            <p className="text-gray-600">
              Monday - Friday: 9:00 AM - 7:00 PM
              <br />
              Saturday: 10:00 AM - 5:00 PM
              <br />
              Sunday: 12:00 PM - 4:00 PM
              <br />
              <span className="text-sm text-brand-accent">24/7 Emergency Support Available</span>
            </p>
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="pt-6 border-t space-y-3">
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white" asChild>
            <a href="https://wa.me/254793041888" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Chat
            </a>
          </Button>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" asChild>
            <a href="tel:+1234567890">
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
