import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { CountryContent } from "./country-content"

interface CountryPageProps {
  params: Promise<{ country: string }>
}

export async function generateMetadata({ params }: CountryPageProps) {
  const { country: countrySlug } = await params
  const country = await prisma.country.findFirst({
    where: { slug: countrySlug, isActive: true }
  })

  if (!country) return { title: "Country Not Found" }

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

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug } = await params

  const modelCountry: any = prisma.country
  const modelSettings: any = prisma.siteSettings
  const modelDestination: any = prisma.destination

  const [country, settings, countriesForNav] = await Promise.all([
    modelCountry.findFirst({
      where: { slug: countrySlug, isActive: true }
    }),
    modelSettings.findUnique({
      where: { id: "settings" },
    }),
    modelCountry.findMany({
      where: { isActive: true },
      include: { destinations: { where: { isActive: true } } },
      orderBy: { order: "asc" },
    })
  ])

  if (!country) {
    notFound()
  }

  const destinations = await modelDestination.findMany({
    where: { countryId: country.id, isActive: true },
    orderBy: { order: "asc" }
  })

  return <CountryContent country={country} destinations={destinations} settings={settings} navCountries={countriesForNav} />
}
