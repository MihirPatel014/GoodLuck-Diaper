import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductBySlug, getProductsByCategory, Product } from '../../lib/products';
import { ProductPrice } from './ProductPrice';
import { WhatsAppProductButton } from '../whatsapp/WhatsAppProductButton';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';
import { ProductCard } from './ProductCard';
import { storeConfig } from '../../config/store';
import { LazyProductImage } from '../ui/LazyProductImage';
import { ImageModal } from '../ui/ImageModal';
import {
  ShieldCheck,
  Heart,
  Truck,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  HelpCircle
} from 'lucide-react';

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product: Product | undefined = slug ? getProductBySlug(slug) : undefined;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Update SEO document title and scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      document.title = `${product.name} | ${storeConfig.name}`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', product.description);
      }
    } else {
      document.title = `Product Not Found | ${storeConfig.name}`;
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#00A86B] mx-auto flex items-center justify-center mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
          <p className="text-slate-600 mb-6">
          We couldn't find the product you're looking for. It may have been relocated or updated.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#00A86B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#00935D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop Catalog
        </Link>
      </div>
    );
  }

  // Related products from the same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <>
      <div className="min-h-screen bg-[#FAFCFA] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500">
            <li>
              <Link to="/" className="hover:text-[#00A86B] transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <li>
              <Link to="/shop" className="hover:text-[#00A86B] transition-colors">
                Shop
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <li>
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="hover:text-[#00A86B] transition-colors"
              >
                {product.category}
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <li className="text-slate-900 font-semibold truncate max-w-50 sm:max-w-xs">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="bg-white rounded-3xl border border-slate-100/90 shadow-sm p-6 sm:p-8 lg:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Product Imagery */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] w-full bg-[#F4F9F6] rounded-2xl overflow-hidden border border-emerald-50 flex items-center justify-center p-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  aria-label={`View ${product?.name} full size`}
                >
                  <LazyProductImage 
                    product={product!} 
                    priority 
                    alt={product?.name}
                    className="w-full h-full"
                    imgClassName="object-contain transition-transform duration-500 hover:scale-105"
                    ref={imageRef}
                  />
                </button>

                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-[#00A86B] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {product.category}
                  </span>
                  {discountPercent && (
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                  100% Authentic & Safe
                </div>
              </div>

              {/* Volume / Size indicator */}
              {product.volume && (
                <div className="mt-4 flex items-center justify-between px-4 py-2.5 bg-slate-50 rounded-xl text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Net Volume / Specification:</span>
                  <span className="font-mono text-slate-700 font-medium">{product.volume}</span>
                </div>
              )}
            </div>

            {/* Right Column: Contiguous Purchase / WhatsApp Module */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="mb-2">
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#00A86B]">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {product.rating || '4.9'}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500">
                  {product.reviewsCount || '120'} Verified Parent Reviews
                </span>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-[#F0FBF5] border border-emerald-100/80 mb-6 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                    Store Price
                  </span>
                  <ProductPrice
                    price={product.price}
                    originalPrice={product.originalPrice}
                    size="lg"
                  />
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-white px-3 py-1 rounded-full shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00A86B]" />
                    In Stock & Ready to Dispatch
                  </span>
                </div>
              </div>

              {/* Short & Full Description */}
              <div className="space-y-3 mb-6 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p className="font-medium text-slate-800">{product.description}</p>
                <p className="text-slate-600 text-sm">{product.fullDescription}</p>
              </div>

              {/* Highlights List */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="mb-8">
                   <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3">
                     Product Highlights:
                   </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00A86B] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PRIMARY WHATSAPP ACTION BUTTON */}
              <div className="p-5 rounded-2xl bg-white border-2 border-[#00A86B]/20 shadow-md shadow-emerald-500/5 mb-6">
                <div className="flex items-center justify-between mb-3 text-xs text-slate-600">
                  <span className="font-medium">Direct WhatsApp Checkout & Enquiry:</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    Instant Response
                  </span>
                </div>

                {/* THE MANDATORY REUSABLE WHATSAPP BUTTON */}
                <WhatsAppProductButton
                  product={product}
                  variant="primary"
                  size="lg"
                  label="Order / Enquire on WhatsApp"
                  className="w-full text-base font-bold shadow-md shadow-emerald-600/25 py-4"
                />

                <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00A86B]" />
                   Chat directly with our product specialist on WhatsApp.
                </p>
              </div>

              {/* Reassuring Order Steps */}
              <div className="bg-[#F8FAF9] rounded-2xl p-4 border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                  How Ordering Works:
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="block font-bold text-[#00A86B] mb-0.5">1. Tap Button</span>
                    <span className="text-slate-500 text-[11px]">Opens WhatsApp with product details</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="block font-bold text-[#00A86B] mb-0.5">2. Send Message</span>
                    <span className="text-slate-500 text-[11px]">Pre-filled text sends to our store</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <span className="block font-bold text-[#00A86B] mb-0.5">3. Done!</span>
                    <span className="text-slate-500 text-[11px]">We confirm address & dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A86B]">
                  More from {product.category}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                  You May Also Love
                </h2>
              </div>
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs sm:text-sm font-semibold text-[#00A86B] hover:text-[#00935D] inline-flex items-center gap-1"
              >
                View all in category &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        triggerRef={imageRef}
      />
    </>
  );
}
