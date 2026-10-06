import { useState, useEffect } from 'react';
import { storeConfig } from '../config/store';
import { WhatsAppButton } from '../components/whatsapp/WhatsAppButton';
import { Badge } from '../components/ui/Badge';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqPage() {
  const faqs: FaqItem[] = [
    {
      question: 'How do I place an order on Good Luck Diaper?',
      answer:
        'Ordering is simple and personal! When you view any product on our store, click the green "Order on WhatsApp" button. This automatically opens WhatsApp with a pre-filled message detailing the product name, price, and direct link. You simply hit send, and our store specialist will confirm current availability, shipping destination, and delivery options with you immediately.',
    },
    {
      question: 'Why does Good Luck Diaper use WhatsApp instead of an automated cart & payment checkout?',
      answer:
        'As parents ourselves, we believe baby care requires genuine care and guidance. When you message us on WhatsApp, you get direct communication with a knowledgeable baby care specialist who can answer questions about ingredients, infant skin suitability, and batch dates. No confusing automated checkouts or lost account logins.',
    },
    {
      question: 'How is payment processed?',
      answer:
        'Once you send the WhatsApp order message and confirm your delivery address, our team will provide secure direct payment options (such as UPI, Net Banking, Card link, or Cash on Delivery depending on your region). You never have to save your sensitive credit card info on a website.',
    },
    {
      question: 'Are your products genuine and of good quality?',
      answer:
        'Yes! We stock only genuine products from trusted brands. Every item is carefully selected to ensure quality, comfort, and value for money. We stand behind every product we sell.',
    },
    {
      question: 'What are the delivery and shipping timelines?',
      answer:
        'Orders confirmed before 2:00 PM are dispatched on the same business day. Delivery usually takes 2–4 business days depending on your location. Our team will provide live tracking links directly inside your WhatsApp chat.',
    },
    {
      question: 'Can I enquire about multiple products at once?',
      answer:
        'Absolutely! You can click "Order on WhatsApp" on multiple items, or simply message us in the same chat saying: "I would also like to add the Baby Healing Balm and Pure Water Wipes". We will compile your complete order and calculate any bundle savings.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<string | null>(faqs[0]?.question || null);

  useEffect(() => {
    document.title = `FAQ & WhatsApp Ordering | ${storeConfig.name}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFCFA] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="green" className="mb-3">
            HELP & ASSISTANCE
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
             Everything you need to know about our baby care range and how WhatsApp ordering works.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 mb-16">
          {faqs.map((faq) => {
            const isOpen = openIndex === faq.question;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-colors transition-shadow shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : faq.question)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#00A86B] transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#00A86B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Direct Help Banner */}
        <div className="bg-[#EBFBF3] rounded-3xl p-8 border border-emerald-100 text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#00A86B] mx-auto mb-4 shadow-xs">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Have a question not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
             We are always happy to chat directly and provide tailored advice for your needs.
          </p>
          <WhatsAppButton
            variant="primary"
            size="md"
             message="Hello Good Luck Diaper! I have a question that isn't in your FAQ."
            className="font-bold text-xs sm:text-sm"
          >
            Ask Us on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
