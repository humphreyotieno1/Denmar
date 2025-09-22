// Analytics utility functions for GTM and GA4
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = []
}

// Push events to dataLayer for GTM
export const pushToDataLayer = (event: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    window.dataLayer.push({
      event,
      ...data,
      timestamp: new Date().toISOString(),
    })
  }
}

// Track page views
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  pushToDataLayer('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
  })
}

// Track newsletter signups
export const trackNewsletterSignup = (email: string, source?: string) => {
  pushToDataLayer('newsletter_signup', {
    email: email,
    source: source || 'website',
    event_category: 'engagement',
    event_label: 'newsletter',
  })
}

// Track contact form submissions
export const trackContactForm = (formType: string, destination?: string) => {
  pushToDataLayer('contact_form_submit', {
    form_type: formType,
    destination: destination,
    event_category: 'lead_generation',
    event_label: 'contact_form',
  })
}

// Track package views
export const trackPackageView = (packageName: string, packageId: string, destination: string) => {
  pushToDataLayer('package_view', {
    package_name: packageName,
    package_id: packageId,
    destination: destination,
    event_category: 'package_interaction',
    event_label: 'package_view',
  })
}

// Track destination views
export const trackDestinationView = (destinationName: string, country: string) => {
  pushToDataLayer('destination_view', {
    destination_name: destinationName,
    country: country,
    event_category: 'destination_interaction',
    event_label: 'destination_view',
  })
}

// Track phone number clicks
export const trackPhoneClick = (phoneNumber: string, location: string) => {
  pushToDataLayer('phone_click', {
    phone_number: phoneNumber,
    location: location,
    event_category: 'contact',
    event_label: 'phone_call',
  })
}

// Track WhatsApp clicks
export const trackWhatsAppClick = (message?: string) => {
  pushToDataLayer('whatsapp_click', {
    message: message,
    event_category: 'contact',
    event_label: 'whatsapp_message',
  })
}

// Track deal clicks
export const trackDealClick = (dealName: string, dealId: string) => {
  pushToDataLayer('deal_click', {
    deal_name: dealName,
    deal_id: dealId,
    event_category: 'deal_interaction',
    event_label: 'deal_click',
  })
}

// Track search queries
export const trackSearch = (query: string, resultsCount: number) => {
  pushToDataLayer('search', {
    search_term: query,
    results_count: resultsCount,
    event_category: 'search',
    event_label: 'package_search',
  })
}

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  pushToDataLayer('scroll_depth', {
    scroll_depth: depth,
    event_category: 'engagement',
    event_label: 'scroll_tracking',
  })
}

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number, pagePath: string) => {
  pushToDataLayer('time_on_page', {
    time_seconds: timeInSeconds,
    page_path: pagePath,
    event_category: 'engagement',
    event_label: 'time_tracking',
  })
}

// Track custom events
export const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
  pushToDataLayer(eventName, {
    ...parameters,
    event_category: 'custom',
    event_label: eventName,
  })
}
