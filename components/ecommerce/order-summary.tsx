/* 
  components/ecommerce/order-summary.tsx
  Organized by: raiyayusuf
*/

"use client";

import { CartItem } from "@/lib/services/cart-service";
import { formatPrice } from "@/lib/utils/formatters";
import Image from "next/image";

/* ============================================
   TYPE DEFINITIONS
   ============================================ */
interface OrderSummaryProps {
  items: CartItem[];
  shippingCost: number;
  subtotal: number;
  total: number;
  itemCount: number;
  shippingMethod?: string;
}

/* ============================================
   ORDER SUMMARY COMPONENT
   ============================================ */
export default function OrderSummary({
  items,
  shippingCost,
  subtotal,
  total,
  itemCount,
  shippingMethod = "regular",
}: OrderSummaryProps) {
  /* ============================================
     SHIPPING METHOD TEXT
     ============================================ */
  const getShippingText = (method: string): string => {
    switch (method) {
      case "express":
        return "Express (1-2 hari)";
      case "same-day":
        return "Same Day (Hari ini)";
      default:
        return "Reguler (3-5 hari)";
    }
  };

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div className="bg-white rounded-xl shadow-bunglon-light p-6 border border-primary-soft/30 sticky top-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
          <i className="fas fa-receipt text-primary text-lg"></i>
        </div>
        <h3 className="text-xl font-bold text-primary-dark">
          Ringkasan Pesanan
        </h3>
      </div>

      {/* Items List */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-700">Produk ({itemCount})</h4>
          <span className="text-sm text-gray-500">Subtotal</span>
        </div>

        <div className="max-h-64 overflow-y-auto pr-2 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-6">
              <i className="fas fa-shopping-cart text-3xl text-gray-300 mb-2"></i>
              <p className="text-gray-500">Tidak ada produk</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 pb-4 border-b border-gray-100 last:border-0"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder.jpg";
                    }}
                  />
                  {/* Quantity Badge */}
                  <div className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-800 truncate">
                    {item.name}
                  </h5>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                </div>

                {/* Item Subtotal */}
                <div className="font-bold text-primary whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Summary Details */}
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-600">Pengiriman</span>
            <div className="text-xs text-gray-500 mt-1">
              {getShippingText(shippingMethod)}
            </div>
          </div>
          <span
            className={`font-medium ${shippingCost === 0 ? "text-green-600" : ""}`}
          >
            {shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-800">
            Total Pembayaran
          </span>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(total)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Termasuk pajak</div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="mt-6 p-4 bg-primary-soft/30 rounded-lg border border-primary-soft">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            id="agree-terms"
            className="w-5 h-5 text-primary focus:ring-primary/30 focus:ring-2 mt-0.5"
            required
          />
          <div>
            <span className="text-sm text-gray-700">
              Saya menyetujui{" "}
              <button
                type="button"
                className="text-primary font-medium hover:underline focus:outline-none"
                onClick={() => {
                  // Terms modal will be implemented later
                  alert("Syarat & Ketentuan akan ditampilkan di sini");
                }}
              >
                Syarat & Ketentuan
              </button>{" "}
              yang berlaku
            </span>
            <p className="text-xs text-gray-500 mt-1">
              Dengan mencentang kotak ini, Anda menyetujui semua syarat
              pembelian.
            </p>
          </div>
        </label>
      </div>

      {/* Security Note */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <i className="fas fa-lock text-green-500"></i>
          <span>Transaksi Anda aman dan terenkripsi</span>
        </div>
      </div>
    </div>
  );
}
