import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { DestinationContent } from "./destination-content"
import { Package } from "@/lib/services" // Keep for packages currently, or migrate packages to DB later

interface DestinationPageProps {
  params: Promise<{ country: string; slug: string }>
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const { country: countrySlug, slug: destinationSlug } = await params

  const destination = await prisma.destination.findFirst({
    where: {
      slug: destinationSlug,
      country: { slug: countrySlug },
      isActive: true
    },
    include: { country: true }
  })

  if (!destination) return { title: "Destination Not Found" }

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
    : `${destination.name} travel, ${destination.name} packages, ${destination.country.name} holidays, ${destination.name} ${(destination.tags as string[]).join(', ')} trips, ${destination.name} tours`

  const title = isKenya
    ? `${destination.name} Kenya - Travel Packages & Tours | ${destination.country.name}'s Premier Destination | Denmar`
    : `${destination.name}, ${destination.country.name} - Travel Guide & Packages`

  const description = isKenya
    ? `${destination.summary}. ${destination.description.substring(0, 80)}. Book your ${destination.name} Kenya tour package today with Kenya's best travel agency. Best prices guaranteed!`
    : `${destination.summary}. ${destination.description.substring(0, 120)}... Plan your perfect ${destination.name} trip with Denmar Tours & Travel.`

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: `${destination.name}, ${destination.country.name} - Travel Guide`,
      description: destination.summary,
      images: [destination.heroImage || "/tablogo.png"],
    },
  }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { country: countrySlug, slug: destinationSlug } = await params

  const modelCountry: any = prisma.country
  const modelSettings: any = prisma.siteSettings
  const modelDestination: any = prisma.destination
  const modelPackage: any = prisma.package

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

  const destination = await modelDestination.findFirst({
    where: {
      slug: destinationSlug,
      countryId: country?.id,
      isActive: true
    }
  })

  if (!country || !destination) {
    notFound()
  }

  // Fetch related packages from DB instead of static file
  const packages = await modelPackage.findMany({
    where: {
      destinationSlug: destination.slug,
      isActive: true
    },
    orderBy: { order: "asc" }
  })

  // Fetch related destinations
  const relatedDestinations = await modelDestination.findMany({
    where: {
      countryId: country.id,
      id: { not: destination.id },
      isActive: true
    },
    take: 3,
    orderBy: { featured: 'desc' }
  })

  return (
    <DestinationContent
      country={country}
      destination={destination}
      packages={packages}
      relatedDestinations={relatedDestinations}
      settings={settings}
      navCountries={countriesForNav}
    />
  )
}
