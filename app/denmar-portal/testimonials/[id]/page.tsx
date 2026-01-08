import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { TestimonialForm } from "../testimonial-form"

interface EditTestimonialPageProps {
    params: Promise<{ id: string }>
}

export default async function EditTestimonialPage({ params }: EditTestimonialPageProps) {
    const { id } = await params

    const testimonial = await prisma.testimonial.findUnique({
        where: { id },
    })

    if (!testimonial) {
        notFound()
    }

    return (
        <TestimonialForm
            mode="edit"
            initialData={testimonial}
        />
    )
}
