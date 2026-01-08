import Link from "next/link"
import { prisma } from "@/lib/db"
import { Plus, MessageSquare, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteTestimonialButton } from "./delete-button"

export default async function TestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: [
            { order: "asc" }
        ],
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
                    <p className="text-slate-500 mt-1">
                        Manage customer reviews and feedback
                    </p>
                </div>
                <Link href="/denmar-portal/testimonials/new">
                    <Button className="bg-brand-success hover:bg-brand-secondary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Testimonial
                    </Button>
                </Link>
            </div>

            {/* List */}
            <div className="space-y-4">
                {testimonials.length === 0 ? (
                    <div className="p-12 bg-white border border-slate-200 rounded-xl text-center text-slate-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No testimonials found. Add one to build trust!</p>
                    </div>
                ) : (
                    testimonials.map((testimonial: any) => (
                        <div key={testimonial.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row gap-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                {testimonial.image ? (
                                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xl">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-slate-900 font-semibold">{testimonial.name}</h3>
                                        <p className="text-sm text-slate-500">
                                            {[testimonial.role, testimonial.location, testimonial.trip].filter(Boolean).join(" • ") || "Verified Traveler"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "text-brand-accent fill-amber-400" : "text-slate-700"}`} />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-slate-700 italic">"{testimonial.content}"</p>

                                <div className="pt-4 flex items-center gap-4">
                                    {testimonial.isActive ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            <Eye className="h-2.5 w-2.5" /> Published
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-500 border border-slate-300">
                                            <EyeOff className="h-2.5 w-2.5" /> Hidden
                                        </span>
                                    )}
                                    {testimonial.featured && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-brand-success/10 text-amber-500 border border-amber-500/20">
                                            <Star className="h-2.5 w-2.5" /> Featured
                                        </span>
                                    )}
                                    <span className="text-[10px] text-slate-600">Order: {testimonial.order}</span>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col items-center justify-end gap-2 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                                <Link href={`/denmar-portal/testimonials/${testimonial.id}`}>
                                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <DeleteTestimonialButton id={testimonial.id} name={testimonial.name} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

