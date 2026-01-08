import { prisma } from "@/lib/db"
import { DealsPopupForm } from "../new/form"
import { notFound } from "next/navigation"

interface EditPopupPageProps {
    params: Promise<{ id: string }>
}

export default async function EditPopupPage({ params }: EditPopupPageProps) {
    const { id } = await params

    const popup = await prisma.dealsPopup.findUnique({
        where: { id },
    })

    if (!popup) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <DealsPopupForm initialData={popup} mode="edit" />
        </div>
    )
}
