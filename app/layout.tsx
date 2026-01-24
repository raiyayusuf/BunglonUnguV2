// app/layout.tsx

"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CartSidebar from "@/components/ecommerce/cart-sidebar";
import { getCartCount } from "@/lib/services/cart-service";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Load cart count
  useEffect(() => {
    const count = getCartCount();
    setCartCount(count);

    const handleCartUpdated = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener("cartUpdated", handleCartUpdated);
    return () => window.removeEventListener("cartUpdated", handleCartUpdated);
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  return (
    <html lang="id" className={poppins.variable}>
      <head>
        <title>Bakule Kembang</title>
        <meta name="description" content="Florist Yogyakarta" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-poppins min-h-screen flex flex-col bg-gray-50">
        <Navbar cartCount={cartCount} onCartClick={handleCartClick} />
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
