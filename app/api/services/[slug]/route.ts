import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params

    try {
        const modelService: any = prisma.service
        const service = await modelService.findUnique({
            where: { slug, isActive: true },
        })

        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 })
        }

        return NextResponse.json(service)
    } catch (error) {
        console.error("Error fetching service:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
