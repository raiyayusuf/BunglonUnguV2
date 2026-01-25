/* 
  components/ecommerce/cart-sidebar.tsx
  Organized by: raiyayusuf
*/

"use client";

import {
  clearCart,
  formatPrice,
  getCart,
  getCartTotal,
  removeFromCart,
  updateQuantity,
} from "@/lib/services/cart-service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ============================================
   CART SIDEBAR COMPONENT
   ============================================ */

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(getCart());
  const [total, setTotal] = useState(getCartTotal());

  /* ============================================
     EFFECTS & EVENT LISTENERS
     ============================================ */

  useEffect(() => {
    const updateCartData = () => {
      setCartItems(getCart());
      setTotal(getCartTotal());
    };

    updateCartData();
    window.addEventListener("cartUpdated", updateCartData);
    return () => window.removeEventListener("cartUpdated", updateCartData);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /* ============================================
     EVENT HANDLERS
     ============================================ */

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleQuantityChange = (
    productId: number,
    action: "increase" | "decrease" | "remove",
  ) => {
    const item = cartItems.find((item) => item.id === productId);
    if (!item) return;

    switch (action) {
      case "increase":
        updateQuantity(productId, item.quantity + 1);
        break;
      case "decrease":
        if (item.quantity > 1) {
          updateQuantity(productId, item.quantity - 1);
        } else {
          if (window.confirm("Hapus produk dari keranjang?")) {
            removeFromCart(productId);
          }
        }
        break;
      case "remove":
        if (window.confirm("Hapus produk dari keranjang?")) {
          removeFromCart(productId);
        }
        break;
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong! Tambahkan produk terlebih dahulu.");
      return;
    }
    onClose();
    router.push("/checkout");
  };

  const handleViewCart = () => {
    onClose();
    router.push("/cart");
  };

  const handleContinueShopping = () => {
    onClose();
    router.push("/products");
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    if (window.confirm("Hapus semua produk dari keranjang?")) {
      clearCart();
    }
  };

  /* ============================================
     CALCULATIONS
     ============================================ */

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  /* ============================================
     RENDER COMPONENT
     ============================================ */

  if (!isOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      />

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-light to-primary rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-800">
                Keranjang Belanja
              </h2>
              <p className="text-sm text-gray-500">
                {cartCount} {cartCount === 1 ? "produk" : "produk"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Tutup keranjang"
          >
            <svg
              className="w-5 h-5 text-gray-500"
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

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                Keranjang Kosong
              </h3>
              <p className="text-gray-500 mb-6">
                Tambahkan produk untuk memulai belanja
              </p>
              <button
                onClick={handleContinueShopping}
                className="px-6 py-3 bg-gradient-to-br from-primary to-primary-dark text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <i className="fas fa-store mr-2"></i>
                Lanjut Belanja
              </button>
            </div>
          ) : (
            <>
              {/* CLEAR ALL BUTTON */}
              <div className="mb-4 flex justify-end">
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
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

              {/* CART ITEMS LIST */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* PRODUCT IMAGE */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/images/placeholder.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/placeholder.jpg";
                          }}
                        />
                      </div>

                      {/* PRODUCT INFO */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 mb-1 line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 mb-2">
                          {formatPrice(item.price)}
                        </p>

                        {/* QUANTITY CONTROLS */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, "decrease")
                            }
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Kurangi jumlah"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          <span className="w-8 text-center font-medium text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, "increase")
                            }
                            className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Tambah jumlah"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, "remove")
                            }
                            className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Hapus produk"
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
                          </button>
                        </div>
                      </div>

                      {/* PRICE TOTAL */}
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-primary text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.quantity} × {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* FOOTER - CHECKOUT SECTION */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white shadow-lg">
            {/* ORDER SUMMARY */}
            <div className="mb-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ongkos Kirim:</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3">
              <button
                onClick={handleViewCart}
                className="w-full py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268 2.943-9.542 7z"
                  />
                </svg>
                Lihat Detail Keranjang
              </button>
              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-gradient-to-br from-primary to-primary-dark text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Proses Checkout
              </button>
            </div>

            {/* CONTINUE SHOPPING LINK */}
            <div className="mt-4 text-center">
              <button
                onClick={handleContinueShopping}
                className="text-sm text-gray-500 hover:text-primary transition-colors"
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Lanjutkan Belanja
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
