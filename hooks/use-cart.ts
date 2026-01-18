// hooks/useCart.ts
"use client";

import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  productId: number;
  quantity: number;
  addedAt: Date;
}

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

// Cart key untuk localStorage
const CART_STORAGE_KEY = "bakule_kembang_cart_v2";

export function useCart() {
  // State untuk cart items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize from localStorage pada client side saja
    if (typeof window === "undefined") return [];

    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Konversi string date back ke Date object
        return parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }

    return [];
  });

  // State untuk cart metadata (total, count, dll)
  const [cartMetadata, setCartMetadata] = useState({
    totalItems: 0,
    totalQuantity: 0,
    lastUpdated: new Date(),
  });

  // Calculate cart metadata
  const calculateMetadata = useCallback((items: CartItem[]) => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalItems = items.length;

    return {
      totalItems,
      totalQuantity,
      lastUpdated: new Date(),
    };
  }, []);

  // Save to localStorage dan update metadata
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // Simpan ke localStorage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));

      // Update metadata
      const newMetadata = calculateMetadata(cartItems);
      setCartMetadata(newMetadata);

      // Dispatch custom event untuk komponen lain (navbar, dll)
      window.dispatchEvent(
        new CustomEvent("cartUpdated", {
          detail: {
            cartItems,
            ...newMetadata,
          },
        }),
      );

      // Dispatch untuk analytics atau logging jika perlu
      window.dispatchEvent(
        new CustomEvent("cartChanged", {
          detail: {
            action: "cart_updated",
            items: cartItems,
            timestamp: new Date().toISOString(),
          },
        }),
      );
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems, calculateMetadata]);

  // Add item to cart
  const addToCart = useCallback((productId: number, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === productId);

      if (existingItem) {
        // Update quantity jika item sudah ada
        return prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + quantity,
                addedAt: new Date(), // Update timestamp
              }
            : item,
        );
      }

      // Tambah item baru
      return [
        ...prev,
        {
          productId,
          quantity,
          addedAt: new Date(),
        },
      ];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity, addedAt: new Date() }
            : item,
        ),
      );
    },
    [removeFromCart],
  );

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Check if product is in cart
  const isInCart = useCallback(
    (productId: number): boolean => {
      return cartItems.some((item) => item.productId === productId);
    },
    [cartItems],
  );

  // Get quantity of specific product
  const getProductQuantity = useCallback(
    (productId: number): number => {
      const item = cartItems.find((item) => item.productId === productId);
      return item ? item.quantity : 0;
    },
    [cartItems],
  );

  // Calculate total price (butuh product details)
  const calculateTotalPrice = useCallback(
    (products: ProductDetails[]): number => {
      return cartItems.reduce((total, cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);
        return total + (product ? product.price * cartItem.quantity : 0);
      }, 0);
    },
    [cartItems],
  );

  // Get cart item details dengan product info
  const getCartWithDetails = useCallback(
    (products: ProductDetails[]) => {
      return cartItems.map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.productId);
        return {
          ...cartItem,
          product: product || null,
          subtotal: product ? product.price * cartItem.quantity : 0,
        };
      });
    },
    [cartItems],
  );

  // Load cart from external source (API, dll)
  const loadCart = useCallback((items: CartItem[]) => {
    setCartItems(
      items.map((item) => ({
        ...item,
        addedAt: new Date(item.addedAt),
      })),
    );
  }, []);

  // Sync cart dengan server (contoh untuk nanti)
  const syncWithServer = useCallback(async () => {
    try {
      // Di sini bisa panggil API untuk sync cart
      // const response = await fetch('/api/cart/sync', {
      //   method: 'POST',
      //   body: JSON.stringify(cartItems)
      // });
      console.log("Cart synced with server:", cartItems);
    } catch (error) {
      console.error("Failed to sync cart with server:", error);
    }
  }, [cartItems]);

  // Export cart data untuk backup/download
  const exportCart = useCallback((): string => {
    return JSON.stringify(
      {
        items: cartItems,
        metadata: cartMetadata,
        exportedAt: new Date().toISOString(),
      },
      null,
      2,
    );
  }, [cartItems, cartMetadata]);

  // Import cart data
  const importCart = useCallback(
    (cartData: string) => {
      try {
        const parsed = JSON.parse(cartData);
        if (parsed.items && Array.isArray(parsed.items)) {
          loadCart(parsed.items);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Failed to import cart:", error);
        return false;
      }
    },
    [loadCart],
  );

  // Event listener untuk external updates (jika perlu)
  useEffect(() => {
    const handleStorageUpdate = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY && event.newValue) {
        try {
          const newCart = JSON.parse(event.newValue);
          setCartItems(newCart);
        } catch (error) {
          console.error("Failed to sync cart from storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageUpdate);
    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, []);

  return {
    // State
    cartItems,
    cartMetadata,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    syncWithServer,
    exportCart,
    importCart,

    // Queries
    isInCart,
    getProductQuantity,
    calculateTotalPrice,
    getCartWithDetails,

    // Convenience getters
    totalItems: cartMetadata.totalItems,
    totalQuantity: cartMetadata.totalQuantity,
    lastUpdated: cartMetadata.lastUpdated,

    // Utility
    isEmpty: cartItems.length === 0,
    hasItems: cartItems.length > 0,
  };
}

// Export tipe untuk digunakan di komponen lain
export type UseCartReturnType = ReturnType<typeof useCart>;
