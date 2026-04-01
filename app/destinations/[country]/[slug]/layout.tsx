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

  const isKenya = countrySlug === "kenya"

  // Per-destination primary keyword targeting for Kenya
  const getKenyaKeywords = (destName: string): string => {
    const d = destName.toLowerCase()
    if (d.includes("masai mara") || d.includes("maasai mara"))
      return "Masai Mara safari packages, Masai Mara safari cost, 3 days Masai Mara safari, Masai Mara packages from Nairobi, Masai Mara wildlife safari Kenya"
    if (d.includes("amboseli"))
      return "Amboseli National Park tours from Nairobi, Amboseli safari packages Kenya, Amboseli elephant tours, Amboseli Kilimanjaro views safari"
    if (d.includes("diani"))
      return "Diani Beach packages from Kenya, Diani Beach holiday deals, Kenya coast travel packages, Diani beach holiday cost, Mombasa coast packages Nairobi"
    if (d.includes("mombasa"))
      return "Mombasa packages from Nairobi, Mombasa beach holiday Kenya, Kenya coast tours, Mombasa city tour packages, Diani Beach packages Mombasa"
    if (d.includes("nairobi"))
      return "Nairobi city tour packages, Nairobi day trips from Kenya, Nairobi travel deals, Nairobi attractions packages, Kenya tours from Nairobi"
    if (d.includes("tsavo"))
      return "Tsavo safari packages from Nairobi, Tsavo National Park tours Kenya, Tsavo East West safari, affordable Tsavo safari packages"
    if (d.includes("nakuru"))
      return "Lake Nakuru safari packages, Lake Nakuru flamingo tours Kenya, Nakuru National Park tours from Nairobi"
    if (d.includes("lamu"))
      return "Lamu island packages from Kenya, Lamu holiday deals Nairobi, Lamu cultural tour packages, Kenya coast Lamu trips"
    if (d.includes("samburu"))
      return "Samburu safari packages Kenya, Samburu National Reserve tours, Samburu wildlife safari from Nairobi"
    return `${destination.name} safari packages from Nairobi, ${destination.name} Kenya tours, ${destination.name} travel packages Kenya, affordable ${destination.name} safari`
  }

  const keywords = isKenya
    ? getKenyaKeywords(destination.name)
    : `${destination.name} packages from Kenya, affordable ${destination.name} travel, ${destination.name} ${country.name} holiday deals, ${destination.name} tours from Nairobi, ${destination.name} ${(destination.tags as string[]).join(" ")} packages`

  // Title: 60–65 chars, primary keyword first
  const getKenyaTitle = (destName: string): string => {
    const d = destName.toLowerCase()
    if (d.includes("masai mara") || d.includes("maasai mara"))
      return `Masai Mara Safari Packages | Best Deals from Nairobi – Denmar`
    if (d.includes("amboseli"))
      return `Amboseli National Park Tours | Affordable Packages – Denmar`
    if (d.includes("diani"))
      return `Diani Beach Packages from Kenya | Holiday Deals – Denmar`
    if (d.includes("mombasa"))
      return `Mombasa Packages from Nairobi | Kenya Coast Deals – Denmar`
    if (d.includes("nairobi"))
      return `Nairobi City Tour Packages | Kenya Travel Deals – Denmar`
    if (d.includes("tsavo"))
      return `Tsavo Safari Packages from Nairobi | Affordable Tours – Denmar`
    return `${destination.name} Safari Packages from Nairobi | Affordable – Denmar`
  }

  const title = isKenya
    ? getKenyaTitle(destination.name)
    : `${destination.name} Packages from Kenya | Affordable Travel – Denmar`

  // Description: 150–160 chars, includes primary keyword + CTA
  const description = isKenya
    ? `${destination.summary.substring(0, 90)}. Book your ${destination.name} package from Nairobi today. Best prices & expert support guaranteed.`
    : `${destination.summary.substring(0, 90)}. Explore affordable ${destination.name}, ${country.name} packages from Kenya. Check availability & get a quote today.`

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
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

