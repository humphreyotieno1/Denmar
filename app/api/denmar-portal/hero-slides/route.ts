import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { revalidatePublicPages } from "@/lib/revalidate"
import { z } from "zod"

const heroSlideSchema = z.object({
    eyebrow: z.string().optional().nullable(),
    title: z.string().min(1),
    highlight: z.string().optional().nullable(),
    subtitle: z.string().min(1),
    buttonText: z.string().min(1),
    buttonLink: z.string().min(1),
    image: z.string().min(1),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
})

// GET all slides
export async function GET() {
    try {
        const slideModel: any = prisma.heroSlide
        const slides = await slideModel.findMany({
            orderBy: { order: "asc" },
        })

        return NextResponse.json(slides)
    } catch (error) {
        console.error("Error fetching slides:", error)
        return NextResponse.json(
            { message: "Failed to fetch slides" },
            { status: 500 }
        )
    }
}

// POST create slide
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = heroSlideSchema.parse(body)

        const slideModel: any = prisma.heroSlide

        const slide = await slideModel.create({
            data: validatedData,
        })

        // Revalidate cache
        revalidatePublicPages()

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "create",
            entityType: "hero_slide",
            entityId: slide.id,
            entityName: slide.title,
            newData: slide,
        })

        return NextResponse.json(slide, { status: 201 })
    } catch (error) {
        console.error("Error creating slide:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to create slide" },
            { status: 500 }
        )
    }
}
