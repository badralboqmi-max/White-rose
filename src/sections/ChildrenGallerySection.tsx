import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProductCard } from '@/components/ProductCard';
import { childrenProducts } from '@/data/products';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ChildrenGallerySection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftPillRef = useRef<HTMLDivElement>(null);
  const centerPillRef = useRef<HTMLDivElement>(null);
  const rightPillRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const leftPill = leftPillRef.current;
    const centerPill = centerPillRef.current;
    const rightPill = rightPillRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !leftPill || !centerPill || !rightPill || !cta) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(heading,
          { y: '-30vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(leftPill,
          { x: isRTL ? '60vw' : '-60vw', rotation: isRTL ? 6 : -6, opacity: 0 },
          { x: 0, rotation: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(centerPill,
          { y: '70vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(rightPill,
          { x: isRTL ? '-60vw' : '60vw', rotation: isRTL ? -6 : 6, opacity: 0 },
          { x: 0, rotation: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(cta,
          { y: '20vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.15
        );

      // SETTLE (30% - 70%) - hold position

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(heading,
          { y: 0, opacity: 1 },
          { y: '-12vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(leftPill,
          { x: 0, y: 0, opacity: 1 },
          { x: isRTL ? '22vw' : '-22vw', y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(centerPill,
          { y: 0, opacity: 1 },
          { y: '18vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(rightPill,
          { x: 0, y: 0, opacity: 1 },
          { x: isRTL ? '-22vw' : '22vw', y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(cta,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, [isRTL]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="children-gallery"
      ref={sectionRef}
      className="w-screen h-screen bg-coral relative overflow-hidden z-[70]"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Heading */}
        <div
          ref={headingRef}
          className="absolute top-[7vh] left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-label text-espresso/60 mb-2">{t('children.gallery.label')}</p>
          <h2 className="font-serif text-section text-espresso">
            {t('children.gallery.title')}
          </h2>
        </div>

        {/* Product Pills */}
        <div className="absolute inset-0 flex items-center justify-center px-[7vw]">
          {/* Left Pill */}
          <div
            ref={leftPillRef}
            className={`absolute ${isRTL ? 'right-[7vw]' : 'left-[7vw]'} top-[26vh] w-[26vw]`}
          >
            <ProductCard product={childrenProducts[0]} index={0} />
          </div>

          {/* Center Pill */}
          <div
            ref={centerPillRef}
            className="absolute left-1/2 -translate-x-1/2 top-[26vh] w-[26vw]"
          >
            <ProductCard product={childrenProducts[1]} index={1} />
          </div>

          {/* Right Pill */}
          <div
            ref={rightPillRef}
            className={`absolute ${isRTL ? 'left-[7vw]' : 'right-[7vw]'} top-[26vh] w-[26vw]`}
          >
            <ProductCard product={childrenProducts[2]} index={2} />
          </div>
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
            {t('children.gallery.cta')}
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
