import { MapPin } from "lucide-react"

export function ContactMap() {
  return (
    <div className="w-full">
      <div className="p-4 bg-brand-primary text-white">
        <h3 className="font-heading text-lg font-semibold">Find Us Here</h3>
        <p className="text-sm opacity-90">Visit our office for personalized travel planning</p>
      </div>
      <div className="h-96 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.827095105166!2d36.80619607481261!3d-1.2658444355707907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f176974865965%3A0x565501be305573d6!2sDenmar%20Tours%20and%20Travel%20Ltd!5e0!3m2!1sen!2ske!4v1693212345678"
          width="100%"
          height="100%"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Google Maps showing Denmar Tours and Travel location"
        />
      </div>
    </div>
  )
}
