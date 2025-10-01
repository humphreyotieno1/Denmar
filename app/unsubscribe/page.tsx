"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('Invalid unsubscribe link')
      return
    }

    // Call the unsubscribe API
    fetch(`/api/unsubscribe?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.alreadyUnsubscribed) {
            setStatus('already')
          } else {
            setStatus('success')
          }
          setMessage(data.message)
        } else {
          setStatus('error')
          setMessage(data.message || 'Failed to unsubscribe')
        }
      })
      .catch(() => {
        setStatus('error')
        setMessage('Failed to process your request. Please try again.')
      })
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgba(158,184,138,0.2)] to-[rgba(98,122,8,0.1)] px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgba(98,122,8,0.72)] mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing...</h2>
            <p className="text-gray-600">Please wait while we process your request.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Successfully Unsubscribed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-6">
              We're sorry to see you go. If you change your mind, you can always subscribe again from our website.
            </p>
            <Link href="/">
              <Button className="bg-[rgba(98,122,8,0.72)] hover:bg-[rgba(98,122,8,0.85)] text-white">
                Return to Homepage
              </Button>
            </Link>
          </div>
        )}

        {status === 'already' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Already Unsubscribed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-6">
              If you'd like to subscribe again, you can do so from our website.
            </p>
            <Link href="/">
              <Button className="bg-[rgba(98,122,8,0.72)] hover:bg-[rgba(98,122,8,0.85)] text-white">
                Return to Homepage
              </Button>
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Unsubscribe Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-6">
              If you continue to have issues, please contact us at{' '}
              <a href="mailto:info@denmartravel.co.ke" className="text-[rgba(98,122,8,0.72)] hover:underline">
                info@denmartravel.co.ke
              </a>
            </p>
            <Link href="/">
              <Button className="bg-[rgba(98,122,8,0.72)] hover:bg-[rgba(98,122,8,0.85)] text-white">
                Return to Homepage
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgba(158,184,138,0.2)] to-[rgba(98,122,8,0.1)] px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgba(98,122,8,0.72)] mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading...</h2>
          </div>
        </div>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  )
}

