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

  // Special handling for Kenya destinations to maximize SEO
  const isKenya = countrySlug === "kenya"
  
  // Create Kenya-specific keywords for popular destinations
  const getKenyaKeywords = (destName: string) => {
    const destLower = destName.toLowerCase()
    if (destLower === "mombasa") return "Mombasa travel packages, Mombasa beach holidays, Diani Beach packages, Kenya coast travel, Mombasa city tours"
    if (destLower === "diani") return "Diani Beach holidays, Diani Beach Kenya, Kenya coast travel, beach holidays Kenya, Diani packages"
    if (destLower === "amboseli") return "Amboseli National Park tours, Amboseli safari, Mount Kilimanjaro views, Kenya safari, Amboseli elephant tours"
    if (destLower === "nairobi") return "Nairobi travel, Nairobi city tours, Kenya capital tours, Nairobi attractions, Kenya tours from Nairobi"
    return `${destination.name} Kenya travel, ${destination.name} Kenya tours, ${destination.name} Kenya packages, Kenya safari, ${destination.name} travel`
  }
  
  const keywords = isKenya 
    ? getKenyaKeywords(destination.name)
    : `${destination.name} travel, ${destination.name} packages, ${country.name} holidays, ${destination.name} ${destination.tags.join(', ')} trips, ${destination.name} tours`
  
  const title = isKenya
    ? `${destination.name} Kenya - Travel Packages & Tours | ${country.name}'s Premier Destination | Denmar`
    : `${destination.name}, ${country.name} - Travel Guide & Packages`
  
  const description = isKenya
    ? `${destination.summary}. ${destination.description.substring(0, 80)}. Book your ${destination.name} Kenya tour package today with Kenya's best travel agency. Best prices guaranteed!`
    : `${destination.summary}. ${destination.description.substring(0, 120)}... Plan your perfect ${destination.name} trip with Denmar Tours & Travel.`
  
  return {
    title,
    description,
    keywords,
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

