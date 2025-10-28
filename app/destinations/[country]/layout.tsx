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

  // Special handling for Kenya to maximize local SEO
  const isKenya = countrySlug === "kenya"
  const kenyaKeywords = isKenya 
    ? "Kenya destinations, Kenya travel, Kenya tours, Kenya safari, Masai Mara, Amboseli, Diani Beach, Kenya travel packages, best Kenya destinations"
    : `${country.name} travel, ${country.name} tours, ${country.name} destinations`
  
  return {
    title: isKenya 
      ? `${country.name} Travel Guide & Tour Packages | Best Kenya Destinations | Denmar`
      : `${country.name} Travel Guide - Denmar Tours & Travel`,
    description: isKenya
      ? `${country.summary}. Discover amazing Kenya destinations including Masai Mara, Amboseli, Diani Beach, and Lake Nakuru with Kenya's best travel agency. Book your Kenya tour package today!`
      : `${country.summary}. Explore ${country.name} with Denmar Tours & Travel - your trusted travel partner for ${country.region} adventures.`,
    keywords: kenyaKeywords,
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

