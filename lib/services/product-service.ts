/* 
  lib\services\product-service.ts
  Organized by: raiyayusuf
*/

import { Product } from "@/lib/data/products";
import { FilterState } from "@/lib/types/filter";
import { SortOption } from "@/lib/types/product";

/* ============================================
   PRODUCT FILTERING
   ============================================ */

export function filterProducts(
  products: Product[],
  filters: FilterState,
): Product[] {
  let filtered = [...products];

  if (filters.category && filters.category.length > 0) {
    filtered = filtered.filter((product) =>
      filters.category.includes(product.category),
    );
  }

  if (filters.flowerType && filters.flowerType.length > 0) {
    filtered = filtered.filter((product) =>
      filters.flowerType.includes(product.flowerType),
    );
  }

  if (filters.priceRange) {
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange!.min &&
        product.price <= filters.priceRange!.max,
    );
  }

  if (filters.colors && filters.colors.length > 0) {
    filtered = filtered.filter((product) =>
      product.color.some((color) => filters.colors.includes(color)),
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((product) =>
      product.tags.some((tag) => filters.tags.includes(tag)),
    );
  }

  if (filters.featuredOnly) {
    filtered = filtered.filter((product) => product.featured);
  }

  if (filters.searchKeyword && filters.searchKeyword.trim() !== "") {
    const keyword = filters.searchKeyword.toLowerCase().trim();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.tags.some((tag) => tag.toLowerCase().includes(keyword)) ||
        product.color.some((color) => color.toLowerCase().includes(keyword)),
    );
  }

  if (filters.inStockOnly) {
    filtered = filtered.filter((product) => product.inStock);
  }

  return filtered;
}

/* ============================================
   PRODUCT SORTING
   ============================================ */

export function sortProducts(
  products: Product[],
  sortBy: SortOption = "featured",
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);

    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case "featured":
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });

    default:
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.id - b.id;
      });
  }
}

/* ============================================
   RELATED PRODUCTS
   ============================================ */

export function getRelatedProducts(
  products: Product[],
  productId: number,
  limit: number = 4,
): Product[] {
  const currentProduct = products.find((p) => p.id === productId);
  if (!currentProduct) return [];

  const related = products.filter(
    (p) =>
      p.id !== productId &&
      (p.category === currentProduct.category ||
        p.flowerType === currentProduct.flowerType ||
        p.tags.some((tag) => currentProduct.tags.includes(tag)) ||
        p.color.some((color) => currentProduct.color.includes(color))),
  );

  return related.sort(() => 0.5 - Math.random()).slice(0, limit);
}

/* ============================================
   PRODUCT GETTERS
   ============================================ */

export function getProductById(
  products: Product[],
  id: number,
): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(
  products: Product[],
  categoryId: string,
): Product[] {
  return products.filter((product) => product.category === categoryId);
}

export function getProductsByFlowerType(
  products: Product[],
  flowerType: string,
): Product[] {
  return products.filter((product) => product.flowerType === flowerType);
}

export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductsInPriceRange(
  products: Product[],
  min: number,
  max: number,
): Product[] {
  return products.filter(
    (product) => product.price >= min && product.price <= max,
  );
}

/* ============================================
   PRODUCT STATISTICS
   ============================================ */

export function getProductStats(products: Product[]) {
  const totalProducts = products.length;
  const featuredCount = products.filter((p) => p.featured).length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const averagePrice = Math.round(totalValue / totalProducts);
  const averageRating =
    products.reduce((sum, p) => sum + p.rating, 0) / totalProducts;

  return {
    totalProducts,
    featuredCount,
    averagePrice,
    averageRating: parseFloat(averageRating.toFixed(1)),
    minPrice: Math.min(...products.map((p) => p.price)),
    maxPrice: Math.max(...products.map((p) => p.price)),
  };
}
