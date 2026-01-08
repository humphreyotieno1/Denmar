"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Save, Loader2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"

const testimonialSchema = z.object({
    name: z.string().min(1, "Name is required"),
    location: z.string().optional().nullable(),
    trip: z.string().optional().nullable(),
    content: z.string().min(1, "Content is required"),
    rating: z.number().min(1).max(5),
    image: z.string().optional().nullable(),
    source: z.string().min(1, "Source is required"),
    featured: z.boolean(),
    isActive: z.boolean(),
    order: z.number().min(0),
})

type TestimonialFormData = z.infer<typeof testimonialSchema>

interface TestimonialFormProps {
    initialData?: any
    mode: "create" | "edit"
}

export function TestimonialForm({ initialData, mode }: TestimonialFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [image, setImage] = useState(initialData?.image || "")

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TestimonialFormData>({
        resolver: zodResolver(testimonialSchema),
        defaultValues: initialData || {
            name: "",
            location: "",
            trip: "",
            content: "",
            rating: 5,
            image: "",
            source: "Facebook",
            featured: false,
            isActive: true,
            order: 0,
        },
    })

    const rating = watch("rating")
    const featured = watch("featured")
    const isActive = watch("isActive")

    const onSubmit = async (data: TestimonialFormData) => {
        setIsSubmitting(true)
        try {
            const url = mode === "create" ? "/api/denmar-portal/testimonials" : `/api/denmar-portal/testimonials/${initialData?.id}`
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, image }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to save")
            }

            toast.success(mode === "create" ? "Testimonial added" : "Testimonial updated")
            router.push("/denmar-portal/testimonials")
            router.refresh()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to save")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/denmar-portal/testimonials">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {mode === "create" ? "Add Testimonial" : "Edit Testimonial"}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Manage customer reviews and feedback
                        </p>
                    </div>
                </div>
                <Button disabled={isSubmitting} className="bg-brand-success hover:bg-brand-secondary">
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Testimonial
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Reviewer Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Name</Label>
                                <Input {...register("name")} placeholder="e.g. John Doe" className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Location</Label>
                                <Input {...register("location")} placeholder="e.g. Nairobi, Kenya" className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Trip (Optional)</Label>
                                <Input {...register("trip")} placeholder="e.g. Diani Beach" className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Source (e.g. Facebook, Instagram)</Label>
                                <Input {...register("source")} placeholder="e.g. Facebook" className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.source && <p className="text-xs text-red-400">{errors.source.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Rating</Label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setValue("rating", star)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`h-8 w-8 transition-colors ${star <= rating ? "text-brand-accent fill-amber-400" : "text-slate-700"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Testimonial Content</Label>
                            <Textarea {...register("content")} rows={5} placeholder="What did the customer say?" className="bg-slate-100 border-slate-300 text-slate-900" />
                            {errors.content && <p className="text-xs text-red-400">{errors.content.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Reviewer Photo</h2>
                        <ImageUpload
                            value={image || ""}
                            onChange={(url) => {
                                setImage(url)
                                setValue("image", url, { shouldValidate: true })
                            }}
                            folder="denmar/testimonials"
                        />
                        {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
                        <p className="text-xs text-slate-500 text-center italic">Square avatars work best</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-slate-700">Featured</Label>
                                <Switch checked={featured} onCheckedChange={(val: boolean) => setValue("featured", val)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label className="text-slate-700">Active</Label>
                                <Switch checked={isActive} onCheckedChange={(val: boolean) => setValue("isActive", val)} />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Display Order</Label>
                                <Input type="number" {...register("order", { valueAsNumber: true })} className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

