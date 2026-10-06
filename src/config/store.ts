/**
 * Centralized Store Configuration
 * Single source of truth for store details, contact, and WhatsApp ordering.
 */

export interface StoreConfig {
  name: string;
  tagline: string;
  eyebrow: string;
  description: string;
  /**
   * International format without +, spaces, brackets, or dashes.
   * e.g., '919876543210'
   */
  whatsappNumber: string;
  email: string;
  phoneDisplay: string;
  address: string;
  workingHours: string;
  currency: {
    symbol: string;
    code: string;
  };
  social: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  google: {
    mapsUrl: string;
    businessProfileUrl: string;
  };
  trustMetrics: {
    parentsCount: string;
    rating: string;
    satisfaction: string;
  };
}

export const storeConfig: StoreConfig = {
  name: "Good Luck Diaper",
  tagline: "Your Trusted Baby & Adult Care Store",
  eyebrow: "GENUINE PRODUCTS",
  description: "Your trusted destination for Baby Diapers, Adult Diapers, Sanitary Pads, and Baby Care Products. We stock trusted brands in all sizes with competitive prices and excellent customer service.",
  // Central WhatsApp configuration (pure digits, international format)
  whatsappNumber: "919876543210",
  email: "care@goodluckdiaper.com",
  phoneDisplay: "+91 82008 27844",
  address: "shop no 4, good luck diaper, Chhajed brothers landmark, Thobha Sheri Vrindavan Park, Navsari Bazar Rd, Surat, Gujarat 395002",
  workingHours: "Mon - Sat: 10:30 AM - 11:00 PM (IST)",
  currency: {
    symbol: "₹",
    code: "INR",
  },
  social: {
    instagram: "https://instagram.com/goodluckdiaper",
    facebook: "https://facebook.com/goodluckdiaper",
    whatsapp: "https://wa.me/919876543210",
  },
  google: {
    mapsUrl: "https://maps.app.goo.gl/Rsd2ZQ7wcqcVvFAg9",
    businessProfileUrl: "https://share.google/PZkttGW71IYeu9a2f",
  },
  trustMetrics: {
    parentsCount: "5k+",
    rating: "4.8/5",
    satisfaction: "98%",
  },
};
