/* 
  app/(shop)/categories/page.tsx
  Organized by: raiyayusuf
*/

"use client";

import ProductCard from "@/components/ecommerce/product-card";
import {
  categories,
  colors,
  featuredFilter,
  flowerTypes,
  priceRanges,
  tags,
} from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

/* ============================================
   INTERFACE DEFINITIONS
   ============================================ */

// Category card props interface
interface CategoryCardProps {
  icon: string;
  title: string;
  description?: string;
  count: number;
  onClick: () => void;
  color?: string;
}

/* ============================================
   CATEGORY CARD COMPONENT
   ============================================ */

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  description,
  count,
  onClick,
  color = "primary",
}) => {
  const colorClasses: Record<string, string> = {
    primary: "from-primary/20 to-primary-light/20 text-primary",
    purple: "from-purple-500/20 to-purple-400/20 text-purple-600",
    pink: "from-pink-500/20 to-pink-400/20 text-pink-600",
    green: "from-emerald-500/20 to-emerald-400/20 text-emerald-600",
    orange: "from-orange-500/20 to-orange-400/20 text-orange-600",
    blue: "from-blue-500/20 to-blue-400/20 text-blue-600",
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <span className="text-2xl">{icon}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        )}

        <div className="flex items-center justify-between mt-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            <i className="fas fa-box-open text-xs"></i>
            {count} Produk
          </span>
          <button className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
            Jelajahi
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================
   FEATURED PRODUCTS COMPONENT
   ============================================ */

function FeaturedProducts() {
  const featured = useMemo(
    () => products.filter((p) => p.featured).slice(0, 4),
    [],
  );

  if (featured.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-primary-dark/5 to-primary/5 rounded-3xl p-8 mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ⭐ Produk Unggulan
          </h2>
          <p className="text-gray-600">
            Koleksi bunga terbaik pilihan customer
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <i className="fas fa-star text-yellow-500"></i>
            <span className="font-semibold text-gray-800">
              {featuredFilter.count} produk unggulan
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} compact={true} />
        ))}
      </div>
    </div>
  );
}

/* ============================================
   COLOR TAGS COMPONENT
   ============================================ */

