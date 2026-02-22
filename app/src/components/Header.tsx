import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { t, i18n } = useTranslation();
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-blush/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-serif text-2xl lg:text-3xl text-espresso hover:text-rosewood transition-colors"
          >
            {t('brand')}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('wedding-cat')}
              className="text-sm text-espresso hover:text-rosewood transition-colors tracking-wide"
            >
              {t('nav.wedding')}
            </button>
            <button
              onClick={() => scrollToSection('evening-cat')}
              className="text-sm text-espresso hover:text-rosewood transition-colors tracking-wide"
            >
              {t('nav.evening')}
            </button>
            <button
              onClick={() => scrollToSection('children-cat')}
              className="text-sm text-espresso hover:text-rosewood transition-colors tracking-wide"
            >
              {t('nav.children')}
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-sm text-espresso hover:text-rosewood transition-colors tracking-wide"
            >
              {t('nav.process')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm text-espresso hover:text-rosewood transition-colors tracking-wide"
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="p-2 text-espresso hover:text-rosewood transition-colors flex items-center gap-1"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium">{i18n.language === 'ar' ? 'AR' : 'EN'}</span>
              </button>
              
              {/* Language Dropdown */}
              {isLangMenuOpen && (
                <div className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} bg-white rounded-xl shadow-lg py-2 min-w-[120px] z-50`}>
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-blush/50 transition-colors ${i18n.language === 'en' ? 'text-rosewood font-medium' : 'text-espresso'}`}
                  >
                    {t('language.en')}
                  </button>
                  <button
                    onClick={() => toggleLanguage('ar')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-blush/50 transition-colors ${i18n.language === 'ar' ? 'text-rosewood font-medium' : 'text-espresso'}`}
                  >
                    {t('language.ar')}
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-espresso hover:text-rosewood transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rosewood text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-espresso hover:text-rosewood transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-blush/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={() => scrollToSection('wedding-cat')}
            className="font-serif text-3xl text-espresso hover:text-rosewood transition-colors"
          >
            {t('nav.wedding')}
          </button>
          <button
            onClick={() => scrollToSection('evening-cat')}
            className="font-serif text-3xl text-espresso hover:text-rosewood transition-colors"
          >
            {t('nav.evening')}
          </button>
          <button
            onClick={() => scrollToSection('children-cat')}
            className="font-serif text-3xl text-espresso hover:text-rosewood transition-colors"
          >
            {t('nav.children')}
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="font-serif text-3xl text-espresso hover:text-rosewood transition-colors"
          >
            {t('nav.process')}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="font-serif text-3xl text-espresso hover:text-rosewood transition-colors"
          >
            {t('nav.contact')}
          </button>
          
          {/* Language Toggle in Mobile Menu */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-4 py-2 rounded-full text-sm ${i18n.language === 'en' ? 'bg-rosewood text-white' : 'bg-espresso/10 text-espresso'}`}
            >
              {t('language.en')}
            </button>
            <button
              onClick={() => toggleLanguage('ar')}
              className={`px-4 py-2 rounded-full text-sm ${i18n.language === 'ar' ? 'bg-rosewood text-white' : 'bg-espresso/10 text-espresso'}`}
            >
              {t('language.ar')}
            </button>
          </div>
        </nav>
      </div>

      {/* Click outside to close language menu */}
      {isLangMenuOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsLangMenuOpen(false)}
        />
      )}
    </>
  );
}
