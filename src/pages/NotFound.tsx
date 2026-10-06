import { Link } from 'react-router-dom';
import { storeConfig } from '../config/store';
import { Home, Search, MessageCircle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 sm:py-20">
      <div className="text-center max-w-lg w-full">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-50 flex items-center justify-center">
          <Search className="w-12 h-12 text-emerald-400" />
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 mb-3 leading-none">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-6">Page Not Found</h2>
        <p className="text-slate-500 mb-10 leading-relaxed text-base sm:text-lg max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#00A86B] hover:bg-[#00935D] text-white px-8 py-4 rounded-full font-semibold transition-colors text-base"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border-2 border-[#00A86B] text-[#00A86B] hover:bg-[#00A86B] hover:text-white px-8 py-4 rounded-full font-semibold transition-colors text-base"
          >
            <Search className="w-5 h-5" />
            Browse Products
          </Link>
          <a
            href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Hello! I couldn\'t find what I was looking for on your website.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold transition-colors text-base"
          >
            <MessageCircle className="w-5 h-5" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}