/* 
  lib/services/cart-service.ts
  Organized by: raiyayusuf
*/

import { Product } from "@/lib/data/products";

/* ============================================
   INTERFACES
   ============================================ */
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  flowerType: string;
  addedAt: Date;
}

/* ============================================
   CONSTANTS
   ============================================ */
const CART_STORAGE_KEY = "bakule_kembang_cart_v2";
const SELECTED_ITEMS_KEY = "bakule_kembang_selected_items";

/* ============================================
   STORAGE FUNCTIONS
   ============================================ */
function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((item: any) => ({
        ...item,
        addedAt: new Date(item.addedAt),
      }));
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
  }

  return [];
}

function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
}

/* ============================================
   EVENT DISPATCH MANAGEMENT
   ============================================ */
let updateTimeout: NodeJS.Timeout | null = null;

function updateCartUI(): void {
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }

  updateTimeout = setTimeout(() => {
    const cart = getCartFromStorage();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: { items: cart, total, count },
      }),
    );
  }, 50);
}

/* ============================================
   CORE CART ACTIONS
   ============================================ */
export function addToCart(product: Product, quantity: number = 1): boolean {
  console.log(
    `🛒 [CART SERVICE] addToCart - ID: ${product.id}, Qty: ${quantity}`,
  );

  const cart = getCartFromStorage();
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
    cart[existingItemIndex].addedAt = new Date();
    console.log(`📈 Updated quantity to: ${cart[existingItemIndex].quantity}`);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      category: product.category,
      flowerType: product.flowerType,
      addedAt: new Date(),
    });
    console.log(`🆕 Added new item: ${product.name}`);
  }

  saveCartToStorage(cart);
  updateCartUI();
  return true;
}

export function removeFromCart(productId: number): boolean {
  const cart = getCartFromStorage();
  const initialLength = cart.length;
  const newCart = cart.filter((item) => item.id !== productId);

  if (newCart.length < initialLength) {
    saveCartToStorage(newCart);
    updateCartUI();
    return true;
  }
  return false;
}

export function updateQuantity(
  productId: number,
  newQuantity: number,
): boolean {
  if (newQuantity < 1) {
    return removeFromCart(productId);
  }

  const cart = getCartFromStorage();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity = newQuantity;
    item.addedAt = new Date();
    saveCartToStorage(cart);
    updateCartUI();
    return true;
  }
  return false;
}

export function clearCart(): boolean {
  saveCartToStorage([]);
  updateCartUI();
  return true;
}

/* ============================================
   CART GETTERS
   ============================================ */
export function getCart(): CartItem[] {
  return getCartFromStorage();
}

export function getCartItem(productId: number): CartItem | undefined {
  const cart = getCartFromStorage();
  return cart.find((item) => item.id === productId);
}

export function getCartTotal(): number {
  const cart = getCartFromStorage();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartCount(): number {
  const cart = getCartFromStorage();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function isInCart(productId: number): boolean {
  const cart = getCartFromStorage();
  return cart.some((item) => item.id === productId);
}

/* ============================================
   CHECKOUT-SPECIFIC FUNCTIONS (NEW)
   ============================================ */

/**
 * Remove multiple products from cart (for partial checkout)
 */
export function removeMultipleFromCart(productIds: number[]): boolean {
  const cart = getCartFromStorage();
  const initialLength = cart.length;
  const newCart = cart.filter((item) => !productIds.includes(item.id));

  if (newCart.length < initialLength) {
    saveCartToStorage(newCart);
    updateCartUI();
    return true;
  }
  return false;
}

/**
 * Get total for selected items only
 */
export function getSelectedItemsTotal(selectedIds: number[]): number {
  const cart = getCartFromStorage();
  return cart
    .filter((item) => selectedIds.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Get cart items by IDs
 */
export function getCartItemsByIds(ids: number[]): CartItem[] {
  const cart = getCartFromStorage();
  return cart.filter((item) => ids.includes(item.id));
}

/**
 * Get selected cart items (for partial checkout)
 */
export function getSelectedCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];

  const selectedIds = JSON.parse(
    localStorage.getItem(SELECTED_ITEMS_KEY) || "[]",
  );

  if (selectedIds.length === 0) {
    return getCart();
  }

  return getCart().filter((item) => selectedIds.includes(item.id));
}

/**
 * Get total for selected cart items
 */
export function getSelectedCartTotal(): number {
  const selectedItems = getSelectedCartItems();
  return selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

/**
 * Save selected items for checkout
 */
export function saveSelectedItems(productIds: number[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(SELECTED_ITEMS_KEY, JSON.stringify(productIds));
  } catch (error) {
    console.error("Failed to save selected items:", error);
  }
}

/**
 * Clear selected items from localStorage
 */
export function clearSelectedItems(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SELECTED_ITEMS_KEY);
}

/**
 * Get current selected item IDs
 */
export function getSelectedItemIds(): number[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(SELECTED_ITEMS_KEY) || "[]");
  } catch (error) {
    console.error("Failed to get selected items:", error);
    return [];
  }
}

/* ============================================
   FORMATTING FUNCTIONS
   ============================================ */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

/* ============================================
   INITIALIZATION
   ============================================ */
if (typeof window !== "undefined") {
  setTimeout(() => {
    updateCartUI();
  }, 100);
}
