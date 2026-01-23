// lib\services\cart-service.ts:
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

export interface SelectedItems {
  productId: number;
  quantity: number;
}

// ===== CONSTANTS =====
const CART_STORAGE_KEY = "bakule_kembang_cart_v2";
const SELECTED_ITEMS_KEY = "bakule_kembang_selected_items";

// ===== UTILITIES =====
function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert string dates back to Date objects
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

function updateCartUI(): void {
  const cart = getCartFromStorage();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Dispatch custom event untuk update UI di komponen lain
  window.dispatchEvent(
    new CustomEvent("cartUpdated", {
      detail: {
        items: cart,
        total: totalPrice,
        count: totalCount,
      },
    }),
  );
}

// ===== CORE CART FUNCTIONS =====
export function addToCart(product: Product, quantity: number = 1): boolean {
  console.log(
    `🛒 [CART SERVICE] addToCart - ID: ${product.id}, Qty: ${quantity}`,
  );

  const cart = getCartFromStorage();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    console.log(
      `📈 Updating quantity from ${existingItem.quantity} to ${existingItem.quantity + quantity}`,
    );
    existingItem.quantity += quantity;
    existingItem.addedAt = new Date(); // Update timestamp
  } else {
    console.log(`🆕 Adding new item: ${product.name}`);
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
  }

  saveCartToStorage(cart);
  console.log(`💾 Cart saved. Total items: ${cart.length}`);

  // Debounce UI update
  setTimeout(() => updateCartUI(), 10);
  return true;
}

export function removeFromCart(productId: number): boolean {
  const cart = getCartFromStorage();
  const initialLength = cart.length;
  const newCart = cart.filter((item) => item.id !== productId);

  if (newCart.length < initialLength) {
    saveCartToStorage(newCart);
    setTimeout(() => updateCartUI(), 10);
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
    setTimeout(() => updateCartUI(), 10);
    return true;
  }
  return false;
}

export function clearCart(): boolean {
  saveCartToStorage([]);
  if (typeof window !== "undefined") {
    localStorage.removeItem(SELECTED_ITEMS_KEY);
  }
  setTimeout(() => updateCartUI(), 10);
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

// ===== BULK OPERATIONS =====
export function removeMultipleFromCart(productIds: number[]): boolean {
  const cart = getCartFromStorage();
  const initialLength = cart.length;
  const newCart = cart.filter((item) => !productIds.includes(item.id));

  if (newCart.length < initialLength) {
    saveCartToStorage(newCart);
    setTimeout(() => updateCartUI(), 10);
    return true;
  }
  return false;
}

export function getSelectedItemsTotal(selectedIds: number[]): number {
  const cart = getCartFromStorage();
  return cart
    .filter((item) => selectedIds.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartItemsByIds(ids: number[]): CartItem[] {
  const cart = getCartFromStorage();
  return cart.filter((item) => ids.includes(item.id));
}

// ===== SELECTED ITEMS (for bulk checkout) =====
export function getSelectedCartItems(): CartItem[] {
  const cart = getCartFromStorage();

  if (typeof window === "undefined") return cart;

  try {
    const selectedIds = JSON.parse(
      localStorage.getItem(SELECTED_ITEMS_KEY) || "[]",
    ) as number[];

    if (selectedIds.length === 0) {
      // If no selected items, return all cart items (normal checkout)
      return cart;
    }

    // Filter cart to only selected items
    return cart.filter((item) => selectedIds.includes(item.id));
  } catch (error) {
    console.error("Error getting selected cart items:", error);
    return cart;
  }
}

export function getSelectedCartTotal(): number {
  const selectedItems = getSelectedCartItems();
  return selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

export function saveSelectedItems(selectedIds: number[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(SELECTED_ITEMS_KEY, JSON.stringify(selectedIds));
  } catch (error) {
    console.error("Error saving selected items:", error);
  }
}

export function clearSelectedItems(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SELECTED_ITEMS_KEY);
}

// ===== PRODUCT DETAILS HELPERS =====
export function getProductDetailsFromCart(): Array<
  CartItem & { subtotal: number }
> {
  const cart = getCartFromStorage();
  return cart.map((item) => ({
    ...item,
    subtotal: item.price * item.quantity,
  }));
}

// ===== INITIAL CART UI UPDATE =====
// Update cart UI on initial load
if (typeof window !== "undefined") {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    updateCartUI();
  }, 100);

  // Listen for storage changes from other tabs
  window.addEventListener("storage", (event) => {
    if (event.key === CART_STORAGE_KEY) {
      updateCartUI();
    }
  });
}

// ===== EXPORT FOR BACKWARDS COMPATIBILITY =====
// Export semua fungsi yang mungkin dipanggil dari V1
export default {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCart,
  getCartItem,
  getCartTotal,
  getCartCount,
  isInCart,
  formatPrice,
  removeMultipleFromCart,
  getSelectedItemsTotal,
  getCartItemsByIds,
  getSelectedCartItems,
  getSelectedCartTotal,
  saveSelectedItems,
  clearSelectedItems,
  getProductDetailsFromCart,
};
