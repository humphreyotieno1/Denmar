import { PrismaClient } from "@prisma/client"
import { countries as countriesData, destinations as destinationsData } from "@/lib/destinations"
import { services as servicesData, deals as dealsData, packages as packagesData } from "@/lib/services"

const prisma = new PrismaClient()

async function migrateCountries() {
    console.log("Migrating countries...")

    for (const country of countriesData) {
        await prisma.country.upsert({
            where: { slug: country.slug },
            update: {
                name: country.name,
                heroImage: country.heroImage,
                summary: country.summary,
                description: country.description,
                region: country.region,
                popularDestinations: country.popularDestinations,
                featured: country.featured,
                isActive: true,
            },
            create: {
                name: country.name,
                slug: country.slug,
                heroImage: country.heroImage,
                summary: country.summary,
                description: country.description,
                region: country.region,
                popularDestinations: country.popularDestinations,
                featured: country.featured,
                isActive: true,
            },
        })
    }

    console.log(`Migrated ${countriesData.length} countries`)
}

async function migrateDestinations() {
    console.log("Migrating destinations...")

    for (const dest of destinationsData) {
        // Find the country
        const country = await prisma.country.findUnique({
            where: { slug: dest.countrySlug },
        })

        if (!country) {
            console.log(`Country not found for destination: ${dest.name} (${dest.countrySlug})`)
            continue
        }

        await prisma.destination.upsert({
            where: { slug: dest.slug },
            update: {
                countryId: country.id,
                name: dest.name,
                images: dest.images as any,
                heroImage: dest.heroImage,
                tags: dest.tags as any,
                priceFrom: dest.priceFrom,
                priceTo: dest.priceTo,
                summary: dest.summary,
                description: dest.description,
                latitude: dest.coords?.lat,
                longitude: dest.coords?.lng,
                highlights: dest.highlights as any,
                bestTime: dest.bestTime,
                duration: dest.duration,
                rating: dest.rating,
                reviews: dest.reviews,
                featured: dest.featured,
                isActive: true,
            },
            create: {
                countryId: country.id,
                slug: dest.slug,
                name: dest.name,
                images: dest.images as any,
                heroImage: dest.heroImage,
                tags: dest.tags as any,
                priceFrom: dest.priceFrom,
                priceTo: dest.priceTo,
                summary: dest.summary,
                description: dest.description,
                latitude: dest.coords?.lat,
                longitude: dest.coords?.lng,
                highlights: dest.highlights as any,
                bestTime: dest.bestTime,
                duration: dest.duration,
                rating: dest.rating,
                reviews: dest.reviews,
                featured: dest.featured,
                isActive: true,
            },
        })
    }

    console.log(`Migrated ${destinationsData.length} destinations`)
}

async function migrateServices() {
    console.log("Migrating services...")

    for (const service of servicesData) {
        await prisma.service.upsert({
            where: { slug: service.slug },
            update: {
                name: service.name,
                description: service.description,
                shortDescription: service.shortDescription,
                icon: service.icon,
                features: service.features as any,
                price: service.price,
                duration: service.duration,
                category: service.category,
                featured: service.featured,
                image: service.image,
                isActive: true,
            },
            create: {
                name: service.name,
                slug: service.slug,
                description: service.description,
                shortDescription: service.shortDescription,
                icon: service.icon,
                features: service.features as any,
                price: service.price,
                duration: service.duration,
                category: service.category,
                featured: service.featured,
                image: service.image,
                isActive: true,
            },
        })
    }

    console.log(`Migrated ${servicesData.length} services`)
}

async function migrateDeals() {
    console.log("Migrating deals...")

    for (const deal of dealsData) {
        await prisma.deal.upsert({
            where: { slug: deal.slug },
            update: {
                title: deal.title,
                description: deal.description,
                shortDescription: deal.shortDescription,
                originalPrice: deal.originalPrice,
                discountedPrice: deal.discountedPrice,
                discount: deal.discount,
                validUntil: new Date(deal.validUntil),
                destinations: deal.destinations as any,
                image: deal.image,
                featured: deal.featured,
                category: deal.category,
                terms: deal.terms as any,
                highlights: deal.highlights as any,
                isActive: true,
            },
            create: {
                title: deal.title,
                slug: deal.slug,
                description: deal.description,
                shortDescription: deal.shortDescription,
                originalPrice: deal.originalPrice,
                discountedPrice: deal.discountedPrice,
                discount: deal.discount,
                validUntil: new Date(deal.validUntil),
                destinations: deal.destinations as any,
                image: deal.image,
                featured: deal.featured,
                category: deal.category,
                terms: deal.terms as any,
                highlights: deal.highlights as any,
                isActive: true,
            },
        })
    }

    console.log(`Migrated ${dealsData.length} deals`)
}

async function migratePackages() {
    console.log("Migrating packages...")

    for (const pkg of packagesData) {
        await prisma.package.upsert({
            where: { slug: pkg.slug },
            update: {
                name: pkg.name,
                destinationSlug: pkg.destinationSlug,
                country: pkg.country,
                description: pkg.description,
                shortDescription: pkg.shortDescription,
                duration: pkg.duration,
                price: pkg.price,
                includes: pkg.includes as any,
                excludes: pkg.excludes as any,
                terms: (pkg.terms || []) as any,
                itinerary: pkg.itinerary as any,
                featured: pkg.featured,
                image: pkg.image,
                category: pkg.category,
                bestTime: pkg.bestTime,
                isActive: true,
            },
            create: {
                name: pkg.name,
                slug: pkg.slug,
                destinationSlug: pkg.destinationSlug,
                country: pkg.country,
                description: pkg.description,
                shortDescription: pkg.shortDescription,
                duration: pkg.duration,
                price: pkg.price,
                includes: pkg.includes as any,
                excludes: pkg.excludes as any,
                terms: (pkg.terms || []) as any,
                itinerary: pkg.itinerary as any,
                featured: pkg.featured,
                image: pkg.image,
                category: pkg.category,
                bestTime: pkg.bestTime,
                isActive: true,
            },
        })
    }

    console.log(`Migrated ${packagesData.length} packages`)
}

async function main() {
    console.log("Starting content migration...\n")

    await migrateCountries()
    await migrateDestinations()
    await migrateServices()
    await migrateDeals()
    await migratePackages()

    console.log("\nMigration completed successfully!")
}

main()
    .catch((e) => {
        console.error("Migration failed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
