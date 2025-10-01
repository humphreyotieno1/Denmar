import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/db'

// Create SMTP transporter for hosting.com email
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'mail.denmartravel.co.ke',
    port: 587, // TLS port
    secure: false, // Use TLS (not SSL)
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds
    socketTimeout: 60000, // 60 seconds
    // debug: true,
    // logger: true
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName } = body
    const normalizedEmail = email.toLowerCase()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    let subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail }
    })

    if (subscriber) {
      if (subscriber.status === 'active') {
        return NextResponse.json(
          { success: false, message: 'This email is already subscribed to our newsletter.' },
          { status: 400 }
        )
      }

      subscriber = await prisma.newsletterSubscriber.update({
        where: { email: normalizedEmail },
        data: {
          status: 'active',
          unsubscribedAt: null,
          subscribedAt: new Date()
        }
      })
    } else {
      subscriber = await prisma.newsletterSubscriber.create({
        data: {
          email: normalizedEmail,
          status: 'active',
          ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown'
        }
      })
    }

    // Check if environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP environment variables not set:', {
        SMTP_USER: process.env.SMTP_USER ? 'Set' : 'Not set',
        SMTP_PASS: process.env.SMTP_PASS ? 'Set' : 'Not set'
      })
      return NextResponse.json(
        { success: false, message: 'Email service not configured. Please contact support.' },
        { status: 500 }
      )
    }

    console.log('SMTP Configuration:', {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS ? '***hidden***' : 'Not set',
      host: 'mail.denmartravel.co.ke',
      port: 587
    })

    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://denmartravel.co.ke'}/unsubscribe?token=${subscriber.unsubscribeToken}`

    // Create transporter
    const transporter = createTransporter()

    // Welcome email to subscriber
    const welcomeEmail = {
      from: process.env.SMTP_USER!,
      to: email,
      subject: 'Welcome to Denmar Travel Newsletter! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: rgba(98, 122, 8, 0.72); margin-bottom: 10px;">Welcome to Denmar Travel!</h1>
            <p style="color: #64748b; font-size: 18px;">You're now part of our travel community</p>
          </div>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 25px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e293b; margin-top: 0;">Dear ${firstName || 'Traveler'},</h2>
            <p>Welcome to the Denmar Travel family! We're excited to share amazing travel experiences, exclusive deals, and inspiring destinations with you.</p>
          </div>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">What you'll receive:</h3>
            <ul style="color: #374151;">
              <li>🎯 <strong>Exclusive Travel Deals</strong> - Special offers only for subscribers</li>
              <li>🌍 <strong>Destination Guides</strong> - Insider tips and hidden gems</li>
              <li>✈️ <strong>Travel Inspiration</strong> - Stunning photos and travel stories</li>
              <li>💡 <strong>Travel Tips</strong> - Expert advice for better trips</li>
              <li>🎁 <strong>Special Offers</strong> - Early access to promotions</li>
            </ul>
          </div>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Ready to start planning?</h3>
            <p>Check out our latest destinations and deals:</p>
            <div style="text-align: center; margin-top: 15px;">
              <a href="https://denmartravel.co.ke/destinations" 
                 style="background: rgba(98, 122, 8, 0.72); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px;">
                Explore Destinations
              </a>
              <a href="https://denmartravel.co.ke/deals" 
                 style="background: rgba(98, 122, 8, 0.72); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px;">
                View Deals
              </a>
            </div>
          </div>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Follow us for more inspiration:</h3>
            <p style="text-align: center; margin: 10px 0;">
              📱 <strong>WhatsApp:</strong> +254 793 041 888<br>
              📧 <strong>Email:</strong> info@denmartravel.co.ke<br>
              🌐 <strong>Website:</strong> denmartravel.co.ke
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(98, 122, 8, 0.72);">
            <p style="color: #64748b; font-size: 14px;">
              Happy travels!<br>
              <strong>The Denmar Travel Team</strong>
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 10px;">
              Thank you for subscribing to our newsletter!
            </p>
            <p style="color: #94a3b8; font-size: 11px; margin-top: 15px;">
              No longer interested? <a href="${unsubscribeUrl}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `
    }

    // Notification email to your team
    const teamNotification = {
      from: process.env.SMTP_USER!,
      to: 'info@denmartravel.co.ke',
      subject: 'New Newsletter Subscriber',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: rgba(98, 122, 8, 0.72); border-bottom: 2px solid rgba(98, 122, 8, 0.72); padding-bottom: 10px;">
            New Newsletter Subscriber
          </h2>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Subscriber Details</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Name:</strong> ${firstName || 'Not provided'}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(98, 122, 8, 0.72);">
            <p style="color: #64748b; font-size: 14px;">
              This subscriber signed up through the Denmar Travel website newsletter form.
            </p>
          </div>
        </div>
      `
    }

    // Send both emails
    await transporter.sendMail(welcomeEmail)
    await transporter.sendMail(teamNotification)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to our newsletter! Check your email for a welcome message.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to subscribe. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}