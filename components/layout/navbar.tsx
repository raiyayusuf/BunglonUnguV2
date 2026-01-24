// components/layout/navbar.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// PROPS INTERFACE HARUS ADA!
interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileRotation, setMobileRotation] = useState(0);
  const pathname = usePathname();

  // Refs untuk detect click outside
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside handler untuk mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle mobile hamburger click
  const handleMobileHamburgerClick = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    setMobileRotation((prev) => prev + 90);
  };

  const navLinks = [
    { href: "/", label: "Home", icon: "fa-home" },
    { href: "/products", label: "Produk", icon: "fa-store" },
    { href: "/categories", label: "Kategori", icon: "fa-list" },
    { href: "/orders", label: "Riwayat", icon: "fa-history" },
    { href: "/about", label: "Tentang", icon: "fa-info-circle" },
    { href: "/contact", label: "Kontak", icon: "fa-phone" },
  ];

  // Check if link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <nav className="font-poppins sticky top-0 z-50 bg-gradient-to-br from-primary-dark to-primary py-4 shadow-bunglon">
      <div className="max-w-[1500px] mx-auto px-4 md:px-10 flex justify-between items-center">
        {/* Desktop: Logo tetap selalu */}
        <div className="hidden md:flex items-center">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/images/logo/logo-bakule-kembang-navbar.png"
              alt="Bakule Kembang"
              width={120}
              height={60}
              className="h-[60px] w-auto object-contain hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(228,177,240,0.8)] transition-all duration-300"
              priority
            />
          </Link>
        </div>

        {/* Mobile: Logo saat belum scroll, Text saat scroll */}
        <div className="md:hidden flex items-center gap-3">
          {/* Logo saat normal (belum scroll) */}
          <Link
            href="/"
            className={`transition-all duration-300 ${
              isScrolled ? "hidden" : "flex"
            }`}
          >
            <Image
              src="/images/logo/logo-bakule-kembang-navbar.png"
              alt="Bakule Kembang"
              width={100}
              height={50}
              className="h-[50px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Text saat scroll */}
          <div
            className={`${
              isScrolled ? "flex flex-col" : "hidden"
            } items-start gap-0 transition-all duration-300`}
          >
            <h1 className="text-base font-bold text-white leading-tight drop-shadow-md">
              Bakule{" "}
              <span className="text-primary-light font-extrabold drop-shadow-[0_0_10px_rgba(228,177,240,0.5)]">
                Kembang
              </span>
            </h1>
            <small className="text-[10px] text-primary-light font-medium uppercase tracking-wider opacity-90 -mt-1">
              Florist Yogyakarta
            </small>
          </div>
        </div>

        {/* DESKTOP NAVIGATION - SELALU TAMPIL 6 ITEMS */}
        <ul className="hidden md:flex list-none gap-4 items-center m-0 p-0">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    group relative flex items-center justify-center px-4 py-2.5 rounded-bunglon 
                    transition-all duration-300 font-medium text-sm min-w-[80px]
                    ${
                      active
                        ? "bg-white/25 text-white font-semibold shadow-inner"
                        : "text-white/95 hover:text-white"
                    }
                    overflow-hidden
                  `}
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:left-full transition-all duration-500"></div>

                  {/* Text saja, tanpa icon */}
                  <span className="relative z-10 font-medium">
                    {link.label}
                  </span>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-bunglon transition-all duration-300"></div>

                  {/* Active indicator */}
                  {active && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary-light rounded-full"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Cart & Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Button - PAKAI PROPS onCartClick */}
          <button
            className="bg-gradient-to-br from-primary-light to-primary text-primary-dark border-none px-4 py-2.5 rounded-bunglon font-semibold cursor-pointer flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95 relative"
            onClick={onCartClick} // ← INI PAKAI PROPS!
            aria-label="Open cart"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="hidden md:inline">Cart</span>

            {/* Cart Count Badge - PAKAI PROPS cartCount */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-dark text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger - HANYA UNTUK MOBILE */}
          <button
            ref={mobileButtonRef}
            className="md:hidden text-white text-lg cursor-pointer p-2 hover:scale-110 transition-all duration-300"
            onClick={handleMobileHamburgerClick}
            aria-label="Toggle menu"
          >
            <i
              className={`fas ${
                isMobileMenuOpen ? "fa-times" : "fa-bars"
              } text-lg transition-all duration-300`}
              style={{ transform: `rotate(${mobileRotation}deg)` }}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu - HANYA UNTUK MOBILE */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-16 left-0 w-full bg-primary-dark backdrop-blur-sm z-40 py-2 shadow-xl transition-all duration-300 ease-out transform origin-top ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col list-none m-0 p-0">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li
                key={link.href}
                className="border-b border-white/10 last:border-b-0 transition-all duration-200 hover:bg-white/10"
              >
                <Link
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-6 py-4 no-underline font-medium transition-all duration-200
                    ${active ? "bg-white/20 text-white" : "text-white/90"}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i
                    className={`fas ${link.icon} w-5 text-center transition-all duration-200 ${
                      active ? "text-primary-light" : "text-white/70"
                    }`}
                  ></i>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
