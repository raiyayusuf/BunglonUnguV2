/* 
  lib/data/about-data.ts
  Organized by: raiyayusuf
*/

import { AboutData, CompanyValue, Milestone } from "@/lib/types/about";

/* ============================================
   ABOUT DATA
   ============================================ */

export const aboutData: AboutData = {
  companyInfo: {
    tagline: "Menghadirkan Keindahan dalam Setiap Kelopak",
    description:
      "Bakule Kembang adalah toko bunga modern di Yogyakarta yang didirikan pada tahun 2020. Kami menggabungkan keindahan tradisional dengan sentuhan kontemporer untuk menciptakan rangkaian bunga yang bermakna dan memorable.",
  },

  visionMission: {
    vision:
      "Menjadi florist terdepan di Yogyakarta yang dikenal dengan kreativitas, kualitas, dan pelayanan terbaik untuk setiap momen spesial pelanggan.",
    missions: [
      "Menyediakan bunga segar berkualitas tinggi dengan harga kompetitif",
      "Memberikan pengalaman berbelanja yang personal dan memuaskan",
      "Menginspirasi dengan desain rangkaian bunga yang unik dan kreatif",
      "Mendukung petani bunga lokal untuk keberlanjutan usaha",
      "Selalu berinovasi dengan tren dan kebutuhan pasar",
    ],
  },

  companyValues: [
    {
      id: 1,
      title: "Kualitas Terbaik",
      description:
        "Setiap bunga yang kami gunakan dipilih dengan standar kualitas tertinggi untuk memastikan kesegaran dan daya tahan maksimal.",
      icon: "fas fa-award",
    },
    {
      id: 2,
      title: "Kreativitas Tanpa Batas",
      description:
        "Kami percaya bahwa setiap rangkaian bunga harus memiliki karakter unik yang mencerminkan kepribadian penerimanya.",
      icon: "fas fa-palette",
    },
    {
      id: 3,
      title: "Pelayanan Ramah",
      description:
        "Tim kami siap membantu Anda menemukan rangkaian bunga yang tepat dengan senyuman dan kehangatan khas Yogyakarta.",
      icon: "fas fa-handshake",
    },
    {
      id: 4,
      title: "Keberlanjutan",
      description:
        "Kami berkomitmen untuk mendukung petani lokal dan menggunakan bahan ramah lingkungan dalam setiap produk.",
      icon: "fas fa-leaf",
    },
  ],

  milestones: [
    {
      year: "2020",
      title: "Bakule Kembang Didirikan",
      description:
        "Dimulai dari small workshop di Bantul dengan tim kecil yang penuh semangat.",
    },
    {
      year: "2021",
      title: "Expansi ke Platform Online",
      description:
        "Meluncurkan website pertama dan mulai menerima pesanan melalui media sosial.",
    },
    {
      year: "2022",
      title: "Perluasan Tim & Produk",
      description:
        "Menambah koleksi produk dan merekrut lebih banyak florist profesional.",
    },
    {
      year: "2023",
      title: "Kolaborasi Pertama",
      description:
        "Bekerjasama dengan event organizer untuk berbagai acara pernikahan dan corporate.",
    },
    {
      year: "2024",
      title: "Pindah ke Lokasi Baru",
      description:
        "Buka toko fisik di lokasi strategis dengan konsep store yang lebih modern.",
    },
    {
      year: "2025",
      title: "1000+ Pelanggan",
      description:
        "Mencapai milestone melayani lebih dari 1000 pelanggan yang puas.",
    },
  ],
};

/* ============================================
   STATISTICS DATA
   ============================================ */

export const companyStats = {
  yearsExperience: 5,
  happyCustomers: 1000,
  teamMembers: 4,
  productsSold: 5000,
};

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

/**
 * Get company values by category
 * @param limit Optional limit for number of values
 * @returns Company values array
 */
export function getCompanyValues(limit?: number): CompanyValue[] {
  if (limit) {
    return aboutData.companyValues.slice(0, limit);
  }
  return aboutData.companyValues;
}

/**
 * Get milestones sorted by year
 * @param ascending Sort order (true for ascending)
 * @returns Sorted milestones
 */
export function getMilestones(ascending: boolean = true): Milestone[] {
  return [...aboutData.milestones].sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    return ascending ? yearA - yearB : yearB - yearA;
  });
}
