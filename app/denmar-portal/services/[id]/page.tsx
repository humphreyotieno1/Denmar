import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { ServiceForm } from "../service-form"

interface EditServicePageProps {
    params: Promise<{ id: string }>
}

export default async function EditServicePage({ params }: EditServicePageProps) {
    const { id } = await params

    const service = await prisma.service.findUnique({
        where: { id },
    })

    if (!service) {
        notFound()
    }

    return (
        <ServiceForm
            mode="edit"
            initialData={service}
        />
    )
}