function ColorTags() {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Get color code from name
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

  // Handle color selection
  const handleColorClick = (colorName: string) => {
    setSelectedColor(colorName === selectedColor ? null : colorName);
    router.push(`/products?colors=${colorName}`);
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <i className="fas fa-palette text-primary"></i>
        Filter Berdasarkan Warna
      </h2>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorClick(color.name)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
              selectedColor === color.name
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md"
            }`}
            style={{
              border:
                selectedColor === color.name
                  ? "2px solid var(--primary)"
                  : "2px solid #e5e7eb",
            }}
          >
            <div
              className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: getColorCode(color.name) }}
            />
            <span className="font-medium">{color.name}</span>
            <span className="text-sm opacity-75">({color.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================
   MAIN CATEGORIES PAGE COMPONENT
   ============================================ */

export default function CategoriesPage() {
  const router = useRouter();

  /* ============================================
     NAVIGATION HANDLERS
     ============================================ */

  // Category click handler
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
  };

  // Flower type click handler
  const handleFlowerTypeClick = (flowerTypeId: string) => {
    router.push(`/products?flowerType=${flowerTypeId}`);
  };

  // Price range click handler
  const handlePriceRangeClick = (rangeId: string) => {
    const range = priceRanges.find((r) => r.id === rangeId);
    if (range) {
      router.push(`/products?priceRange=${range.min}-${range.max}`);
    }
  };

  // All products click handler
  const handleAllProductsClick = () => {
    router.push("/products");
  };

  // Featured products click handler
  const handleFeaturedClick = () => {
    router.push("/products?featured=true");
  };

  /* ============================================
     DATA CALCULATIONS
     ============================================ */

  // Calculate total products
  const totalProducts = products.length;

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div className="py-8">
      /* HERO SECTION */
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary-light/10 px-6 py-2 rounded-full mb-4">
          <i className="fas fa-tags text-primary"></i>
          <span className="font-medium text-primary">Kategori Produk</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Temukan Bunga Sesuai <span className="text-primary">Gaya Anda</span>
        </h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
          Jelajahi koleksi lengkap bunga segar kami. Filter berdasarkan
          packaging, jenis bunga, harga, atau warna favorit Anda.
        </p>

        <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <i className="fas fa-box text-primary"></i>
            <span className="font-semibold">{totalProducts} Produk</span>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <i className="fas fa-star text-yellow-500"></i>
            <span className="font-semibold">
              {featuredFilter.count} Unggulan
            </span>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <i className="fas fa-tags text-green-500"></i>
            <span className="font-semibold">{categories.length} Kategori</span>
          </div>
        </div>
      </div>
      /* QUICK LINKS SECTION */
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div
          onClick={handleAllProductsClick}
          className="group bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-th-large text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">Semua Produk</h3>
              <p className="text-white/90 mb-6">
                Lihat seluruh koleksi {totalProducts} produk bunga kami
              </p>
            </div>
            <i className="fas fa-arrow-right text-xl group-hover:translate-x-2 transition-transform duration-300"></i>
          </div>
        </div>

        <div
          onClick={handleFeaturedClick}
          className="group bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-star text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold mb-2">Produk Unggulan</h3>
              <p className="text-white/90 mb-6">
                {featuredFilter.count} produk pilihan dengan rating tertinggi
              </p>
            </div>
            <i className="fas fa-arrow-right text-xl group-hover:translate-x-2 transition-transform duration-300"></i>
          </div>
        </div>
      </div>
      /* PACKAGING CATEGORIES SECTION */
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <i className="fas fa-gift text-primary"></i>
            Jenis Packaging
          </h2>
          <div className="text-gray-500">Pilih cara bunga dikemas</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => {
            const colors = ["primary", "purple", "green"];
            return (
              <CategoryCard
                key={cat.id}
                icon={cat.icon}
                title={cat.name}
                description={cat.description}
                count={cat.count}
                color={colors[index % colors.length]}
                onClick={() => handleCategoryClick(cat.id)}
              />
            );
          })}
        </div>
      </div>
      /* FLOWER TYPES SECTION */
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <i className="fas fa-leaf text-emerald-600"></i>
            Jenis Bunga
          </h2>
          <div className="text-gray-500">Berdasarkan jenis bunga</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {flowerTypes.map((flower, index) => {
            const colors = ["pink", "green", "orange", "blue", "purple"];
            return (
              <div
                key={flower.id}
                onClick={() => handleFlowerTypeClick(flower.id)}
                className={`group bg-gradient-to-br from-${colors[index]}-50 to-white rounded-xl p-5 cursor-pointer border border-gray-100 hover:border-${colors[index]}-200 transition-all duration-300 hover:shadow-lg`}
              >
                <div className="text-3xl mb-3 text-center">{flower.icon}</div>
                <h3 className="font-bold text-gray-800 text-center mb-2 group-hover:text-emerald-600 transition-colors">
                  {flower.name}
                </h3>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {flower.count} produk
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      /* PRICE RANGES SECTION */
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <i className="fas fa-tag text-orange-500"></i>
            Rentang Harga
          </h2>
          <div className="text-gray-500">Sesuaikan dengan budget Anda</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {priceRanges.map((range, index) => (
            <div
              key={range.id}
              onClick={() => handlePriceRangeClick(range.id)}
              className="group bg-white rounded-xl shadow-lg p-6 cursor-pointer border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-money-bill-wave text-orange-500 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {range.name}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {range.count} produk
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Range:</span>
                  <span className="font-semibold">
                    {range.max === Infinity
                      ? `> Rp ${range.min.toLocaleString()}`
                      : `Rp ${range.min.toLocaleString()} - ${range.max.toLocaleString()}`}
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                    style={{
                      width: `${(range.max === Infinity ? 250000 : range.max) / 2500}%`,
                    }}
                  />
                </div>
              </div>

              <button className="mt-6 w-full py-2.5 bg-orange-50 text-orange-600 font-medium rounded-lg group-hover:bg-orange-100 transition-colors">
                Lihat Produk
              </button>
            </div>
          ))}
        </div>
      </div>
      /* COLOR TAGS SECTION */
      <ColorTags />
      /* FEATURED PRODUCTS SECTION */
      <FeaturedProducts />
      /* POPULAR TAGS SECTION */
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <i className="fas fa-hashtag text-primary"></i>
          Tag Populer
        </h2>
        <div className="flex flex-wrap gap-3">
          {tags.slice(0, 12).map((tag) => (
            <button
              key={tag.id}
              onClick={() => router.push(`/products?tags=${tag.name}`)}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
            >
              {tag.name}{" "}
              <span className="text-xs opacity-75">({tag.count})</span>
            </button>
          ))}
        </div>
      </div>
      /* CTA SECTION */
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Butuh Bantuan Memilih?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Hubungi florist kami untuk rekomendasi personal berdasarkan acara,
            budget, dan preferensi Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/contact")}
              className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              <i className="fas fa-comment-alt mr-2"></i> Konsultasi Gratis
            </button>
            <button
              onClick={() => router.push("/products")}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              <i className="fas fa-store mr-2"></i> Lihat Semua Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
