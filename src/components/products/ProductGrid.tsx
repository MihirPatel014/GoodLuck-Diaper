import { Product } from '../../lib/products';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';

export interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: '2' | '3' | '4';
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  className = '',
  columns = '3',
  emptyMessage = 'No products found matching your criteria.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-100">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
          <PackageOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">No Products Found</h3>
        <p className="text-sm text-slate-500 max-w-sm">{emptyMessage}</p>
      </div>
    );
  }

  const columnClasses = {
    '2': 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6',
    '3': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
    '4': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
  }[columns];

  return (
    <div className={`${columnClasses} ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
