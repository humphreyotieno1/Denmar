import { getCountryBySlug, getDestinationBySlug } from "@/lib/destinations"
import type { Metadata } from "next"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ country: string; slug: string }> 
}): Promise<Metadata> {
  const { country: countrySlug, slug: destinationSlug } = await params
  const country = getCountryBySlug(countrySlug)
  const destination = getDestinationBySlug(countrySlug, destinationSlug)
  
  if (!country || !destination) {
    return {
      title: "Destination - Denmar Tours & Travel",
      description: "Explore amazing destinations with Denmar Tours & Travel.",
    }
  }

  return {
    title: `${destination.name}, ${country.name} - Travel Guide & Packages`,
    description: `${destination.summary}. ${destination.description.substring(0, 120)}... Plan your perfect ${destination.name} trip with Denmar Tours & Travel.`,
    keywords: `${destination.name} travel, ${destination.name} packages, ${country.name} holidays, ${destination.name} ${destination.tags.join(', ')} trips, ${destination.name} tours`,
    openGraph: {
      title: `${destination.name}, ${country.name} - Travel Guide`,
      description: destination.summary,
      images: [destination.heroImage || "/tablogo.png"],
    },
  }
}

export default function DestinationDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

