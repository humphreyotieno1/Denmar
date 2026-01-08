import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    providers: [], // Providers are added in auth.ts
    pages: {
        signIn: "/denmar-portal/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isAdminRoute = nextUrl.pathname.startsWith("/denmar-portal")
            const isLoginPage = nextUrl.pathname.startsWith("/denmar-portal/login")

            if (isAdminRoute && !isLoginPage) {
                if (isLoggedIn) return true
                return false // Redirect to login
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours
    },
} satisfies NextAuthConfig
