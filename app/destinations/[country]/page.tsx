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

  return {
    title: `${country.name} Destinations - Denmar Tours & Travel`,
    description: country.summary,
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug } = await params

  const [country, settings] = await Promise.all([
    prisma.country.findFirst({
      where: { slug: countrySlug, isActive: true }
    }),
    prisma.siteSettings.findUnique({
      where: { id: "settings" },
    })
  ])

  if (!country) {
    notFound()
  }

  const destinations = await prisma.destination.findMany({
    where: { countryId: country.id, isActive: true },
    orderBy: { order: "asc" }
  })

  return <CountryContent country={country} destinations={destinations} settings={settings} />
}
