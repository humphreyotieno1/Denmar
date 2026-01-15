import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { createAuditLog } from "@/lib/audit"
import { revalidatePublicPages } from "@/lib/revalidate"
import { z } from "zod"

const settingsSchema = z.object({
    siteName: z.string().min(1),
    siteDescription: z.string().min(1),
    contactEmail: z.string().email(),
    contactPhone: z.string().min(1),
    whatsappNumber: z.string().min(1),
    address: z.string().min(1),
    socialFacebook: z.string().url().optional().or(z.literal("")),
    socialTwitter: z.string().url().optional().or(z.literal("")),
    socialInstagram: z.string().url().optional().or(z.literal("")),

    socialTiktok: z.string().url().optional().or(z.literal("")),
    socialYoutube: z.string().url().optional().or(z.literal("")),
    googleAnalyticsId: z.string().optional().or(z.literal("")),
    facebookPixelId: z.string().optional().or(z.literal("")),
    logoUrl: z.string().optional().or(z.literal("")),
    faviconUrl: z.string().optional().or(z.literal("")),
})

// GET site settings
export async function GET() {
    try {
        const settings = await prisma.siteSettings.findUnique({
            where: { id: "settings" },
        })

        return NextResponse.json(settings)
    } catch (error) {
        console.error("Error fetching settings:", error)
        return NextResponse.json(
            { message: "Failed to fetch settings" },
            { status: 500 }
        )
    }
}

// PUT update site settings
export async function PUT(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const validatedData = settingsSchema.parse(body)

        // Get existing for audit log
        const existing = await prisma.siteSettings.findUnique({
            where: { id: "settings" },
        })

        const settings = await prisma.siteSettings.upsert({
            where: { id: "settings" },
            update: validatedData,
            create: {
                id: "settings",
                ...validatedData,
            },
        })

        // Create audit log
        await createAuditLog({
            userId: session.user.id,
            action: "update",
            entityType: "site_settings",
            entityId: "settings",
            entityName: "Global Settings",
            oldData: existing,
            newData: settings,
        })

        // Revalidate public pages
        revalidatePublicPages()

        return NextResponse.json(settings)
    } catch (error) {
        console.error("Error updating settings:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Invalid data", errors: error.errors },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Failed to update settings" },
            { status: 500 }
        )
    }
}
