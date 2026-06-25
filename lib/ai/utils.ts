import OpenAI from "openai"
import type { AiDocument } from "@prisma/client"

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

export async function summarizeForChat(text: string): Promise<number[]> {
  if (!openai) {
    console.error("OpenAI client not initialized (missing OPENAI_API_KEY). Returning empty array for embedding.")
    return []
  }

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    })
    return response.data[0].embedding
  } catch (error) {
    console.error("Failed to generate embedding via OpenAI:", error)
    throw error
  }
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
      const metadata = doc.metadata as any
      if (doc.source === "package") {
        metadataSnippet = `Category: ${metadata?.category}, Destination: ${metadata?.destinationSlug}, Duration: ${metadata?.duration}, Price: ${metadata?.price}`
      } else if (doc.source === "destination") {
        metadataSnippet = `Country: ${metadata?.countrySlug}, Tags: ${(metadata?.tags || []).join(", ")}, Best time: ${metadata?.bestTime}`
      }

      return `Context ${index + 1} (similarity ${doc.similarity.toFixed(2)}): ${doc.title}. ${doc.content}. ${metadataSnippet}`
    })
    .join("\n\n")

  return `You are Denmar AI Concierge, a warm, knowledgeable travel specialist who speaks in a friendly, professional tone. Use the following context from our packages and destinations to answer questions. If the context is insufficient, reply with the fallback message: "I'm not completely sure about that, but our travel team would love to help. You can email us at ${supportEmail} or WhatsApp us at ${supportWhatsApp}." Always encourage next steps like booking or contacting support when appropriate.

Context:
${context}`
}

