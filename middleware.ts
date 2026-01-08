import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

// Use NextAuth with authConfig for Edge compatibility
const { auth: middleware } = NextAuth(authConfig)

export default middleware

export const config = {
    // Specify the routes that should trigger the middleware
    matcher: ["/denmar-portal/:path*"],
}
