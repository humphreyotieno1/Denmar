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
  const keywords = isKenya
    ? "Kenya safari packages from Nairobi, Kenya travel packages, Masai Mara safari cost, 3 days Masai Mara safari, Amboseli National Park tours from Kenya, Diani beach holiday packages, affordable Kenya safaris, Kenya tour company Nairobi"
    : `${country.name} packages from Kenya, ${country.name} holiday packages from Nairobi, affordable ${country.name} travel deals, ${country.name} tour packages Kenya, ${country.name} travel agency Nairobi`

  const title = isKenya
    ? `Kenya Safari Packages from Nairobi | Affordable Tours – Denmar`
    : `${country.name} Packages from Kenya | Affordable Travel – Denmar`

  const description = isKenya
    ? `${country.summary}. Find affordable Kenya safari packages from Nairobi — Masai Mara, Amboseli, Diani Beach & more. Check availability & get your custom quote today.`
    : `${country.summary}. Book affordable ${country.name} packages from Kenya with Denmar Travel. Flexible dates, expert support — check availability & get a quote today.`

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
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

