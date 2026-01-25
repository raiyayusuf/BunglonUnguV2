/* 
  lib\types\filter.ts - Filter Type Definitions
  Organized by: raiyayusuf
*/

/* ============================================
   FILTER STATE INTERFACE
   ============================================ */

export interface FilterState {
  category: string[];
  flowerType: string[];
  priceRange: { min: number; max: number } | null;
  colors: string[];
  tags: string[];
  featuredOnly: boolean;
  inStockOnly: boolean;
  searchKeyword: string;
}

/* ============================================
   PRICE RANGE INTERFACE
   ============================================ */

export interface PriceRange {
  id: string;
  name: string;
  min: number;
  max: number;
  count: number;
}

/* ============================================
   FILTER CATEGORY INTERFACE
   ============================================ */

export interface FilterCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  description?: string;
}

/* ============================================
   FILTER OPTION INTERFACE
   ============================================ */

export interface FilterOption {
  id: string;
  name: string;
  icon?: string;
  count?: number;
}
