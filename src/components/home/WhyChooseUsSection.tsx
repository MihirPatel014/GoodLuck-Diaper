import { storeConfig } from '../../config/store';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';
import { Badge } from '../ui/Badge';
import { ShieldCheck, HeartHandshake, Leaf, MessageCircleHeart, Award, CheckCircle } from 'lucide-react';

export function WhyChooseUsSection() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Genuine Products Guaranteed',
      description: 'We stock only authentic products from trusted brands. No counterfeit items, no compromises on quality.',
    },
    {
      icon: Award,
      title: 'Competitive Prices',
      description: 'Best market prices on all baby diapers, adult diapers, sanitary pads, and baby care essentials.',
    },
    {
      icon: MessageCircleHeart,
      title: 'Easy WhatsApp Ordering',
      description: 'No complicated signups or passwords. Tap one button to chat with our helpful team for orders and enquiries.',
    },
    {
      icon: HeartHandshake,
      title: 'Excellent Customer Service',
      description: 'Dedicated support for bulk orders, size queries, and delivery tracking. Your satisfaction is our priority.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#f1f5f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="green" className="mb-3">
            WHY CHOOSE US
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Why Parents Choose {storeConfig.name}
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          Straightforward shopping, familiar brands and helpful answers when you need them.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-transparent rounded-none p-6 border-t border-slate-300 flex flex-col justify-between transition-colors duration-300 hover:border-[#176a52]"
              >
                <div>
                  <div className="w-10 h-10 rounded-none bg-white text-[#176a52] flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-1.5 text-xs text-[#176a52] font-semibold">
                  <CheckCircle className="w-4 h-4" />
                   <span>Here when you need us</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassuring CTA Banner */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#00A86B] flex items-center justify-center shrink-0 hidden sm:flex">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                 Have a question about products or sizing?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Our team is ready on WhatsApp to assist with personalized recommendations.
              </p>
            </div>
          </div>

          <WhatsAppButton
            variant="primary"
            size="md"
             message="Hello! I would like some advice on choosing the right products."
            className="w-full sm:w-auto font-bold text-xs sm:text-sm"
          >
            Chat with Baby Care Expert
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
