import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, LayoutTemplate, Pencil, Trash2, Eye, EyeOff, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteHeroSlideButton } from "./delete-button"

export default async function HeroSlidesPage() {
    const slides = await prisma.heroSlide.findMany({
        orderBy: { order: "asc" },
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Hero Slides</h1>
                    <p className="text-slate-500 mt-1">
                        Manage the homepage hero carousel slides
                    </p>
                </div>
                <Link href="/denmar-portal/hero-slides/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Slide
                    </Button>
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.length === 0 ? (
                    <div className="md:col-span-2 lg:col-span-3 p-12 bg-white border border-slate-200 rounded-xl text-center">
                        <LayoutTemplate className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 mb-2">
                            No hero slides yet
                        </h3>
                        <p className="text-slate-500 mb-4">
                            Create slides to showcase featured destinations or deals
                        </p>
                        <Link href="/denmar-portal/hero-slides/new">
                            <Button className="bg-brand-success hover:bg-brand-secondary">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Slide
                            </Button>
                        </Link>
                    </div>
                ) : (
                    slides.map((slide) => (
                        <div key={slide.id} className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden">
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
                                    <p className="text-brand-accent text-xs font-medium uppercase tracking-wider mb-1">
                                        {slide.eyebrow}
                                    </p>
                                    <h3 className="text-slate-900 font-bold leading-tight">
                                        {slide.title} <span className="text-amber-500">{slide.highlight}</span>
                                    </h3>
                                </div>
                                <div className="absolute top-2 right-2 flex gap-1">
                                    {slide.isActive ? (
                                        <span className="bg-emerald-500/90 text-slate-900 p-1 rounded-md shadow-lg">
                                            <Eye className="h-4 w-4" />
                                        </span>
                                    ) : (
                                        <span className="bg-slate-700/90 text-slate-900 p-1 rounded-md shadow-lg">
                                            <EyeOff className="h-4 w-4" />
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 flex items-center justify-between border-t border-slate-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-300">
                                        #{slide.order}
                                    </div>
                                    <span className="text-sm text-slate-500 font-medium">Order</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/denmar-portal/hero-slides/${slide.id}`}>
                                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <DeleteHeroSlideButton id={slide.id} name={slide.title} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

