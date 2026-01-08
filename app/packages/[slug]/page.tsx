import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { PackageDetails } from "./package-details"
import { Package } from "@/lib/services"

export const dynamic = 'force-dynamic'

interface PackagePageProps {
  params: Promise<{ slug: string }>
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug } = await params

  const [packageData, settings, relatedPackagesData] = await Promise.all([
    prisma.package.findUnique({
      where: { slug: slug },
    }),
    prisma.siteSettings.findUnique({
      where: { id: "settings" },
    }),
    prisma.package.findMany({
      where: { isActive: true }, // We'll filter by category in memory or fetch all and filter, better to fetch category first but let's do this simply for now or fetch by category if packageData exists
    })
  ])

  if (!packageData) {
    notFound()
  }

  // Fetch related packages more efficiently if possible, but prisma query depends on packageData
  const relatedPackages = await prisma.package.findMany({
    where: {
      isActive: true,
      category: packageData.category,
      id: { not: packageData.id }
    },
    take: 3
  }) as unknown as Package[]

  // Cast packageData to Package type
  const pkg = packageData as unknown as Package

  return <PackageDetails packageData={pkg} relatedPackages={relatedPackages} settings={settings} />
}

