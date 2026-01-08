"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Sparkles,
  Mail,
  PhoneCall,
  Plane,
  UserRound,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "info@denmartravel.co.ke"
const SUPPORT_WHATSAPP = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP ?? "+254793041888"

const STORAGE_KEY = "denmar-chat-history"
const SESSION_KEY = "denmar-chat-session"

type ChatMessage = {
  id: string
  role: "assistant" | "user"
  content: string
}

const quickPrompts = [
  "Plan a December family getaway",
  "Recommend honeymoon destinations",
  "Beach escapes under $1500",
  "Safari ideas in Kenya",
]

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Hi, I’m the Denmar AI Concierge. I can recommend destinations, explain our packages, or connect you with our travel team. How can I support your travel planning today?",
  },
]

export function AiChatWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Hide on admin portal pages
  if (pathname?.startsWith("/denmar-portal")) {
    return null
  }
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)

  const whatsappLink = useMemo(() => {
    const phoneDigits = SUPPORT_WHATSAPP.replace(/[^0-9]/g, "")
    const text = encodeURIComponent("Hello Denmar team, I’d like some help planning a trip.")
    return `https://wa.me/${phoneDigits}?text=${text}`
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const storedHistory = window.localStorage.getItem(STORAGE_KEY)
    const storedSession = window.localStorage.getItem(SESSION_KEY)

    if (storedHistory) {
      try {
        const parsed = JSON.parse(storedHistory) as ChatMessage[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
        }
      } catch (err) {
        console.warn("Unable to parse stored chat history", err)
      }
    }

    if (storedSession) {
      setSessionId(storedSession)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)))
  }, [messages])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionId) {
      window.localStorage.setItem(SESSION_KEY, sessionId)
    }
  }, [sessionId])

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (!widgetRef.current) return
      if (widgetRef.current.contains(event.target as Node)) return
      setIsOpen(false)
      setIsMinimized(false)
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current && !isMinimized) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen, isMinimized])

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
    if (isOpen) {
      setIsMinimized(false)
    } else if (messages.length === 0) {
      setMessages(initialMessages)
    }
  }

  const handleSend = async (prompt?: string) => {
    const content = (prompt ?? input).trim()
    if (!content || isSending) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsSending(true)
    setIsMinimized(false)
    setError(null)

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
          sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Unable to reach concierge service")
      }

      const data = await response.json()
      if (data.sessionId && typeof data.sessionId === "string") {
        setSessionId(data.sessionId)
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply ?? "",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error(err)
      setError("I couldn’t reach our concierge right now. Please try again or contact us directly.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ai-widget"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-28 left-4 z-40 w-[calc(100vw-2.5rem)] max-w-sm sm:max-w-md"
          >
            <div
              ref={widgetRef}
              className="flex h-[28rem] flex-col overflow-hidden rounded-[2.25rem] border border-brand-primary/40 bg-white/95 shadow-[0_25px_60px_rgba(11,55,65,0.22)] backdrop-blur"
            >
              <div className="flex items-center justify-between bg-gradient-to-r from-brand-primary via-brand-primary/95 to-brand-primary px-5 py-4 text-white">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Denmar Chat</p>
                  <p className="text-lg font-semibold">Let’s plan your next escape</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-white hover:bg-white/20"
                    onClick={() => setIsMinimized((prev) => !prev)}
                    aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                  >
                    {isMinimized ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-white hover:bg-white/20"
                    onClick={handleToggle}
                    aria-label="Close chat"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className={cn(
                  "transition-all duration-300",
                  isMinimized ? "h-0 overflow-hidden px-5" : "flex-1 space-y-4 overflow-y-auto px-5 py-4"
                )}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-start gap-3"
                  >
                    {message.role === "assistant" && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary">
                        <Plane className="h-4 w-4" />
                      </div>
                    )}
                    <div className={cn("flex-1", message.role === "user" && "text-right")}>
                      <div
                        className={cn(
                          "inline-flex max-w-full rounded-2xl px-4 py-3 text-sm shadow-sm",
                          message.role === "user"
                            ? "bg-brand-primary text-white"
                            : "bg-slate-100 text-slate-900"
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
                        <UserRound className="h-4 w-4" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isSending && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-brand-primary" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-brand-primary" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-brand-primary" style={{ animationDelay: "300ms" }} />
                      </div>
                      Thinking about the perfect itinerary...
                    </div>
                  </div>
                )}

                {error && !isMinimized && (
                  <div className="rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">{error}</div>
                )}
              </div>

              {isMinimized ? (
                <div className="border-t border-slate-200 bg-white/80 px-5 py-3 text-sm text-slate-600">
                  <p className="line-clamp-2">
                    {messages[messages.length - 1]?.content || "Ask me anything about our trips."}
                  </p>
                </div>
              ) : (
                <div className="border-t border-slate-200 bg-white px-5 py-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        className="rounded-full border border-brand-primary/40 bg-white/70 px-3 py-1 text-xs text-brand-primary shadow-sm transition hover:border-brand-primary hover:bg-brand-primary/10"
                        onClick={() => handleSend(prompt)}
                        type="button"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-end gap-2">
                    <Textarea
                      placeholder="Ask me anything about our trips..."
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={(event) => {
                        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                          event.preventDefault()
                          handleSend()
                        }
                      }}
                      className="min-h-[3rem] max-h-24 flex-1 resize-none rounded-2xl border-slate-200 bg-slate-50 text-sm focus-visible:ring-brand-primary"
                    />
                    <Button
                      size="icon"
                      className="h-11 w-11 rounded-full bg-brand-primary text-white hover:bg-brand-primary/90"
                      onClick={() => handleSend()}
                      disabled={isSending}
                      aria-label="Send message"
                    >
                      {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-brand-primary" />
                      <span>Powered by Denmar’s travel expertise</span>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="flex items-center gap-1 text-brand-primary hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" /> Email
                      </a>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-brand-primary hover:underline"
                      >
                        <PhoneCall className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25, delay: 0.1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-brand-primary px-4 py-3 text-white shadow-[0_18px_45px_rgba(11,55,65,0.35)] hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
        onClick={handleToggle}
        type="button"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline font-semibold tracking-wide">Denmar Chat</span>
        <span className="sm:hidden font-semibold">Chat</span>
      </motion.button>
    </>
  )
}

