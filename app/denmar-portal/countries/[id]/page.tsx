import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { CountryForm } from "../country-form"

interface EditCountryPageProps {
    params: Promise<{ id: string }>
}

export default async function EditCountryPage({ params }: EditCountryPageProps) {
    const { id } = await params

    const country = await prisma.country.findUnique({
        where: { id },
    })

    if (!country) {
        notFound()
    }

    return (
        <CountryForm
            mode="edit"
            initialData={{
                id: country.id,
                name: country.name,
                slug: country.slug,
                heroImage: country.heroImage,
                summary: country.summary,
                description: country.description,
                region: country.region,
                popularDestinations: country.popularDestinations,
                featured: country.featured,
                isActive: country.isActive,
                order: country.order,
            }}
        />
    )
}
