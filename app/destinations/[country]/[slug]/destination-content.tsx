"use client"

import { TopBanner } from "@/components/top-banner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingActions } from "@/components/floating-actions"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { DestinationCard } from "@/components/destination-card"
import { Star, MapPin, Clock, Calendar, CheckCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

interface DestinationContentProps {
    country: any
    destination: any
    packages: any[]
    relatedDestinations: any[]
    settings?: any
}

export function DestinationContent({ country, destination, packages, relatedDestinations, settings }: DestinationContentProps) {
    const formatPrice = (price: number) => {
        return `$${price.toLocaleString()}`
    }

    return (
        <div className="min-h-screen overflow-x-hidden">
            <TopBanner settings={settings} />
            <Navbar settings={settings} />

            <main>
                {/* Hero Section */}
                <section className="relative h-96">
                    <div className="absolute inset-0">
                        <Image
                            src={destination.heroImage}
                            alt={destination.name}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <div className="text-center text-white">
                            <h1 className="font-heading text-5xl font-bold mb-4">{destination.name}</h1>
                            <p className="text-xl max-w-2xl mx-auto px-4">{destination.summary}</p>
                            <div className="flex items-center justify-center gap-4 mt-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="text-lg">{ratingFallback(destination.rating || 5)}</span>
                                </div>
                                <span className="text-lg">•</span>
                                <span className="text-lg">{destination.reviews ? destination.reviews.toLocaleString() : 0} reviews</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Breadcrumbs */}
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <Breadcrumbs
                        items={[
                            { label: "Destinations", href: "/destinations" },
                            { label: country.name, href: `/destinations/${country.slug}` },
                            { label: destination.name }
                        ]}
                    />
                </div>

                {/* Main Content */}
                <section className="py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {/* Description */}
                                <div className="mb-8">
                                    <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                                    <div className="prose prose-slate max-w-none text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                                        {destination.description}
                                    </div>
                                </div>

                                {/* Quick Info */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <Clock className="w-6 h-6 text-brand-accent mx-auto mb-2" />
                                        <div className="text-lg font-bold text-gray-900">{destination.duration || "Flexible"}</div>
                                        <div className="text-sm text-gray-600">Duration</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <div className="text-lg font-bold text-green-600">
                                            {formatPrice(destination.priceFrom || 0)}
                                        </div>
                                        <div className="text-sm text-gray-600">Starting from</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <Calendar className="w-6 h-6 text-brand-accent mx-auto mb-2" />
                                        <div className="text-sm font-bold text-gray-900">Best Time</div>
                                        <div className="text-xs text-gray-600">{destination.bestTime || "Year round"}</div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <Star className="w-6 h-6 text-yellow-400 fill-current mx-auto mb-2" />
                                        <div className="text-lg font-bold text-gray-900">{destination.rating || 5}</div>
                                        <div className="text-sm text-gray-600">Rating</div>
                                    </div>
                                </div>

                                {/* Highlights */}
                                {destination.highlights && destination.highlights.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">Highlights</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {destination.highlights.map((highlight: string, index: number) => (
                                                <div key={index} className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {destination.tags && destination.tags.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">Experience Type</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {destination.tags.map((tag: string) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="text-sm px-3 py-1 capitalize"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Gallery */}
                                {destination.images && destination.images.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">Gallery</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {destination.images.slice(0, 6).map((image: string, index: number) => (
                                                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                                                    <Image
                                                        src={image}
                                                        alt={`${destination.name} - Image ${index + 1}`}
                                                        fill
                                                        className="object-cover transition-transform duration-300 hover:scale-110"
                                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                {/* Sticky Enquiry CTA */}
                                <div className="sticky top-6 space-y-6">
                                    {/* Quick Enquiry */}
                                    <Card className="border-0 shadow-lg">
                                        <CardContent className="p-6">
                                            <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Ready to Plan Your Trip?</h3>
                                            <p className="text-gray-600 mb-6">
                                                Get in touch with our travel experts to start planning your perfect {destination.name} adventure.
                                            </p>
                                            <div className="space-y-3">
                                                <Button className="w-full bg-brand-accent hover:bg-brand-accent/90">
                                                    Enquire Now
                                                </Button>
                                                <Button variant="outline" className="w-full">
                                                    Download Brochure
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Quick Facts */}
                                    <Card className="border-0 shadow-lg">
                                        <CardContent className="p-6">
                                            <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Country:</span>
                                                    <span className="font-medium">{country.name}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Region:</span>
                                                    <span className="font-medium">{country.region}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Best Time:</span>
                                                    <span className="font-medium text-sm">{(destination.bestTime || "").split('(')[0].trim()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Duration:</span>
                                                    <span className="font-medium">{destination.duration}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Starting Price:</span>
                                                    <span className="font-medium text-green-600">{formatPrice(destination.priceFrom || 0)}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Packages Section */}
                {packages.length > 0 && (
                    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-20">
                        <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(circle_at_top,_rgba(212,164,65,0.15),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(32,57,80,0.12),_transparent_55%)]" />
                        <div className="relative z-10 mx-auto max-w-7xl px-4">
                            <div className="mx-auto max-w-3xl text-center">
                                <span className="inline-flex items-center gap-2 rounded-full bg-brand-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.4em] text-brand-accent">Signature Itineraries</span>
                                <h2 className="mt-6 font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
                                    Travel packages curated for {destination.name}
                                </h2>
                                <p className="mt-4 text-base text-gray-600 sm:text-lg">
                                    Handpicked stays, transfers, and experiences tailored to the best of {destination.name}. Tap a package to personalise it with our specialists.
                                </p>
                            </div>

                            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {packages.map((pkg, index) => {
                                    const highlightA = pkg.includes?.[0]
                                    const highlightB = pkg.includes?.[1]
                                    const highlightC = pkg.includes?.[2]

                                    return (
                                        <motion.article
                                            key={pkg.id}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.45, delay: index * 0.08 }}
                                            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                        >
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={pkg.image ?? destination.heroImage}
                                                    alt={pkg.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority={index === 0}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                                                {pkg.featured && (
                                                    <Badge className="absolute left-4 top-4 bg-brand-accent text-white border-0 shadow-lg">Featured</Badge>
                                                )}
                                                <div className="absolute bottom-4 left-4 text-white">
                                                    <span className="uppercase text-[10px] tracking-[0.3em] text-white/70">Signature itinerary</span>
                                                    <h3 className="text-lg font-semibold md:text-xl">{pkg.name}</h3>
                                                </div>
                                            </div>

                                            <div className="flex flex-1 flex-col gap-6 p-6">
                                                <div className="space-y-2">
                                                    <p className="text-sm uppercase tracking-[0.25em] text-brand-accent">{pkg.duration}</p>
                                                    <p className="text-sm text-gray-600">Everything arranged for your {pkg.duration?.toLowerCase()} escape.</p>
                                                </div>

                                                <div className="flex-1 space-y-3">
                                                    {highlightA && (
                                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                                            <CheckCircle className="mt-0.5 h-4 w-4 text-brand-accent" />
                                                            <span>{highlightA}</span>
                                                        </div>
                                                    )}
                                                    {highlightB && (
                                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                                            <Info className="mt-0.5 h-4 w-4 text-brand-accent" />
                                                            <span>{highlightB}</span>
                                                        </div>
                                                    )}
                                                    {highlightC && (
                                                        <div className="flex items-start gap-2 text-sm text-gray-600">
                                                            <MapPin className="mt-0.5 h-4 w-4 text-brand-accent" />
                                                            <span>{highlightC}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-auto flex flex-col gap-4">
                                                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
                                                        {pkg.price} per person
                                                    </span>
                                                    <Button asChild className="w-full rounded-full bg-brand-primary text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-brand-primary/90 active:scale-95">
                                                        <Link href={`/packages/${pkg.slug}`}>View Details</Link>
                                                    </Button>
                                                    <p className="text-xs text-gray-500">
                                                        Need something different? We can customize this journey to match your dates and interests.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.article>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Destinations */}
                {relatedDestinations.length > 0 && (
                    <section className="py-16 px-4 bg-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">More Destinations in {country.name}</h2>
                                <p className="text-xl text-gray-600">
                                    Explore other amazing places in {country.name}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
