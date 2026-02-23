import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header & Navigation
      brand: 'White Rose',
      nav: {
        wedding: 'Wedding',
        evening: 'Evening',
        children: 'Children',
        process: 'Process',
        contact: 'Contact',
      },
      
      // Hero Section
      hero: {
        label: 'Tailoring studio — Est. 2012',
        title: 'White Rose',
        subtitle: 'Bespoke dresses for weddings, evenings, and little celebrations.',
        cta: {
          explore: 'Explore collections',
          whatsapp: 'Order via WhatsApp',
        },
      },
      
      // Wedding Section
      wedding: {
        label: 'Collection',
        title: 'Wedding Dresses',
        description: 'Clean lines, delicate lace, and silhouettes made to move with you. Designed in-house and finished by hand.',
        cta: 'See wedding collection',
        gallery: {
          label: 'Browse',
          title: 'The Wedding Collection',
          cta: 'Request a fitting',
        },
        products: {
          product1: { name: 'A-Line Lace Gown', price: 'From $1,290' },
          product2: { name: 'Satin Bias Dress', price: 'From $980' },
          product3: { name: 'Floral Appliqué Train', price: 'From $1,590' },
        },
      },
      
      // Evening Section
      evening: {
        label: 'Collection',
        title: 'Evening Dresses',
        description: 'From intimate dinners to grand entrances—dresses that feel effortless and unforgettable.',
        cta: 'See evening collection',
        gallery: {
          label: 'Browse',
          title: 'The Evening Collection',
          cta: 'Request a fitting',
        },
        products: {
          product1: { name: 'Silk Midi Dress', price: 'From $620' },
          product2: { name: 'Velvet Draped Gown', price: 'From $890' },
          product3: { name: 'One-Shoulder Crepe', price: 'From $740' },
        },
      },
      
      // Children Section
      children: {
        label: 'Collection',
        title: "Children's Dresses",
        description: "Comfortable fits, breathable fabrics, and details that feel magical—without getting in the way of play.",
        cta: "See children's collection",
        gallery: {
          label: 'Browse',
          title: "The Children's Collection",
          cta: 'Request a fitting',
        },
        products: {
          product1: { name: 'Cotton Party Dress', price: 'From $180' },
          product2: { name: 'Tulle Midi Dress', price: 'From $220' },
          product3: { name: 'Linen Bow Dress', price: 'From $160' },
        },
      },
      
      // Process Section
      process: {
        label: 'Our Process',
        title: 'How It Works',
        subtitle: 'Simple, transparent, and made around your schedule.',
        steps: {
          step1: {
            label: 'Step 1',
            title: 'Choose a style',
            description: 'Browse collections and save your favorites.',
          },
          step2: {
            label: 'Step 2',
            title: 'Book a fitting',
            description: 'We confirm measurements and fabric choices.',
          },
          step3: {
            label: 'Step 3',
            title: 'Tailoring',
            description: 'Hand-finished in 2–4 weeks with progress updates.',
          },
          step4: {
            label: 'Step 4',
            title: 'Delivery',
            description: 'Pickup or shipped to your door, ready to wear.',
          },
        },
      },
      
      // Contact Section
      contact: {
        label: 'Get in Touch',
        title: 'Start Your Order',
        subtitle: "Tell us what you're looking for. We'll reply within one business day.",
        form: {
          name: 'Name',
          namePlaceholder: 'Your name',
          email: 'Email',
          emailPlaceholder: 'your@email.com',
          date: 'Occasion Date',
          message: 'Message',
          messagePlaceholder: 'Tell us about your dream dress...',
          submit: 'Send inquiry',
          whatsapp: 'Message on WhatsApp',
        },
        info: {
          email: 'hello@whiterose.studio',
          phone: '+1 (555) 014-2282',
          hours: 'Open by appointment',
        },
      },
      
      // Cart
      cart: {
        title: 'Your Selection',
        empty: 'Your cart is empty',
        emptySubtitle: 'Browse our collections to find your perfect dress',
        total: 'Total',
        clear: 'Clear selection',
        whatsappOrder: 'Order via WhatsApp',
      },
      
      // Footer
      footer: {
        copyright: '© White Rose Studio. All rights reserved.',
        privacy: 'Privacy',
        terms: 'Terms',
      },
      
      // Language
      language: {
        en: 'English',
        ar: 'العربية',
      },
    },
  },
  ar: {
    translation: {
      // Header & Navigation
      brand: 'الوردة البيضاء',
      nav: {
        wedding: 'فساتين الزفاف',
        evening: 'فساتين السهرة',
        children: 'فساتين الأطفال',
        process: 'العملية',
        contact: 'تواصل معنا',
      },
      
      // Hero Section
      hero: {
        label: 'أستوديو خياطة — منذ 2012',
        title: 'الوردة البيضاء',
        subtitle: 'فساتين مصممة خصيصاً للأعراس والسهرات والاحتفالات الصغيرة.',
        cta: {
          explore: 'استكشف المجموعات',
          whatsapp: 'اطلب عبر واتساب',
        },
      },
      
      // Wedding Section
      wedding: {
        label: 'المجموعة',
        title: 'فساتين الزفاف',
        description: 'خطوط نظيفة، دانتيل رقيق، وأشكال مصممة للتحرك معك. مصممة داخلياً ومنتهية يدوياً.',
        cta: 'شاهد مجموعة الزفاف',
        gallery: {
          label: 'تصفح',
          title: 'مجموعة الزفاف',
          cta: 'احجز موعد قياس',
        },
        products: {
          product1: { name: 'فستان دانتيل A-Line', price: 'من $1,290' },
          product2: { name: 'فستان ساتان بايس', price: 'من $980' },
          product3: { name: 'فستان أبليكيه زهور', price: 'من $1,590' },
        },
      },
      
      // Evening Section
      evening: {
        label: 'المجموعة',
        title: 'فساتين السهرة',
        description: 'من العشاء الحميم إلى المداخل الرائعة—فساتين تشعرك بالأناقة والتميز.',
        cta: 'شاهد مجموعة السهرة',
        gallery: {
          label: 'تصفح',
          title: 'مجموعة السهرة',
          cta: 'احجز موعد قياس',
        },
        products: {
          product1: { name: 'فستان حرير ميدي', price: 'من $620' },
          product2: { name: 'فستان مخمل مطرز', price: 'من $890' },
          product3: { name: 'فستان كريب بكتف واحد', price: 'من $740' },
        },
      },
      
      // Children Section
      children: {
        label: 'المجموعة',
        title: 'فساتين الأطفال',
        description: 'قصات مريحة، أقمشة breathable، وتفاصيل ساحرة—دون أن تعيق اللعب.',
        cta: 'شاهد مجموعة الأطفال',
        gallery: {
          label: 'تصفح',
          title: 'مجموعة الأطفال',
          cta: 'احجز موعد قياس',
        },
        products: {
          product1: { name: 'فستان قطن للحفلات', price: 'من $180' },
          product2: { name: 'فستان تول ميدي', price: 'من $220' },
          product3: { name: 'فستان كتان بفيونكة', price: 'من $160' },
        },
      },
      
      // Process Section
      process: {
        label: 'عمليتنا',
        title: 'كيف نعمل',
        subtitle: 'بسيطة، شفافة، ومصممة حول جدولك.',
        steps: {
          step1: {
            label: 'الخطوة 1',
            title: 'اختر التصميم',
            description: 'تصفح المجموعات واحفظ المفضلات لديك.',
          },
          step2: {
            label: 'الخطوة 2',
            title: 'احجز موعد قياس',
            description: 'نؤكد القياسات واختيارات القماش.',
          },
          step3: {
            label: 'الخطوة 3',
            title: 'الخياطة',
            description: 'تشطيب يدوي في 2-4 أسابيع مع تحديثات التقدم.',
          },
          step4: {
            label: 'الخطوة 4',
            title: 'التوصيل',
            description: 'الاستلام أو الشحن إلى باب منزلك، جاهز للارتداء.',
          },
        },
      },
      
      // Contact Section
      contact: {
        label: 'تواصل معنا',
        title: 'ابدأ طلبك',
        subtitle: 'أخبرنا ما تبحث عنه. سنجيب خلال يوم عمل واحد.',
        form: {
          name: 'الاسم',
          namePlaceholder: 'اسمك',
          email: 'البريد الإلكتروني',
          emailPlaceholder: 'your@email.com',
          date: 'تاريخ المناسبة',
          message: 'الرسالة',
          messagePlaceholder: 'أخبرنا عن فستان أحلامك...',
          submit: 'إرسال الاستفسار',
          whatsapp: 'راسلنا على واتساب',
        },
        info: {
          email: 'hello@whiterose.studio',
          phone: '+1 (555) 014-2282',
          hours: 'مفتوح بالمواعيد',
        },
      },
      
      // Cart
      cart: {
        title: 'اختياراتك',
        empty: 'سلة التسوق فارغة',
        emptySubtitle: 'تصفح مجموعاتنا للعثور على فستانك المثالي',
        total: 'المجموع',
        clear: 'مسح الاختيارات',
        whatsappOrder: 'اطلب عبر واتساب',
      },
      
      // Footer
      footer: {
        copyright: '© استوديو الوردة البيضاء. جميع الحقوق محفوظة.',
        privacy: 'الخصوصية',
        terms: 'الشروط',
      },
      
      // Language
      language: {
        en: 'English',
        ar: 'العربية',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
