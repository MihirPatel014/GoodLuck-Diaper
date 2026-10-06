import { Link } from 'react-router-dom';
import { storeConfig } from '../config/store';
import { Home, Search, MessageCircle } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center">
          <Search className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-700 mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#00A86B] hover:bg-[#00935D] text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border-2 border-[#00A86B] text-[#00A86B] hover:bg-[#00A86B] hover:text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse Products
          </Link>
          <a
            href={`https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent('Hello! I couldn\'t find what I was looking for on your website.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}