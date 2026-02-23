import { useTranslation } from 'react-i18next';
import { X, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Cart() {
  const { t, i18n } = useTranslation();
  const { items, removeFromCart, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const isRTL = i18n.language === 'ar';

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const message = encodeURIComponent(
      i18n.language === 'ar' 
        ? `مرحباً الوردة البيضاء!\n\nأنا مهتم بطلب:\n${items
            .map((item) => `- ${item.name} ($${item.price})`)
            .join('\n')}\n\nالمجموع: $${totalPrice.toLocaleString()}\n\nيرجى إبلاغي بالخطوات التالية.`
        : `Hello White Rose!\n\nI'm interested in ordering:\n${items
            .map((item) => `- ${item.name} ($${item.price})`)
            .join('\n')}\n\nTotal: $${totalPrice.toLocaleString()}\n\nPlease let me know the next steps.`
    );

    window.open(`https://wa.me/15550142282?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-espresso/30 backdrop-blur-sm transition-opacity duration-500 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div
        className={`fixed top-0 h-full w-full max-w-md z-50 bg-sand shadow-2xl transition-transform duration-500 ease-out ${
          isCartOpen 
            ? 'translate-x-0' 
            : isRTL 
              ? '-translate-x-full' 
              : 'translate-x-full'
        } ${isRTL ? 'left-0' : 'right-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-espresso/10">
            <h2 className="font-serif text-2xl text-espresso">{t('cart.title')}</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-espresso hover:text-rosewood transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-blush/50 flex items-center justify-center mb-4">
                  <span className="text-4xl">🌸</span>
                </div>
                <p className="text-mauve mb-2">{t('cart.empty')}</p>
                <p className="text-sm text-mauve/70">
                  {t('cart.emptySubtitle')}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white/50 rounded-2xl"
                  >
                    <div className="w-20 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-espresso mb-1">
                        {item.name}
                      </h3>
                      <p className="text-rosewood font-medium mb-2">
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-mauve">
                          {isRTL ? `الكمية: ${item.quantity}` : `Qty: ${item.quantity}`}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-mauve hover:text-rosewood transition-colors self-start"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-espresso/10 bg-white/30">
              <div className="flex items-center justify-between mb-6">
                <span className="text-mauve">{t('cart.total')}</span>
                <span className="font-serif text-2xl text-espresso">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-4 bg-[#25D366] text-white rounded-full font-sans text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                {t('cart.whatsappOrder')}
              </button>

              <button
                onClick={clearCart}
                className="w-full py-3 text-mauve text-sm hover:text-rosewood transition-colors"
              >
                {t('cart.clear')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
