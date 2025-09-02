import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Welcome email to subscriber
    const welcomeEmail = {
      to: email,
      from: 'info@denmartravel.co.ke',
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
              You can unsubscribe at any time by clicking the unsubscribe link in our emails.
            </p>
          </div>
        </div>
      `
    }

    // Notification email to your team
    const teamNotification = {
      to: 'info@denmartravel.co.ke',
      from: 'info@denmartravel.co.ke',
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
    await sgMail.send([welcomeEmail, teamNotification])

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to our newsletter! Check your email for a welcome message.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to subscribe. Please try again or contact us directly.' 
      },
      { status: 500 }
    )
  }
}
