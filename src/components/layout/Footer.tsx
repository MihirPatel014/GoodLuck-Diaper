import { Link } from 'react-router-dom';
import { storeConfig } from '../../config/store';
import { getCategories } from '../../lib/products';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';
import { Mail, Phone, MapPin, Clock, Heart, Shield, Code } from 'lucide-react';

export function Footer() {
  const categories = getCategories();

  return (
    <footer className="bg-white border-t border-slate-100 text-slate-600 pt-5 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-100">
          {/* Brand & Store Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-[#E8FBF1] flex items-center justify-center text-[#00A86B] border border-emerald-100">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 10h.01" />
                  <path d="M15 10h.01" />
                  <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
                  <path d="M12 3a2 2 0 0 1 2 2" />
                  <path d="M4 11a2 2 0 0 1-2-2" />
                  <path d="M20 11a2 2 0 0 0 2-2" />
                </svg>
              </div>
               <div className="flex items-baseline">
                 <span className="text-xl font-extrabold text-slate-900 tracking-tight">Good Luck</span>
                 <span className="text-xl font-extrabold text-[#00A86B] tracking-tight ml-0.5">Diaper</span>
               </div>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              {storeConfig.description}
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">
                Order via WhatsApp:
              </span>
              <WhatsAppButton
                variant="primary"
                size="sm"
                message="Hello Good Luck Diaper! I have an enquiry about your products."
              >
                Chat on WhatsApp (+{storeConfig.whatsappNumber})
              </WhatsAppButton>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="hover:text-[#00A86B] transition-colors">
                  All Products
                </Link>
              </li>
              {categories.slice(0, 5).map((category) => (
                <li key={category}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(category)}`}
                    className="hover:text-[#00A86B] transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Information
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#00A86B] transition-colors">
                  About Our Store
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#00A86B] transition-colors">
                  FAQ & Ordering Guide
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
                    'Hello! I would like to know your delivery policies.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00A86B] transition-colors"
                >
                  Delivery Enquiries
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  <Shield className="w-3 h-3" /> Safe & Verified
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-500">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#00A86B] shrink-0 mt-0.5" />
                <span>{storeConfig.workingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00A86B] shrink-0" />
                <a
                  href={`mailto:${storeConfig.email}`}
                  className="hover:text-[#00A86B] transition-colors"
                >
                  {storeConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00A86B] shrink-0" />
                <a
                  href={`tel:${storeConfig.phoneDisplay.replace(/\s+/g, '')}`}
                  className="hover:text-[#00A86B] transition-colors"
                >
                  {storeConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00A86B] shrink-0 mt-0.5" />
                <a
                  href={storeConfig.google.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00A86B] transition-colors"
                >
                  {storeConfig.address}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & WhatsApp Ordering Notice */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} <a href={storeConfig.google.businessProfileUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#00A86B] transition-colors">{storeConfig.name}</a>. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-500">
             Carefully curated with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for happy families.
          </p>
          <p className="text-[11px] text-slate-400">
            Direct WhatsApp Storefront. No hidden payment gateways.
          </p>
          <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors">
            <a
              href="https://www.mihirbuilds.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-medium"
              aria-label="Built by mihirbuilds"
            >
              <img
                src="https://www.mihirbuilds.com/apple-touch-icon.png"
                alt="mihirbuilds logo"
                className="w-20 h-20 rounded-full"
              />
              <span>Made by mihirbuilds</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
