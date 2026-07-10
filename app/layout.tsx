import type React from "react"
import type { Metadata } from "next"
import { Poppins, Open_Sans } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast"
import Script from "next/script"
import { FooterSchema } from "@/components/layout"
import { Toaster } from "sonner"

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
  metadataBase: new URL("https://www.denmartravel.co.ke/"),

  // Title template — page titles slot in as "%s"
  title: {
    default: "Denmar Tours & Travel | Affordable Travel Packages from Kenya",
    template: "%s | Denmar Tours & Travel",
  },

  // Global fallback description (≤160 chars)
  description:
    "Denmar Tours & Travel offers affordable local & international packages from Kenya. Explore Dubai, Zanzibar, Maasai Mara & more. Book your next trip today.",

  // High-intent global keywords
  keywords: [
    "Travel agency Kenya",
    "Tours and travel Nairobi",
    "Travel packages from Kenya",
    "Dubai packages from Kenya",
    "Maasai Mara safari packages",
    "Zanzibar travel packages",
    "Kenya safari tour operator",
    "affordable travel packages Kenya",
    "international travel packages Nairobi",
    "Kenya tour company",
  ],

  authors: [{ name: "Denmar Tours & Travel", url: "https://www.denmartravel.co.ke" }],
  creator: "Denmar Tours & Travel",
  publisher: "Denmar Tours & Travel",

  // Indexing directives
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

  // Favicon & app icons
  icons: {
    icon: [
      { url: "/tablogo.png", sizes: "any", type: "image/png" },
      { url: "/tablogo.png", sizes: "16x16", type: "image/png" },
      { url: "/tablogo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/tablogo.png" }],
    shortcut: "/tablogo.png",
  },

  // Open Graph — controls how the site looks when shared on WhatsApp, Facebook, etc.
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.denmartravel.co.ke/",
    siteName: "Denmar Tours & Travel",
    title: "Denmar Tours & Travel | Affordable Travel Packages from Kenya",
    description:
      "Denmar Tours & Travel offers affordable local & international packages from Kenya. Explore Dubai, Zanzibar, Maasai Mara & more. Book your next trip today.",
    images: [
      {
        url: "/tablogo.png",
        width: 1200,
        height: 630,
        alt: "Denmar Tours & Travel — Affordable Travel Packages from Kenya",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    site: "@DenmarTravel",
    creator: "@DenmarTravel",
    title: "Denmar Tours & Travel | Affordable Travel Packages from Kenya",
    description:
      "Denmar Tours & Travel offers affordable local & international packages from Kenya. Explore Dubai, Zanzibar, Maasai Mara & more. Book your next trip today.",
    images: ["/denmar.png"],
  },

  // Canonical URL — prevents duplicate content issues
  alternates: {
    canonical: "https://www.denmartravel.co.ke/",
  },

  // Google Search Console verification
  verification: {
    google: "e6SBUs9A3eNWIHMPfU5wunAran6HCfBxRaSfwTmjENs",
  },

  generator: "Next.js",
}

import { prisma } from "@/lib/db"

export default async function RootLayout({
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
              fbq('init', '3332570506840480');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=3332570506840480&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <FooterSchema />
        <ToastProvider>
          {children}
          <Toaster richColors position="top-right" closeButton />
          {/* Legacy Denmar AI widget intentionally disabled for full tawk.to replacement.
              Code is preserved in components/widgets/ai-chat-widget.tsx */}
          {/* <AiChatWidget /> */}
        </ToastProvider>
        {/* Standard tawk.to installation snippet (recommended approach) */}
        <Script
          id="tawkto-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              Tawk_API.customStyle = {
                visibility: {
                  desktop: {
                    position: "bl",
                    xOffset: 24,
                    yOffset: 24
                  },
                  mobile: {
                    position: "bl",
                    xOffset: 16,
                    yOffset: 16
                  }
                }
              };
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6a50b2978926201d475f51d0/1jt5jj8jk';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
