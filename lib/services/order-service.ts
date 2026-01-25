/* 
  lib/services/order-service.ts
  Organized by: raiyayusuf
*/

/* ============================================
   TYPE DEFINITIONS
   ============================================ */
export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postal: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderData {
  orderId: string;
  customer: OrderCustomer;
  shipping: string;
  payment: string;
  notes: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  orderDate: string;
  isPartialCheckout?: boolean;
}

export interface OrderStatus {
  text: string;
  color: string;
}

/* ============================================
   CONSTANTS & CONFIGURATION
   ============================================ */
const ORDERS_KEY = "bakule_kembang_orders";

/* ============================================
   CORE ORDER OPERATIONS
   ============================================ */

/**
 * Get all orders from localStorage
 * @returns OrderData[] - Array of orders, sorted by date (newest first)
 */
export function getAllOrders(): OrderData[] {
  try {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    return orders.sort(
      (a: OrderData, b: OrderData) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
    );
  } catch (error) {
    console.error("❌ Error loading orders from localStorage:", error);
    return [];
  }
}

/**
 * Get single order by ID
 * @param orderId - Order ID to find
 * @returns OrderData | undefined - Found order or undefined
 */
export function getOrderById(orderId: string): OrderData | undefined {
  const orders = getAllOrders();
  return orders.find((order) => order.orderId === orderId);
}

/**
 * Save new order to localStorage
 * @param orderData - Order data to save
 * @returns OrderData - Saved order data
 */
export function saveOrder(orderData: OrderData): OrderData {
  try {
    const orders = getAllOrders();
    orders.unshift(orderData); // Add to beginning (newest first)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    console.log(
      `💾 Order saved: ${orderData.orderId}, Total: ${formatPrice(orderData.total)}`,
    );
    return orderData;
  } catch (error) {
    console.error("❌ Error saving order to localStorage:", error);
    throw new Error("Failed to save order");
  }
}

/**
 * Generate unique order ID
 * @returns string - Generated order ID
 */
export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/* ============================================
   ORDER FORMATTING & UTILITIES
   ============================================ */

/**
 * Format order date to Indonesian locale
 * @param dateString - ISO date string
 * @returns string - Formatted date string
 */
export function formatOrderDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("❌ Error formatting order date:", error);
    return dateString;
  }
}

/**
 * Get order status based on order date
 * @param order - Order data
 * @returns OrderStatus - Status with text and color
 */
export function getOrderStatus(order: OrderData): OrderStatus {
  try {
    const orderDate = new Date(order.orderDate);
    const now = new Date();
    const diffHours = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);

    if (diffHours < 1) return { text: "Diproses", color: "#2196F3" };
    if (diffHours < 24) return { text: "Dikirim", color: "#FF9800" };
    return { text: "Selesai", color: "#4CAF50" };
  } catch (error) {
    console.error("❌ Error calculating order status:", error);
    return { text: "Diproses", color: "#2196F3" };
  }
}

/**
 * Get payment method display text
 * @param code - Payment method code
 * @returns string - Display text for payment method
 */
export function getPaymentMethodText(code: string): string {
  const methods: Record<string, string> = {
    "bank-transfer": "Transfer Bank",
    "credit-card": "Kartu Kredit",
    "e-wallet": "E-Wallet",
    cod: "Bayar di Tempat (COD)",
  };
  return methods[code] || code;
}

/**
 * Get shipping method display text
 * @param code - Shipping method code
 * @returns string - Display text for shipping method
 */
export function getShippingMethodText(code: string): string {
  const methods: Record<string, string> = {
    express: "Express (1-2 hari)",
    "same-day": "Same Day (Hari ini)",
    regular: "Reguler (3-5 hari)",
  };
  return methods[code] || code;
}

/**
 * Get shipping cost based on method
 * @param method - Shipping method code
 * @returns number - Shipping cost
 */
export function getShippingCost(method: string): number {
  switch (method) {
    case "express":
      return 25000;
    case "same-day":
      return 50000;
    default:
      return 0; // regular
  }
}

/**
 * Get shipping estimate text
 * @param method - Shipping method code
 * @returns string - Shipping estimate text
 */
export function getShippingEstimate(method: string): string {
  switch (method) {
    case "express":
      return "1-2 hari kerja";
    case "same-day":
      return "Hari ini (jika order sebelum jam 14:00)";
    default:
      return "3-5 hari kerja";
  }
}

/* ============================================
   FORMATTING HELPER
   ============================================ */

/**
 * Format price to Indonesian Rupiah
 * @param price - Price to format
 * @returns string - Formatted price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

/* ============================================
   EXPORT CONFIGURATION
   ============================================ */
export default {
  getAllOrders,
  getOrderById,
  saveOrder,
  generateOrderId,
  formatOrderDate,
  getOrderStatus,
  getPaymentMethodText,
  getShippingMethodText,
  getShippingCost,
  getShippingEstimate,
  formatPrice,
};
