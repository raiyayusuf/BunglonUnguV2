/* 
  components/ecommerce/product-card.tsx
  Organized by: raiyayusuf
*/

"use client";

import { Product } from "@/lib/data/products";
import { addToCart, formatPrice, getCart } from "@/lib/services/cart-service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
  showDescription?: boolean;
  showTags?: boolean;
  compact?: boolean;
  onAddToCart?: (productId: number) => void;
}

/* ============================================
   PRODUCT CARD COMPONENT
   ============================================ */

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showCategory = true,
  showDescription = true,
  showTags = true,
  compact = false,
  onAddToCart,
}) => {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  /* ============================================
     REFS & MEMOS
     ============================================ */

  // Refs untuk track click
  const isAddingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Stable review count
  const reviewCount = useMemo(() => {
    return ((product.id * 17) % 50) + 15;
  }, [product.id]);

  /* ============================================
     EFFECTS
     ============================================ */

  // Load cart quantity untuk produk ini
  useEffect(() => {
    const loadCartData = () => {
      const cart = getCart();
      const item = cart.find((item) => item.id === product.id);
      setCartQuantity(item?.quantity || 0);
    };

    loadCartData();
    window.addEventListener("cartUpdated", loadCartData);
    return () => window.removeEventListener("cartUpdated", loadCartData);
  }, [product.id]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  /* ============================================
     UTILITY FUNCTIONS
     ============================================ */

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

  /* ============================================
     EVENT HANDLERS
     ============================================ */

  // Add to cart handler dengan LOCK
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent multiple clicks
    if (isAddingRef.current || isAdded || !product.inStock) {
      return;
    }

    // Set lock
    isAddingRef.current = true;

    // Add ke cart dengan quantity 1
    const success = addToCart(product, 1);

    if (success) {
      setIsAdded(true);

      // Trigger parent callback jika ada
      if (onAddToCart) {
        onAddToCart(product.id);
      }

      // Reset timeout
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }

      clickTimeoutRef.current = setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }

    // Unlock setelah 500ms
    setTimeout(() => {
      isAddingRef.current = false;
    }, 500);
  };

  // Quick view handler
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${product.id}`);
  };

  /* ============================================
     COMPACT VERSION
     ============================================ */

  if (compact) {
    return (
      <Link
        href={`/products/${product.id}`}
        className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 block"
      >
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
              {formatPrice(product.price)}
            </span>
            <span className="text-yellow-500 text-sm">⭐ {product.rating}</span>
          </div>
        </div>
      </Link>
    );
  }

  /* ============================================
     FULL VERSION
     ============================================ */
  return (
    <div
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE CONTAINER */}
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="relative h-48 md:h-56 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* BADGES */}
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

          {/* STOCK STATUS */}
          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              🔴 Habis
            </div>
          )}

          {/* QUICK VIEW BUTTON */}
          {isHovered && (
            <button
              onClick={handleQuickView}
              className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-primary-dark rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 hover:bg-white z-10"
              aria-label="Lihat detail cepat"
            >
              <i className="fas fa-eye text-lg"></i>
            </button>
          )}

          {/* CART QUANTITY BADGE */}
          {cartQuantity > 0 && (
            <div className="absolute bottom-3 right-3 bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
              {cartQuantity}
            </div>
          )}
        </div>
      </Link>

      {/* PRODUCT INFO */}
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/products/${product.id}`} className="group/link">
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-1 group-hover/link:text-primary transition-colors">
            {product.name}
          </h3>

          {showDescription && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
        </Link>

        {/* META INFO */}
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
              {product.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{product.tags.length - 3} lagi
                </span>
              )}
            </div>
          )}
        </div>

        {/* PRICE & ACTIONS */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold text-gray-700">
                {product.rating}
              </span>
              <span className="text-xs text-gray-500">({reviewCount})</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm flex items-center justify-center gap-2"
            >
              <i className="fas fa-info-circle"></i>
              Detail
            </Link>

            {/* ADD TO CART BUTTON */}
            <button
              onClick={handleAddToCart}
              disabled={isAdded || !product.inStock}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                isAdded
                  ? "bg-green-500 text-white "
                  : !product.inStock
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <i className="fas fa-check"></i>
                  Berhasil!
                </>
              ) : !product.inStock ? (
                <>
                  <i className="fas fa-clock"></i>
                  Habis
                </>
              ) : (
                <>
                  <i className="fas fa-cart-plus"></i>
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
