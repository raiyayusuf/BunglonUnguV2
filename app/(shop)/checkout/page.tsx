/* 
  app/(shop)/checkout/page.tsx
  Organized by: raiyayusuf
  Main checkout page - Integrates all checkout components
*/

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

/* ============================================
   IMPORT COMPONENTS
   ============================================ */
import CheckoutForm, {
  CheckoutFormData,
} from "@/components/ecommerce/checkout-form";
import OrderSummary from "@/components/ecommerce/order-summary";
import PaymentOptions from "@/components/ecommerce/payment-options";
import ShippingOptions from "@/components/ecommerce/shipping-options";

/* ============================================
   IMPORT SERVICES & UTILITIES
   ============================================ */
import {
  CartItem,
  clearSelectedItems,
  formatPrice,
  getCart,
  getSelectedCartItems,
  getSelectedItemIds,
  removeMultipleFromCart,
} from "@/lib/services/cart-service";
import {
  generateOrderId,
  getShippingCost,
  OrderCustomer,
  saveOrder,
  OrderData as ServiceOrderData,
} from "@/lib/services/order-service";

/* ============================================
   TYPE DEFINITIONS
   ============================================ */
// Extend from service OrderData to ensure compatibility
interface PageOrderData extends CheckoutFormData {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  orderDate: string;
  isPartialCheckout: boolean;
}

/* ============================================
   MAIN CHECKOUT PAGE COMPONENT
   ============================================ */
