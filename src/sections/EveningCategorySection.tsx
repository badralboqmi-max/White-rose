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
  const petalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pill = pillRef.current;
    const text = textRef.current;
    const petal = petalRef.current;

    if (!section || !pill || !text || !petal) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(pill,
          { x: isRTL ? '60vw' : '-60vw', scale: 0.9, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(text,
          { x: isRTL ? '-40vw' : '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(petal,
          { x: isRTL ? '20vw' : '-20vw', rotation: isRTL ? 10 : -10, opacity: 0 },
          { x: 0, rotation: 0, opacity: 0.12, ease: 'none' },
          0
        );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(pill,
          { x: 0, y: 0, scale: 1, opacity: 1 },
          { x: isRTL ? '22vw' : '-22vw', y: '10vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(text,
          { x: 0, opacity: 1 },
          { x: isRTL ? '-18vw' : '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(petal,
          { x: 0, opacity: 0.12 },
          { x: isRTL ? '10vw' : '-10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, [isRTL]);

  const scrollToGallery = () => {
    const element = document.getElementById('evening-gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="evening-cat"
      ref={sectionRef}
      className="w-screen h-screen bg-blush relative overflow-hidden z-40"
    >
      {/* Decorative Petal */}
      <div ref={petalRef} className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-1/4`}>
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
    </section>
  );
}
