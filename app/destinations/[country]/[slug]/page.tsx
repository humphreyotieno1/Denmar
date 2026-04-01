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

  const isKenya = countrySlug === "kenya"

  // Per-destination primary keyword targeting
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
    : `${destination.name} packages from Kenya, affordable ${destination.name} travel, ${destination.name} ${destination.country.name} holiday deals, ${destination.name} tours from Nairobi, ${(destination.tags as string[]).join(" ")} packages`

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

  const description = isKenya
    ? `${destination.summary.substring(0, 90)}. Book your ${destination.name} package from Nairobi today. Best prices & expert support guaranteed.`
    : `${destination.summary.substring(0, 90)}. Explore affordable ${destination.name}, ${destination.country.name} packages from Kenya. Check availability & get a quote today.`

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
