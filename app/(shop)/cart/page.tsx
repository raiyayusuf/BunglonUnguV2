// app/(shop)/cart/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getCart,
  getCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart,
  formatPrice,
} from "@/lib/services/cart-service";

export default function CartPage() {
  const [cartItems, setCartItems] = useState(getCart());
  const [total, setTotal] = useState(getCartTotal());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();

  // Update cart data
  useEffect(() => {
    const updateCartData = () => {
      setCartItems(getCart());
      setTotal(getCartTotal());
    };

    updateCartData();
    window.addEventListener("cartUpdated", updateCartData);
    return () => window.removeEventListener("cartUpdated", updateCartData);
  }, []);

  // Select all items on page load
  useEffect(() => {
    setSelectedItems(cartItems.map((item) => item.id));
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      if (window.confirm("Hapus produk dari keranjang?")) {
        removeFromCart(productId);
        setSelectedItems((prev) => prev.filter((id) => id !== productId));
      }
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Handle remove item
  const handleRemoveItem = (productId: number) => {
    if (window.confirm("Hapus produk dari keranjang?")) {
      removeFromCart(productId);
      setSelectedItems((prev) => prev.filter((id) => id !== productId));
    }
  };

  // Handle clear cart
  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    if (window.confirm("Hapus semua produk dari keranjang?")) {
      clearCart();
      setSelectedItems([]);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong! Tambahkan produk terlebih dahulu.");
      return;
    }

    setIsLoading(true);

    // Simpan selected items untuk checkout
    if (selectedItems.length > 0) {
      localStorage.setItem(
        "selected_checkout_items",
        JSON.stringify(selectedItems),
      );
    }

    // Redirect ke checkout page
    setTimeout(() => {
      router.push("/checkout");
    }, 500);
  };

  // Toggle select item
  const toggleSelectItem = (productId: number) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  // Select all items
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  // Calculate selected items total
  const selectedTotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Get cart count
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate shipping (gratis > 100k)
  const shippingCost = selectedTotal > 100000 ? 0 : 15000;
  const finalTotal = selectedTotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Produk
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="font-medium text-gray-800">Keranjang</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Keranjang Belanja
          </h1>
          <p className="text-gray-600">
            {cartCount} {cartCount === 1 ? "produk" : "produk"} dalam keranjang
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty cart state
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Keranjang Kosong
              </h2>
              <p className="text-gray-600 mb-8">
                Tambahkan produk ke keranjang untuk memulai belanja
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="px-6 py-3 bg-gradient-to-br from-primary to-primary-dark text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <i className="fas fa-store mr-2"></i>
                  Lihat Produk
                </Link>
                <Link
                  href="/categories"
                  className="px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <i className="fas fa-list mr-2"></i>
                  Lihat Kategori
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2">
              {/* Cart Header */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.length === cartItems.length &&
                          cartItems.length > 0
                        }
                        onChange={handleSelectAll}
                        className="w-5 h-5 text-primary rounded focus:ring-primary"
                      />
                      <span className="font-medium text-gray-700">
                        Pilih Semua ({selectedItems.length}/{cartItems.length})
                      </span>
                    </label>
                  </div>
                  <button
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-700 flex items-center gap-2 text-sm"
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
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Selection Checkbox */}
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                          className="w-5 h-5 text-primary rounded focus:ring-primary mt-1"
                        />
                      </div>

                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">
                              Kategori: {item.category} • Jenis:{" "}
                              {item.flowerType}
                            </p>
                            <div className="flex items-center gap-4 mb-4">
                              <span className="text-xl font-bold text-primary">
                                {formatPrice(item.price)}
                              </span>
                              <span className="text-sm text-gray-500">
                                per item
                              </span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1,
                                  )
                                }
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                              <span className="w-10 text-center font-bold text-lg">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1,
                                  )
                                }
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-primary">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                              <div className="text-sm text-gray-500">
                                Subtotal
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 flex items-center gap-2 text-sm"
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
                            Hapus
                          </button>
                          <Link
                            href={`/products/${item.id}`}
                            className="text-primary hover:text-primary-dark flex items-center gap-2 text-sm"
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
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268 2.943-9.542 7z"
                              />
                            </svg>
                            Lihat Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Ringkasan Pesanan
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">
                        {formatPrice(selectedTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ongkos Kirim:</span>
                      <span
                        className={`font-medium ${
                          shippingCost === 0 ? "text-green-600" : ""
                        }`}
                      >
                        {shippingCost === 0
                          ? "Gratis"
                          : formatPrice(shippingCost)}
                      </span>
                    </div>
                    {shippingCost === 0 && selectedTotal > 0 && (
                      <div className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                        🎉 Gratis ongkir untuk order di atas Rp 100.000
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(finalTotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isLoading || selectedItems.length === 0}
                    className={`w-full py-4 bg-gradient-to-br from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                      isLoading || selectedItems.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isLoading ? (
                      <>
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
                        Memproses...
                      </>
                    ) : (
                      <>
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
                        Lanjutkan ke Checkout
                        <span className="text-sm font-normal">
                          ({selectedItems.length} produk)
                        </span>
                      </>
                    )}
                  </button>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      atau{" "}
                      <Link
                        href="/products"
                        className="text-primary hover:underline font-medium"
                      >
                        lanjutkan belanja
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Promo Banner */}
                <div className="bg-gradient-to-br from-primary-dark to-primary text-white rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-2">
                    🎁 Dapatkan Promo Spesial!
                  </h3>
                  <p className="text-sm text-white/90 mb-4">
                    Belanja minimal Rp 200.000 dapatkan voucher 10% untuk
                    pembelian berikutnya
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                      Kode: BUNGALON10
                    </span>
                    <span className="text-sm">S&K Berlaku</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
