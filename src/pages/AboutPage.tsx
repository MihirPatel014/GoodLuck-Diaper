import { useEffect } from 'react';
import { storeConfig } from '../config/store';
import { WhatsAppButton } from '../components/whatsapp/WhatsAppButton';
import { Badge } from '../components/ui/Badge';
import { ShieldCheck, Heart, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';

export function AboutPage() {
  useEffect(() => {
    document.title = `About Us | ${storeConfig.name}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFCFA] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="green" className="mb-3">
            OUR STORY & PROMISE
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Nurturing Every First Smile With Pure Care
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded with love, Good Luck Diaper was created to provide genuine products at competitive prices with excellent customer service. We stock trusted brands in all sizes for baby and adult needs.
          </p>
        </div>

        {/* Story Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-[#E8FBF1]">
            <img
              src="/images/about/about_baby_portrait_1791210823690.jpg"
              alt="Baby smiling happily"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Safety Isn't Just A Label — It's Our Sole Standard.
            </h2>
            <p className="text-sm sm:text-base">
              When our founders welcomed their first child, they were startled by how many mainstream baby products contained hidden artificial fragrances, petroleum fillers, and synthetic stabilizers.
            </p>
            <p className="text-sm sm:text-base">
               We embarked on a journey to curate only genuine, high-quality products from trusted brands. Every item in our catalog is carefully selected for comfort, reliability, and value.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-100">
                <span className="block text-2xl font-black text-[#00A86B] mb-1">5,000+</span>
                <span className="text-xs font-semibold text-slate-500">Happy Customers</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-100">
                <span className="block text-2xl font-black text-[#00A86B] mb-1">100%</span>
                <span className="text-xs font-semibold text-slate-500">Genuine Products</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              To provide safe, high-quality, and eco-friendly baby care products that bring comfort, peace of mind, and joy to parents and their little ones.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              To be the most trusted baby care storefront globally, making early parenthood safer, simpler, and more enjoyable through direct care.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-5">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Values</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Sustainability, Safety, and Genuine Parent-to-Parent Care. We test everything with real families before recommending it to yours.
            </p>
          </div>
        </div>

        {/* WhatsApp Consultation Callout */}
        <div className="bg-gradient-to-r from-[#00A86B] to-[#00875A] rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-lg shadow-emerald-600/20">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Connect With Our Product Consultants
            </h3>
            <p className="mt-2 text-emerald-50 text-sm sm:text-base leading-relaxed">
              Questions about diaper sizing, product availability, or bulk orders? Chat with us anytime on WhatsApp.
            </p>
          </div>

          <WhatsAppButton
            variant="dark"
            size="lg"
             message="Hello! I would love to learn more about Good Luck Diaper's products and services."
            className="whitespace-nowrap font-bold"
          >
            Chat on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
