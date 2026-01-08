import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
    console.log("🌱 Seeding admin users...")


    // Create admin user
    const adminPassword = await hash(process.env.ADMIN_PASSWORD!, 12)
    const admin = await prisma.adminUser.upsert({
        where: { email: "admin@denmartravel.co.ke" },
        update: {},
        create: {
            email: "admin@denmartravel.co.ke",
            name: "Sudo",
            password: adminPassword,
            role: "admin",
            isActive: true,
        },
    })
    console.log(`Admin user created: ${admin.email}`)

    // Create staff user
    const staffPassword = await hash(process.env.STAFF_PASSWORD!, 12)
    const staff = await prisma.adminUser.upsert({
        where: { email: "support@denmartravel.co.ke" },
        update: {},
        create: {
            email: "support@denmartravel.co.ke",
            name: "Support",
            password: staffPassword,
            role: "staff",
            isActive: true,
        },
    })
    console.log(`Staff user created: ${staff.email}`)

    // Create initial site settings
    await prisma.siteSettings.upsert({
        where: { id: "settings" },
        update: {},
        create: {
            id: "settings",
            siteName: "Denmar Tours & Travel",
            siteDescription: "Kenya's premier travel agency offering affordable Kenya tour packages, luxury Kenya safaris, Masai Mara tours, and customized Kenya holidays.",
            contactEmail: "info@denmartravel.co.ke",
            contactPhone: "+254 793 041 888",
            whatsappNumber: "+254793041888",
            address: "3rd Floor, Tausi Road, Westlands, Nairobi",
            googleAnalyticsId: "G-X34BY22BDQ",
            facebookPixelId: "3332570506840480",
        },
    })
    console.log("Site settings initialized")

    console.log("\n Seeding completed!")
}

main()
    .catch((e) => {
        console.error("Seeding failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
