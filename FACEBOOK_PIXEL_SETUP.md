# Facebook Meta Pixel Setup Guide

## 🎯 **What's Been Implemented**

### ✅ **1. Pixel Code Added to Layout**
- Facebook Pixel base code added to `app/layout.tsx`
- Includes both JavaScript and noscript fallback
- **⚠️ IMPORTANT:** Replace `YOUR_PIXEL_ID` with your actual Facebook Pixel ID

### ✅ **2. Tracking Functions Created**
- Created `lib/facebook-pixel.ts` with comprehensive tracking functions
- Includes travel-specific events for your business

### ✅ **3. Event Tracking Integrated**
- **Contact Form:** Tracks form submissions as "Lead" events
- **Newsletter Signup:** Tracks as "CompleteRegistration" events  
- **Phone Clicks:** Tracks as "Contact" events
- **WhatsApp Clicks:** Tracks as "Contact" events
- **Package Views:** Tracks as "ViewContent" events with package details

## 🚀 **Next Steps to Complete Setup**

### **Step 1: Get Your Facebook Pixel ID**

1. **Go to Facebook Business Manager:** https://business.facebook.com/
2. **Navigate to:** Events Manager → Data Sources → Pixels
3. **Create a new pixel** (if you don't have one):
   - Click "Create a Pixel"
   - Name it "Denmar Travel Pixel"
   - Choose "Set up the pixel now"
4. **Copy your Pixel ID** (format: 1234567890123456)

### **Step 2: Update the Pixel ID**

Replace `YOUR_PIXEL_ID` in `app/layout.tsx` with your actual Pixel ID:

```tsx
// In app/layout.tsx, line 130
fbq('init', 'YOUR_ACTUAL_PIXEL_ID');

// And line 137
src="https://www.facebook.com/tr?id=YOUR_ACTUAL_PIXEL_ID&ev=PageView&noscript=1"
```

### **Step 3: Test the Implementation**

1. **Deploy the changes** to your live site
2. **Install Facebook Pixel Helper** Chrome extension
3. **Visit your website** and check if the pixel fires
4. **Test events:**
   - Submit contact form
   - Subscribe to newsletter
   - Click phone number
   - View a package page

### **Step 4: Verify in Facebook Events Manager**

1. **Go to Events Manager** in Facebook Business Manager
2. **Check "Test Events"** tab
3. **You should see:**
   - PageView events
   - Lead events (contact form)
   - CompleteRegistration events (newsletter)
   - Contact events (phone/WhatsApp)
   - ViewContent events (package views)

## 📊 **Available Tracking Events**

### **Standard Events (Automatically Tracked)**
- `PageView` - Every page visit
- `Lead` - Contact form submissions
- `CompleteRegistration` - Newsletter signups
- `Contact` - Phone/WhatsApp clicks
- `ViewContent` - Package page views

### **Custom Events (Available for Future Use)**
- `Purchase` - Package bookings
- `AddToCart` - Add package to cart
- `InitiateCheckout` - Start booking process

## 🎯 **Facebook Ads Benefits for Your Travel Business**

### **1. Retargeting Campaigns**
- Target visitors who viewed packages but didn't book
- Show ads to newsletter subscribers
- Retarget contact form abandoners

### **2. Lookalike Audiences**
- Create audiences similar to your customers
- Target people with similar travel interests
- Expand your reach to qualified prospects

### **3. Conversion Tracking**
- Track cost per lead (contact form)
- Measure return on ad spend (ROAS)
- Optimize campaigns for best-performing packages

### **4. Dynamic Ads**
- Show specific packages to interested users
- Automatically update ads with new packages
- Personalize ads based on browsing behavior

## 🔧 **Advanced Configuration (Optional)**

### **Enhanced E-commerce Tracking**
If you add booking functionality later, you can track:
```typescript
// Track package purchase
trackPurchase('Rome Adventure Package', 2500, 'USD')

// Track add to cart
trackAddToCart('Thailand Beach Package', 1800, 'USD')

// Track checkout initiation
trackInitiateCheckout('Zanzibar Honeymoon', 3200, 'USD')
```

### **Custom Parameters**
Add custom parameters to events for better tracking:
```typescript
trackFacebookEvent('Lead', {
  content_name: 'Contact Form',
  content_category: 'Travel Inquiry',
  destination: 'Rome',
  budget_range: '2000-3000',
  travel_dates: '2024-06-15 to 2024-06-22'
})
```

## 🚨 **Important Notes**

1. **GDPR Compliance:** Consider adding cookie consent for EU visitors
2. **Privacy Policy:** Update your privacy policy to mention Facebook Pixel
3. **Testing:** Always test in Facebook Pixel Helper before running ads
4. **Data Quality:** Ensure accurate event tracking for better ad optimization

## 📞 **Need Help?**

- **Facebook Pixel Helper:** Chrome extension for testing
- **Facebook Business Help Center:** https://www.facebook.com/business/help
- **Events Manager:** Monitor pixel performance and troubleshoot issues

Your Facebook Pixel is now ready to track valuable customer interactions and help you create effective retargeting campaigns! 🎉
