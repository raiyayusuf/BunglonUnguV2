/* 
  lib\types\product.ts
  Organized by: raiyayusuf
*/

/* ============================================
   PRODUCT INTERFACE
   ============================================ */

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: "bouquet" | "bunch" | "bag";
  flowerType: "rose" | "tulip" | "gerbera" | "hydrangea" | "mixed";
  color: string[];
  tags: string[];
  featured: boolean;
  image: string;
  stock: number;
  filename: string;
  packaging: "bouquet" | "bunch" | "bag";
  inStock: boolean;
  size?: string;
  freshness?: string;
  reviewCount?: number;
}

/* ============================================
   SORT OPTION TYPE
   ============================================ */

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "name-asc"
  | "name-desc"
  | "featured";
