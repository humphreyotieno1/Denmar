import { pipeline, Tensor } from "@xenova/transformers"
import type { AiDocument } from "@prisma/client"

let embeddingPipelinePromise: Promise<any> | null = null

async function getEmbeddingPipeline() {
  if (!embeddingPipelinePromise) {
    embeddingPipelinePromise = pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2")
  }
  return embeddingPipelinePromise
}

export async function summarizeForChat(text: string): Promise<number[]> {
  const extractor = await getEmbeddingPipeline()
  const result = (await extractor(text, { pooling: "mean", normalize: true })) as Tensor
  const data = result.data instanceof Float32Array ? result.data : new Float32Array(result.data as any)
  return Array.from(data)
}

export function createSystemPrompt(
  documents: Array<{
    similarity: number
    title: string
    content: string
    source: string
    type: string
    metadata: AiDocument["metadata"]
  }>,
  supportEmail: string,
  supportWhatsApp: string
): string {
  const context = documents
    .map((doc, index) => {
      let metadataSnippet = ""
      if (doc.source === "package") {
        metadataSnippet = `Category: ${doc.metadata?.category}, Destination: ${doc.metadata?.destinationSlug}, Duration: ${doc.metadata?.duration}, Price: ${doc.metadata?.price}`
      } else if (doc.source === "destination") {
        metadataSnippet = `Country: ${doc.metadata?.countrySlug}, Tags: ${(doc.metadata?.tags || []).join(", ")}, Best time: ${doc.metadata?.bestTime}`
      }

      return `Context ${index + 1} (similarity ${doc.similarity.toFixed(2)}): ${doc.title}. ${doc.content}. ${metadataSnippet}`
    })
    .join("\n\n")

  return `You are Denmar AI Concierge, a warm, knowledgeable travel specialist who speaks in a friendly, professional tone. Use the following context from our packages and destinations to answer questions. If the context is insufficient, reply with the fallback message: "I'm not completely sure about that, but our travel team would love to help. You can email us at ${supportEmail} or WhatsApp us at ${supportWhatsApp}." Always encourage next steps like booking or contacting support when appropriate.

Context:
${context}`
}

