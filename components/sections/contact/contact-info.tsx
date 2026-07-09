import { Phone, Mail } from "@/components/ui/huge-icons"
import { FaWhatsapp } from "react-icons/fa"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ContactInfo() {
  const phoneNumbers = [
    { label: "Office Line", value: "+254 113 039 737", href: "tel:+254113039737" },
    { label: "Landline", value: "+254 114 320 486", href: "tel:+254114320486" },
    { label: "Call / Whatsapp", value: "+254 720 490 888", href: "tel:+254720490888" },
  ]

  const emails = [
    { label: "General Info", value: "info@denmartravel.co.ke", href: "mailto:info@denmartravel.co.ke" },
    { label: "Bookings", value: "sales@denmartravel.co.ke", href: "mailto:sales@denmartravel.co.ke" },
    { label: "Bookings", value: "sales2@denmartravel.co.ke", href: "mailto:sales2@denmartravel.co.ke" },
  ]

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="font-heading text-2xl text-brand-primary">Contact Information</CardTitle>
        <p className="text-gray-600">Reach us directly through phone or email.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-success/10">
              <Phone className="h-5 w-5 text-brand-success" />
            </div>
            <h3 className="font-semibold text-brand-primary">Phone Numbers</h3>
          </div>
          <div className="space-y-2">
            {phoneNumbers.map((phone) => (
              <p key={phone.href} className="text-sm text-gray-700">
                <span className="font-medium text-gray-800">{phone.label}:</span>{" "}
                <a href={phone.href} className="hover:text-brand-accent transition-colors">
                  {phone.value}
                </a>
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-brand-primary">Email Addresses</h3>
          </div>
          <div className="space-y-2">
            {emails.map((email) => (
              <p key={email.href} className="text-sm text-gray-700">
                <span className="font-medium text-gray-800">{email.label}:</span>{" "}
                <a href={email.href} className="hover:text-brand-accent transition-colors">
                  {email.value}
                </a>
              </p>
            ))}
          </div>
        </div>

        {/* Quick Contact Buttons */}
        <div className="pt-4 border-t space-y-3">
          <Button className="w-full bg-green-500 rounded-full hover:bg-green-600 text-white" asChild>
            <a href="https://wa.me/254793041888" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="mr-2 h-4 w-4" />
              WhatsApp Chat
            </a>
          </Button>
          <Button variant="outline" className="w-full border-brand-accent rounded-full text-brand-primary hover:bg-brand-accent/5" asChild>
            <a href="mailto:info@denmartravel.co.ke">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
