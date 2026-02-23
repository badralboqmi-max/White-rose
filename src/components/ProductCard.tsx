import { useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';
import gsap from 'gsap';

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export function ProductCard({ product, index = 0, className = '' }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power2.out',
        }
      );
    }
  }, [index]);

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative ${className}`}
    >
      {/* Pill Frame */}
      <div className="relative overflow-hidden rounded-[999px] outline-2 outline-white/85 shadow-pill transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-lift">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            ref={imageRef}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-espresso opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-rosewood hover:text-white"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="font-serif text-lg text-espresso mb-1">{product.name}</h3>
        <p className="text-rosewood font-medium">${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
}
