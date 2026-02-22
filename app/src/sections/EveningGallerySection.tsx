import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '@/components/ProductCard';
import { eveningProducts } from '@/data/products';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function EveningGallerySection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !cards || !cta) return;

    const ctx = gsap.context(() => {
      // Drop-in animation
      gsap.fromTo(heading,
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(cards.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(cta,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="w-full h-full bg-blush relative overflow-hidden"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Heading */}
        <div
          ref={headingRef}
          className="absolute top-[7vh] left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-label text-mauve mb-2">{t('evening.gallery.label')}</p>
          <h2 className="font-serif text-section text-espresso">
            {t('evening.gallery.title')}
          </h2>
        </div>

        {/* Product Pills */}
        <div
          ref={cardsRef}
          className={`absolute inset-0 flex items-center justify-center px-[7vw] gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {eveningProducts.map((product, index) => (
            <div key={product.id} className="w-[26vw]">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="absolute bottom-[8vh] left-1/2 -translate-x-1/2"
        >
          <button
            onClick={scrollToContact}
            className={`btn-primary inline-flex items-center gap-2 group ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t('evening.gallery.cta')}
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
