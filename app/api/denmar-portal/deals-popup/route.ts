import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { z } from "zod"

const popupSchema = z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    image: z.string().min(1),
    discount: z.string().optional().nullable(),
    link: z.string().min(1),
    isActive: z.boolean().default(true),
    priority: z.number().default(0),
})

// GET all popups
export async function GET() {
    try {
        const popups = await prisma.dealsPopup.findMany({
            orderBy: { priority: "desc" },
        })

        return NextResponse.json(popups)
    } catch (error) {
        console.error("Error fetching popups:", error)
        return NextResponse.json(
            { message: "Failed to fetch popups" },
            { status: 500 }
        )
    }
}

// POST create popup
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = popupSchema.parse(body)

        const popup = await prisma.dealsPopup.create({
            data: validatedData,
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "create",
            entityType: "deals_popup",
            entityId: popup.id,
            entityName: popup.title,
            newData: popup,
        })

        return NextResponse.json(popup, { status: 201 })
    } catch (error) {
        console.error("Error creating popup:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to create popup" },
            { status: 500 }
        )
    }
}
