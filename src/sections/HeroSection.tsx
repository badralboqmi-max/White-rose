import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { PetalCluster } from '@/components/PetalDecoration';

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pill = pillRef.current;
    const content = contentRef.current;

    if (!section || !pill || !content) return;

    const ctx = gsap.context(() => {
      // Entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' }, delay: 0.3 });

      loadTl
        .fromTo(pill, 
          { x: isRTL ? '60vw' : '-60vw', scale: 0.92, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, duration: 1 }
        )
        .fromTo(content.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.6'
        );

    }, section);

    return () => ctx.revert();
  }, [isRTL]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="w-full h-full bg-gradient-to-br from-blush via-blush to-sand relative overflow-hidden"
    >
      <PetalCluster />

      <div className="relative w-full h-full flex items-center">
        {/* Hero Image Pill */}
        <div
          ref={pillRef}
          className={`absolute ${isRTL ? 'right-[7vw]' : 'left-[7vw]'} top-[18vh] w-[34vw] h-[64vh] pill-frame`}
        >
          <img
            src="/images/hero_bride.jpg"
            alt="Bride in a pastel field"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Block */}
        <div
          ref={contentRef}
          className={`absolute ${isRTL ? 'right-[52vw]' : 'left-[52vw]'} top-[26vh] w-[42vw]`}
        >
          <p className="text-label text-mauve mb-4">
            {t('hero.label')}
          </p>

          <h1 className="font-serif text-hero text-espresso mb-6">
            {t('hero.title')}
          </h1>

          <p className="text-lg text-mauve mb-8 max-w-md leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('wedding-cat')}
              className="btn-primary"
            >
              {t('hero.cta.explore')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary"
            >
              {t('hero.cta.whatsapp')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
