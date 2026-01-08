import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { HeroSlideForm } from "../hero-slide-form"

interface EditHeroSlidePageProps {
    params: Promise<{ id: string }>
}

export default async function EditHeroSlidePage({ params }: EditHeroSlidePageProps) {
    const { id } = await params

    const slide = await prisma.heroSlide.findUnique({
        where: { id },
    })

    if (!slide) {
        notFound()
    }

    return (
        <HeroSlideForm
            mode="edit"
            initialData={slide}
        />
    )
}
