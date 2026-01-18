// components\ecommerce\product-card.tsx:
"use client";

import { Product } from "@/lib/data/products";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
  showDescription?: boolean;
  showTags?: boolean;
  compact?: boolean;
  onAddToCart?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showCategory = true,
  showDescription = true,
  showTags = true,
  compact = false,
  onAddToCart,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  // Color mapping untuk chips
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
      Orange: "#ffa502",
      "Multi-color": "#ff6b6b",
    };
    return colorMap[colorName] || "#dfe6e9";
  };

  // Category names
  const categoryNames: Record<string, string> = {
    bouquet: "Buket",
    bunch: "Bunch",
    bag: "Tas",
  };

  // Flower type names
  const flowerNames: Record<string, string> = {
    rose: "Mawar",
    tulip: "Tulip",
    gerbera: "Gerbera",
    hydrangea: "Hydrangea",
    mixed: "Campuran",
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (compact) {
    return (
      <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Compact version */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              ⭐ Unggulan
            </span>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            <span className="text-yellow-500 text-sm">⭐ {product.rating}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              ⭐ Unggulan
            </span>
          )}
          {showCategory && (
            <span className="bg-white/90 backdrop-blur-sm text-primary-dark text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {categoryNames[product.category] || product.category}
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:shadow-lg">
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268 2.943-9.542 7z"
            />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
          {product.name}
        </h3>

        {showDescription && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="mb-4 space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Jenis:</span>
            <span className="text-xs font-medium text-primary">
              {flowerNames[product.flowerType] || product.flowerType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Warna:</span>
            <div className="flex gap-1">
              {product.color.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: getColorCode(color) }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {showTags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Actions */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-xl font-bold text-primary">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold text-gray-700">
                {product.rating}
              </span>
              <span className="text-xs text-gray-500">
                ({Math.floor(Math.random() * 50) + 10})
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm flex items-center justify-center gap-2">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Detail
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors duration-300 ${
                isAdded
                  ? "bg-green-500 text-white"
                  : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {isAdded ? (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Ditambahkan!
                </>
              ) : (
                <>
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Tambah
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
