import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { DestinationContent } from "./destination-content"
import { packages as allPackages } from "@/lib/services" // Keep for packages currently, or migrate packages to DB later

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

  return {
    title: `${destination.name} - ${destination.country.name} Tours | Denmar`,
    description: destination.summary,
  }
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { country: countrySlug, slug: destinationSlug } = await params

  const [country, settings] = await Promise.all([
    prisma.country.findFirst({
      where: { slug: countrySlug, isActive: true }
    }),
    prisma.siteSettings.findUnique({
      where: { id: "settings" },
    })
  ])

  const destination = await prisma.destination.findFirst({
    where: {
      slug: destinationSlug,
      countryId: country?.id,
      isActive: true
    }
  })

  if (!country || !destination) {
    notFound()
  }

  // Fetch related packages (currently static filter, but ready for DB migration)
  const packages = allPackages.filter((pkg) => pkg.destinationSlug === destination.slug)

  // Fetch related destinations
  const relatedDestinations = await prisma.destination.findMany({
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
    />
  )
}
