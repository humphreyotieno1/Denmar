# SendGrid Setup Guide for Denmar Travel

## 🚀 Quick Setup Steps

### 1. Sign Up for SendGrid
- Go to [sendgrid.com](https://sendgrid.com)
- Create a free account (100 emails/day free)
- Verify your email address

### 2. Get Your API Key
1. Log into SendGrid Dashboard
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name it: `Denmar Travel Website`
5. Choose **Full Access** or **Restricted Access** (Mail Send)
6. Copy the API key (you won't see it again!)

### 3. Verify Your Domain
1. Go to **Settings** → **Sender Authentication**
2. Click **Authenticate Your Domain**
3. Enter your domain: `denmartravel.co.ke`
4. Follow the DNS setup instructions

### 4. Add Environment Variables
Create a `.env.local` file in your project root:
```env
SENDGRID_API_KEY=your_actual_api_key_here
```

### 5. DNS Records to Add in cPanel
Add these records to your domain's DNS:

#### CNAME Record:
```
Type: CNAME
Name: sendgrid
Value: sendgrid.net
```

#### TXT Record (SPF):
```
Type: TXT
Name: @
Value: v=spf1 include:sendgrid.net ~all
```

#### Additional TXT Records (from SendGrid domain verification):
- Add the specific TXT records provided by SendGrid during domain verification

## 📧 What's Been Implemented

### Contact Form (`/api/contact`)
- **Team Email**: Sends inquiry details to `info@denmartravel.co.ke`
- **Customer Email**: Sends auto-reply to customer
- **Features**:
  - Professional HTML email templates
  - All form fields included
  - Travel details summary
  - Call-to-action buttons

### Newsletter Signup (`/api/newsletter`)
- **Welcome Email**: Sends to new subscribers
- **Team Notification**: Notifies you of new subscribers
- **Features**:
  - Welcome message with travel benefits
  - Links to destinations and deals
  - Contact information included

### Components Updated
- ✅ Contact Form now uses SendGrid API
- ✅ Newsletter signup component created
- ✅ Footer newsletter integration
- ✅ Error handling and loading states

## 🎯 Email Templates Included

### Contact Form Emails:
1. **Team Notification**: Professional inquiry summary
2. **Customer Auto-Reply**: Thank you message with next steps

### Newsletter Emails:
1. **Welcome Email**: Welcome message with benefits
2. **Team Notification**: New subscriber alert

## 🔧 Testing Your Setup

### Test Contact Form:
1. Go to `/contact` page
2. Fill out the contact form
3. Submit and check:
   - Your email (`info@denmartravel.co.ke`)
   - Customer's email (auto-reply)

### Test Newsletter:
1. Use the newsletter signup component
2. Enter an email address
3. Check for welcome email

## 📊 Monitoring

### SendGrid Dashboard:
- **Activity**: View sent emails
- **Statistics**: Track delivery rates
- **Bounces**: Monitor failed deliveries
- **Spam Reports**: Check for issues

### Recommended Monitoring:
- Check dashboard daily for first week
- Monitor bounce rates (should be < 2%)
- Watch for spam reports

## 🚨 Troubleshooting

### Common Issues:

**1. "API Key Invalid" Error**
- Check your API key in `.env.local`
- Ensure no extra spaces or characters
- Verify API key has "Mail Send" permissions

**2. "Domain Not Verified" Error**
- Complete domain verification in SendGrid
- Add all required DNS records
- Wait 24-48 hours for DNS propagation

**3. Emails Not Sending**
- Check SendGrid dashboard for errors
- Verify "from" email addresses are verified
- Check spam folder for test emails

**4. High Bounce Rate**
- Verify email addresses are valid
- Check domain reputation
- Monitor spam reports

## 📈 Next Steps

### After Setup:
1. **Test thoroughly** with different email addresses
2. **Monitor delivery rates** for first week
3. **Set up email templates** in SendGrid dashboard
4. **Configure webhooks** for better tracking (optional)
5. **Set up email analytics** for performance tracking

### Advanced Features (Optional):
- **Email Templates**: Create reusable templates in SendGrid
- **Automation**: Set up welcome series and follow-ups
- **Analytics**: Track open rates and click-through rates
- **A/B Testing**: Test different email content

## 💰 Cost Management

### Free Tier Limits:
- **100 emails/day** (3,000/month)
- Perfect for starting businesses
- Upgrade when you exceed limits

### Upgrade When:
- Exceeding 100 emails/day
- Need advanced features
- Want better analytics

## 🔐 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Regularly rotate API keys**
4. **Monitor for suspicious activity**
5. **Use HTTPS** for all API calls

## 📞 Support

### SendGrid Support:
- **Documentation**: [sendgrid.com/docs](https://sendgrid.com/docs)
- **Community**: [community.sendgrid.com](https://community.sendgrid.com)
- **Email**: support@sendgrid.com

### Denmar Travel Support:
- **Email**: info@denmartravel.co.ke
- **Phone**: +254 793 041 888

---

**Need Help?** Contact us at info@denmartravel.co.ke for assistance with SendGrid setup.
