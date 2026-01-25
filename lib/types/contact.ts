/* 
  lib/types/contact.ts
  Organized by: raiyayusuf
*/

/* ============================================
   FLORIST INFO INTERFACE
   ============================================ */

export interface FloristInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  operatingHours: {
    weekdays: string;
    weekends: string;
    note: string;
  };
}

/* ============================================
   TECH STACK ITEM INTERFACE
   ============================================ */

export interface TechStackItem {
  name: string;
  icon: string;
}

/* ============================================
   DEVELOPER INFO INTERFACE
   ============================================ */

export interface DeveloperInfo {
  name: string;
  role: string;
  description: string;
  linkedin: string;
  github: string;
  phone: string;
  email: string;
  techStack: TechStackItem[];
}

/* ============================================
   SOCIAL LINKS INTERFACE
   ============================================ */

export interface SocialLinks {
  whatsapp: string;
  instagram: string;
  linkedin: string;
  github: string;
  email: string;
}

/* ============================================
   FAQ ITEM INTERFACE
   ============================================ */

export interface FAQItem {
  question: string;
  answer: string;
}

/* ============================================
   CONTACT DATA INTERFACE
   ============================================ */

export interface ContactData {
  florist: FloristInfo;
  developer: DeveloperInfo;
  socialLinks: SocialLinks;
  faqs: FAQItem[];
}
