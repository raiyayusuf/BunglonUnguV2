// lib\types\filter.ts:
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

export interface PriceRange {
  id: string;
  name: string;
  min: number;
  max: number;
  count: number;
}

export interface FilterCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  description?: string;
}

export interface FilterOption {
  id: string;
  name: string;
  icon?: string;
  count?: number;
}
