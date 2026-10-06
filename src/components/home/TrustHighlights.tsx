import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, MessageCircle, PackageCheck } from 'lucide-react';

const points = [
  { icon: BadgeCheck, number: '01', title: 'Products you can trust', text: 'Genuine products from familiar, trusted brands.' },
  { icon: MessageCircle, number: '02', title: 'A real person to ask', text: 'Get help with sizes, availability and choosing.' },
  { icon: PackageCheck, number: '03', title: 'Simple WhatsApp orders', text: 'Ask a question or place an order in a quick chat.' },
];

export function TrustHighlights() {
  return (
    <section className="trust-strip" aria-label="How we make shopping easier">
      <div className="trust-inner">
        {points.map(({ icon: Icon, number, title, text }) => (
          <div className="trust-item" key={number}>
            <span className="trust-number">{number}</span>
            <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
            <div><h2>{title}</h2><p>{text}</p></div>
          </div>
        ))}
        <Link to="/faq" className="trust-link">How ordering works <ArrowRight aria-hidden="true" size={16} /></Link>
      </div>
    </section>
  );
}
