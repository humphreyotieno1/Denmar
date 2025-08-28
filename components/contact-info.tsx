import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ContactInfo() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="font-heading text-2xl text-brand-primary">Contact Information</CardTitle>
        <p className="text-gray-600">Reach us through any of these channels.</p>
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
              3rd Floor Office - Design Center Building
              <br />
              Tausi Road, Westlands
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
              Office Line: +254 114 320 486
              <br />
              Call/ Whatsapp: +254 793 041 888
              <br />
              Call/ Whatsapp: +254 791 841 346
              <br />
              Call/ Whatsapp: +254 113 039 737
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
              General Info: info@denmartravel.co.ke
              <br />
              Bookings: sales@denmartravel.co.ke
              <br />
              Bookings: sales2@denmartravel.co.ke
              <br />
              Bookings: holidays@denmartravel.co.ke
              <br />
              Groups: groups@denmartravel.co.ke
            </p>
          </div>
        </div>

        <div className="mt-6 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
          <div className="space-y-2 text-gray-600">
            <p className="flex justify-between"><span>Monday - Friday</span> <span>6:00 AM - 5:00 PM</span></p>
            <p className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 1:00 PM</span></p>
            <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
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
            <a href="tel:+254793041888">
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
