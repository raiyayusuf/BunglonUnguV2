/* 
  app/(shop)/products/[id]/page.tsx
  Organized by: raiyayusuf
*/

"use client";

import ProductCard from "@/components/ecommerce/product-card";
import { products } from "@/lib/data/products";
import { addToCart } from "@/lib/services/cart-service";
import {
  getProductById,
  getRelatedProducts,
} from "@/lib/services/product-service";
import { formatPrice } from "@/lib/utils/format";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ============================================
   PRODUCT DETAIL PAGE COMPONENT
   ============================================ */

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const productId = Number(params.id);
  const product = getProductById(products, productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(products, productId, 4);

  /* ============================================
     COLOR MAPPING UTILITY
     ============================================ */
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

  /* ============================================
     CATEGORY & FLOWER TYPE MAPPING
     ============================================ */
  const categoryNames: Record<string, string> = {
    bouquet: "Buket",
    bunch: "Bunch",
    bag: "Tas",
  };

  const flowerNames: Record<string, string> = {
    rose: "Mawar",
    tulip: "Tulip",
    gerbera: "Gerbera",
    hydrangea: "Hydrangea",
    mixed: "Campuran",
  };

  /* ============================================
     CART HANDLER FUNCTION
     ============================================ */
  const handleAddToCart = async () => {
    if (!product.inStock) {
      alert("Maaf, produk ini sedang habis stok.");
      return;
    }

    setIsAddingToCart(true);

    try {
      addToCart(product, quantity);

      setTimeout(() => {
        setIsAddingToCart(false);
      }, 1500);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setIsAddingToCart(false);
    }
  };

  /* ============================================
     INITIALIZE SELECTED IMAGE
     ============================================ */
  useEffect(() => {
    if (product && !selectedImage) {
      setSelectedImage(product.image);
    }
  }, [product, selectedImage]);

  /* ============================================
     PRODUCT NOT FOUND STATE
     ============================================ */
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Produk Tidak Ditemukan
          </h1>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============================================
          BREADCRUMB NAVIGATION
          ============================================ */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={() => router.push("/")}
              className="hover:text-primary"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => router.push("/products")}
              className="hover:text-primary"
            >
              Produk
            </button>
            <span>/</span>
            <span className="font-medium text-gray-800">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ============================================
          MAIN PRODUCT CONTENT
          ============================================ */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* PRODUCT IMAGES SECTION */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src={selectedImage || product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-sm font-bold px-4 py-2 rounded-full">
                      ⭐ Produk Unggulan
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PRODUCT INFORMATION SECTION */}
          <div className="space-y-6">
            {/* PRODUCT HEADER */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="font-bold text-gray-700 ml-2">
                    {product.rating}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    (
                    {product.reviewCount || Math.floor(Math.random() * 50) + 10}{" "}
                    ulasan)
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  SKU: FL{product.id.toString().padStart(3, "0")}
                </span>
              </div>
            </div>
            {/* PRICE & STOCK INFO */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </div>
                  <div className="text-sm text-gray-500">Harga per item</div>
                </div>
                <div
                  className={`px-4 py-2 rounded-full font-medium ${
                    product.inStock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock ? "✅ Stok Tersedia" : "❌ Stok Habis"}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {product.stock} unit tersedia
              </div>
            </div>
            {/* PRODUCT DESCRIPTION */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Deskripsi Produk
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            /* PRODUCT SPECIFICATIONS */
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Spesifikasi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Kategori:</span>
                  <span className="font-medium">
                    {categoryNames[product.category]}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Jenis Bunga:</span>
                  <span className="font-medium">
                    {flowerNames[product.flowerType]}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Warna:</span>
                  <div className="flex gap-2">
                    {product.color.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: getColorCode(color) }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tags:</span>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {product.size && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Ukuran:</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                )}
                {product.freshness && (
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Kesegaran:</span>
                    <span className="font-medium">{product.freshness}</span>
                  </div>
                )}
              </div>
            </div>
            /* QUANTITY & ACTIONS SECTION */
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Jumlah:</span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, Math.min(10, Number(e.target.value))),
                      )
                    }
                    className="w-16 text-center border-x border-gray-300 py-2"
                    min="1"
                    max="10"
                  />
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Maks: 10 per pembelian
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAddingToCart}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                    isAddingToCart
                      ? "bg-green-500 text-white"
                      : product.inStock
                        ? "bg-primary hover:bg-primary-dark text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isAddingToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Menambahkan...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Tambah ke Keranjang
                    </span>
                  )}
                </button>

                <button className="flex-1 py-4 px-6 border-2 border-primary text-primary hover:bg-primary/5 rounded-xl font-semibold transition-colors">
                  <span className="flex items-center justify-center gap-2">
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Tambah ke Wishlist
                  </span>
                </button>
              </div>
            </div>
            /* ADDITIONAL INFO SECTION */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
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
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Gratis Ongkir</div>
                  <div className="text-sm text-gray-500">Yogyakarta area</div>
                </div>
              </div>

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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Garansi Kesegaran</div>
                  <div className="text-sm text-gray-500">2 hari garansi</div>
                </div>
              </div>

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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Custom Card</div>
                  <div className="text-sm text-gray-500">
                    Greeting card gratis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        /* RELATED PRODUCTS SECTION */
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Produk Terkait
              </h2>
              <button
                onClick={() => router.push("/products")}
                className="text-primary hover:text-primary-dark font-medium"
              >
                Lihat Semua →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>
        )}
        /* BACK BUTTON SECTION */
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={() => router.push("/products")}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Semua Produk
          </button>
        </div>
      </div>
    </div>
  );
}
