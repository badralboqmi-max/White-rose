import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PetalCluster } from '@/components/PetalDecoration';

gsap.registerPlugin(ScrollTrigger);

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
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

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

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([pill, content], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl
        .fromTo(pill,
          { x: 0, scale: 1, opacity: 1 },
          { x: isRTL ? '28vw' : '-28vw', scale: 0.96, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(content,
          { x: 0, opacity: 1 },
          { x: isRTL ? '-18vw' : '18vw', opacity: 0, ease: 'power2.in' },
          0.7
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
    <section
      id="hero"
      ref={sectionRef}
      className="w-screen h-screen bg-gradient-to-br from-blush via-blush to-sand relative overflow-hidden z-10"
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
    </section>
  );
}
