import type { Product } from '@/types';

export const weddingProducts: Product[] = [
  {
    id: 'wedding-01',
    name: 'A-Line Lace Gown',
    price: 1290,
    category: 'wedding',
    image: '/images/wedding_product_01.jpg',
    description: 'Elegant A-line silhouette with intricate lace detailing',
  },
  {
    id: 'wedding-02',
    name: 'Satin Bias Dress',
    price: 980,
    category: 'wedding',
    image: '/images/wedding_product_02.jpg',
    description: 'Minimalist satin gown with fluid drape',
  },
  {
    id: 'wedding-03',
    name: 'Floral Appliqué Train',
    price: 1590,
    category: 'wedding',
    image: '/images/wedding_product_03.jpg',
    description: 'Romantic gown with hand-sewn floral appliqués',
  },
];

export const eveningProducts: Product[] = [
  {
    id: 'evening-01',
    name: 'Silk Midi Dress',
    price: 620,
    category: 'evening',
    image: '/images/evening_product_01.jpg',
    description: 'Luxurious silk midi for cocktail occasions',
  },
  {
    id: 'evening-02',
    name: 'Velvet Draped Gown',
    price: 890,
    category: 'evening',
    image: '/images/evening_product_02.jpg',
    description: 'Dramatic velvet with elegant draping',
  },
  {
    id: 'evening-03',
    name: 'One-Shoulder Crepe',
    price: 740,
    category: 'evening',
    image: '/images/evening_product_03.jpg',
    description: 'Modern one-shoulder design in fluid crepe',
  },
];

export const childrenProducts: Product[] = [
  {
    id: 'children-01',
    name: 'Cotton Party Dress',
    price: 180,
    category: 'children',
    image: '/images/kids_product_01.jpg',
    description: 'Comfortable cotton with delicate floral print',
  },
  {
    id: 'children-02',
    name: 'Tulle Midi Dress',
    price: 220,
    category: 'children',
    image: '/images/kids_product_02.jpg',
    description: 'Dreamy tulle layers for special occasions',
  },
  {
    id: 'children-03',
    name: 'Linen Bow Dress',
    price: 160,
    category: 'children',
    image: '/images/kids_product_03.jpg',
    description: 'Classic linen with charming bow detail',
  },
];

export const allProducts = [...weddingProducts, ...eveningProducts, ...childrenProducts];
