import { formatPrice } from '../../lib/products';

export interface ProductPriceProps {
  price: number;
  originalPrice?: number | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProductPrice({
  price,
  originalPrice,
  size = 'md',
  className = '',
}: ProductPriceProps) {
  const currentSizeClass = {
    sm: 'text-sm font-semibold text-slate-900',
    md: 'text-base sm:text-lg font-bold text-slate-900',
    lg: 'text-2xl sm:text-3xl font-extrabold text-[#00A86B]',
  }[size];

  const originalSizeClass = {
    sm: 'text-xs',
    md: 'text-xs sm:text-sm',
    lg: 'text-base',
  }[size];

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={`flex items-baseline gap-2 tabular-nums ${className}`}>
      {hasDiscount && (
        <span className={`text-slate-400 line-through ${originalSizeClass}`}>
          {formatPrice(originalPrice)}
        </span>
      )}
      <span className={currentSizeClass}>{formatPrice(price)}</span>
    </div>
  );
}
