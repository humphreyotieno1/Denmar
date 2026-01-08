import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("🎬 Seeding hero slides...")

    const heroSlides = [
        {
            order: 0,
            image: "/hero/header.jpg",
            eyebrow: "Tailor–made escapes",
            title: "The Bold and",
            highlight: "Daring",
            subtitle: "Escape to breathtaking destinations crafted just for you by the Denmar experts.",
            buttonText: "Start Planning",
            buttonLink: "/destinations",
            isActive: true,
        },
        {
            order: 1,
            image: "/hero/hero2.jpg",
            eyebrow: "Signature adventures",
            title: "Adventure",
            highlight: "Awaits",
            subtitle: "Experience thrilling safaris, city lights and serene beaches in one effortless itinerary.",
            buttonText: "Explore Adventures",
            buttonLink: "/destinations",
            isActive: true,
        },
        {
            order: 2,
            image: "/hero/hero3.jpg",
            eyebrow: "Immersive culture",
            title: "Cultural",
            highlight: "Journeys",
            subtitle: "Immerse yourself in rich heritage, curated guides and seamless travel support.",
            buttonText: "Discover Culture",
            buttonLink: "/destinations",
            isActive: true,
        },
        {
            order: 3,
            image: "/hero/capetownholiday.jpg",
            eyebrow: "Signature getaway",
            title: "Cape Town",
            highlight: "Elegance",
            subtitle: "Sunsets on Signal Hill, vineyards in Stellenbosch and a front-row seat to Table Mountain.",
            buttonText: "Discover Cape Town",
            buttonLink: "/destinations",
            isActive: true,
        },
        {
            order: 4,
            image: "/hero/thailandholiday.jpg",
            eyebrow: "Signature getaway",
            title: "Thailand",
            highlight: "Elegance",
            subtitle: "Golden temples by day, floating markets by night – all seamlessly arranged for you.",
            buttonText: "Discover Thailand",
            buttonLink: "/destinations",
            isActive: true,
        },
    ]

    for (const slide of heroSlides) {
        await prisma.heroSlide.create({
            data: slide,
        })
    }

    console.log(`✅ Seeded ${heroSlides.length} hero slides`)
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
