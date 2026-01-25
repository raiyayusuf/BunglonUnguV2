/* 
  lib/data/team-members.ts
  Organized by: raiyayusuf
*/

import { TeamMember } from "@/lib/types/about";

/* ============================================
   TEAM MEMBERS DATA
   ============================================ */

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Raiya Yusuf Priatmojo",
    role: "Founder & Head Florist",
    image: "/images/team/raiya.jpg",
    description:
      "Berkecimpung di dunia floristry sejak 2018. Spesialis dalam rangkaian bunga tradisional-modern.",
    expertise: ["Buket Tradisional", "Rangkaian Modern", "Bunga Pernikahan"],
    social: {
      instagram: "@raiyaysf_",
      email: "raiya@bakulekembang.com",
    },
  },
  {
    id: 2,
    name: "Rafa Naufal Yusuf Priatmojo",
    role: "Operations Manager",
    image: "/images/team/rafa.jpg",
    description:
      "Memastikan setiap pesanan sampai tepat waktu dengan kondisi prima.",
    expertise: ["Logistik", "Customer Service", "Quality Control"],
    social: {
      email: "rafa@bakulekembang.com",
    },
  },
  {
    id: 3,
    name: "Sinchan",
    role: "Creative Designer",
    image: "/images/team/sinchan.jpg",
    description:
      "Ahli dalam menciptakan konsep rangkaian yang unik dan personal.",
    expertise: ["Konsep Visual", "Kustomisasi", "Trend Forecasting"],
    social: {
      instagram: "@sinchan_designs",
      email: "sinchan@bakulekembang.com",
    },
  },
  {
    id: 4,
    name: "Guteng",
    role: "Delivery Specialist",
    image: "/images/team/guteng.jpg",
    description:
      "Tangan pertama yang menyerahkan kebahagiaan kepada pelanggan kami.",
    expertise: ["Penanganan Bunga", "Navigasi", "Customer Relations"],
    social: {
      email: "guteng@bakulekembang.com",
    },
  },
];

/* ============================================
   HELPER FUNCTIONS
   ============================================ */

/**
 * Get team member image URL with fallback
 * @param member TeamMember object
 * @returns Image URL string
 */
export function getTeamImage(member: TeamMember): string {
  const fallbackImages: Record<number, string> = {
    1: "/images/flowers/bouquet/mix-bouquet-cream.jpg",
    2: "/images/flowers/bunch/rose-pink-bunch-pink.jpg",
    3: "/images/flowers/bag/rose-pink-bag.jpg",
    4: "/images/backgrounds/floral-bg.jpg",
  };

  return member.image || fallbackImages[member.id] || "/images/placeholder.jpg";
}

/**
 * Get team members by expertise
 * @param expertise Expertise keyword
 * @returns Filtered team members
 */
export function getTeamByExpertise(expertise: string): TeamMember[] {
  return teamMembers.filter((member) =>
    member.expertise.some((exp) =>
      exp.toLowerCase().includes(expertise.toLowerCase()),
    ),
  );
}
