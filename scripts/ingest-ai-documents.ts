#!/usr/bin/env ts-node

import "dotenv/config"
import { PrismaClient, type Prisma } from "@prisma/client"
import { pipeline, Tensor } from "@xenova/transformers"
import path from "node:path"

const prisma = new PrismaClient()

let embeddingPipelinePromise: Promise<any> | null = null

interface AiContent {
  id: string
  source: string
  slug?: string | null
  title: string
  type: string
  content: string
  metadata: Record<string, any>
}

async function getEmbeddingPipeline() {
  if (!embeddingPipelinePromise) {
    embeddingPipelinePromise = pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")
  }
  return embeddingPipelinePromise
}

async function generateEmbedding(text: string) {
  const extractor = await getEmbeddingPipeline()
  const result = (await extractor(text, { pooling: "mean", normalize: true })) as Tensor

  const array = result.data instanceof Float32Array ? result.data : new Float32Array(result.data as any)
  return Array.from(array)
}

function sanitize(text: string): string {
  return text.replace(/\s+/g, " ").trim()
}

function buildPackageDocument(pkg: any): AiContent {
  const highlights = pkg.includes?.slice(0, 4).join("; ") ?? ""

  const metadata: Record<string, any> = {
    id: pkg.id,
    slug: pkg.slug,
    destinationSlug: pkg.destinationSlug,
    category: pkg.category,
    duration: pkg.duration,
    price: pkg.price,
    bestTime: pkg.bestTime,
    featured: pkg.featured,
  }

  const content = sanitize(
    `${pkg.name}. Destination: ${pkg.destinationSlug}. Category: ${pkg.category}. Duration: ${pkg.duration}. Price: ${pkg.price}. Highlights: ${highlights}. Description: ${pkg.description}. Terms: ${(pkg.terms || []).join(", ")}.`
  )

  return {
    id: `package_${pkg.id}`,
    source: "package",
    slug: pkg.slug,
    title: pkg.name,
    type: pkg.category ?? "package",
    content,
    metadata,
  }
}

function buildDestinationDocument(dest: any): AiContent {
  const metadata: Record<string, any> = {
    id: dest.id,
    countrySlug: dest.countrySlug,
    slug: dest.slug,
    tags: dest.tags,
    priceFrom: dest.priceFrom,
    priceTo: dest.priceTo,
    bestTime: dest.bestTime,
    duration: dest.duration,
    rating: dest.rating,
    reviews: dest.reviews,
    featured: dest.featured,
  }

  const content = sanitize(
    `${dest.name} in ${dest.countrySlug}. Summary: ${dest.summary}. Highlights: ${(dest.highlights || []).join(", ")}. Best time: ${dest.bestTime}. Typical duration: ${dest.duration}. Tags: ${(dest.tags || []).join(", ")}.`
  )

  return {
    id: `destination_${dest.countrySlug}_${dest.slug}`,
    source: "destination",
    slug: dest.slug,
    title: dest.name,
    type: dest.countrySlug,
    content,
    metadata,
  }
}

async function upsertDocuments(documents: AiContent[]) {
  const startedAt = new Date()
  let processed = 0
  let skipped = 0

  for (const doc of documents) {
    const embedding = await generateEmbedding(doc.content)

    const prismaData: Prisma.AiDocumentUpsertArgs["create"] = {
      id: doc.id,
      source: doc.source,
      slug: doc.slug ?? null,
      title: doc.title,
      type: doc.type,
      content: doc.content,
      metadata: doc.metadata,
      embedding,
    }

    await prisma.aiDocument.upsert({
      where: { id: doc.id },
      create: prismaData,
      update: {
        title: doc.title,
        type: doc.type,
        content: doc.content,
        metadata: doc.metadata,
        embedding,
        updatedAt: new Date(),
      },
    })

    processed += 1
    if (!embedding.length) {
      skipped += 1
    }

    // Basic rate limit protection
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  const finishedAt = new Date()
  console.log(
    `Ingestion summary: processed ${processed} documents, skipped embeddings for ${skipped}. Duration ${(finishedAt.getTime() - startedAt.getTime()) / 1000}s.`
  )
}

async function ingest() {
  const services = await import(path.resolve(__dirname, "../lib/services"))
  const destinationsModule = await import(path.resolve(__dirname, "../lib/destinations"))

  const packages = services.packages || []
  const destinations = destinationsModule.destinations || []

  const packageDocs = packages.map(buildPackageDocument)
  const destinationDocs = destinations.map(buildDestinationDocument)

  console.log(`Preparing to ingest ${packageDocs.length} package documents and ${destinationDocs.length} destination documents.`)

  await upsertDocuments([...packageDocs, ...destinationDocs])

  console.log("✅ AI documents ingestion complete at", new Date().toISOString())
}

ingest()
  .catch((error) => {
    console.error("❌ Failed to ingest AI documents", error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