export default function CheckoutPage() {
  /* ============================================
     STATE MANAGEMENT
     ============================================ */
  const router = useRouter();

  // Cart & Items State
  const [cartItems, setCartItems] = useState(getCart());
  const [selectedItems, setSelectedItems] = useState<CartItem[]>(
    getSelectedCartItems(),
  );
  const [isPartialCheckout, setIsPartialCheckout] = useState(false);

  // Form State
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    shipping: "regular",
    payment: "bank-transfer",
    notes: "",
  });

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<ServiceOrderData | null>(
    null,
  );
  const [error, setError] = useState<string>("");

  /* ============================================
     CALCULATED VALUES
     ============================================ */
  const shippingCost = getShippingCost(formData.shipping);
  const subtotal = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = subtotal + shippingCost;
  const itemCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  /* ============================================
     EFFECTS & INITIALIZATION
     ============================================ */
  useEffect(() => {
    // Check if we have cart items
    const allCartItems = getCart();
    if (allCartItems.length === 0) {
      router.push("/cart");
      return;
    }

    setCartItems(allCartItems);

    // Check for partial checkout
    const selectedIds = getSelectedItemIds();
    const currentSelectedItems = getSelectedCartItems();

    setSelectedItems(currentSelectedItems);
    setIsPartialCheckout(selectedIds.length > 0);

    // Auto-fill form from localStorage if available
    const savedFormData = localStorage.getItem("bakule_kembang_checkout_form");
    if (savedFormData) {
      try {
        const parsed = JSON.parse(savedFormData);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Error loading saved form data:", error);
      }
    }
  }, [router]);

  // Save form data to localStorage on change
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(
        "bakule_kembang_checkout_form",
        JSON.stringify(formData),
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData]);

  /* ============================================
     EVENT HANDLERS
     ============================================ */

  /**
   * Handle form data change from CheckoutForm
   */
  const handleFormSubmit = (data: CheckoutFormData) => {
    setFormData(data);
  };

  /**
   * Handle shipping option change
   */
  const handleShippingChange = (optionId: string) => {
    setFormData((prev) => ({ ...prev, shipping: optionId }));
  };

  /**
   * Handle payment option change
   */
  const handlePaymentChange = (optionId: string) => {
    setFormData((prev) => ({ ...prev, payment: optionId }));
  };

  /**
   * Validate terms checkbox
   */
  const validateTerms = (): boolean => {
    const termsCheckbox = document.getElementById(
      "agree-terms",
    ) as HTMLInputElement;
    if (!termsCheckbox?.checked) {
      setError("Anda harus menyetujui Syarat & Ketentuan terlebih dahulu.");
      termsCheckbox?.focus();
      return false;
    }
    return true;
  };

  /**
   * Prepare order data for service
   */
  const prepareOrderData = (): ServiceOrderData => {
    // Prepare customer object
    const customer: OrderCustomer = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      postal: formData.postal,
    };

    // Prepare order items
    const orderItems = selectedItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      category: item.category,
      flowerType: item.flowerType,
    }));

    // Return properly formatted order data
    return {
      orderId: generateOrderId(),
      customer: customer,
      shipping: formData.shipping,
      payment: formData.payment,
      notes: formData.notes || "",
      items: orderItems,
      subtotal: subtotal,
      shippingCost: shippingCost,
      total: total,
      orderDate: new Date().toISOString(),
      isPartialCheckout: isPartialCheckout,
    };
  };

  /**
   * Handle place order submission
   */
  const handlePlaceOrder = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!validateTerms()) return;

    if (selectedItems.length === 0) {
      setError(
        "Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.",
      );
      return;
    }

    // Validate required fields
    const requiredFields = [
      "name",
      "phone",
      "email",
      "address",
      "city",
      "postal",
    ];
    const missingField = requiredFields.find(
      (field) => !formData[field as keyof CheckoutFormData]?.trim(),
    );

    if (missingField) {
      const fieldNames: Record<string, string> = {
        name: "Nama Lengkap",
        phone: "Nomor Telepon",
        email: "Email",
        address: "Alamat",
        city: "Kota",
        postal: "Kode Pos",
      };
      setError(
        `Harap lengkapi field: ${fieldNames[missingField] || missingField}`,
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare and save order data
      const orderData = prepareOrderData();
      saveOrder(orderData);

      // Remove items from cart
      if (isPartialCheckout) {
        const selectedIds = getSelectedItemIds();
        removeMultipleFromCart(selectedIds);
      } else {
        // Clear entire cart if full checkout
        const { clearCart } = await import("@/lib/services/cart-service");
        clearCart();
      }

      // Clear selected items
      clearSelectedItems();

      // Clear saved form data
      localStorage.removeItem("bakule_kembang_checkout_form");

      // Set success state
      setOrderDetails(orderData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Order submission error:", error);
      setError("Terjadi kesalahan saat memproses order. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle success modal close
   */
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push("/");
  };

  /**
   * Handle view order details
   */
  const handleViewOrderDetails = () => {
    if (orderDetails) {
      router.push(`/orders/${orderDetails.orderId}`);
    }
  };

  /**
   * Handle continue shopping
   */
  const handleContinueShopping = () => {
    router.push("/products");
  };

  /**
   * Handle view cart
   */
  const handleViewCart = () => {
    router.push("/cart");
  };

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-soft to-white">
      {/* ============================================
         PAGE HEADER
         ============================================ */}
      <div className="bg-gradient-to-br from-primary-dark to-primary py-8 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <i className="fas fa-credit-card mr-3"></i>
                Checkout
              </h1>
              <p className="text-primary-light">
                Langkah terakhir untuk mendapatkan bunga indah Anda
              </p>
            </div>

            <Link
              href="/cart"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <i className="fas fa-arrow-left"></i>
              Kembali ke Keranjang
            </Link>
          </div>

          {/* Selected Items Notice */}
          {isPartialCheckout && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-300 text-xl"></i>
                <div>
                  <p className="font-medium">
                    Checkout {selectedItems.length} produk terpilih
                  </p>
                  <p className="text-sm text-primary-light mt-1">
                    Hanya produk yang dipilih akan diproses
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Steps */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center">
              {/* Step 1: Cart */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white text-primary-dark flex items-center justify-center font-bold">
                  1
                </div>
                <span className="text-sm mt-2">Keranjang</span>
              </div>

              <div className="w-16 h-1 bg-white/30 mx-4"></div>

              {/* Step 2: Checkout */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white text-primary-dark flex items-center justify-center font-bold">
                  2
                </div>
                <span className="text-sm mt-2 font-bold">Checkout</span>
              </div>

              <div className="w-16 h-1 bg-white/30 mx-4"></div>

              {/* Step 3: Complete */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/30 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <span className="text-sm mt-2 text-white/70">Selesai</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
         MAIN CONTENT
         ============================================ */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-3">
              <i className="fas fa-exclamation-circle text-red-500"></i>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ============================================
             LEFT COLUMN: FORMS (2/3 width)
             ============================================ */}
          <div className="lg:col-span-2 space-y-8">
            {/* Checkout Form */}
            <CheckoutForm onSubmit={handleFormSubmit} initialData={formData} />

            {/* Shipping Options */}
            <ShippingOptions
              selectedOption={formData.shipping}
              onSelect={handleShippingChange}
            />

            {/* Payment Options */}
            <PaymentOptions
              selectedOption={formData.payment}
              onSelect={handlePaymentChange}
            />
          </div>

          {/* ============================================
             RIGHT COLUMN: ORDER SUMMARY (1/3 width)
             ============================================ */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={selectedItems}
              shippingCost={shippingCost}
              subtotal={subtotal}
              total={total}
              itemCount={itemCount}
              shippingMethod={formData.shipping}
            />

            {/* Place Order Button */}
            <div className="mt-6">
              <form onSubmit={handlePlaceOrder}>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedItems.length === 0}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting || selectedItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-br from-primary to-primary-dark hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  } text-white shadow-lg`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock"></i>
                      Bayar Sekarang - {formatPrice(total)}
                    </>
                  )}
                </button>
              </form>

              {/* Continue Shopping Link */}
              <div className="mt-4 text-center">
                <button
                  onClick={handleContinueShopping}
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Lanjutkan Belanja
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================
           SECURITY & TRUST BADGES
           ============================================ */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-shield-alt text-green-600 text-xl"></i>
              </div>
              <p className="font-medium text-gray-800">Pembayaran Aman</p>
              <p className="text-sm text-gray-600 mt-1">SSL 256-bit</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-truck text-blue-600 text-xl"></i>
              </div>
              <p className="font-medium text-gray-800">Pengiriman Cepat</p>
              <p className="text-sm text-gray-600 mt-1">1-5 hari kerja</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-headset text-purple-600 text-xl"></i>
              </div>
              <p className="font-medium text-gray-800">Dukungan 24/7</p>
              <p className="text-sm text-gray-600 mt-1">CS Responsif</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-undo text-orange-600 text-xl"></i>
              </div>
              <p className="font-medium text-gray-800">Garansi</p>
              <p className="text-sm text-gray-600 mt-1">Kepuasan terjamin</p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
         MOBILE BACK BUTTON
         ============================================ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <div className="flex gap-3">
          <button
            onClick={handleViewCart}
            className="flex-1 py-3 border-2 border-primary text-primary rounded-lg font-medium"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Kembali
          </button>
          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting || selectedItems.length === 0}
            className={`flex-1 py-3 rounded-lg font-medium ${
              isSubmitting || selectedItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-br from-primary to-primary-dark text-white"
            }`}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Proses...
              </>
            ) : (
              <>
                <i className="fas fa-lock mr-2"></i>
                Bayar
              </>
            )}
          </button>
        </div>
      </div>

      {/* ============================================
         SIMPLE SUCCESS MODAL
         ============================================ */}
      {showSuccessModal && orderDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                🎉 Order Berhasil!
              </h3>
              <p className="text-gray-600">
                Terima kasih telah berbelanja di Bakule Kembang!
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">No. Order:</span>
                  <span className="font-bold text-primary-dark">
                    {orderDetails.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-primary">
                    {formatPrice(orderDetails.total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">
                    {orderDetails.customer.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleViewOrderDetails}
                className="w-full py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary-soft transition-colors"
              >
                <i className="fas fa-file-alt mr-2"></i>
                Lihat Detail Order
              </button>
              <button
                onClick={handleSuccessClose}
                className="w-full py-3 bg-gradient-to-br from-primary to-primary-dark text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <i className="fas fa-home mr-2"></i>
                Kembali ke Beranda
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Konfirmasi order telah dikirim ke email Anda
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
