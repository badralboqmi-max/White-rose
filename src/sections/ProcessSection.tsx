import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Calendar, Scissors, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stepIcons = [Search, Calendar, Scissors, Package];

export function ProcessSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Drop-in animation for heading
      gsap.fromTo(heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Drop-in animation for cards
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen bg-blush py-24 lg:py-32 relative"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-label text-mauve mb-4">{t('process.label')}</p>
          <h2 className="font-serif text-section text-espresso mb-4">
            {t('process.title')}
          </h2>
          <p className="text-lg text-mauve max-w-md mx-auto">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {[0, 1, 2, 3].map((index) => {
            const StepIcon = stepIcons[index];
            const stepKey = `process.steps.step${index + 1}` as const;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`flex items-center gap-6 p-6 bg-white/50 rounded-3xl ${
                  isRTL ? 'lg:flex-row-reverse' : index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Icon */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-rosewood/10 flex items-center justify-center flex-shrink-0">
                  <StepIcon className="w-7 h-7 lg:w-8 lg:h-8 text-rosewood" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-label text-rosewood">{t(`${stepKey}.label`)}</span>
                  </div>
                  <h3 className="font-serif text-xl lg:text-2xl text-espresso mb-2">
                    {t(`${stepKey}.title`)}
                  </h3>
                  <p className="text-mauve">{t(`${stepKey}.description`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
