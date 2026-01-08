import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { PackageForm } from "../package-form"

interface EditPackagePageProps {
    params: Promise<{ id: string }>
}

export default async function EditPackagePage({ params }: EditPackagePageProps) {
    const { id } = await params

    const [pkg, destinations] = await Promise.all([
        prisma.package.findUnique({
            where: { id },
        }),
        prisma.destination.findMany({
            orderBy: { name: "asc" },
            select: {
                slug: true,
                name: true,
                country: {
                    select: { name: true }
                }
            }
        })
    ])

    if (!pkg) {
        notFound()
    }

    const formattedDestinations = destinations.map(d => ({
        slug: d.slug,
        name: d.name,
        countryName: d.country.name
    }))

    return (
        <PackageForm
            mode="edit"
            initialData={pkg}
            destinations={formattedDestinations}
        />
    )
}
