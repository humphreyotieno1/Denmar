"use client"

import { TopBanner, Navbar, Footer, FloatingActions, Breadcrumbs } from "@/components/layout"
import { PackageCard } from "@/components/cards"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Eye, X } from "@/components/ui/huge-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { trackPackageView } from "@/lib/facebook-pixel"
import { Package } from "@/lib/services"
import { BreadcrumbSchema, TravelPackageSchema } from "@/lib/structured-data"
import { formatCardDuration, formatCardPrice } from "@/lib/format-travel"

interface PackageDetailsProps {
    packageData: Package
    relatedPackages: Package[]
    settings: any
    navCountries?: any[]
}

export function PackageDetails({ packageData, relatedPackages, settings, navCountries }: PackageDetailsProps) {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const durationMeta = formatCardDuration(packageData.duration || "")
    const displayPrice = formatCardPrice(packageData.price || "")
    const whatsappNumber = String(settings?.whatsappNumber || settings?.contactPhone || "+254793041888").replace(/[^\d]/g, "")
    const whatsappMessage = encodeURIComponent(
        `Hi Denmar, I'm interested in the ${packageData.name} package. Please share availability and booking details.`,
    )
    const destinationLabel = packageData.destinationSlug
        ? packageData.destinationSlug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())
        : "Signature Journey"

    useEffect(() => {
        // Track Facebook Pixel event for package view
        if (packageData) {
            trackPackageView(packageData.name, packageData.price)
        }
    }, [packageData])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isImageModalOpen) {
            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.top = '0'
            document.body.style.left = '0'
            document.body.style.right = '0'
            document.body.style.bottom = '0'
        } else {
            // Restore scrolling
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.bottom = ''
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.left = ''
            document.body.style.right = ''
            document.body.style.bottom = ''
        }
    }, [isImageModalOpen])

    const breadcrumbItems = [
        // { label: "Home", href: "/" },
        { label: "Packages", href: "/packages" },
        { label: packageData.name, href: `/packages/${packageData.slug}` }
    ]

    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* SEO Structured Data */}
            <BreadcrumbSchema 
                items={[
                    { name: "Home", url: "https://www.denmartravel.co.ke" },
                    { name: "Packages", url: "https://www.denmartravel.co.ke/packages" },
                    { name: packageData.name, url: `https://www.denmartravel.co.ke/packages/${packageData.slug}` }
                ]} 
            />
            <TravelPackageSchema 
                name={packageData.name}
                description={packageData.shortDescription || packageData.description}
                price={packageData.price}
                destination={packageData.destinationSlug || "Kenya"}
                duration={packageData.duration}
                image={packageData.image}
                rating={5} // Default rating if none provided
            />

            <TopBanner settings={settings} />
            <Navbar settings={settings} countries={navCountries} />

            <main className="pt-16">
                {/* Breadcrumbs */}
                <div className="bg-gray-50 py-4">
                    <div className="max-w-6xl mx-auto px-4">
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative isolate min-h-[380px] overflow-hidden md:min-h-[440px]">
                    <Image
                        src={packageData.image}
                        alt={`${packageData.name} — ${destinationLabel} travel package from Kenya`}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

                    <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-8 pt-20 sm:px-6 md:pb-10 lg:px-8">
                        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-4xl text-white">
                                <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/85">
                                    {durationMeta.days && <span>{durationMeta.days}</span>}
                                    {durationMeta.days && durationMeta.nights && <span className="text-white/55">|</span>}
                                    {durationMeta.nights && <span>{durationMeta.nights}</span>}
                                    {(durationMeta.days || durationMeta.nights) && <span className="text-white/55">|</span>}
                                    <span>{displayPrice} PPS</span>
                                </div>
                                <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                                    {packageData.name}
                                </h1>
                            </div>

                            <div className="shrink-0">
                                <Button
                                    asChild
                                    className="h-11 rounded-full bg-[#117a49] px-6 text-xs font-bold uppercase tracking-[0.08em] text-white hover:bg-[#0d6a3f]"
                                >
                                    <a href={`/contact?destination=${encodeURIComponent(packageData.name)}`}>
                                        Ask About This Package
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Package Details Layout */}
                <section className="bg-gray-50 py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 flex flex-wrap items-center gap-2">
                            <a href="#package-poster" className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-gray-700 hover:border-brand-secondary hover:text-brand-secondary">Package Poster</a>
                            <a href="#package-details" className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-gray-700 hover:border-brand-secondary hover:text-brand-secondary">Package Details</a>
                            <a href="#whats-included" className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-gray-700 hover:border-brand-secondary hover:text-brand-secondary">What's Included</a>
                            <a href="#booking-enquiry" className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-gray-700 hover:border-brand-secondary hover:text-brand-secondary">Booking Enquiry</a>
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="space-y-8 lg:col-span-2">
                                <article id="package-details" className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                                    <h2 className="font-heading text-2xl font-bold text-brand-primary">Package Details</h2>
                                    <p className="mt-4 text-base leading-relaxed text-gray-700">
                                        {packageData.description}
                                    </p>

                                    {Array.isArray(packageData.itinerary) && packageData.itinerary.length > 0 && (
                                        <div className="mt-8 space-y-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Day-by-day itinerary</h3>
                                            <div className="space-y-3">
                                                {packageData.itinerary.map((day: any, index: number) => (
                                                    <div key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                                        <div className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-secondary">
                                                            Day {day.day}: {day.title}
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-700">{day.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </article>

                                <article id="whats-included" className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                                    <h2 className="font-heading text-2xl font-bold text-brand-primary">Summary of Inclusions & Exclusions</h2>
                                    <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
                                        <div>
                                            <h3 className="mb-4 text-base font-semibold text-green-700">Package includes</h3>
                                            <ul className="space-y-3">
                                                {(Array.isArray(packageData.includes) ? packageData.includes : []).map((item: string, index: number) => (
                                                    <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                                                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="mb-4 text-base font-semibold text-red-700">Package excludes</h3>
                                            <ul className="space-y-3">
                                                {(Array.isArray(packageData.excludes) ? packageData.excludes : []).map((item: string, index: number) => (
                                                    <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                                                        <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </article>

                                <article id="booking-enquiry" className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                                    <h2 className="font-heading text-2xl font-bold text-brand-primary">Book {packageData.name}</h2>
                                    <p className="mt-3 text-sm leading-relaxed text-gray-700">
                                        Ready to travel? Send your preferred departure date and travelers count. We will confirm availability and share a full quotation.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <Button asChild className="bg-[#117a49] rounded-full hover:bg-[#0d6a3f] text-white">
                                            <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
                                                Ask on WhatsApp
                                            </a>
                                        </Button>
                                        <Button asChild variant="outline" className="border-brand-secondary rounded-full text-brand-secondary hover:bg-brand-secondary hover:text-white">
                                            <a href={`/contact?destination=${encodeURIComponent(packageData.name)}`}>
                                                Submit Booking Enquiry
                                            </a>
                                        </Button>
                                    </div>
                                </article>
                            </div>

                            <aside className="lg:col-span-1">
                                <div className="sticky top-24 space-y-4">
                                    <Card id="package-poster" className="border-gray-200 shadow-sm">
                                        <CardContent className="space-y-4 p-5">
                                            <div className="flex items-center justify-between gap-3">
                                                <h3 className="font-heading text-lg font-bold text-brand-primary">Package Poster</h3>
                                                <span className="rounded-full bg-brand-accent/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-primary">
                                                    Click to view
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => setIsImageModalOpen(true)}
                                                className="group relative block w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 text-left"
                                                aria-label={`Open poster for ${packageData.name}`}
                                            >
                                                <div className="relative aspect-[4/5] w-full">
                                                    <Image
                                                        src={packageData.image}
                                                        alt={`${packageData.name} poster`}
                                                        fill
                                                        className="object-cover transition duration-300 group-hover:scale-[1.02]"
                                                        sizes="(max-width: 1024px) 100vw, 420px"
                                                    />
                                                </div>
                                                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent p-3 text-white">
                                                    <span className="line-clamp-1 pr-3 text-xs font-medium">{packageData.name}</span>
                                                    <span className="inline-flex items-center gap-1 rounded-full border border-white/35 bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]">
                                                        <Eye className="h-3 w-3" />
                                                        View
                                                    </span>
                                                </div>
                                            </button>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-gray-200 shadow-sm">
                                        <CardContent className="space-y-4 p-5">
                                            <h3 className="font-heading text-lg font-bold text-brand-primary">Package Summary</h3>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                                    <span className="text-gray-500">Trip type</span>
                                                    <span className="font-medium capitalize text-gray-900">{packageData.category || "Package"}</span>
                                                </div>
                                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                                    <span className="text-gray-500">Cost PPS</span>
                                                    <span className="font-semibold text-brand-primary">{displayPrice}</span>
                                                </div>
                                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                                    <span className="text-gray-500">Duration</span>
                                                    <span className="font-medium text-gray-900">{packageData.duration}</span>
                                                </div>
                                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                                    <span className="text-gray-500">Destination</span>
                                                    <span className="font-medium text-gray-900">{destinationLabel}</span>
                                                </div>
                                                {packageData.terms?.[0] && (
                                                    <div className="rounded-lg bg-gray-50 p-3 text-xs leading-relaxed text-gray-600">
                                                        {packageData.terms[0]}
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* Related Packages */}
                {relatedPackages.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="max-w-6xl mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl font-bold text-brand-primary mb-4">
                                    Similar {packageData.category ? packageData.category.charAt(0).toUpperCase() + packageData.category.slice(1) : ""} Packages from Kenya
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Explore more affordable {packageData.category} packages departing from Kenya
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedPackages.map((pkg, index) => (
                                    <PackageCard key={pkg.id} pkg={pkg} index={index} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer settings={settings} />
            <FloatingActions />

            {/* Image Modal */}
            {isImageModalOpen && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 overflow-hidden"
                    onClick={() => setIsImageModalOpen(false)}
                    onWheel={(e) => e.preventDefault()}
                    onTouchMove={(e) => e.preventDefault()}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        overflow: 'hidden',
                        touchAction: 'none'
                    }}
                >
                    {/* Modal content container */}
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsImageModalOpen(false)
                            }}
                        >
                            <X className="w-4 h-4" />
                        </Button>

                        {/* Scrollable image container */}
                        <div
                            className="w-full h-full flex items-center justify-center p-4 md:p-12"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-full max-w-[700px] aspect-[4/5] bg-white p-3 md:p-6 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-200"
                            >
                                <div className="relative w-full h-full bg-slate-100 rounded-[2px] overflow-hidden">
                                    <Image
                                        src={packageData.image}
                                        alt={packageData.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 95vw, 700px"
                                        quality={100}
                                    />
                                </div>
                                <div className="mt-4 md:mt-8 text-center text-slate-800 font-serif italic text-sm md:text-base tracking-widest opacity-80 select-none">
                                    DENMAR HOLIDAYS & SAFARIS • PORTFOLIO SERIES
                                </div>
                            </motion.div>
                        </div>

                        {/* Click outside to close hint */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm pointer-events-none">
                            Click outside to close
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
