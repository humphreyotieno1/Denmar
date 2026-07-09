import { ArrowRight, MessageSquare, Phone, Package } from "@/components/ui/huge-icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const quickActions = [
  {
    icon: MessageSquare,
    title: "Request Quote",
    href: "/contact",
  },
  {
    icon: Phone,
    title: "Call Expert",
    href: "/contact",
  },
  {
    icon: Package,
    title: "View Packages",
    href: "/packages",
  },
]

interface ReadyToPlanSectionProps {
  backgroundImage?: string
}

export function ReadyToPlanSection({ backgroundImage }: ReadyToPlanSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/5">
          {backgroundImage ? (
            <Image
              src={backgroundImage}
              alt="Denmar travel experiences"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/30" />

          <div className="relative z-10 grid grid-cols-1 gap-8 px-6 py-10 text-white sm:px-10 sm:py-12 lg:grid-cols-2 lg:items-center lg:px-14">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                Denmar Signature Service
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                Ready to plan your next unforgettable journey?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                From first idea to final booking, our travel specialists design trips that fit your dates, style, and
                budget without the stress.
              </p>
              <div className="mt-6">
                <Button
                  asChild
                  className="rounded-full border border-brand-accent bg-brand-accent text-brand-primary hover:bg-brand-accent/90"
                >
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    Start Planning Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <action.icon className="h-4 w-4 text-brand-accent" />
                    </span>
                    <span className="text-sm font-semibold">{action.title}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Prefer a full list first?{" "}
            <Link href="/services" className="font-semibold text-brand-secondary hover:text-brand-primary">
              Explore all services
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
