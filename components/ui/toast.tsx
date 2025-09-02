"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
}

interface ToastContextType {
  toast: (type: ToastType, title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { id, type, title, message }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                min-w-[320px] max-w-[420px] p-4 rounded-lg shadow-lg border-l-4
                ${toast.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' : ''}
                ${toast.type === 'error' ? 'bg-red-50 border-red-500 text-red-800' : ''}
                ${toast.type === 'info' ? 'bg-blue-50 border-blue-500 text-blue-800' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600" />}
                  {toast.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{toast.title}</h4>
                  {toast.message && (
                    <p className="text-sm mt-1 opacity-90">{toast.message}</p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Convenience functions
export const toast = {
  success: (title: string, message?: string) => {
    if (typeof window !== 'undefined') {
      // Fallback to alert if no provider
      alert(`${title}${message ? `: ${message}` : ''}`)
    }
  },
  error: (title: string, message?: string) => {
    if (typeof window !== 'undefined') {
      // Fallback to alert if no provider
      alert(`Error: ${title}${message ? ` - ${message}` : ''}`)
    }
  },
  info: (title: string, message?: string) => {
    if (typeof window !== 'undefined') {
      // Fallback to alert if no provider
      alert(`${title}${message ? `: ${message}` : ''}`)
    }
  }
}
