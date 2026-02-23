import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { Cart } from '@/components/Cart';
import { FloatingMorphElement } from '@/components/FloatingMorphElement';
import { HeroSection } from '@/sections/HeroSection';
import { WeddingCategorySection } from '@/sections/WeddingCategorySection';
import { WeddingGallerySection } from '@/sections/WeddingGallerySection';
import { EveningCategorySection } from '@/sections/EveningCategorySection';
import { EveningGallerySection } from '@/sections/EveningGallerySection';
import { ChildrenCategorySection } from '@/sections/ChildrenCategorySection';
import { ChildrenGallerySection } from '@/sections/ChildrenGallerySection';
import { ProcessSection } from '@/sections/ProcessSection';
import { ContactSection } from '@/sections/ContactSection';
import './i18n';

gsap.registerPlugin(ScrollTrigger);

interface PinnedRange {
  start: number;
  end: number;
  center: number;
}

function App() {
  const { i18n } = useTranslation();
  const [currentSection, setCurrentSection] = useState(0);
  const isRTL = i18n.language === 'ar';

  // Update RTL when language changes
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Track current section
  useEffect(() => {
    const sections = ['hero', 'wedding-cat', 'wedding-gallery', 'evening-cat', 'evening-gallery', 'children-cat', 'children-gallery', 'process', 'contact'];
    
    sections.forEach((id, index) => {
      const section = document.getElementById(id);
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setCurrentSection(index),
          onEnterBack: () => setCurrentSection(index),
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Set up global snap for pinned sections
  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st: ScrollTrigger) => st.vars.pin)
        .sort((a: ScrollTrigger, b: ScrollTrigger) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges: PinnedRange[] = pinned.map((st: ScrollTrigger) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r: PinnedRange) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest: number, r: PinnedRange) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <CartProvider>
      <div className={`relative ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* Floating Morphing Element */}
        <FloatingMorphElement currentSection={currentSection} />

        {/* Header */}
        <Header />

        {/* Cart Slide-out */}
        <Cart />

        {/* Main Content */}
        <main className="relative">
          <HeroSection />
          <WeddingCategorySection />
          <WeddingGallerySection />
          <EveningCategorySection />
          <EveningGallerySection />
          <ChildrenCategorySection />
          <ChildrenGallerySection />
          <ProcessSection />
          <ContactSection />
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
