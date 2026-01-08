import { prisma } from "@/lib/db"
import { PackagesContent } from "./packages-content"
import { Package } from "@/lib/services"

export const dynamic = 'force-dynamic'

export default async function PackagesPage() {
  const [packages, settings] = await Promise.all([
    prisma.package.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }) as unknown as Package[],
    prisma.siteSettings.findUnique({
      where: { id: "settings" },
    })
  ])

  return <PackagesContent packages={packages} settings={settings} />
}
