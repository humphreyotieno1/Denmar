import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { Prisma } from "@prisma/client"
import { cosineSimilarity } from "@/lib/vector"
import { summarizeForChat, createSystemPrompt } from "@/lib/ai/utils"
import { Anthropic } from "@anthropic-ai/sdk"
import { randomUUID } from "crypto"

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? "info@denmartravel.co.ke"
const SUPPORT_WHATSAPP = process.env.SUPPORT_WHATSAPP ?? "+254793041888"

const FALLBACK_MESSAGE = `I'm not completely sure about that, but our travel team would love to help. You can email us at ${SUPPORT_EMAIL} or WhatsApp us at ${SUPPORT_WHATSAPP}.`

function normalizeVector(vector: number[]): number[] {
  const norm = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0))
  return norm === 0 ? vector : vector.map((value) => value / norm)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      messages,
      sessionId,
    }: { messages: Array<{ role: string; content: string }>; sessionId?: string } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 })
    }

    const latestUserMessage = messages[messages.length - 1]?.content?.toString() ?? ""

    if (!latestUserMessage) {
      return NextResponse.json({ error: "User message is empty" }, { status: 400 })
    }

    const activeSessionId = sessionId && typeof sessionId === "string" ? sessionId : randomUUID()

    const latestEmbedding = normalizeVector(await summarizeForChat(latestUserMessage))

    const aiDocuments = await prisma.aiDocument.findMany({
      take: 40,
    })

    const scoredDocuments = aiDocuments
      .map((doc) => {
        const embedding = Array.isArray(doc.embedding) ? (doc.embedding as number[]) : []
        const similarity = cosineSimilarity(normalizeVector(embedding), latestEmbedding)
        return { doc, similarity }
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6)

    const relevantContext = scoredDocuments
      .filter(({ similarity }) => similarity > 0.15)
      .map(({ doc, similarity }) => ({
        similarity,
        title: doc.title,
        content: doc.content,
        source: doc.source,
        type: doc.type,
        metadata: doc.metadata,
      }))

    const systemPrompt = createSystemPrompt(relevantContext, SUPPORT_EMAIL, SUPPORT_WHATSAPP)

    let assistantReply = ""

    if (anthropic) {
      try {
        const recent = messages.slice(-6)
        const ordered = recent[0]?.role === "assistant" ? recent.slice(1) : recent
        const anthropicMessages = ordered.map((msg) => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: [{ type: "text", text: msg.content }],
        }))

        if (anthropicMessages.length === 0 || anthropicMessages[0].role !== "user") {
          anthropicMessages.unshift({
            role: "user",
            content: [{ type: "text", text: latestUserMessage }],
          })
        }

        const completion = await anthropic.messages.create({
          model: "claude-3-5-sonnet-latest",
          max_tokens: 800,
          temperature: 0.6,
          system: systemPrompt,
          messages: anthropicMessages,
        })

        const replyBlock = completion.content?.find((item) => item.type === "text")
        assistantReply = (replyBlock && "text" in replyBlock ? replyBlock.text : undefined)?.trim() ?? ""
      } catch (error: any) {
        console.error("Anthropic Chat Completion failed", error)
      }
    }

    if (!assistantReply) {
      assistantReply = FALLBACK_MESSAGE
    }

    const fallbackHandoff = assistantReply === FALLBACK_MESSAGE
    const persistedMessages = [...messages, { role: "assistant", content: assistantReply }]
    const handoffPayload = fallbackHandoff
      ? { fallback: true, timestamp: new Date().toISOString() }
      : undefined

    const prismaAny = prisma as any
    const messagesJson = JSON.stringify(persistedMessages)
    const handoffsJson = handoffPayload ? JSON.stringify(handoffPayload) : null

    if (prismaAny.aiConversation?.upsert) {
      await prismaAny.aiConversation.upsert({
        where: { sessionId: activeSessionId },
        create: {
          sessionId: activeSessionId,
          messages: persistedMessages,
          handoffs: handoffPayload ?? Prisma.DbNull,
        },
        update: handoffPayload
          ? {
              messages: persistedMessages,
              handoffs: handoffPayload,
            }
          : {
              messages: persistedMessages,
              handoffs: Prisma.DbNull,
            },
      })
    } else {
      const existing = (await prisma.$queryRaw`
        SELECT "id" FROM "ai_conversations" WHERE "sessionId" = ${activeSessionId} LIMIT 1
      `) as Array<{ id: string }>

      if (!existing || existing.length === 0) {
        if (handoffsJson) {
          await prisma.$executeRaw`
            INSERT INTO "ai_conversations" ("id", "sessionId", "messages", "handoffs", "updatedAt")
            VALUES (${randomUUID()}, ${activeSessionId}, ${messagesJson}::jsonb, ${handoffsJson}::jsonb, NOW())
          `
        } else {
          await prisma.$executeRaw`
            INSERT INTO "ai_conversations" ("id", "sessionId", "messages", "updatedAt")
            VALUES (${randomUUID()}, ${activeSessionId}, ${messagesJson}::jsonb, NOW())
          `
        }
      } else {
        if (handoffsJson) {
          await prisma.$executeRaw`
            UPDATE "ai_conversations"
            SET "messages" = ${messagesJson}::jsonb,
                "handoffs" = ${handoffsJson}::jsonb,
                "updatedAt" = NOW()
            WHERE "sessionId" = ${activeSessionId}
          `
        } else {
          await prisma.$executeRaw`
            UPDATE "ai_conversations"
            SET "messages" = ${messagesJson}::jsonb,
                "handoffs" = NULL,
                "updatedAt" = NOW()
            WHERE "sessionId" = ${activeSessionId}
          `
        }
      }
    }

    return NextResponse.json({
      reply: assistantReply,
      context: relevantContext,
      support: {
        email: SUPPORT_EMAIL,
        whatsapp: SUPPORT_WHATSAPP,
      },
      sessionId: activeSessionId,
    })
  } catch (error) {
    console.error("AI Chat API error", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

