"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      const subscribers = JSON.parse(
        localStorage.getItem("newsletterSubscribers") || "[]",
      );
      subscribers.push({
        email: email,
        date: new Date().toISOString(),
      });
      localStorage.setItem(
        "newsletterSubscribers",
        JSON.stringify(subscribers),
      );
      alert("🎉 Terima kasih sudah berlangganan newsletter kami!");
      setEmail("");
    } else {
      alert("⚠️ Mohon masukkan email yang valid!");
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|co\.id)$/;
    return re.test(email);
  };

  const socialLinks = [
    {
      href: "https://wa.me/6282227180340",
      icon: "fab fa-whatsapp",
      label: "WhatsApp",
      color: "rgba(37, 211, 102, 0.15)",
    },
    {
      href: "https://www.instagram.com/raiyaysf_/",
      icon: "fab fa-instagram",
      label: "Instagram",
      color: "rgba(228, 64, 95, 0.15)",
    },
    {
      href: "https://github.com/raiyayusuf",
      icon: "fab fa-github",
      label: "GitHub",
      color: "rgba(51, 51, 51, 0.15)",
    },
    {
      href: "https://www.linkedin.com/in/raiya-yusuf-priatmojo",
      icon: "fab fa-linkedin-in",
      label: "LinkedIn",
      color: "rgba(10, 102, 194, 0.15)",
    },
  ];

  const quickLinks = [
    { href: "/", label: "Beranda", icon: "fas fa-chevron-right" },
    { href: "/products", label: "Produk", icon: "fas fa-chevron-right" },
    { href: "/categories", label: "Kategori", icon: "fas fa-chevron-right" },
    { href: "/about", label: "Tentang Kami", icon: "fas fa-chevron-right" },
    { href: "/contact", label: "Kontak", icon: "fas fa-chevron-right" },
  ];

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      text: "JL. KH. Ali Maksum, Saraban RT05, Ngireng-Ireng, Sewon, Bantul, Yogyakarta 55188",
    },
    { icon: "fas fa-phone", text: "0822 2718 0340" },
    { icon: "fas fa-clock", text: "Buka: 08.00 - 22.00 WIB (Setiap Hari)" },
  ];

  return (
    <footer className="bg-gradient-to-br from-primary-dark to-[#2d1b69] text-primary-soft py-12 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-light via-primary to-primary-dark"></div>

      <div className="px-5">
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-wrap justify-between gap-x-8 gap-y-6">
            <div className="flex-1 min-w-[280px] max-w-[320px]">
              <div className="mb-4">
                <Image
                  src="/images/logo/logo-bakule-kembang-navbar.png"
                  alt="Bakule Kembang"
                  width={180}
                  height={50}
                  className="w-auto h-[50px] object-contain transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
              <p className="text-primary-soft/90 leading-relaxed text-[16px]">
                Toko Bunga modern dari hasil iseng sinchan dengan sentuhan horor
                untuk semua kebutuhan spesial Anda.
              </p>
            </div>

            <div className="w-[140px]">
              <h4 className="text-white text-lg font-semibold mb-4 pb-2 relative after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-primary-light after:rounded">
                Link Gercep
              </h4>
              <ul className="list-none p-0 m-0 space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-primary-soft/90 no-underline text-[16px] transition-all duration-300 hover:text-primary-light hover:translate-x-1 flex items-center gap-2"
                    >
                      <i className={link.icon}></i>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[200px]">
              <h4 className="text-white text-lg font-semibold mb-4 pb-2 relative after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-primary-light after:rounded">
                Alamat & Kontak
              </h4>
              <ul className="list-none p-0 m-0">
                {contactInfo.map((info, index) => (
                  <li key={index} className="mb-3 flex items-start gap-2">
                    <i
                      className={`${info.icon} text-primary-light text-sm mt-0.5 flex-shrink-0`}
                    ></i>
                    <span className="text-primary-soft/90 text-[16px] leading-relaxed">
                      {info.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[140px]">
              <h4 className="text-white text-lg font-semibold mb-3">
                Media Sosial
              </h4>
              <p className="text-primary-soft/80 text-[16px] mb-3">
                Ikuti kami di media sosial:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-14 h-14 rounded-full text-white text-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      backgroundColor: social.color,
                      border: `1px solid ${social.color.replace("0.15", "0.3")}`,
                    }}
                    aria-label={social.label}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="w-[200px]">
              <h4 className="text-white text-lg font-semibold mb-3">
                Berlangganan
              </h4>
              <p className="text-primary-soft/80 text-[16px] mb-3">
                Dapatkan promo dan update produk terbaru langsung di email Anda.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-primary-light/30 bg-white/5 text-white placeholder:text-white/60 focus:outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light/20 text-[16px]"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-light to-primary text-primary-dark font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:from-primary hover:to-primary-light hover:-translate-y-0.5 hover:shadow-md text-[16px]"
                >
                  <i className="fas fa-paper-plane text-sm"></i>
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-primary-light/20 text-center">
            <p className="text-primary-soft/70 text-[16px]">
              &copy; {currentYear} Bakule Kembang. All rights reserved
            </p>
            <p className="text-xs mt-1 text-primary-soft/60">
              <i className="fab fa-github mr-1"></i>
              Project codename: "Bunglon Ungu" •
              <a
                href="https://github.com/raiyayusuf/BunglonUngu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light font-semibold ml-1 no-underline hover:text-white hover:underline transition-colors"
              >
                View on my GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
