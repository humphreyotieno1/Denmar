import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { z } from "zod"

const testimonialSchema = z.object({
    name: z.string().min(1),
    location: z.string().optional().nullable(),
    trip: z.string().optional().nullable(),
    content: z.string().min(1),
    rating: z.number().min(1).max(5),
    image: z.string().optional().nullable(),
    source: z.string().min(1).default("Facebook"),
    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
})

// GET all testimonials
export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: [
                { order: "asc" },
                { createdAt: "desc" }
            ],
        })

        return NextResponse.json(testimonials)
    } catch (error) {
        console.error("Error fetching testimonials:", error)
        return NextResponse.json(
            { message: "Failed to fetch testimonials" },
            { status: 500 }
        )
    }
}

// POST create testimonial
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = testimonialSchema.parse(body)

        const testimonial = await prisma.testimonial.create({
            data: validatedData,
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "create",
            entityType: "testimonial",
            entityId: testimonial.id,
            entityName: testimonial.name,
            newData: testimonial,
        })

        return NextResponse.json(testimonial, { status: 201 })
    } catch (error) {
        console.error("Error creating testimonial:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to create testimonial" },
            { status: 500 }
        )
    }
}
