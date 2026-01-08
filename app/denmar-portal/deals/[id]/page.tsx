import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { DealForm } from "../deal-form"

interface EditDealPageProps {
    params: Promise<{ id: string }>
}

export default async function EditDealPage({ params }: EditDealPageProps) {
    const { id } = await params

    const deal = await prisma.deal.findUnique({
        where: { id },
    })

    if (!deal) {
        notFound()
    }

    return (
        <DealForm
            mode="edit"
            initialData={deal}
        />
    )
}
