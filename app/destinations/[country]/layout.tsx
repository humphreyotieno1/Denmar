import { getCountryBySlug } from "@/lib/destinations"
import type { Metadata } from "next"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ country: string }> 
}): Promise<Metadata> {
  const { country: countrySlug } = await params
  const country = getCountryBySlug(countrySlug)
  
  if (!country) {
    return {
      title: "Destinations - Denmar Tours & Travel",
      description: "Explore amazing destinations worldwide with Denmar Tours & Travel.",
    }
  }

  return {
    title: `${country.name} Travel Guide - Denmar Tours & Travel`,
    description: `${country.summary}. Explore ${country.name} with Denmar Tours & Travel - your trusted travel partner for ${country.region} adventures.`,
    keywords: `${country.name} travel, ${country.name} tours, ${country.name} destinations, ${country.region} travel, ${country.name} holiday packages`,
    openGraph: {
      title: `${country.name} Travel Guide - Denmar Tours & Travel`,
      description: country.summary,
      images: [country.heroImage || "/tablogo.png"],
    },
  }
}

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

