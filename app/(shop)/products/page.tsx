// app\(shop)\products\page.tsx:
"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ecommerce/product-card";
import FilterSidebar from "@/components/ecommerce/filter-sidebar";
import { products } from "@/lib/data/products";
import { useFilters } from "@/hooks/useFilters";
import { filterProducts, sortProducts } from "@/lib/services/product-service";
import { sortOptions } from "@/lib/data/categories";
import { addToCart } from "@/lib/services/cart-service";

export default function ProductsPage() {
  const {
    filters,
    sortBy,
    updateFilter,
    updateSort,
    resetFilters,
    activeFilterCount,
  } = useFilters();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter dan sort products
  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortBy);
  }, [filters, sortBy]);

  // Handle add to cart
  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🌷 Koleksi Bunga Terbaik
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Temukan bunga segar untuk setiap momen spesial. Pilih dari
              berbagai jenis bunga dengan packaging eksklusif.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm font-medium">
                {filteredProducts.length} produk tersedia
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-800">Filter Produk</div>
                {activeFilterCount > 0 && (
                  <div className="text-sm text-gray-500">
                    {activeFilterCount} filter aktif
                  </div>
                )}
              </div>
            </div>
            {activeFilterCount > 0 && (
              <span className="bg-primary text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Filter Sidebar */}
          <div
            className={`md:w-72 lg:w-80 ${isFilterOpen ? "fixed inset-0 z-50 bg-white overflow-y-auto" : "hidden md:block"}`}
          >
            {isFilterOpen && (
              <div className="p-4 h-full">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b">
                  <h2 className="text-xl font-bold text-gray-800">
                    Filter Produk
                  </h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="md:hidden text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={updateFilter}
                  onReset={resetFilters}
                />
              </div>
            )}
            <div className="hidden md:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={updateFilter}
                onReset={resetFilters}
              />
            </div>
          </div>

          {/* Overlay for mobile */}
          {isFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* Main Products Area */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-gray-700">
                    <span className="font-bold text-lg">
                      {filteredProducts.length}
                    </span>
                    <span className="text-gray-500">
                      {" "}
                      dari {products.length} produk
                    </span>
                  </div>

                  {/* Active Filters Badges */}
                  {activeFilterCount > 0 && (
                    <div className="hidden md:flex flex-wrap gap-2">
                      <button
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors"
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Hapus Semua
                      </button>
                    </div>
                  )}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium">Urutkan:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => updateSort(e.target.value as any)}
                    className="border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-700 font-medium min-w-[180px]"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Tidak ada produk yang ditemukan
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Coba gunakan filter yang berbeda atau ubah kata kunci
                    pencarian.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
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
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reset Filter
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>

                {/* Pagination Info */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                  <p className="text-gray-600">
                    Menampilkan semua {filteredProducts.length} produk
                    {activeFilterCount > 0 &&
                      " berdasarkan filter yang dipilih"}
                  </p>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <button
            onClick={resetFilters}
            className="text-primary font-medium px-4 py-2"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
