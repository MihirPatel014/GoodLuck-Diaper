import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { storeConfig } from '../../config/store';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';
import { Search, Menu, X } from 'lucide-react';

export interface HeaderProps {
  onOpenSearch?: () => void;
}

export function Header({ onOpenSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcfcf9]/95 backdrop-blur-md border-b border-[#e5e9e3] transition-colors transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          <Link to="/" className="group flex flex-col text-decoration-none">
            <span className="text-[10px] uppercase tracking-[.18em] text-slate-500">Family care &amp; essentials</span>
            <span className="text-lg sm:text-xl font-bold tracking-[-.045em] text-slate-900 group-hover:text-[#176a52] transition-colors">{storeConfig.name}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors duration-150 ${
                    isActive
                    ? 'text-[#176a52]'
                      : 'text-slate-600 hover:text-[#176a52]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Zone: Search + WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick search input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <label htmlFor="header-search" className="sr-only">Search products</label>
              <input
                id="header-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-44 lg:w-56 pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-none focus:outline-none focus:ring-2 focus:ring-[#176a52] text-slate-800 placeholder-slate-400 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </form>

            {/* Direct WhatsApp Consultation CTA */}
            <WhatsAppButton
              variant="primary"
              size="sm"
               message="Hello Good Luck Diaper! I would like to enquire about your baby care products."
              className="text-xs font-bold"
            >
              WhatsApp Us
            </WhatsAppButton>
          </div>

          {/* Mobile Menu & Search Icon Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (onOpenSearch) onOpenSearch();
                else navigate('/shop');
              }}
              className="p-2 text-slate-600 hover:text-[#176a52]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

{/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <label htmlFor="mobile-search" className="sr-only">Search products</label>
            <input
              id="mobile-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </form>

          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#00A86B] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <WhatsAppButton
              variant="primary"
              size="md"
               message="Hello Good Luck Diaper! I would like to order or ask a question."
              className="w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Order / Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      )}
    </header>
  );
}
