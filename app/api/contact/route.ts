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
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      destination, 
      travelDateFrom, 
      travelDateTo, 
      adults, 
      children, 
      budget, 
      message 
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !destination) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store contact submission in database
    await prisma.contactSubmission.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: email.toLowerCase(),
        phone: phone || null,
        country: destination || null,
        message: `Destination: ${destination}\nTravel Dates: ${travelDateFrom} to ${travelDateTo}\nTravelers: ${adults} adults, ${children} children\nBudget: $${budget || 'Not specified'}\n\nMessage:\n${message}`,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    // Create transporter
    const transporter = createTransporter()

    // Email to your team
    const teamEmail = {
      from: process.env.SMTP_USER!, // Your GoDaddy email
      to: 'info@denmartravel.co.ke',
      subject: `New Travel Inquiry: ${destination}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:rgba(98, 122, 8, 0.72); border-bottom: 2px solid rgba(98, 122, 8, 0.72); padding-bottom: 10px;">
            New Travel Inquiry - Denmar Travel
          </h2>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: rgba(98, 122, 8, 0.72); margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: rgba(98, 122, 8, 0.72); margin-top: 0;">Travel Details</h3>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Travel Dates:</strong> ${travelDateFrom} to ${travelDateTo}</p>
            <p><strong>Travelers:</strong> ${adults} adults, ${children} children</p>
            <p><strong>Budget Range:</strong> $${budget || 'Not specified'}</p>
          </div>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: rgba(98, 122, 8, 0.72); margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(98, 122, 8, 0.72);">
            <p style="color: #64748b; font-size: 14px;">
              This inquiry was submitted from the Denmar Travel website contact form.
            </p>
          </div>
        </div>
      `
    }

    // Auto-reply to customer
    const customerEmail = {
      from: process.env.SMTP_USER!,
      to: email,
      subject: 'Thank you for your inquiry - Denmar Travel',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: rgba(98, 122, 8, 0.72); margin-bottom: 10px;">Thank You!</h1>
            <p style="color: #64748b; font-size: 18px;">We've received your travel inquiry</p>
          </div>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 25px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e293b; margin-top: 0;">Dear ${firstName},</h2>
            <p>Thank you for contacting Denmar Travel! We're excited to help you plan your trip to <strong>${destination}</strong>.</p>
            <p>Our travel experts will review your inquiry and get back to you within <strong>24 hours</strong> with personalized recommendations and pricing.</p>
          </div>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">What happens next?</h3>
            <ul style="color: #374151;">
              <li>Our team will review your travel requirements</li>
              <li>We'll create a personalized travel package</li>
              <li>You'll receive detailed pricing and itinerary</li>
              <li>We'll answer any questions you have</li>
            </ul>
          </div>
          
          <div style="background: rgba(158, 184, 138, 0.72); padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">In the meantime...</h3>
            <p>Check out our latest deals and travel inspiration:</p>
            <div style="text-align: center; margin-top: 15px;">
              <a href="https://denmartravel.co.ke/deals" 
                 style="background: rgba(98, 122, 8, 0.72); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                View Latest Deals
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(98, 122, 8, 0.72);">
            <p style="color: #64748b; font-size: 14px;">
              Best regards,<br>
              <strong>The Denmar Travel Team</strong><br>
              📞 +254 793 041 888 | 📧 info@denmartravel.co.ke
            </p>
          </div>
        </div>
      `
    }

    // Send both emails
    await transporter.sendMail(teamEmail)
    await transporter.sendMail(customerEmail)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your inquiry has been sent successfully. We\'ll get back to you within 24 hours!' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('SMTP error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send your inquiry. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}
