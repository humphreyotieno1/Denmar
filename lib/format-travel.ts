/** Format price for merchandising cards — TrippyGo-style "From X Per Person Sharing" */
export function formatCardPrice(price: string): string {
  const trimmed = price.trim()
  if (/^from\s/i.test(trimmed)) return trimmed
  return `From ${trimmed}`
}

/** Split duration strings like "3 Days / 2 Nights" into display parts */
export function formatCardDuration(duration: string): { label: string; days?: string; nights?: string } {
  const raw = duration.trim()
  if (!raw) return { label: "" }

  const daysMatch = raw.match(/(\d+)\s*days?/i)
  const nightsMatch = raw.match(/(\d+)\s*nights?/i)

  if (daysMatch || nightsMatch) {
    const days = daysMatch ? `${daysMatch[1]} day${daysMatch[1] === "1" ? "" : "s"}` : undefined
    const nights = nightsMatch ? `${nightsMatch[1]} night${nightsMatch[1] === "1" ? "" : "s"}` : undefined
    const label = [days, nights].filter(Boolean).join(" · ")
    return { label, days, nights }
  }

  return { label: raw }
}
