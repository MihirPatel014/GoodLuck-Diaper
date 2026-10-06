import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../../lib/products';
import { ProductCard } from '../products/ProductCard';
import { Badge } from '../ui/Badge';
import { ArrowRight } from 'lucide-react';

export function FeaturedProductsSection() {
  const featured = getFeaturedProducts();
  const displayed = featured.slice(0, 3);

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row with Title and "All Products ->" button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
             <Badge variant="green" className="mb-3">
              A FEW FAMILY FAVOURITES
            </Badge>
             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
               Small comforts,<br /> everyday essentials.
             </h2>
             <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md">
               Browse a few essentials from the shop. Need a different size? Just ask us.
             </p>
          </div>

          <div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 border border-slate-300 hover:border-[#176a52] hover:text-[#176a52] text-slate-800 text-xs sm:text-sm font-semibold px-5 py-2.5 transition-colors"
            >
              <span>All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Featured Products in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
