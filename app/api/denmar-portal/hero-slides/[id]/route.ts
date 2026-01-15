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

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET single slide
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const slideModel: any = prisma.heroSlide
        const slide = await slideModel.findUnique({
            where: { id },
        })

        if (!slide) {
            return NextResponse.json({ message: "Slide not found" }, { status: 404 })
        }

        return NextResponse.json(slide)
    } catch (error) {
        console.error("Error fetching slide:", error)
        return NextResponse.json(
            { message: "Failed to fetch slide" },
            { status: 500 }
        )
    }
}

// PUT update slide
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const validatedData = heroSlideSchema.parse(body)

        const slideModel: any = prisma.heroSlide

        // Get existing slide for audit log
        const existing = await slideModel.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Slide not found" }, { status: 404 })
        }

        const slide = await slideModel.update({
            where: { id },
            data: validatedData,
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "update",
            entityType: "hero_slide",
            entityId: slide.id,
            entityName: slide.title,
            oldData: existing,
            newData: slide,
        })

        // Revalidate cache
        revalidatePublicPages()

        return NextResponse.json(slide)
    } catch (error) {
        console.error("Error updating slide:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to update slide" },
            { status: 500 }
        )
    }
}

// DELETE slide
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        // Only admin can delete
        if (session.user.role !== "admin") {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        const { id } = await params

        const slideModel: any = prisma.heroSlide

        // Get existing slide for audit log
        const existing = await slideModel.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Slide not found" }, { status: 404 })
        }

        await slideModel.delete({ where: { id } })

        // Revalidate cache
        revalidatePublicPages()

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "delete",
            entityType: "hero_slide",
            entityId: id,
            entityName: existing.title,
            oldData: existing,
        })

        return NextResponse.json({ message: "Slide deleted" })
    } catch (error) {
        console.error("Error deleting slide:", error)
        return NextResponse.json(
            { message: "Failed to delete slide" },
            { status: 500 }
        )
    }
}
