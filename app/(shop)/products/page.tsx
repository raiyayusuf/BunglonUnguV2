/* 
  app/(shop)/products/page.tsx
  Organized by: raiyayusuf
*/

"use client";

import FilterSidebar from "@/components/ecommerce/filter-sidebar";
import ProductCard from "@/components/ecommerce/product-card";
import { useFilters } from "@/hooks/use-filters";
import { categories, flowerTypes, sortOptions } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { filterProducts, sortProducts } from "@/lib/services/product-service";
import { useMemo, useState } from "react";

/* ============================================
   PRODUCTS PAGE COMPONENT
   ============================================ */

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

  /* ============================================
     PRODUCT FILTERING & SORTING
     ============================================ */
  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, filters);
    return sortProducts(filtered, sortBy);
  }, [filters, sortBy]);

  /* ============================================
     DYNAMIC PAGE TITLE FUNCTION
     ============================================ */
  const getPageTitle = () => {
    if (filters.category.length > 0) {
      const categoryNames = filters.category
        .map((id) => {
          const cat = categories.find((c) => c.id === id);
          return cat?.name || id;
        })
        .join(", ");
      return `Produk ${categoryNames}`;
    }

    if (filters.flowerType.length > 0) {
      const flowerNames = filters.flowerType
        .map((id) => {
          const flower = flowerTypes.find((f) => f.id === id);
          return flower?.name || id;
        })
        .join(", ");
      return `Bunga ${flowerNames}`;
    }

    if (filters.featuredOnly) {
      return "⭐ Produk Unggulan";
    }

    if (filters.searchKeyword) {
      return `Hasil pencarian: "${filters.searchKeyword}"`;
    }

    if (filters.priceRange) {
      const range = filters.priceRange;
      if (range.max === Infinity) {
        return `Produk di atas Rp ${range.min.toLocaleString()}`;
      } else {
        return `Produk Rp ${range.min.toLocaleString()} - ${range.max.toLocaleString()}`;
      }
    }

    if (filters.colors.length > 0) {
      return `Produk Warna ${filters.colors.join(", ")}`;
    }

    return "🌷 Koleksi Bunga Terbaik";
  };

  /* ============================================
     DYNAMIC PAGE DESCRIPTION FUNCTION
     ============================================ */
  const getPageDescription = () => {
    if (filteredProducts.length === 0) {
      return "Tidak ada produk yang sesuai dengan filter yang dipilih.";
    }

    if (
      filters.category.length > 0 ||
      filters.flowerType.length > 0 ||
      filters.featuredOnly
    ) {
      return `Temukan ${filteredProducts.length} produk bunga segar untuk setiap momen spesial.`;
    }

    return "Temukan bunga segar untuk setiap momen spesial. Pilih dari berbagai jenis bunga dengan packaging eksklusif.";
  };

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============================================
          DYNAMIC HEADER SECTION
          ============================================ */}
      <div className="bg-gradient-to-br from-primary-dark to-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-lg text-white/90 mb-8">{getPageDescription()}</p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-sm font-medium">
                {filteredProducts.length} produk tersedia
              </span>
              {activeFilterCount > 0 && (
                <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full">
                  {activeFilterCount} filter aktif
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          MAIN CONTENT AREA
          ============================================ */}
      <div className="container mx-auto px-4 py-8">
        {/* MOBILE FILTER BUTTON */}
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

        {/* CONTENT LAYOUT */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* ============================================
              FILTER SIDEBAR SECTION
              ============================================ */}
          <div className="md:w-72 lg:w-80">
            <div
              className={`${isFilterOpen ? "fixed inset-0 z-50 bg-white overflow-y-auto scrollbar-hide" : "hidden md:block sticky top-28 h-[calc(100vh-6rem)] scrollbar-hide"}`}
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
                      ✕
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={updateFilter}
                    onReset={resetFilters}
                  />
                </div>
              )}
              <div className="hidden md:block h-full overflow-y-auto pr-2 scrollbar-hide">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={updateFilter}
                  onReset={resetFilters}
                />
              </div>
            </div>
          </div>

          {/* MOBILE FILTER OVERLAY */}
          {isFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* ============================================
              MAIN PRODUCTS AREA
              ============================================ */}
          <main className="flex-1">
            {/* TOOLBAR SECTION */}
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

                  {/* ACTIVE FILTERS BADGES */}
                  {activeFilterCount > 0 && (
                    <div className="hidden md:flex flex-wrap gap-2">
                      {/* Category Badges */}
                      {filters.category.map((catId) => {
                        const cat = categories.find((c) => c.id === catId);
                        if (!cat) return null;
                        return (
                          <span
                            key={catId}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {cat.icon} {cat.name}
                            <button
                              onClick={() =>
                                updateFilter(
                                  "category",
                                  filters.category.filter((id) => id !== catId),
                                )
                              }
                              className="ml-1 text-primary hover:text-primary-dark"
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}

                      {/* Flower Type Badges */}
                      {filters.flowerType.map((flowerId) => {
                        const flower = flowerTypes.find(
                          (f) => f.id === flowerId,
                        );
                        if (!flower) return null;
                        return (
                          <span
                            key={flowerId}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                          >
                            {flower.icon} {flower.name}
                            <button
                              onClick={() =>
                                updateFilter(
                                  "flowerType",
                                  filters.flowerType.filter(
                                    (id) => id !== flowerId,
                                  ),
                                )
                              }
                              className="ml-1 text-emerald-700 hover:text-emerald-900"
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}

                      {/* Price Range Badge */}
                      {filters.priceRange && (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                          <i className="fas fa-tag"></i>
                          Rp {filters.priceRange.min.toLocaleString()} -{" "}
                          {filters.priceRange.max === Infinity
                            ? "∞"
                            : filters.priceRange.max.toLocaleString()}
                          <button
                            onClick={() => updateFilter("priceRange", null)}
                            className="ml-1 text-orange-700 hover:text-orange-900"
                          >
                            ×
                          </button>
                        </span>
                      )}

                      {/* Search Keyword Badge */}
                      {filters.searchKeyword && (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          <i className="fas fa-search"></i>"
                          {filters.searchKeyword}"
                          <button
                            onClick={() => updateFilter("searchKeyword", "")}
                            className="ml-1 text-blue-700 hover:text-blue-900"
                          >
                            ×
                          </button>
                        </span>
                      )}

                      {/* Featured Badge */}
                      {filters.featuredOnly && (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                          <i className="fas fa-star"></i> Unggulan
                          <button
                            onClick={() => updateFilter("featuredOnly", false)}
                            className="ml-1 text-yellow-700 hover:text-yellow-900"
                          >
                            ×
                          </button>
                        </span>
                      )}

                      {/* Clear All Button */}
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

                {/* SORT DROPDOWN */}
                <div className="flex items-center gap-3 relative group">
                  <span className="text-gray-600 font-medium">Urutkan:</span>
                  <div className="relative">
                    {/* Trigger Button */}
                    <button className="border border-gray-300 rounded-xl px-4 py-2.5 bg-white text-gray-700 font-medium min-w-[180px] text-left flex items-center justify-between hover:border-primary hover:shadow-md transition-all duration-200 group-hover:border-primary">
                      <span>
                        {sortOptions.find((opt) => opt.id === sortBy)?.name ||
                          "Unggulan"}
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-500 group-hover:text-primary transition-transform duration-300 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-300 origin-top z-50">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => updateSort(option.id as any)}
                          className={`w-full px-4 py-3 text-left transition-all duration-200 hover:bg-primary/10 ${sortBy === option.id ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary" : "text-gray-700 hover:pl-6"}`}
                        >
                          <div className="flex items-center">
                            {sortBy === option.id && (
                              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            )}
                            {option.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCTS GRID SECTION */}
            {filteredProducts.length === 0 ? (
              /* EMPTY STATE */
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
                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                /* PAGINATION INFO */
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                  <p className="text-gray-600">
                    Menampilkan semua {filteredProducts.length} produk
                    {activeFilterCount > 0 &&
                      " berdasarkan filter yang dipilih"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Halaman 1 dari 1 • Total {filteredProducts.length} produk
                  </p>
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE BOTTOM BAR */}
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

          {/* Quick Cart Info */}
          <div className="flex items-center gap-2">
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="text-sm font-medium">
              {filteredProducts.length} produk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
