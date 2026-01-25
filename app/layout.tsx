/* 
  app/layout.tsx
  Organized by: raiyayusuf
*/

"use client";

import { useState, useEffect, useCallback } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CartSidebar from "@/components/ecommerce/cart-sidebar";
import { getCartCount } from "@/lib/services/cart-service";

/* ============================================
   FONT CONFIGURATION
   ============================================ */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

/* ============================================
   EVENT TYPE DEFINITIONS
   ============================================ */
declare global {
  interface WindowEventMap {
    cartUpdated: CustomEvent;
  }
}

/* ============================================
   MAIN LAYOUT COMPONENT
   ============================================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ============================================
  // STATE MANAGEMENT
  // ============================================

  /* Cart visibility state */
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* Cart item count state */
  const [cartCount, setCartCount] = useState(0);

  // ============================================
  // SIDE EFFECTS & EVENT LISTENERS
  // ============================================

  /**
   * Effect: Initialize cart count and setup event listener
   * Runs once on component mount
   */
  useEffect(() => {
    /* Initial cart count load */
    const count = getCartCount();
    setCartCount(count);

    /**
     * Event Handler: Cart Updated
     * Updates cart count when cart changes
     */
    const handleCartUpdated = () => {
      setCartCount(getCartCount());
    };

    /* Add event listener for cart updates */
    window.addEventListener("cartUpdated", handleCartUpdated);

    /* Cleanup: Remove event listener on unmount */
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, []); // Empty dependency array = run once on mount

  // ============================================
  // EVENT HANDLERS
  // ============================================

  /**
   * Handler: Cart Button Click
   * Opens the cart sidebar
   */
  const handleCartClick = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  /**
   * Handler: Close Cart Sidebar
   * Closes the cart sidebar
   */
  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  // ============================================
  // RENDER COMPONENT
  // ============================================
  return (
    <html lang="id" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* ============================================
            META TAGS & EXTERNAL RESOURCES
            ============================================ */}

        {/* Primary page title */}
        <title>Bakule Kembang | Florist Yogyakarta</title>

        {/* SEO Meta description */}
        <meta
          name="description"
          content="Bakule Kembang - Florist terpercaya di Yogyakarta menyediakan berbagai rangkaian bunga segar untuk segala acara."
        />

        {/* Viewport for responsive design */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Font Awesome Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#7e60bf" />
      </head>

      <body className="font-poppins min-h-screen flex flex-col bg-bg-light">
        {/* ============================================
            PAGE STRUCTURE
            ============================================ */}

        {/* Header Navigation */}
        <Navbar cartCount={cartCount} onCartClick={handleCartClick} />

        {/* Cart Sidebar (Conditional Render) */}
        <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />

        {/* Main Content Area */}
        <main className="flex-grow">{children}</main>

        {/* Footer Section */}
        <Footer />

        {/* ============================================
            PERFORMANCE OPTIMIZATIONS
            ============================================ */}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      </body>
    </html>
  );
}

/* ============================================
   EXPORT CONFIGURATION
   ============================================ */
export const dynamic = "force-dynamic";
