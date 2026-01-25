/* 
  lib/data/contact-data.ts
  Organized by: raiyayusuf
*/

import { ContactData, SocialLinks } from "@/lib/types/contact";

/* ============================================
   CONTACT DATA
   ============================================ */

export const contactData: ContactData = {
  // INFO FLORIST (Bakule Kembang)
  florist: {
    name: "Bakule Kembang",
    tagline: "Toko Bunga dengan Sentuhan Tradisional Yogyakarta",
    address: "Yogyakarta, Indonesia",
    phone: "082227180340",
    email: "bakulekembang@gmail.com",
    instagram: "bakule_kembang",
    operatingHours: {
      weekdays: "08:00 - 20:00 WIB",
      weekends: "09:00 - 18:00 WIB",
      note: "Buka setiap hari",
    },
  },

  // INFO DEVELOPER (Portfolio)
  developer: {
    name: "Raiya Yusuf Priatmojo",
    role: "Frontend Developer",
    description:
      "Website ini dibuat sebagai project portfolio untuk showcase kemampuan frontend development.",
    linkedin: "raiya-yusuf-priatmojo",
    github: "raiyayusuf",
    phone: "082227180340",
    email: "raiyayusuf.p@gmail.com",
    techStack: [
      { name: "Next.js 14", icon: "fas fa-bolt" },
      { name: "TypeScript", icon: "fas fa-code" },
      { name: "Tailwind CSS", icon: "fas fa-wind" },
      { name: "React 18", icon: "fab fa-react" },
      { name: "App Router", icon: "fas fa-directions" },
      { name: "Server Components", icon: "fas fa-server" },
      { name: "Responsive Design", icon: "fas fa-laptop-mobile" },
      { name: "ES6+", icon: "fab fa-js" },
      { name: "GitHub", icon: "fab fa-github" },
      { name: "Vercel", icon: "fas fa-cloud" },
    ],
  },

  // SOCIAL MEDIA LINKS (full URLs)
  socialLinks: {
    whatsapp: "https://wa.me/6282227180340",
    instagram: "https://instagram.com/raiyaysf_",
    linkedin: "https://linkedin.com/in/raiya-yusuf-priatmojo",
    github: "https://github.com/raiyayusuf",
    email: "mailto:raiyayusuf.p@gmail.com",
  },

  // FAQ (Frequently Asked Questions)
  faqs: [
    {
      question: "Apakah bunga yang dijual segar?",
      answer:
        "Semua bunga kami langsung dari petani, dipetik di puncak kesegarannya.",
    },
    {
      question: "Bisa custom buket sesuai permintaan?",
      answer:
        "Bisa! Silakan hubungi kami via WhatsApp untuk diskusi konsep dan harga.",
    },
    {
      question: "Bisakah kirim foto buket yang sudah jadi sebelum dikirim?",
      answer:
        "Bisa! Untuk custom order, kami akan kirim foto preview sebelum dikirim.",
    },
    {
      question: "Berapa lama waktu pengiriman?",
      answer:
        "Pengiriman dalam kota Yogyakarta 2-4 jam, luar kota 1-2 hari tergantung lokasi.",
    },
    {
      question: "Apakah ada ongkos kirim?",
      answer:
        "Gratis ongkir untuk Yogyakarta kota dengan min. pembelian Rp 250.000. Luar kota menyesuaikan.",
    },
    {
      question: "Area pengiriman meliputi mana saja?",
      answer:
        "Seluruh DIY, dan bisa nego untuk luar daerah dengan tambahan biaya pengiriman.",
    },
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Transfer bank (BTN, BNI, Mandiri), QRIS, Dana, OVO, dan COD (Yogyakarta kota saja).",
    },
  ],
};

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

/**
 * Get formatted phone number
 * @param phone Raw phone number string
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})(\d{3,4})?$/);
  if (match) {
    return `+${match[1]} ${match[2]}-${match[3]}${match[4] ? `-${match[4]}` : ""}`;
  }
  return phone;
}

/**
 * Get Instagram handle without @
 * @param handle Instagram handle
 * @returns Cleaned handle
 */
export function getInstagramHandle(handle: string): string {
  return handle.replace("@", "");
}

/**
 * Get social link by platform
 * @param platform Social platform
 * @returns Social link URL
 */
export function getSocialLink(platform: keyof SocialLinks): string {
  return contactData.socialLinks[platform];
}

/**
 * Get all social platforms as array
 * @returns Array of social platform objects
 */
export function getSocialPlatforms(): Array<{
  platform: keyof SocialLinks;
  url: string;
  icon: string;
  label: string;
}> {
  return [
    {
      platform: "whatsapp",
      url: contactData.socialLinks.whatsapp,
      icon: "fab fa-whatsapp",
      label: "WhatsApp",
    },
    {
      platform: "instagram",
      url: contactData.socialLinks.instagram,
      icon: "fab fa-instagram",
      label: "Instagram",
    },
    {
      platform: "linkedin",
      url: contactData.socialLinks.linkedin,
      icon: "fab fa-linkedin",
      label: "LinkedIn",
    },
    {
      platform: "github",
      url: contactData.socialLinks.github,
      icon: "fab fa-github",
      label: "GitHub",
    },
    {
      platform: "email",
      url: contactData.socialLinks.email,
      icon: "fas fa-envelope",
      label: "Email",
    },
  ];
}
