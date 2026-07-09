import Image from "next/image"
import Link from "next/link"
import { Moon, Sun } from "@/components/ui/huge-icons"
import { formatCardDuration, formatCardPrice } from "@/lib/format-travel"
import { cn } from "@/lib/utils"

export interface TravelCardProps {
  title: string
  description?: string
  image: string
  imageAlt?: string
  href: string
  price?: string
  priceLabel?: string
  duration?: string
  badge?: string
  exploreLabel?: string
  className?: string
  priority?: boolean
  sizes?: string
}

export function TravelCard({
  title,
  description,
  image,
  imageAlt,
  href,
  price,
  priceLabel = "Per Person Sharing",
  duration,
  badge,
  exploreLabel = "Explore",
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: TravelCardProps) {
  const safeDescription = description?.trim() || ""
  const durationParts = duration ? formatCardDuration(duration) : null
  const displayPrice = price ? formatCardPrice(price) : null
  const hasDayNightMeta = Boolean(durationParts?.days || durationParts?.nights)
  const durationMeta = !durationParts?.label ? (
    <span className="opacity-0">placeholder</span>
  ) : hasDayNightMeta ? (
    <div className="flex items-center justify-end gap-2">
      {durationParts.days && (
        <span className="inline-flex items-center gap-1">
          <Sun className="h-3 w-3 text-gray-400" />
          {durationParts.days}
        </span>
      )}
      {durationParts.nights && (
        <span className="inline-flex items-center gap-1">
          <Moon className="h-3 w-3 text-gray-400" />
          {durationParts.nights}
        </span>
      )}
    </div>
  ) : (
    <span className="line-clamp-1 normal-case tracking-normal text-[10.5px]">{durationParts.label}</span>
  )

  return (
    <article className={cn("group flex h-full min-h-[100%] flex-col", className)}>
      <Link
        href={href}
        className="relative block aspect-[4/3] overflow-hidden rounded-[8px] bg-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={imageAlt || title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded bg-brand-accent px-2 py-0.5 text-[11px] font-semibold text-brand-primary shadow-sm">
            {badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-0.5 pt-2.5">
        <div className="min-h-[3rem]">
          <Link href={href} className="block">
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-brand-secondary">
              {title}
            </h3>
          </Link>
        </div>

        <div className="mt-1 min-h-[2.3rem]">
          {safeDescription ? (
            <p className="line-clamp-2 text-[12.5px] leading-relaxed text-gray-600">{safeDescription}</p>
          ) : (
            <p className="line-clamp-2 text-[12.5px] opacity-0">placeholder text</p>
          )}
        </div>

        <div className="mt-1 min-h-[1.2rem]">
          {displayPrice ? (
            <p className="text-[12.5px] leading-relaxed text-gray-600">
              <span className="inline-flex items-center rounded-sm bg-brand-accent/15 px-1.5 py-0.5 text-[12px] font-bold text-brand-primary">
                {displayPrice}
              </span>{" "}
              <span className="font-medium">{priceLabel}</span>
            </p>
          ) : (
            <p className="text-[12.5px] opacity-0">placeholder</p>
          )}
        </div>

        <div className="mt-2.5 flex min-h-[1.6rem] items-center justify-between gap-3 pt-1.5">
          <Link
            href={href}
            className="inline-flex h-[24px] items-center rounded-full border border-[#3f7739] bg-[#4b8b43] px-3 text-[9.5px] font-bold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[#3f7739] hover:border-[#356631]"
          >
            {exploreLabel}
          </Link>

          <div className="min-w-[8rem] text-right text-[9.5px] font-medium uppercase tracking-[0.05em] text-gray-500">
            {durationMeta}
          </div>
        </div>
      </div>
    </article>
  )
}
