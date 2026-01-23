// components\ecommerce\filter-sidebar.tsx:
"use client";

import { FilterState } from "@/lib/types/filter";
import {
  categories,
  flowerTypes,
  priceRanges,
  colors as colorData,
  tags as tagData,
} from "@/lib/data/categories";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const getColorCode = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      Merah: "#ff4757",
      Putih: "#ffffff",
      Pink: "#ff9ff3",
      Hitam: "#2d3436",
      Hijau: "#00b894",
      Peach: "#ffb8b8",
      "Broken White": "#f5f5f5",
      Cream: "#ffeaa7",
      Kuning: "#fdcb6e",
      Ungu: "#a29bfe",
      Brown: "#a1887f",
    };
    return colorMap[colorName] || "#dfe6e9";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">Filter Produk</h2>
        <button
          onClick={onReset}
          className="text-sm text-primary hover:text-primary-dark font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Search */}
      <div>
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Categories */}
      <div>
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Kategori
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={filters.category.includes(cat.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onFilterChange("category", [...filters.category, cat.id]);
                    } else {
                      onFilterChange(
                        "category",
                        filters.category.filter((id) => id !== cat.id),
                      );
                    }
                  }}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-gray-700 group-hover:text-primary">
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

      {/* Flower Types */}
      <div>
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Jenis Bunga
        </h3>
        <div className="space-y-2">
          {flowerTypes.map((flower) => (
            <label
              key={flower.id}
              className="flex items-center justify-between cursor-pointer group"
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
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-gray-700 group-hover:text-primary">
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

      {/* Price Range */}
      <div>
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Rentang Harga
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.id}
              className="flex items-center justify-between cursor-pointer group"
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
                  className="w-4 h-4 text-primary"
                />
                <span className="text-gray-700 group-hover:text-primary">
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

      {/* Colors */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Warna</h3>
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
                  onFilterChange("colors", [...filters.colors, color.name]);
                }
              }}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                filters.colors.includes(color.name)
                  ? "border-primary scale-110"
                  : "border-white"
              }`}
              style={{ backgroundColor: getColorCode(color.name) }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Featured & In Stock */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.featuredOnly}
            onChange={(e) => onFilterChange("featuredOnly", e.target.checked)}
            className="w-4 h-4 text-primary rounded focus:ring-primary"
          />
          <span className="text-gray-700">⭐ Produk Unggulan</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange("inStockOnly", e.target.checked)}
            className="w-4 h-4 text-primary rounded focus:ring-primary"
          />
          <span className="text-gray-700">📦 Stok Tersedia</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
