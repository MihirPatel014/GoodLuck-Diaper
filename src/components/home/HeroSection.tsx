import { Link } from 'react-router-dom';
import { storeConfig } from '../../config/store';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="hero-shell">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow"><span /> {storeConfig.eyebrow}</p>
          <h1>Good care for<br /><span>every little day.</span></h1>
          <p className="hero-description">Thoughtful essentials for babies, families and everyday care. Find trusted products, clear prices and a real person to help you choose.</p>
          <div className="hero-actions">
            <Link to="/shop" className="button-primary">Browse the shop <ArrowRight aria-hidden="true" size={17} /></Link>
            <WhatsAppButton variant="outline-dark" size="md" message="Hello Good Luck Diaper! I'd like to ask a few questions before ordering." className="hero-whatsapp">Talk with us</WhatsAppButton>
          </div>
          <div className="hero-note"><span>01</span><p>Baby care, diapers &amp; daily essentials<br />Chosen with families in mind</p></div>
        </div>
        <div className="hero-image-wrap">
          <img src="/src/assets/images/hero_baby_blanket_1791210623946.jpg" alt="A baby resting comfortably in a soft blue blanket" />
          <div className="hero-image-caption"><span>CARE, MADE A LITTLE SIMPLER</span><span>GOOD LUCK DIAPER&nbsp; / &nbsp;EST. FOR FAMILIES</span></div>
          <div className="hero-image-index">01 <span>—</span> 03</div>
        </div>
      </div>
    </section>
  );
}
