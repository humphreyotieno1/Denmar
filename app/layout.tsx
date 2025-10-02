import type React from "react"
import type { Metadata } from "next"
import { Poppins, Open_Sans } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast"
import Script from "next/script"
import { AiChatWidget } from "@/components/ai-chat-widget"

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
    url: "https://denmartravel.co.ke",
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
    google: "e6SBUs9A3eNWIHMPfU5wunAran6HCfBxRaSfwTmjENs",
  },
  alternates: {
    canonical: "https://denmartravel.co.ke",
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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X34BY22BDQ"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X34BY22BDQ');
            `,
          }}
        />
        
        {/* Facebook Meta Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '703970893854987');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=703970893854987&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <ToastProvider>
          {children}
          <AiChatWidget />
        </ToastProvider>
      </body>
    </html>
  )
}
