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
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
     HOVER HANDLERS
     ============================================ */

  // Handle hover with delay
  const handleMouseEnter = (section: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);

    // Immediate feedback for arrow
    if (expandedSection !== section) {
      const arrowElement = document.querySelector(
        `[data-section="${section}"] svg`,
      );
      if (arrowElement) {
        arrowElement.classList.add("rotate-180");
      }
    }

    const timeout = setTimeout(() => {
      setExpandedSection(section);
    }, 120);

    setHoverTimeout(timeout);
  };

  const handleMouseLeave = (section: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);

    const timeout = setTimeout(() => {
      const sectionElement = sectionRefs.current[section];
      if (sectionElement) {
        const isHovering = sectionElement.matches(":hover");
        if (!isHovering) {
          // Animate arrow back
          const arrowElement = document.querySelector(
            `[data-section="${section}"] svg`,
          );
          if (arrowElement) {
            arrowElement.classList.remove("rotate-180");
          }

          // Add exit animation class before remove
          const dropdownElement =
            sectionElement.querySelector(".filter-content");
          if (dropdownElement) {
            dropdownElement.classList.add("filter-dropdown-exit");
            setTimeout(() => {
              setExpandedSection(null);
            }, 500);
          } else {
            setExpandedSection(null);
          }
        }
      }
    }, 100);

    setHoverTimeout(timeout);
  };

  // Handle click for manual toggle (mobile/fallback)
  const handleSectionClick = (section: string) => {
    if (window.innerWidth < 768) {
      setExpandedSection(expandedSection === section ? null : section);
    }
  };

  /* ============================================
     EFFECTS
     ============================================ */

  // Close all when Reset
  useEffect(() => {
    if (
      filters.category.length === 0 &&
      filters.flowerType.length === 0 &&
      !filters.priceRange &&
      filters.colors.length === 0 &&
      !filters.featuredOnly &&
      !filters.inStockOnly
    ) {
      setExpandedSection(null);
    }
  }, [filters]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  /* ============================================
     COUNT FUNCTIONS
     ============================================ */

  // Calculate total items per section
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
     REF SETTER
     ============================================ */

  // Set ref for each section
  const setSectionRef = (section: string, el: HTMLDivElement | null) => {
    sectionRefs.current[section] = el;
  };

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
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
          CATEGORY SECTION - HOVER ACCORDION
          ============================================ */}
      <div
        ref={(el) => setSectionRef("category", el)}
        className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
        onMouseEnter={() => handleMouseEnter("category")}
        onMouseLeave={() => handleMouseLeave("category")}
        onClick={() => handleSectionClick("category")}
      >
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
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
          <div
            className="px-4 pb-4 border-t border-gray-200 bg-gray-50/50 filter-dropdown-enter smooth-dropdown"
            onAnimationEnd={(e) => e.stopPropagation()}
          >
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
                      className="w-4 h-4 text-primary rounded focus:ring-primary group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-primary">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-primary/10 group-hover:text-primary">
                    {cat.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================
          FLOWER TYPE SECTION - HOVER ACCORDION
          ============================================ */}
      <div
        ref={(el) => setSectionRef("flower-type", el)}
        className="border border-gray-200 rounded-lg overflow-hidden hover:border-emerald-500/50 transition-colors"
        onMouseEnter={() => handleMouseEnter("flower-type")}
        onMouseLeave={() => handleMouseLeave("flower-type")}
        onClick={() => handleSectionClick("flower-type")}
      >
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-emerald-600"
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
              <span className="bg-emerald-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
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
          <div
            className="px-4 pb-4 border-t border-gray-200 bg-gray-50/50 filter-dropdown-enter smooth-dropdown"
            onAnimationEnd={(e) => e.stopPropagation()}
          >
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
                      className="w-4 h-4 text-primary rounded focus:ring-primary group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-emerald-600">
                      {flower.name}
                    </span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-700">
                    {flower.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================
          PRICE SECTION - HOVER ACCORDION
          ============================================ */}
      <div
        ref={(el) => setSectionRef("price", el)}
        className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors"
        onMouseEnter={() => handleMouseEnter("price")}
        onMouseLeave={() => handleMouseLeave("price")}
        onClick={() => handleSectionClick("price")}
      >
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-orange-600"
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
              <div className="font-semibold text-gray-800">Rentang Harga</div>
              <div className="text-sm text-gray-500">
                {getPriceRangeCount() > 0
                  ? "1 terpilih"
                  : `${priceRanges.length} pilihan`}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getPriceRangeCount() > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
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
          <div
            className="px-4 pb-4 border-t border-gray-200 bg-gray-50/50 filter-dropdown-enter smooth-dropdown"
            onAnimationEnd={(e) => e.stopPropagation()}
          >
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
                      className="w-4 h-4 text-primary group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-orange-600">
                      {range.name}
                    </span>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-orange-100 group-hover:text-orange-700">
                    {range.count}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============================================
          COLOR SECTION - HOVER ACCORDION
          ============================================ */}
      <div
        ref={(el) => setSectionRef("color", el)}
        className="border border-gray-200 rounded-lg overflow-hidden hover:border-purple-500/50 transition-colors"
        onMouseEnter={() => handleMouseEnter("color")}
        onMouseLeave={() => handleMouseLeave("color")}
        onClick={() => handleSectionClick("color")}
      >
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-600"
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
              <span className="bg-purple-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
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
          <div
            className="px-4 pb-4 border-t border-gray-200 bg-gray-50/50 filter-dropdown-enter smooth-dropdown"
            onAnimationEnd={(e) => e.stopPropagation()}
          >
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
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 relative hover:scale-110 ${
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
      <div className="border border-gray-200 rounded-lg p-4 space-y-3 hover:border-gray-300 transition-colors">
        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group">
          <input
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={(e) => onFilterChange("featuredOnly", e.target.checked)}
            className="w-5 h-5 text-primary rounded focus:ring-primary group-hover:scale-110 transition-transform"
          />
          <span className="text-gray-700 group-hover:text-yellow-600">
            ⭐ Produk Unggulan
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange("inStockOnly", e.target.checked)}
            className="w-5 h-5 text-primary rounded focus:ring-primary group-hover:scale-110 transition-transform"
          />
          <span className="text-gray-700 group-hover:text-blue-600">
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
        <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Filter Aktif:
          </div>
          <div className="flex flex-wrap gap-2">
            {getCategoryCount() > 0 && (
              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                <span>Kategori:</span>
                <span className="font-bold">{getCategoryCount()}</span>
              </span>
            )}
            {getFlowerTypeCount() > 0 && (
              <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-200 transition-colors">
                <span>Jenis:</span>
                <span className="font-bold">{getFlowerTypeCount()}</span>
              </span>
            )}
            {getPriceRangeCount() > 0 && (
              <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full hover:bg-orange-200 transition-colors">
                Harga terpilih
              </span>
            )}
            {getColorCount() > 0 && (
              <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full hover:bg-purple-200 transition-colors">
                <span>Warna:</span>
                <span className="font-bold">{getColorCount()}</span>
              </span>
            )}
            {filters.featuredOnly && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full hover:bg-yellow-200 transition-colors">
                Unggulan
              </span>
            )}
            {filters.inStockOnly && (
              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors">
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
