import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PetalDecoration } from '@/components/PetalDecoration';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function WeddingCategorySection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pill = pillRef.current;
    const text = textRef.current;

    if (!section || !pill || !text) return;

    const ctx = gsap.context(() => {
      // Drop-in animation when section enters view
      gsap.fromTo([pill, text],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToGallery = () => {
    const element = document.getElementById('wedding-gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="w-full h-full bg-blush relative overflow-hidden"
    >
      {/* Decorative Petal */}
      <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-1/4`}>
        <PetalDecoration variant={isRTL ? 'left' : 'right'} size={500} opacity={0.12} />
      </div>

      <div className="relative w-full h-full flex items-center">
        {/* Text Block */}
        <div
          ref={textRef}
          className={`absolute ${isRTL ? 'right-[9vw] text-right' : 'left-[9vw] text-left'} top-[30vh] w-[38vw]`}
        >
          <p className="text-label text-mauve mb-4">{t('wedding.label')}</p>
          <h2 className="font-serif text-section text-espresso mb-6">
            {t('wedding.title')}
          </h2>
          <p className="text-lg text-mauve mb-8 leading-relaxed max-w-md">
            {t('wedding.description')}
          </p>
          <button
            onClick={scrollToGallery}
            className={`btn-primary inline-flex items-center gap-2 group ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t('wedding.cta')}
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Image Pill */}
        <div
          ref={pillRef}
          className={`absolute ${isRTL ? 'left-[6vw]' : 'right-[6vw]'} top-[16vh] w-[38vw] h-[68vh] pill-frame`}
        >
          <img
            src="/images/wedding_category.jpg"
            alt="Elegant wedding dress"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
