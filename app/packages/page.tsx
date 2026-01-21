import { prisma } from "@/lib/db"
import { PackagesContent } from "./packages-content"
import { Package } from "@/lib/services"

export const dynamic = 'force-dynamic'

export default async function PackagesPage() {
  const modelPackage: any = prisma.package
  const modelSettings: any = prisma.siteSettings
  const modelCountry: any = prisma.country

  const [packages, settings, countriesForNav] = await Promise.all([
    modelPackage.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }) as unknown as Package[],
    modelSettings.findUnique({
      where: { id: "settings" },
    }),
    modelCountry.findMany({
      where: { isActive: true },
      include: { destinations: { where: { isActive: true } } },
      orderBy: { order: "asc" },
    })
  ])

  return <PackagesContent packages={packages} settings={settings} navCountries={countriesForNav} />
}
