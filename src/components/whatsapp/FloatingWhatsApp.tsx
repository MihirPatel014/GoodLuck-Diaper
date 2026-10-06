import { useState } from 'react';
import { storeConfig } from '../../config/store';
import { createWhatsAppGeneralUrl } from '../../lib/whatsapp';
import { WhatsAppIcon } from './WhatsAppButton';
import { X, MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const [tooltipOpen, setTooltipOpen] = useState(true);

  const whatsappUrl = createWhatsAppGeneralUrl(
     'Hello Good Luck Diaper! I have an enquiry about your products.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Subtle Tooltip */}
      {tooltipOpen && (
        <div className="mb-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
          <span className="font-medium">Need help? Chat with us on WhatsApp!</span>
          <button
            type="button"
            onClick={() => setTooltipOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Good Luck Diaper on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#00A86B] hover:bg-[#00935D] text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 transition-colors transition-transform duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        <WhatsAppIcon className="w-7 h-7 transition-transform group-hover:rotate-6" />
      </a>
    </div>
  );
}
