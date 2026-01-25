/* 
  components/ecommerce/filter-sidebar.tsx
  Organized by: raiyayusuf
*/

"use client";

import {
  categories,
  colors as colorData,
  flowerTypes,
  priceRanges,
} from "@/lib/data/categories";
import { FilterState } from "@/lib/types/filter";
import { useEffect, useRef, useState } from "react";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onReset: () => void;
}

/* ============================================
   FILTER SIDEBAR COMPONENT
   ============================================ */

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  /* ============================================
     STATE MANAGEMENT
     ============================================ */
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  /* ============================================
     UTILITY FUNCTIONS
     ============================================ */

  // Get color code from name
  const getColorCode = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      Merah: "#ff4757",
      Putih: "#ffffff",
      Pink: "#ff9ff3",
      Hitam: "#2d3436",
      Hijau: "#00b894",
      Peach: "#ffb8b8",
      BrokenWhite: "#f5f5f5",
      Cream: "#ffeaa7",
      Kuning: "#fdcb6e",
      Ungu: "#a29bfe",
      Brown: "#a1887f",
    };
    return colorMap[colorName] || "#dfe6e9";
  };

  /* ============================================
     CLICK HANDLERS
     ============================================ */

  // Handle section click
  const handleSectionClick = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setExpandedSection(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ============================================
     COUNT FUNCTIONS
     ============================================ */

  const getCategoryCount = () => {
    return categories.filter((cat) => filters.category.includes(cat.id)).length;
  };

  const getFlowerTypeCount = () => {
    return flowerTypes.filter((flower) =>
      filters.flowerType.includes(flower.id),
    ).length;
  };

  const getPriceRangeCount = () => {
    return filters.priceRange ? 1 : 0;
  };

  const getColorCount = () => {
    return filters.colors.length;
  };

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div
      ref={sidebarRef}
      className="bg-white rounded-xl shadow-lg p-6 space-y-4"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800">Filter Produk</h2>
        <button
          onClick={onReset}
          className="text-sm text-primary hover:text-primary-dark font-medium"
        >
          Reset All
        </button>
      </div>

      {/* SEARCH SECTION */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Cari Produk
        </h3>
        <input
          type="text"
          value={filters.searchKeyword}
          onChange={(e) => onFilterChange("searchKeyword", e.target.value)}
          placeholder="Cari bunga, warna, atau tag..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-sm placeholder:text-gray-500"
        />
      </div>

      {/* ============================================
          CATEGORY SECTION - CLICK ACCORDION
          ============================================ */}
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => handleSectionClick("category")}
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Kategori</div>
              <div className="text-sm text-gray-500">
                {getCategoryCount() > 0
                  ? `${getCategoryCount()} terpilih`
                  : `${categories.length} pilihan`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getCategoryCount() > 0 && (
              <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {getCategoryCount()}
              </span>
            )}
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                expandedSection === "category" ? "rotate-180" : ""
              }`}
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
          </div>
        </div>

        {expandedSection === "category" && (
          <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50/50">
            <div className="space-y-2 pt-3">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center justify-between cursor-pointer hover:bg-white p-2 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.category.includes(cat.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onFilterChange("category", [
                            ...filters.category,
                            cat.id,
                          ]);
                        } else {
                          onFilterChange(
                            "category",
                            filters.category.filter((id) => id !== cat.id),
                          );
                        }
                      }}
                      className="custom-checkbox"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-primary">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {cat.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================
          FLOWER TYPE SECTION - CLICK ACCORDION
          ============================================ */}
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => handleSectionClick("flower-type")}
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Jenis Bunga</div>
              <div className="text-sm text-gray-500">
                {getFlowerTypeCount() > 0
                  ? `${getFlowerTypeCount()} terpilih`
                  : `${flowerTypes.length} pilihan`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getFlowerTypeCount() > 0 && (
              <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {getFlowerTypeCount()}
              </span>
            )}
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                expandedSection === "flower-type" ? "rotate-180" : ""
              }`}
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
          </div>
        </div>

        {expandedSection === "flower-type" && (
          <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50/50">
            <div className="space-y-2 pt-3">
              {flowerTypes.map((flower) => (
                <label
                  key={flower.id}
                  className="flex items-center justify-between cursor-pointer hover:bg-white p-2 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.flowerType.includes(flower.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onFilterChange("flowerType", [
                            ...filters.flowerType,
                            flower.id,
                          ]);
                        } else {
                          onFilterChange(
                            "flowerType",
                            filters.flowerType.filter((id) => id !== flower.id),
                          );
                        }
                      }}
                      className="custom-checkbox"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-primary">
                      {flower.name}
                    </span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {flower.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================
          PRICE SECTION - CLICK ACCORDION
          ============================================ */}
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => handleSectionClick("price")}
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Harga</div>
              <div className="text-sm text-gray-500">
                {getPriceRangeCount() > 0
                  ? "1 terpilih"
                  : `${priceRanges.length} pilihan`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getPriceRangeCount() > 0 && (
              <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {getPriceRangeCount()}
              </span>
            )}
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                expandedSection === "price" ? "rotate-180" : ""
              }`}
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
          </div>
        </div>

        {expandedSection === "price" && (
          <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50/50">
            <div className="space-y-2 pt-3">
              {priceRanges.map((range) => (
                <label
                  key={range.id}
                  className="flex items-center justify-between cursor-pointer hover:bg-white p-2 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={
                        filters.priceRange?.min === range.min &&
                        filters.priceRange?.max === range.max
                      }
                      onChange={() =>
                        onFilterChange("priceRange", {
                          min: range.min,
                          max: range.max,
                        })
                      }
                      className="custom-checkbox"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-primary">
                      {range.name}
                    </span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {range.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================
          COLOR SECTION - CLICK ACCORDION
          ============================================ */}
      <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => handleSectionClick("color")}
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
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Warna Bunga</div>
              <div className="text-sm text-gray-500">
                {getColorCount() > 0
                  ? `${getColorCount()} terpilih`
                  : `${colorData.length} pilihan`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getColorCount() > 0 && (
              <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {getColorCount()}
              </span>
            )}
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                expandedSection === "color" ? "rotate-180" : ""
              }`}
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
          </div>
        </div>

        {expandedSection === "color" && (
          <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50/50">
            <div className="space-y-3 pt-3">
              <div className="flex flex-wrap gap-2">
                {colorData.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => {
                      if (filters.colors.includes(color.name)) {
                        onFilterChange(
                          "colors",
                          filters.colors.filter((c) => c !== color.name),
                        );
                      } else {
                        onFilterChange("colors", [
                          ...filters.colors,
                          color.name,
                        ]);
                      }
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      filters.colors.includes(color.name)
                        ? "border-primary ring-2 ring-primary/30 scale-110"
                        : "border-white"
                    }`}
                    style={{ backgroundColor: getColorCode(color.name) }}
                    title={color.name}
                  >
                    {filters.colors.includes(color.name) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500 pt-2">
                {filters.colors.length > 0
                  ? `${filters.colors.length} warna terpilih`
                  : "Klik warna untuk memilih"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ============================================
          FEATURED & IN STOCK SECTION
          ============================================ */}
      <div className="border border-gray-200 rounded-lg p-4 space-y-3 hover:border-primary/30 transition-colors">
        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group">
          <input
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={(e) => onFilterChange("featuredOnly", e.target.checked)}
            className="custom-checkbox"
          />
          <span className="text-gray-700 group-hover:text-primary">
            ⭐ Produk Unggulan
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange("inStockOnly", e.target.checked)}
            className="custom-checkbox"
          />
          <span className="text-gray-700 group-hover:text-primary">
            📦 Stok Tersedia
          </span>
        </label>
      </div>

      {/* ============================================
          ACTIVE FILTERS SUMMARY
          ============================================ */}
      {(getCategoryCount() > 0 ||
        getFlowerTypeCount() > 0 ||
        getPriceRangeCount() > 0 ||
        getColorCount() > 0 ||
        filters.featuredOnly ||
        filters.inStockOnly) && (
        <div className="border border-gray-200 rounded-lg p-4 hover:border-primary/30 transition-colors">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Filter Aktif:
          </div>
          <div className="flex flex-wrap gap-2">
            {getCategoryCount() > 0 && (
              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                <span>Kategori:</span>
                <span className="font-bold">{getCategoryCount()}</span>
              </span>
            )}
            {getFlowerTypeCount() > 0 && (
              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                <span>Jenis:</span>
                <span className="font-bold">{getFlowerTypeCount()}</span>
              </span>
            )}
            {getPriceRangeCount() > 0 && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                Harga terpilih
              </span>
            )}
            {getColorCount() > 0 && (
              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                <span>Warna:</span>
                <span className="font-bold">{getColorCount()}</span>
              </span>
            )}
            {filters.featuredOnly && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                Unggulan
              </span>
            )}
            {filters.inStockOnly && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                Stok tersedia
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
