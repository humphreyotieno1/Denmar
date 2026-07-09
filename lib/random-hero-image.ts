import "server-only"
import fs from "node:fs"
import path from "node:path"

const DESTINATIONS_DIR = path.join(process.cwd(), "public", "destinations")
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"])

function getDestinationImagePool(): string[] {
  try {
    const files = fs.readdirSync(DESTINATIONS_DIR, { withFileTypes: true })
    return files
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => ALLOWED_EXTENSIONS.has(path.extname(name).toLowerCase()))
      .map((name) => `/destinations/${name}`)
  } catch {
    return []
  }
}

export function getRandomDestinationImage(): string {
  const imagePool = getDestinationImagePool()
  if (!imagePool.length) return "/placeholder.svg"

  const randomIndex = Math.floor(Math.random() * imagePool.length)
  return imagePool[randomIndex]
}
