"use client"

import { TopBanner, Navbar, Footer, FloatingActions, Breadcrumbs } from "@/components/layout"
import { DestinationCard } from "@/components/cards"
import { Clock, Calendar, CheckCircle, Zap } from "@/components/ui/huge-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { formatCardDuration } from "@/lib/format-travel"

interface DestinationContentProps {
    country: any
    destination: any
    packages: any[]
    relatedDestinations: any[]
    settings?: any
    navCountries?: any[]
}

import { MiniQuoteForm } from "@/components/sections/contact/mini-quote-form"

export function DestinationContent({ country, destination, packages, relatedDestinations, settings, navCountries }: DestinationContentProps) {
    const formatPrice = (price: number) => {
        return `$${price.toLocaleString()}`
    }
    const durationMeta = formatCardDuration(destination.duration || "")

    return (
        <div className="min-h-screen overflow-x-hidden bg-white selection:bg-brand-accent/30">
            <TopBanner settings={settings} />
            <Navbar settings={settings} countries={navCountries} />

            <main className="pt-16">
                {/* HERO SECTION */}
                <section className="relative isolate min-h-[380px] overflow-hidden md:min-h-[440px]">
                    <Image
                        src={destination.heroImage}
                        alt={`${destination.name} travel packages from Kenya — ${destination.summary?.substring(0, 60) || country.name}`}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
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
                                    <span>From {formatPrice(destination.priceFrom || 0)} PPS</span>
                                </div>
                                <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                                    {destination.name} Travel Packages from Kenya
                                </h1>
                            </div>

                            <div className="shrink-0">
                                <Button
                                    asChild
                                    className="h-11 rounded-[4px] bg-[#117a49] px-6 text-xs font-bold uppercase tracking-[0.08em] text-white hover:bg-[#0d6a3f]"
                                >
                                    <a href={`/contact?destination=${encodeURIComponent(destination.name)}`}>
                                        Ask About This Destination
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Breadcrumbs */}
                <div className="bg-slate-50 border-b border-slate-200 py-3">
                    <div className="max-w-7xl mx-auto px-4">
                        <Breadcrumbs
                            items={[
                                { label: "Destinations", href: "/destinations" },
                                { label: country.name, href: `/destinations/${country.slug}` },
                                { label: destination.name }
                            ]}
                        />
                    </div>
                </div>

                {/* Main Content & Sidebar Funnel */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Content Side */}
                            <div className="lg:col-span-2 space-y-12">
                                {/* Trust Signals & Quick Facts */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm text-center group transition-all hover:shadow-md">
                                        <Clock className="w-6 h-6 text-brand-accent mx-auto mb-3" />
                                        <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Duration</div>
                                        <div className="text-lg font-bold text-brand-primary">{destination.duration || "7+ Days"}</div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 shadow-sm text-center group transition-all hover:shadow-md">
                                        <Zap className="w-6 h-6 text-brand-accent mx-auto mb-3" />
                                        <div className="text-sm text-brand-accent uppercase tracking-widest font-bold mb-1">Starting Price</div>
                                        <div className="text-xl font-black text-brand-accent">{formatPrice(destination.priceFrom || 0)}</div>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm text-center group transition-all hover:shadow-md">
                                        <Calendar className="w-6 h-6 text-indigo-500 mx-auto mb-3" />
                                        <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1 font-bold">Best Time</div>
                                        <div className="text-base font-bold text-slate-800">{destination.bestTime || "Year round"}</div>
                                    </div>
                                </div>

                                <div className="prose prose-slate max-w-none">
                                    <h2 className="text-3xl font-black text-brand-primary">
                                        About {destination.name} Travel Packages from {country.name}
                                    </h2>
                                    <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                                        {destination.description}
                                    </p>
                                </div>

                                {/* Highlights Section */}
                                {destination.highlights && (
                                    <div className="p-8 rounded-3xl bg-slate-900 text-white overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 blur-3xl rounded-full translate-x-12 -translate-y-12" />
                                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                            <Badge className="bg-brand-accent hover:bg-brand-accent">Exclusive Experiences</Badge>
                                            Highlights of {destination.name}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {destination.highlights.map((h: string, i: number) => (
                                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                                    <CheckCircle className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-200">{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sticky Conversions Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-28 space-y-6">
                                    {/* HIGH-INTENT FORM */}
                                    <Card className="border-0 shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-accent" />
                                        <CardContent className="p-8">
                                            <div className="text-center mb-6">
                                                <h3 className="text-2xl font-black text-brand-primary">Get Your Custom Travel Quote</h3>
                                                <p className="text-sm text-slate-500 mt-2">Personalised itineraries within 24 hours.</p>
                                            </div>
                                            
                                            <MiniQuoteForm defaultDestination={destination.name} />
                                        </CardContent>
                                    </Card>

                                    {/* Urgency Element */}
                                    <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100 flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-orange-600 animate-pulse" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-orange-800">LIMITED AVAILABILITY</div>
                                            <div className="text-xs text-orange-600">Travelers are currently booking {destination.name} for the next season.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SIGNATURE PACKAGES - Interest Funnel */}
                {packages.length > 0 && (
                    <section id="packages" className="py-24 bg-slate-50 border-y border-slate-200">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
                                <Badge className="bg-brand-accent font-bold px-4 py-1">CURATED ITINERARIES</Badge>
                                <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-primary leading-tight">
                                    {destination.name} Travel Packages <span className="text-brand-accent">from Kenya</span>
                                </h2>
                                <p className="text-base sm:text-lg text-slate-600">
                                    Handpicked stays, transfers, and experiences tailored to {destination.name}. Flexible dates from Nairobi.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {packages.map((pkg, index) => (
                                    <motion.article
                                        key={pkg.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
                                    >
                                        <div className="relative h-64">
                                            <Image 
                                                src={pkg.image ?? destination.heroImage} 
                                                alt={`${pkg.name} — ${destination.name} travel package from Kenya`} 
                                                fill 
                                                className="object-cover" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                {pkg.featured && <Badge className="bg-brand-accent text-white">Featured</Badge>}
                                                <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20">{pkg.duration}</Badge>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-xl font-bold text-white line-clamp-1">{pkg.name}</h3>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1 gap-6">
                                            <div className="flex-1 space-y-4">
                                                {pkg.includes?.slice(0, 3).map((item: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-6 border-t border-slate-100 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-black text-brand-primary">{pkg.price}</div>
                                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Per Person sharing</div>
                                                </div>
                                                <Button size="lg" className="w-full h-12 rounded-xl bg-brand-primary text-white" asChild>
                                                    <Link href={`/packages/${pkg.slug}`}>Check Availability &amp; Get Quote</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Destinations */}
                {relatedDestinations.length > 0 && (
                    <section className="py-24 px-4 bg-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                <div className="space-y-4">
                                    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-primary">More {country.name} Destinations to Explore</h2>
                                    <p className="text-base sm:text-lg text-slate-600">Discover more affordable travel packages across {country.name}</p>
                                </div>
                                <Button variant="link" className="text-brand-accent font-bold p-0" asChild>
                                    <Link href={`/destinations/${country.slug}`}>See All {country.name} Packages &rarr;</Link>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedDestinations.map((dest, index) => (
                                    <DestinationCard
                                        key={dest.id}
                                        destination={dest}
                                        countrySlug={country.slug}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer settings={settings} />
            <FloatingActions />
        </div>
    )
}

function ratingFallback(rating?: number) {
    return rating ?? 5
}
