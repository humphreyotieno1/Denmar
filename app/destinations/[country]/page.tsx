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

  // High-intent keyword targeting: primary = "[Country] packages from Kenya"
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
