import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories, Product } from '../lib/products';
import { ProductCard } from '../components/products/ProductCard';
import { CategoryFilter } from '../components/categories/CategoryFilter';
import { WhatsAppButton } from '../components/whatsapp/WhatsAppButton';
import { storeConfig } from '../config/store';
import { Search, SlidersHorizontal, X, Sparkles, MessageCircle } from 'lucide-react';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);

  // Sync state with URL params
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  useEffect(() => {
    document.title = `Shop | ${storeConfig.name}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Update URL params when category or search changes
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (!query) {
      params.delete('q');
    } else {
      params.set('q', query);
    }
    setSearchParams(params);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchTags = p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        return matchName || matchDesc || matchCategory || matchTags;
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [allProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAFCFA] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00A86B] block mb-1">
            Our Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            All Products
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl">
            Browse our complete collection of baby diapers, adult diapers, sanitary pads, wipes, and baby care essentials.
          </p>
        </div>

        {/* Controls Bar: Search + Category Filter + Sort */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="shop-search" className="sr-only">Search products by name, category, or brand</label>
              <input
                id="shop-search"
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products by name, category, or brand..."
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <label htmlFor="sortSelect" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Horizontal Category Selector */}
          <div className="pt-2 border-t border-slate-100">
            <CategoryFilter
              categories={categories}
              activeCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          </div>
        </div>

        {/* Results Counter & Active Filter Pills */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </span>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                handleCategorySelect('All');
                handleSearchChange('');
              }}
              className="text-[#00A86B] hover:underline font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 max-w-lg mx-auto my-12">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-[#00A86B] mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No matching products found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              We couldn't find anything matching "{searchQuery}". Try searching another keyword or clear filters.
            </p>
            <button
              type="button"
              onClick={() => {
                handleCategorySelect('All');
                handleSearchChange('');
              }}
              className="bg-[#00A86B] hover:bg-[#00935D] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Bottom Direct WhatsApp Help Banner */}
        <div className="mt-16 bg-[#E8FBF1] rounded-3xl p-6 sm:p-8 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
               Can't find a specific diaper or item?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
               Message our store directly on WhatsApp. We can check inventory or source special requests.
            </p>
          </div>

          <WhatsAppButton
            variant="primary"
            size="md"
             message="Hello! I am browsing your shop and looking for a specific product."
            className="font-bold text-xs sm:text-sm whitespace-nowrap"
          >
            Ask Us on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
