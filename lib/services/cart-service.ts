// lib/services/cart-service.ts:
import { Product } from "@/lib/data/products";

// ===== TYPES =====
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

// ===== CONSTANTS =====
const CART_STORAGE_KEY = "bakule_kembang_cart_v2";

// ===== UTILITIES =====
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

// ===== FIX: Better event dispatch =====
let updateTimeout: NodeJS.Timeout | null = null;

function updateCartUI(): void {
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }

  updateTimeout = setTimeout(() => {
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, 50);
}

// ===== CORE CART FUNCTIONS =====
export function addToCart(product: Product, quantity: number = 1): boolean {
  console.log(
    `🛒 [CART SERVICE] addToCart - ID: ${product.id}, Qty: ${quantity}`,
  );

  const cart = getCartFromStorage();
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  // ========== FIX: Prevent duplicate addition ==========
  if (existingItemIndex >= 0) {
    // Update existing item
    cart[existingItemIndex].quantity += quantity;
    cart[existingItemIndex].addedAt = new Date();
    console.log(`📈 Updated quantity to: ${cart[existingItemIndex].quantity}`);
  } else {
    // Add new item - FIX: Add only once
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

// ===== GETTER FUNCTIONS =====
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

// ===== FORMATTING =====
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

// ===== INITIAL SETUP =====
if (typeof window !== "undefined") {
  // Initialize cart on load
  setTimeout(() => {
    updateCartUI();
  }, 100);
}
