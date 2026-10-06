import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsByCategory } from '../../lib/products';
import { CategorySidebar } from '../categories/CategorySidebar';
import { CategoryFilter } from '../categories/CategoryFilter';
import { ProductCard } from '../products/ProductCard';
import { Badge } from '../ui/Badge';
import { ArrowRight } from 'lucide-react';

export function CategorySection() {
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts = getProductsByCategory(activeCategory);
  // Show top 6 items in this section, just like the 2x3 grid in the screenshot!
  const displayedProducts = filteredProducts.slice(0, 6);

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Heading + Category Sidebar */}
          <div className="lg:col-span-3 flex flex-col">
            <Badge variant="green" className="mb-3 self-start">THE EVERYDAY EDIT</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">Find what<br />you need.</h2>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-600">Browse by category or ask us for help finding a size or product.</p>

            {/* Desktop Vertical Sidebar */}
            <div className="hidden lg:block">
              <CategorySidebar
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>
          </div>

          {/* Right Column: Product Grid */}
          <div className="lg:col-span-9 flex flex-col">
            {/* Mobile Category Horizontal Filter */}
            <div className="lg:hidden mb-6">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>

            {/* Product Cards 3-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Center Button: "View All Products >" (Matches screenshot) */}
            <div className="mt-10 flex justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#00A86B] hover:bg-[#00935D] text-white text-sm font-bold px-7 py-3 rounded-full shadow-sm hover:shadow-md transition-colors transition-shadow duration-200"
              >
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
