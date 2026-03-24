import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

// Use NextAuth with authConfig for Edge compatibility
const { auth } = NextAuth(authConfig)

export const proxy = auth

export const config = {
    // Specify the routes that should trigger the proxy
    matcher: ["/denmar-portal/:path*"],
}
