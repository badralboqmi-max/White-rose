import { useEffect, useState, useRef, useCallback } from 'react';
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

const sections = [
  'hero',
  'wedding-cat',
  'wedding-gallery',
  'evening-cat',
  'evening-gallery',
  'children-cat',
  'children-gallery',
  'process',
  'contact',
];

function App() {
  const { i18n } = useTranslation();
  const [currentSection, setCurrentSection] = useState(0);
  const [isRTL, setIsRTL] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  // Update RTL when language changes
  useEffect(() => {
    setIsRTL(i18n.language === 'ar');
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Navigate to specific section with drop animation
  const navigateToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length) return;
    if (isScrolling.current) return;
    
    const now = Date.now();
    if (now - lastScrollTime.current < 400) return; // Debounce
    
    isScrolling.current = true;
    lastScrollTime.current = now;
    
    const targetSection = document.getElementById(sections[index]);
    
    if (targetSection) {
      // Fast drop animation
      gsap.to(window, {
        scrollTo: { y: targetSection, offsetY: 0 },
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          setCurrentSection(index);
          setTimeout(() => {
            isScrolling.current = false;
          }, 100);
        },
      });
    } else {
      isScrolling.current = false;
    }
  }, []);

  // Handle wheel events for page dropping
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTime.current < 400) return;
      if (isScrolling.current) return;
      
      const delta = e.deltaY;
      
      if (Math.abs(delta) < 30) return; // Ignore small scrolls
      
      if (delta > 0) {
        // Scroll down - drop to next page
        navigateToSection(currentSection + 1);
      } else {
        // Scroll up - drop to previous page
        navigateToSection(currentSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, navigateToSection]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 400) return;
      if (isScrolling.current) return;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          navigateToSection(currentSection + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          navigateToSection(currentSection - 1);
          break;
        case 'Home':
          e.preventDefault();
          navigateToSection(0);
          break;
        case 'End':
          e.preventDefault();
          navigateToSection(sections.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, navigateToSection]);

  // Handle touch events for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 400) return;
      if (isScrolling.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - touchEndY;
      
      if (Math.abs(delta) < 50) return; // Ignore small swipes
      
      if (delta > 0) {
        // Swipe up - drop to next page
        navigateToSection(currentSection + 1);
      } else {
        // Swipe down - drop to previous page
        navigateToSection(currentSection - 1);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, navigateToSection]);

  // Track current section on scroll
  useEffect(() => {
    const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean);
    
    sectionElements.forEach((section, index) => {
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

  // Initial scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
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

        {/* Page Navigation Dots */}
        <div className={`fixed top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 ${isRTL ? 'left-6' : 'right-6'}`}>
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSection(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentSection === index
                  ? 'bg-rosewood scale-125'
                  : 'bg-espresso/30 hover:bg-espresso/50'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Content */}
        <main ref={mainRef} className="relative">
          <section id="hero" className="h-screen">
            <HeroSection />
          </section>
          <section id="wedding-cat" className="h-screen">
            <WeddingCategorySection />
          </section>
          <section id="wedding-gallery" className="h-screen">
            <WeddingGallerySection />
          </section>
          <section id="evening-cat" className="h-screen">
            <EveningCategorySection />
          </section>
          <section id="evening-gallery" className="h-screen">
            <EveningGallerySection />
          </section>
          <section id="children-cat" className="h-screen">
            <ChildrenCategorySection />
          </section>
          <section id="children-gallery" className="h-screen">
            <ChildrenGallerySection />
          </section>
          <section id="process" className="min-h-screen">
            <ProcessSection />
          </section>
          <section id="contact" className="min-h-screen">
            <ContactSection />
          </section>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
