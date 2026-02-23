import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PetalDecoration } from '@/components/PetalDecoration';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function EveningCategorySection() {
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
      // Drop-in animation
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
    const element = document.getElementById('evening-gallery');
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
      <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-1/4`}>
        <PetalDecoration variant={isRTL ? 'right' : 'left'} size={500} opacity={0.12} />
      </div>

      <div className="relative w-full h-full flex items-center">
        {/* Image Pill */}
        <div
          ref={pillRef}
          className={`absolute ${isRTL ? 'right-[6vw]' : 'left-[6vw]'} top-[16vh] w-[38vw] h-[68vh] pill-frame`}
        >
          <img
            src="/images/evening_category.jpg"
            alt="Elegant evening dress"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Block */}
        <div
          ref={textRef}
          className={`absolute ${isRTL ? 'left-[9vw] text-left' : 'right-[9vw] text-left'} top-[30vh] w-[38vw]`}
        >
          <p className="text-label text-mauve mb-4">{t('evening.label')}</p>
          <h2 className="font-serif text-section text-espresso mb-6">
            {t('evening.title')}
          </h2>
          <p className="text-lg text-mauve mb-8 leading-relaxed max-w-md">
            {t('evening.description')}
          </p>
          <button
            onClick={scrollToGallery}
            className={`btn-primary inline-flex items-center gap-2 group ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t('evening.cta')}
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
