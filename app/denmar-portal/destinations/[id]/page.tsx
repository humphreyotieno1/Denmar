import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { DestinationForm } from "../destination-form"

interface EditDestinationPageProps {
    params: Promise<{ id: string }>
}

export default async function EditDestinationPage({ params }: EditDestinationPageProps) {
    const { id } = await params

    const [destination, countries] = await Promise.all([
        prisma.destination.findUnique({
            where: { id },
        }),
        prisma.country.findMany({
            orderBy: { name: "asc" },
            select: { id: true, name: true }
        })
    ])

    if (!destination) {
        notFound()
    }

    return (
        <DestinationForm
            mode="edit"
            initialData={destination}
            countries={countries}
        />
    )
}
