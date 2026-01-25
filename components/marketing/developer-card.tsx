/* 
  components/marketing/developer-card.tsx
  Organized by: raiyayusuf
*/

"use client";

import { DeveloperInfo, SocialLinks } from "@/lib/types/contact";

/* ============================================
   PROPS INTERFACE
   ============================================ */

interface DeveloperCardProps {
  developer: DeveloperInfo;
  socialLinks: SocialLinks;
}

/* ============================================
   DEVELOPER CARD COMPONENT
   ============================================ */

export default function DeveloperCard({
  developer,
  socialLinks,
}: DeveloperCardProps) {
  return (
    <div className="bg-white rounded-bunglon-xl p-6 md:p-8 shadow-bunglon border border-primary-soft/30">
      {/* ============================================
         DEVELOPER HEADER
         ============================================ */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-primary-soft rounded-full flex items-center justify-center">
            <i className="fas fa-user-circle text-3xl text-primary"></i>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary-dark">
            {developer.name}
          </h3>
          <p className="text-primary font-medium">{developer.role}</p>
        </div>
      </div>

      {/* ============================================
         DESCRIPTION
         ============================================ */}
      <p className="text-text-dark/80 text-sm leading-relaxed mb-6">
        {developer.description}
      </p>

      {/* ============================================
         TECH STACK
         ============================================ */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-dark mb-3">
          Tech Stack Proyek Ini:
        </h4>
        <div className="flex flex-wrap gap-2">
          {developer.techStack.map((tech, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-soft/50 
                         text-primary rounded-full text-sm font-medium border border-primary/20"
            >
              <i className={tech.icon}></i>
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* ============================================
         SOCIAL LINKS
         ============================================ */}
      <div className="mb-6">
        <h4 className="font-semibold text-primary-dark mb-4">
          Temukan Saya di Platform Berikut:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* LinkedIn */}
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white 
                       rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium"
          >
            <i className="fab fa-linkedin"></i>
            LinkedIn
          </a>

          {/* GitHub */}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white 
                       rounded-lg hover:bg-gray-900 transition-all duration-300 text-sm font-medium"
          >
            <i className="fab fa-github"></i>
            GitHub
          </a>

          {/* Email */}
          <a
            href={socialLinks.email}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-soft text-primary 
                       rounded-lg hover:bg-primary-light transition-all duration-300 text-sm font-medium"
          >
            <i className="fas fa-envelope"></i>
            Email
          </a>
        </div>
      </div>

      {/* ============================================
         COLLABORATION NOTE
         ============================================ */}
      <div className="p-4 bg-primary-soft/30 rounded-lg border border-primary-light/30">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <i className="fas fa-lightbulb text-lg text-primary mt-1"></i>
          </div>
          <div>
            <p className="text-text-dark font-medium mb-2">
              Ingin kolaborasi project web development?
            </p>
            <a
              href={socialLinks.email}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white 
                         rounded-full hover:bg-primary-dark transition-all duration-300 text-sm font-medium"
            >
              <i className="fas fa-handshake"></i>
              Hubungi saya!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
