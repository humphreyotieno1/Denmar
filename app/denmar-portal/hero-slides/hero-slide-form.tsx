"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/image-upload"
import { toast } from "sonner"

const heroSlideSchema = z.object({
    eyebrow: z.string().optional().nullable(),
    title: z.string().min(1, "Title is required"),
    highlight: z.string().optional().nullable(),
    subtitle: z.string().min(1, "Subtitle is required"),
    buttonText: z.string().min(1, "Button text is required"),
    buttonLink: z.string().min(1, "Button link is required"),
    image: z.string().min(1, "Image is required"),
    isActive: z.boolean(),
    order: z.number().min(0),
})

type HeroSlideFormData = z.infer<typeof heroSlideSchema>

interface HeroSlideFormProps {
    initialData?: any
    mode: "create" | "edit"
}

export function HeroSlideForm({ initialData, mode }: HeroSlideFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [image, setImage] = useState(initialData?.image || "")

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<HeroSlideFormData>({
        resolver: zodResolver(heroSlideSchema),
        defaultValues: initialData || {
            eyebrow: "",
            title: "",
            highlight: "",
            subtitle: "",
            buttonText: "Explore Now",
            buttonLink: "/destinations",
            image: "",
            isActive: true,
            order: 0,
        },
    })

    const isActive = watch("isActive")

    const onSubmit = async (data: HeroSlideFormData) => {
        setIsSubmitting(true)
        try {
            const url = mode === "create" ? "/api/denmar-portal/hero-slides" : `/api/denmar-portal/hero-slides/${initialData?.id}`
            const response = await fetch(url, {
                method: mode === "create" ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, image }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || "Failed to save")
            }

            toast.success(mode === "create" ? "Slide created" : "Slide updated")
            router.push("/denmar-portal/hero-slides")
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
                    <Link href="/denmar-portal/hero-slides">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {mode === "create" ? "Add Hero Slide" : "Edit Hero Slide"}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Configure homepage hero content
                        </p>
                    </div>
                </div>
                <Button disabled={isSubmitting} className="bg-brand-success hover:bg-brand-secondary">
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Slide
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Slide Content</h2>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Eyebrow (Small text above title)</Label>
                            <Input {...register("eyebrow")} placeholder="e.g. DISCOVER KENYA" className="bg-slate-100 border-slate-300 text-slate-900" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Title</Label>
                                <Input {...register("title")} placeholder="e.g. Experience the Magic" className="bg-slate-100 border-slate-300 text-slate-900" />
                                {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Highlight Text (Amber colored)</Label>
                                <Input {...register("highlight")} placeholder="e.g. of Maasai Mara" className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-slate-700">Subtitle</Label>
                            <Textarea {...register("subtitle")} rows={3} placeholder="Small description text..." className="bg-slate-100 border-slate-300 text-slate-900" />
                            {errors.subtitle && <p className="text-xs text-red-400">{errors.subtitle.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700">Button Text</Label>
                                <Input {...register("buttonText")} className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700">Button Link</Label>
                                <Input {...register("buttonLink")} className="bg-slate-100 border-slate-300 text-slate-900" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Slide Image</h2>
                        <ImageUpload
                            value={image}
                            onChange={(url) => {
                                setImage(url)
                                setValue("image", url, { shouldValidate: true })
                            }}
                            folder="denmar/hero"
                        />
                        {errors.image && <p className="text-xs text-red-400">{errors.image.message}</p>}
                        <p className="text-xs text-slate-500 text-center italic">Best for high resolution landscape images</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
                        <div className="space-y-4">
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

