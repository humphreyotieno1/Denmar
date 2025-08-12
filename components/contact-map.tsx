import { MapPin } from "lucide-react"

export function ContactMap() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-brand-primary text-white">
        <h3 className="font-heading text-lg font-semibold">Find Us Here</h3>
        <p className="text-sm opacity-90">Visit our office for personalized travel planning</p>
      </div>
      <div className="h-64 bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500" role="img" aria-label="Map placeholder showing office location">
          <MapPin className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">Interactive Map</p>
          <p className="text-xs">123 Travel Street, Adventure City</p>
          <p className="text-xs mt-2 text-brand-accent">Google Maps integration would be embedded here</p>
        </div>
      </div>
    </div>
  )
}
