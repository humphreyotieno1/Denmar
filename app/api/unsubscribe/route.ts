import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Invalid unsubscribe link' },
        { status: 400 }
      )
    }

    // Find subscriber by unsubscribe token
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { unsubscribeToken: token }
    })

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: 'Subscriber not found' },
        { status: 404 }
      )
    }

    if (subscriber.status === 'unsubscribed') {
      return NextResponse.json(
        { success: true, message: 'You are already unsubscribed from our newsletter', alreadyUnsubscribed: true },
        { status: 200 }
      )
    }

    // Update subscriber status
    await prisma.newsletterSubscriber.update({
      where: { unsubscribeToken: token },
      data: {
        status: 'unsubscribed',
        unsubscribedAt: new Date()
      }
    })

    return NextResponse.json(
      { success: true, message: 'You have been successfully unsubscribed from our newsletter' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process your request. Please try again.' },
      { status: 500 }
    )
  }
}

