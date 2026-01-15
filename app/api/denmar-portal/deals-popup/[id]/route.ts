import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { revalidatePublicPages } from "@/lib/revalidate"
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

interface RouteParams {
    params: Promise<{ id: string }>
}

// GET single popup
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const popupModel: any = prisma.dealsPopup
        const popup = await popupModel.findUnique({
            where: { id },
        })

        if (!popup) {
            return NextResponse.json({ message: "Popup not found" }, { status: 404 })
        }

        return NextResponse.json(popup)
    } catch (error) {
        console.error("Error fetching popup:", error)
        return NextResponse.json(
            { message: "Failed to fetch popup" },
            { status: 500 }
        )
    }
}

// PUT update popup
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const validatedData = popupSchema.parse(body)

        const popupModel: any = prisma.dealsPopup

        // Get existing for audit log
        const existing = await popupModel.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Popup not found" }, { status: 404 })
        }

        const popup = await popupModel.update({
            where: { id },
            data: validatedData,
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "update",
            entityType: "deals_popup",
            entityId: popup.id,
            entityName: popup.title,
            oldData: existing,
            newData: popup,
        })

        // Revalidate cache
        revalidatePublicPages()

        return NextResponse.json(popup)
    } catch (error) {
        console.error("Error updating popup:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to update popup" },
            { status: 500 }
        )
    }
}

// DELETE popup
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params

        const popupModel: any = prisma.dealsPopup

        // Get existing for audit log
        const existing = await popupModel.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ message: "Popup not found" }, { status: 404 })
        }

        await popupModel.delete({ where: { id } })

        // Revalidate cache
        revalidatePublicPages()

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "delete",
            entityType: "deals_popup",
            entityId: id,
            entityName: existing.title,
            oldData: existing,
        })

        return NextResponse.json({ message: "Popup deleted" })
    } catch (error) {
        console.error("Error deleting popup:", error)
        return NextResponse.json(
            { message: "Failed to delete popup" },
            { status: 500 }
        )
    }
}
