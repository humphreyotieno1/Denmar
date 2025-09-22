# Google Analytics 4 + Google Tag Manager Setup Guide

## 🎯 **What's Been Implemented**

### ✅ **Google Tag Manager Integration**
- GTM script added to `app/layout.tsx`
- Proper loading strategy with `afterInteractive`
- Noscript fallback for users with JavaScript disabled

### ✅ **Analytics Utility Functions**
- Created `lib/analytics.ts` with comprehensive tracking functions
- Event tracking for all major user interactions
- TypeScript support with proper type definitions

### ✅ **Conversion Tracking**
- Newsletter signup tracking in footer
- Phone click tracking
- Contact form tracking (ready to implement)
- Package and destination view tracking

### ✅ **Environment Variables**
- Created `env.example` with all necessary tracking IDs
- Secure configuration management

## 🚀 **Next Steps to Complete Setup**

### **Step 1: Get Your Tracking IDs**

1. **Google Tag Manager:**
   - Go to [tagmanager.google.com](https://tagmanager.google.com)
   - Create a new container for your website
   - Copy your GTM ID (format: `GTM-XXXXXXX`)

2. **Google Analytics 4:**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create a new GA4 property
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### **Step 2: Configure Environment Variables**

Create a `.env.local` file in your project root:
```bash
# Copy from env.example and replace with your actual IDs
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### **Step 3: Configure GTM Container**

In your Google Tag Manager container, add these tags:

#### **Google Analytics 4 Tag:**
- **Tag Type:** Google Analytics: GA4 Configuration
- **Measurement ID:** Your GA4 Measurement ID
- **Trigger:** All Pages

#### **Custom Event Tags:**
- **Newsletter Signup:** Trigger on `newsletter_signup` event
- **Contact Form:** Trigger on `contact_form_submit` event
- **Phone Clicks:** Trigger on `phone_click` event

### **Step 4: Test Your Setup**

1. **GTM Preview Mode:**
   - Use GTM's preview mode to test tags
   - Visit your website and trigger events
   - Verify events are firing correctly

2. **Google Analytics Real-Time:**
   - Check GA4 Real-Time reports
   - Verify page views and events are tracking

## 📊 **What You'll Track**

### **Essential Metrics:**
- **Page Views:** All pages and user journeys
- **Newsletter Signups:** Conversion tracking
- **Contact Form Submissions:** Lead generation
- **Phone Clicks:** Direct contact attempts
- **Package Views:** Popular destinations
- **Search Queries:** User intent analysis

### **Advanced Tracking (Optional):**
- **Scroll Depth:** User engagement
- **Time on Page:** Content effectiveness
- **Exit Intent:** Conversion optimization
- **Form Abandonment:** UX improvements

## 🛠️ **Additional Tracking You Can Add**

### **Facebook Pixel:**
```typescript
// Add to GTM container
trackCustomEvent('facebook_pixel', {
  pixel_id: process.env.NEXT_PUBLIC_FB_PIXEL_ID
})
```

### **LinkedIn Insight Tag:**
```typescript
// Add to GTM container
trackCustomEvent('linkedin_insight', {
  partner_id: process.env.NEXT_PUBLIC_LINKEDIN_ID
})
```

### **Custom Events:**
```typescript
// Track any custom event
trackCustomEvent('package_inquiry', {
  package_name: 'Dubai Holiday',
  destination: 'Dubai',
  price_range: '$1000-$2000'
})
```

## 🔧 **GTM Container Configuration**

### **Variables to Create:**
- `GA4 Measurement ID` (Constant)
- `Page Path` (Built-in Variable)
- `Page Title` (Built-in Variable)
- `Event Name` (Data Layer Variable)

### **Triggers to Create:**
- `All Pages` (Page View)
- `Newsletter Signup` (Custom Event)
- `Contact Form Submit` (Custom Event)
- `Phone Click` (Custom Event)

### **Tags to Create:**
- `GA4 Configuration` (Google Analytics)
- `GA4 Event - Newsletter Signup` (Google Analytics)
- `GA4 Event - Contact Form` (Google Analytics)
- `GA4 Event - Phone Click` (Google Analytics)

## 📈 **Expected Results**

Once set up, you'll have:
- ✅ **Complete user journey tracking**
- ✅ **Conversion funnel analysis**
- ✅ **Traffic source attribution**
- ✅ **Popular content insights**
- ✅ **Lead generation metrics**
- ✅ **ROI measurement for marketing campaigns**

## 🚨 **Important Notes**

1. **Privacy Compliance:** Ensure GDPR compliance for EU visitors
2. **Data Retention:** Configure appropriate data retention periods
3. **Testing:** Always test in preview mode before publishing
4. **Backup:** Keep backup of your GTM container configuration

## 🆘 **Troubleshooting**

### **Common Issues:**
- **Events not firing:** Check GTM preview mode
- **Data not appearing:** Wait 24-48 hours for GA4 data
- **Duplicate events:** Check trigger conditions
- **Missing data:** Verify environment variables are set

### **Debug Tools:**
- **GTM Preview Mode:** Real-time tag testing
- **GA4 DebugView:** Real-time event monitoring
- **Browser DevTools:** Check dataLayer in console
- **Google Tag Assistant:** Chrome extension for debugging

---

**Need Help?** Check the GTM and GA4 documentation or contact your developer for assistance with the setup.
