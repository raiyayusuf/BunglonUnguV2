/* 
  components/marketing/team-member-card.tsx
  Organized by: raiyayusuf
*/

"use client";

import { TeamMember } from "@/lib/types/about";
import Image from "next/image";

/* ============================================
   PROPS INTERFACE
   ============================================ */

interface TeamMemberCardProps {
  member: TeamMember;
}

/* ============================================
   TEAM MEMBER CARD COMPONENT
   ============================================ */

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="card-product group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
      {/* ============================================
         MEMBER IMAGE SECTION
         ============================================ */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Social Links Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {member.social.instagram && (
            <a
              href={`https://instagram.com/${member.social.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 text-primary p-2 rounded-full hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label={`Instagram ${member.name}`}
            >
              <i className="fab fa-instagram text-lg"></i>
            </a>
          )}

          {member.social.email && (
            <a
              href={`mailto:${member.social.email}`}
              className="bg-white/90 text-primary p-2 rounded-full hover:bg-white hover:scale-110 transition-all duration-300"
              aria-label={`Email ${member.name}`}
            >
              <i className="fas fa-envelope text-lg"></i>
            </a>
          )}
        </div>
      </div>

      {/* ============================================
         MEMBER INFO SECTION
         ============================================ */}
      <div className="p-6 bg-white">
        {/* Name & Role */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-primary-dark mb-1 line-clamp-1">
            {member.name}
          </h3>
          <p className="text-primary font-semibold text-sm">{member.role}</p>
        </div>

        {/* Description */}
        <p className="text-text-dark/80 text-sm mb-4 line-clamp-3">
          {member.description}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {member.expertise.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-soft/50 text-primary text-xs font-medium rounded-full border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Contact Info */}
        <div className="pt-4 border-t border-primary-soft/30">
          <div className="flex items-center justify-between text-sm">
            {member.social.instagram && (
              <div className="flex items-center gap-2">
                <i className="fab fa-instagram text-primary"></i>
                <span className="text-text-dark/70">
                  {member.social.instagram}
                </span>
              </div>
            )}

            {member.social.email && (
              <div className="flex items-center gap-2">
                <i className="fas fa-envelope text-primary"></i>
                <span className="text-text-dark/70 text-xs">
                  {member.social.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
