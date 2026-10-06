import React from 'react';
import { createWhatsAppGeneralUrl } from '../../lib/whatsapp';

export type WhatsAppButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-dark' | 'compact' | 'pill' | 'dark';
export type WhatsAppButtonSize = 'sm' | 'md' | 'lg';

export interface WhatsAppButtonProps {
  message?: string;
  href?: string;
  variant?: WhatsAppButtonVariant;
  size?: WhatsAppButtonSize;
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
}

/**
 * Standard SVG representation of the WhatsApp icon.
 */
export function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.68 7.5 8.46 7.74C8.23 7.97 7.6 8.56 7.6 9.76C7.6 10.96 8.48 12.12 8.6 12.28C8.73 12.44 10.3 14.86 12.72 15.91C14.73 16.78 15.14 16.61 15.58 16.57C16.03 16.53 17.02 15.98 17.22 15.42C17.43 14.86 17.43 14.38 17.37 14.28C17.3 14.18 17.15 14.12 16.92 14.01C16.7 13.89 15.6 13.35 15.4 13.27C15.19 13.2 15.04 13.16 14.89 13.39C14.74 13.61 14.31 14.12 14.18 14.28C14.05 14.43 13.92 14.45 13.69 14.34C13.47 14.23 12.74 13.99 11.87 13.22C11.19 12.61 10.73 11.86 10.6 11.64C10.47 11.41 10.59 11.3 10.7 11.18C10.8 11.08 10.92 10.92 11.04 10.78C11.16 10.64 11.2 10.53 11.28 10.37C11.36 10.21 11.32 10.07 11.26 9.96C11.2 9.85 10.74 8.73 10.55 8.27C10.37 7.82 10.18 7.88 10.04 7.87C9.91 7.87 9.76 7.86 9.61 7.86C9.46 7.86 9.27 7.91 9.11 7.44Z" />
    </svg>
  );
}

export function WhatsAppButton({
  message,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  showIcon = true,
  onClick,
  ariaLabel = 'Contact on WhatsApp',
}: WhatsAppButtonProps) {
  // If specific href is given, use it. Otherwise compute general url from message.
  const targetUrl = href || createWhatsAppGeneralUrl(message);

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors transition-shadow transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-[0.98] select-none';

  const sizeStyles: Record<WhatsAppButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-full',
    md: 'text-sm px-4 py-2.5 gap-2 rounded-full',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-full shadow-sm',
  };

  const iconSizes: Record<WhatsAppButtonSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  const variantStyles: Record<WhatsAppButtonVariant, string> = {
    primary:
      'bg-[#00A86B] hover:bg-[#00935D] text-white shadow-sm hover:shadow-md hover:shadow-emerald-500/20',
    secondary:
      'bg-[#00A86B] hover:bg-[#00935D] text-white border border-emerald-200/80',
    outline:
      'bg-transparent border-2 border-[#00A86B] text-white hover:bg-[#00A86B] hover:text-white',
    'outline-dark':
      'bg-transparent border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white',
    compact:
      'bg-[#00A86B] hover:bg-[#00935D] text-white p-2.5 rounded-full shadow-sm',
    pill:
      'bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold',
    dark:
      'bg-slate-900 hover:bg-slate-800 text-white shadow-sm',
  };

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {showIcon && <WhatsAppIcon className={iconSizes[size]} />}
      {children && <span className="whitespace-nowrap">{children}</span>}
    </a>
  );
}
