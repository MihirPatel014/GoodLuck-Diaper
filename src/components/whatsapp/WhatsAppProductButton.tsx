import React from 'react';
import { Product } from '../../lib/products';
import { createWhatsAppProductUrl } from '../../lib/whatsapp';
import { WhatsAppButton, WhatsAppButtonVariant, WhatsAppButtonSize } from './WhatsAppButton';

export interface WhatsAppProductButtonProps {
  product: Product;
  productUrl?: string;
  variant?: WhatsAppButtonVariant;
  size?: WhatsAppButtonSize;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * Reusable Product WhatsApp Button
 * Builds pre-filled product order enquiry message, encodes URL, and opens WhatsApp.
 */
export function WhatsAppProductButton({
  product,
  productUrl,
  variant = 'primary',
  size = 'md',
  label = 'Order on WhatsApp',
  className = '',
  showIcon = true,
}: WhatsAppProductButtonProps) {
  // Generate the pre-filled WhatsApp URL using the centralized whatsapp helper
  const whatsappUrl = createWhatsAppProductUrl(product, productUrl);

  return (
    <WhatsAppButton
      href={whatsappUrl}
      variant={variant}
      size={size}
      className={className}
      showIcon={showIcon}
      ariaLabel={`Order or enquire about ${product.name} on WhatsApp`}
    >
      {label}
    </WhatsAppButton>
  );
}
