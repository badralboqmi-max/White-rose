import { useRef, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Mail, Phone, Clock, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const image = imageRef.current;
    const footer = footerRef.current;

    if (!section || !form || !image || !footer) return;

    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(form,
        { x: isRTL ? -80 : 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image animation
      gsap.fromTo(image,
        { x: isRTL ? 80 : -80, scale: 0.96, opacity: 0 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer animation
      gsap.fromTo(footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, section);

    return () => ctx.revert();
  }, [isRTL]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isRTL 
      ? 'شكراً لاستفسارك! سنعود إليك خلال يوم عمل واحد.' 
      : 'Thank you for your inquiry! We will get back to you within one business day.'
    );
    setFormData({ name: '', email: '', date: '', message: '' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      isRTL
        ? `مرحباً الوردة البيضاء!\n\nأنا مهتم بمعرفة المزيد عن فساتينكم.\n\nالاسم: ${formData.name || 'غير مقدم'}\nالبريد: ${formData.email || 'غير مقدم'}\nتاريخ المناسبة: ${formData.date || 'غير مقدم'}\nالرسالة: ${formData.message || 'غير مقدم'}`
        : `Hello White Rose!\n\nI'm interested in learning more about your dresses.\n\nName: ${formData.name || 'Not provided'}\nEmail: ${formData.email || 'Not provided'}\nOccasion Date: ${formData.date || 'Not provided'}\nMessage: ${formData.message || 'Not provided'}`
    );
    window.open(`https://wa.me/15550142282?text=${message}`, '_blank');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full min-h-screen bg-sand relative z-[90]"
    >
      <div className="min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full px-6 lg:px-12 py-24">
            <div className="max-w-6xl mx-auto">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isRTL ? 'rtl' : ''}`}>
                {/* Form Column */}
                <div ref={formRef} className={isRTL ? 'order-2' : 'order-1'}>
                  <p className="text-label text-mauve mb-4">{t('contact.label')}</p>
                  <h2 className="font-serif text-section text-espresso mb-4">
                    {t('contact.title')}
                  </h2>
                  <p className="text-lg text-mauve mb-8">
                    {t('contact.subtitle')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm text-mauve mb-2">{t('contact.form.name')}</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/70 rounded-xl border border-espresso/10 text-espresso placeholder-mauve/50 focus:outline-none focus:ring-2 focus:ring-rosewood/30 transition-all"
                        placeholder={t('contact.form.namePlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-mauve mb-2">{t('contact.form.email')}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/70 rounded-xl border border-espresso/10 text-espresso placeholder-mauve/50 focus:outline-none focus:ring-2 focus:ring-rosewood/30 transition-all"
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-mauve mb-2">{t('contact.form.date')}</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 bg-white/70 rounded-xl border border-espresso/10 text-espresso focus:outline-none focus:ring-2 focus:ring-rosewood/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-mauve mb-2">{t('contact.form.message')}</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/70 rounded-xl border border-espresso/10 text-espresso placeholder-mauve/50 focus:outline-none focus:ring-2 focus:ring-rosewood/30 transition-all resize-none"
                        placeholder={t('contact.form.messagePlaceholder')}
                      />
                    </div>

                    <div className={`flex flex-col sm:flex-row gap-4 pt-2 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                      <button
                        type="submit"
                        className="btn-primary inline-flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        {t('contact.form.submit')}
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="btn-secondary inline-flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {t('contact.form.whatsapp')}
                      </button>
                    </div>
                  </form>

                  {/* Contact Details */}
                  <div className="mt-10 pt-8 border-t border-espresso/10 space-y-3">
                    <div className={`flex items-center gap-3 text-mauve ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Mail className="w-4 h-4" strokeWidth={1.5} />
                      <span>{t('contact.info.email')}</span>
                    </div>
                    <div className={`flex items-center gap-3 text-mauve ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Phone className="w-4 h-4" strokeWidth={1.5} />
                      <span>{t('contact.info.phone')}</span>
                    </div>
                    <div className={`flex items-center gap-3 text-mauve ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-4 h-4" strokeWidth={1.5} />
                      <span>{t('contact.info.hours')}</span>
                    </div>
                  </div>
                </div>

                {/* Image Column */}
                <div
                  ref={imageRef}
                  className={`hidden lg:block relative ${isRTL ? 'order-1' : 'order-2'}`}
                >
                  <div className="w-full aspect-[3/4] max-w-md mx-auto pill-frame">
                    <img
                      src="/images/contact_atelier.jpg"
                      alt="Atelier detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className="py-8 border-t border-espresso/10"
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
              <p className="font-serif text-xl text-espresso">{t('brand')}</p>
              <p className="text-sm text-mauve">
                {t('footer.copyright')}
              </p>
              <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button className="text-sm text-mauve hover:text-rosewood transition-colors">
                  {t('footer.privacy')}
                </button>
                <button className="text-sm text-mauve hover:text-rosewood transition-colors">
                  {t('footer.terms')}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
