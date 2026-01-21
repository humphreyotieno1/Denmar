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

  const modelPackage: any = prisma.package
  const modelSettings: any = prisma.siteSettings
  const modelCountry: any = prisma.country

  const [packageData, settings, countries] = await Promise.all([
    modelPackage.findUnique({
      where: { slug: slug },
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

  return <PackageDetails packageData={pkg} relatedPackages={relatedPackages} settings={settings} navCountries={countries} />
}

