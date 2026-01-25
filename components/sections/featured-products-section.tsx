/* 
  components/sections/featured-products-section.tsx
  Organized by: raiyayusuf
*/

"use client";

import ProductCard from "@/components/ecommerce/product-card";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/data/products";
import { useState } from "react";

export interface FeaturedProductsSectionProps {
  products: Product[];
  title?: string;
  description?: string;
  maxItems?: number;
  showViewAll?: boolean;
}

export default function FeaturedProductsSection({
  products,
  title = "🌺 Produk Unggulan",
  description = "Koleksi bunga pilihan terbaik kami yang selalu menjadi favorit pelanggan",
  maxItems = 8,
  showViewAll = true,
}: FeaturedProductsSectionProps) {
  /* ============================================
     STATE & HOOKS
     ============================================ */
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  /* ============================================
     FUNCTIONS
     ============================================ */
  const handleAddToCart = async (productId: number) => {
    try {
      setIsLoading(true);
      setAddedProductId(productId);

      await new Promise((resolve) => setTimeout(resolve, 300));

      addToCart(productId, 1);

      console.log(`✅ Product ${productId} added to cart`);

      setTimeout(() => {
        setAddedProductId(null);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setIsLoading(false);
      setAddedProductId(null);
    }
  };

  /* ============================================
     DATA PREPARATION
     ============================================ */
  const displayProducts = products.slice(0, maxItems);

  /* ============================================
     LOADING STATE
     ============================================ */
  if (isLoading && displayProducts.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-white to-primary-soft/30">
        <div className="container mx-auto max-w-6xl">
          {/* ============================================
             LOADING HEADER
             ============================================ */}
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
          </div>

          {/* ============================================
             LOADING PRODUCT GRID
             ============================================ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg animate-pulse"
              >
                <div className="h-48 md:h-56 bg-gray-200 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-primary-soft/30">
      <div className="container mx-auto max-w-6xl">
        {/* ============================================
           SECTION HEADER
           ============================================ */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {description}
            </p>
          )}
        </div>

        {/* ============================================
           RUNNING PRODUCTS SLIDER
           ============================================ */}
        {displayProducts.length > 0 && (
          <div className="mb-8 relative">
            {/* ============================================
               SLIDER CONTAINER
               ============================================ */}
            <div className="relative overflow-hidden rounded-xl">
              {/* ============================================
                 LEFT GRADIENT OVERLAY
                 ============================================ */}
              <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>

              {/* ============================================
                 RIGHT GRADIENT OVERLAY
                 ============================================ */}
              <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>

              {/* ============================================
                 RUNNING SLIDER CONTENT
                 ============================================ */}
              <div className="flex gap-6 animate-scroll py-4 px-8">
                {[...displayProducts, ...displayProducts].map(
                  (product, index) => (
                    <div
                      key={`${product.id}-${index}`}
                      className="flex-shrink-0 w-72 md:w-80 transform transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <ProductCard
                        product={product}
                        showCategory={true}
                        showDescription={true}
                        showTags={true}
                        compact={false}
                        onAddToCart={() => handleAddToCart(product.id)}
                      />
                    </div>
                  ),
                )}
              </div>

              {/* ============================================
                 SLIDER BORDERS
                 ============================================ */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-soft/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-soft/20 to-transparent"></div>
            </div>

            {/* ============================================
               SLIDER INSTRUCTION
               ============================================ */}
            <div className="text-center mt-6 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                  />
                </svg>
                Geser ke kanan/kiri untuk melihat lebih banyak produk
              </span>
            </div>
          </div>
        )}

        {/* ============================================
           EMPTY STATE
           ============================================ */}
        {displayProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 text-gray-300">🌼</div>
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              Belum ada produk unggulan
            </h3>
            <p className="text-gray-400">Produk sedang dalam persiapan...</p>
          </div>
        )}

        {/* ============================================
           VIEW ALL BUTTON
           ============================================ */}
        {showViewAll && displayProducts.length > 0 && (
          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              Lihat Semua Produk
            </a>

            <div className="mt-4 text-sm text-gray-500">
              Menampilkan {displayProducts.length} dari {products.length} produk
              unggulan
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
