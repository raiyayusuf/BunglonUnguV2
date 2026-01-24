// components/layout/cartBadge.tsx
"use client";

import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

export default function CartBadge() {
  const { totalQuantity } = useCart();

  return (
    <Link
      href="/cart"
      className="relative p-2 hover:bg-primary-soft rounded-lg transition-colors"
    >
      <div className="relative">
        <i className="fas fa-shopping-cart text-xl text-primary-dark"></i>

        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-once">
            {totalQuantity}
          </span>
        )}
      </div>
    </Link>
  );
}
