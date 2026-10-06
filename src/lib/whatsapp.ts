import { storeConfig } from '../config/store';
import { Product, formatPrice } from './products';

/**
 * Returns a clean canonical URL for a product, taking window.location.origin or fallback.
 */
export function getProductShareUrl(slug: string): string {
  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    return `${origin}/shop/${slug}`;
  }
  return `https://goodluckdiaper.com/shop/${slug}`;
}

/**
 * Formats a clean, professional WhatsApp enquiry message for a specific product.
 * Omits undefined or null fields.
 */
export function createWhatsAppProductMessage(product: Product, productUrl?: string): string {
  const url = productUrl || getProductShareUrl(product.slug);
  const formattedPrice = formatPrice(product.price);

  const lines = [
    'Hello! I am interested in this product from Good Luck Diaper:\n',
    `Product: ${product.name}`,
    `Price: ${formattedPrice}`,
  ];

  if (product.originalPrice && product.originalPrice > product.price) {
    lines.push(`(Original Price: ${formatPrice(product.originalPrice)})`);
  }

  if (product.volume) {
    lines.push(`Size/Variant: ${product.volume}`);
  }

  if (product.description) {
    lines.push(`\nDescription:\n${product.description.trim()}`);
  }

  lines.push(`\nProduct Link:\n${url}`);
  lines.push('\nPlease share availability and ordering details. Thank you!');

  return lines.join('\n');
}

/**
 * Constructs the direct wa.me link with encoded pre-filled text for a product.
 */
export function createWhatsAppProductUrl(product: Product, productUrl?: string): string {
  const message = createWhatsAppProductMessage(product, productUrl);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
}

/**
 * Constructs a general enquiry WhatsApp URL (e.g. for general support or questions).
 */
export function createWhatsAppGeneralUrl(customMessage?: string): string {
  const message =
    customMessage ||
    `Hello Good Luck Diaper team! I would like to enquire about your baby care products and ordering assistance.`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
}
