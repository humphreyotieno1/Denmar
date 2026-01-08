"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff, Plane, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Suspense } from "react"

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/denmar-portal"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Invalid email or password")
            } else {
                router.push(callbackUrl)
                router.refresh()
            }
        } catch {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
            {/* Background elements for premium feel */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-success/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <Link
                href="/"
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-brand-success transition-colors group relative z-10"
            >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Denmar Travel</span>
            </Link>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-slate-100">
                    {/* Logo */}
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="w-16 h-16 bg-brand-success rounded-2xl flex items-center justify-center shadow-xl shadow-brand-success/20 mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                            <Plane className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Denmar Portal</h1>
                        <p className="text-brand-success font-semibold text-xs uppercase tracking-[0.2em] mt-1">Management Console</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-600 font-medium ml-1">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@denmartravel.co.ke"
                                required
                                className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-success focus:ring-brand-success rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-600 font-medium ml-1">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-brand-success focus:ring-brand-success rounded-xl pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-success transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 border border-red-100 rounded-xl py-3 px-4 font-medium">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand-success hover:bg-brand-secondary text-white font-bold py-7 text-lg rounded-xl transition-all duration-300 shadow-xl shadow-brand-success/20 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Sign In to Portal"
                            )}
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                            Authorized Personnel Only
                        </p>
                    </div>
                </div>

                <p className="text-center mt-8 text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} Denmar Tours & Travel. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="h-8 w-8 text-brand-success animate-spin" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}
