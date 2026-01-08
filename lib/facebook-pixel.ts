// Facebook Pixel utility functions
declare global {
  interface Window {
    fbq: (action: string, event: string, parameters?: any) => void;
  }
}

// Initialize Facebook Pixel
export const initFacebookPixel = (pixelId: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }
};

// Track custom events
export const trackFacebookEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Travel-specific tracking functions
export const trackContactFormSubmission = (formType: 'contact' | 'newsletter') => {
  trackFacebookEvent('Lead', {
    content_name: `${formType} form submission`,
    content_category: 'Travel Inquiry',
    value: 0,
    currency: 'USD'
  });
};

export const trackPackageView = (packageName: string, packagePrice?: number | string) => {
  let price = 0;
  if (typeof packagePrice === 'number') {
    price = packagePrice;
  } else if (typeof packagePrice === 'string') {
    // Extract first number found
    const match = packagePrice.match(/\d+/);
    price = match ? parseInt(match[0]) : 0;
  }

  trackFacebookEvent('ViewContent', {
    content_name: packageName,
    content_category: 'Travel Package',
    value: price,
    currency: 'USD'
  });
};

export const trackDestinationView = (destinationName: string) => {
  trackFacebookEvent('ViewContent', {
    content_name: destinationName,
    content_category: 'Travel Destination',
    value: 0,
    currency: 'USD'
  });
};

export const trackPhoneClick = (phoneNumber: string) => {
  trackFacebookEvent('Contact', {
    content_name: 'Phone call',
    content_category: 'Travel Inquiry',
    value: 0,
    currency: 'USD'
  });
};

export const trackWhatsAppClick = () => {
  trackFacebookEvent('Contact', {
    content_name: 'WhatsApp message',
    content_category: 'Travel Inquiry',
    value: 0,
    currency: 'USD'
  });
};

export const trackNewsletterSignup = () => {
  trackFacebookEvent('CompleteRegistration', {
    content_name: 'Newsletter subscription',
    content_category: 'Travel Marketing',
    value: 0,
    currency: 'USD'
  });
};

// Advanced e-commerce tracking (for future use)
export const trackPurchase = (packageName: string, value: number, currency: string = 'USD') => {
  trackFacebookEvent('Purchase', {
    content_name: packageName,
    content_category: 'Travel Package',
    value: value,
    currency: currency
  });
};

export const trackAddToCart = (packageName: string, value: number, currency: string = 'USD') => {
  trackFacebookEvent('AddToCart', {
    content_name: packageName,
    content_category: 'Travel Package',
    value: value,
    currency: currency
  });
};

export const trackInitiateCheckout = (packageName: string, value: number, currency: string = 'USD') => {
  trackFacebookEvent('InitiateCheckout', {
    content_name: packageName,
    content_category: 'Travel Package',
    value: value,
    currency: currency
  });
};
