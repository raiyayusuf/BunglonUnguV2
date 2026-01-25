/* 
  components/marketing/about-card.tsx
  Organized by: raiyayusuf
*/

"use client";

import { CompanyValue, Milestone } from "@/lib/types/about";

/* ============================================
   PROPS INTERFACE
   ============================================ */

interface AboutCardProps {
  type: "value" | "milestone";
  data: CompanyValue | Milestone;
  index?: number;
}

/* ============================================
   ABOUT CARD COMPONENT
   ============================================ */

export default function AboutCard({ type, data, index = 0 }: AboutCardProps) {
  if (type === "value") {
    const valueData = data as CompanyValue;

    return (
      <div
        className="bg-white rounded-bunglon-xl p-6 shadow-bunglon-light border border-primary-soft/30 
                   transition-all duration-500 hover:shadow-xl hover:-translate-y-2 
                   hover:border-primary-light group"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* ============================================
           VALUE CARD LAYOUT
           ============================================ */}

        {/* Icon Container */}
        <div className="mb-5 flex justify-center">
          <div
            className="w-16 h-16 bg-primary-soft rounded-full flex items-center justify-center 
                         group-hover:bg-primary group-hover:scale-110 transition-all duration-500"
          >
            <i
              className={`${valueData.icon} text-2xl text-primary group-hover:text-white`}
            ></i>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-primary-dark mb-3">
            {valueData.title}
          </h3>
          <p className="text-text-dark/80 text-sm leading-relaxed">
            {valueData.description}
          </p>
        </div>

        {/* Decorative Element */}
        <div className="mt-6 pt-4 border-t border-primary-soft/30 text-center">
          <span className="text-primary text-xs font-semibold uppercase tracking-wider">
            Nilai Inti
          </span>
        </div>
      </div>
    );
  }

  if (type === "milestone") {
    const milestoneData = data as Milestone;

    return (
      <div
        className="bg-white rounded-bunglon-lg p-5 shadow-bunglon-light border border-primary-soft/20
                     transition-all duration-300 hover:shadow-md hover:border-primary/30"
      >
        {/* ============================================
           MILESTONE CARD LAYOUT
           ============================================ */}

        {/* Year Badge */}
        <div className="mb-4">
          <span
            className="inline-block px-4 py-1.5 bg-primary text-white font-bold rounded-full 
                          text-sm shadow-md"
          >
            {milestoneData.year}
          </span>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-base font-bold text-primary-dark mb-2">
            {milestoneData.title}
          </h3>
          <p className="text-text-dark/70 text-sm leading-relaxed">
            {milestoneData.description}
          </p>
        </div>

        {/* Timeline Connector (for timeline view) */}
        <div className="mt-4 pt-3 border-t border-primary-soft/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-primary text-xs font-medium">Milestone</span>
          </div>
          <i className="fas fa-history text-primary/50 text-sm"></i>
        </div>
      </div>
    );
  }

  return null;
}
