import type React from "react"
import type { Metadata } from "next"
import { Poppins, Open_Sans } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://denmartravel.co.ke/"),
  title: {
    default: "Denmar Tours & Travel - Your Dream Trip Awaits",
    template: "%s | Denmar Tours & Travel",
  },
  description:
    "Discover amazing destinations with Denmar Tours & Travel. Affordable prices, safety first, tailored trips, and 24/7 support for your perfect vacation.",
  keywords: "travel agency, vacation packages, tours, flights, hotels, travel deals, destinations, travel planning",
  authors: [{ name: "Denmar Tours & Travel" }],
  creator: "Denmar Tours & Travel",
  publisher: "Denmar Tours & Travel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/tablogo.png', sizes: 'any', type: 'image/png' },
      { url: '/tablogo.png', sizes: '16x16', type: 'image/png' },
      { url: '/tablogo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/tablogo.png' }
    ]
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://denmartours.com",
    siteName: "Denmar Tours & Travel",
    title: "Denmar Tours & Travel - Your Dream Trip Awaits",
    description:
      "Discover amazing destinations with Denmar Tours & Travel. Affordable prices, safety first, tailored trips, and 24/7 support.",
    images: [
      {
        url: "/tablogo.png",
        width: 1200,
        height: 630,
        alt: "Denmar Tours & Travel - Amazing Destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Denmar Tours & Travel - Your Dream Trip Awaits",
    description:
      "Discover amazing destinations with Denmar Tours & Travel. Affordable prices, safety first, tailored trips, and 24/7 support.",
    images: ["/tablogo.png"],
    creator: "@denmartours",
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://denmartours.com",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
