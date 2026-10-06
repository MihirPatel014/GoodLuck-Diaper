import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { Sparkles, Shield, HeartHandshake } from 'lucide-react';

export function AboutStoreSection() {
  return (
    <section className="py-12 sm:py-20 bg-[#fcfcf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <Badge variant="green" className="mb-3">
            ABOUT US
          </Badge>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Everyday care,<br /> made easier.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Good Luck Diaper brings baby care, family essentials and everyday protection together in one convenient local shop.
          </p>
        </div>

        {/* 3-Column Visual Layout from Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Portrait Baby Photo */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-[#F4F9F6]">
              <img
                src="/src/assets/images/about_baby_portrait_1791210823690.jpg"
                alt="Cheerful baby in ivory sweater"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Middle Column: Mission, Vision, Values, Button */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00A86B]" />
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  The shop
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                Find baby products, diapers and personal care from brands families already know.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00A86B]" />
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  A little help
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                Unsure about size or availability? Our team is easy to reach before you order.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#00A86B]" />
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Ordering
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                Browse the catalogue, then message us on WhatsApp to check details or place your order.
              </p>
            </div>

            <div className="pt-2 pl-6">
              <Link
                to="/about"
                className="inline-flex items-center justify-center bg-[#00A86B] hover:bg-[#00935D] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-sm transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column: Cozy Baby In Fairy Lights Photo */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-[#F4F9F6]">
              <img
                src="/src/assets/images/about_baby_cozy_1791210677344.jpg"
                alt="Baby peacefully resting surrounded by warm fairy lights"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
