import { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustHighlights } from '../components/home/TrustHighlights';
import { CategorySection } from '../components/home/CategorySection';
import { AboutStoreSection } from '../components/home/AboutStoreSection';
import { FeaturedProductsSection } from '../components/home/FeaturedProductsSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { storeConfig } from '../config/store';

export function HomePage() {
  useEffect(() => {
    document.title = `${storeConfig.name} – ${storeConfig.tagline}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrustHighlights />
      <CategorySection />
      <AboutStoreSection />
      <FeaturedProductsSection />
      <WhyChooseUsSection />
    </div>
  );
}
