/* 
  lib/types/about.ts
  Organized by: raiyayusuf
*/

/* ============================================
   TEAM MEMBER INTERFACE
   ============================================ */

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  expertise: string[];
  social: {
    instagram?: string;
    email?: string;
  };
}

/* ============================================
   COMPANY VALUE INTERFACE
   ============================================ */

export interface CompanyValue {
  id: number;
  title: string;
  description: string;
  icon: string;
}

/* ============================================
   MILESTONE INTERFACE
   ============================================ */

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

/* ============================================
   ABOUT DATA INTERFACE
   ============================================ */

export interface AboutData {
  companyInfo: {
    tagline: string;
    description: string;
  };
  visionMission: {
    vision: string;
    missions: string[];
  };
  companyValues: CompanyValue[];
  milestones: Milestone[];
}
