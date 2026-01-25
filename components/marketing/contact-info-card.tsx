/* 
  components/marketing/contact-info-card.tsx
  Organized by: raiyayusuf
*/

"use client";

import { formatPhoneNumber, getInstagramHandle } from "@/lib/data/contact-data";
import { FloristInfo, SocialLinks } from "@/lib/types/contact";

/* ============================================
   PROPS INTERFACE
   ============================================ */

interface ContactInfoCardProps {
  florist: FloristInfo;
  socialLinks: SocialLinks;
}

/* ============================================
   CONTACT INFO CARD COMPONENT
   ============================================ */

export default function ContactInfoCard({
  florist,
  socialLinks,
}: ContactInfoCardProps) {
  return (
    <div className="bg-white rounded-bunglon-xl p-6 md:p-8 shadow-bunglon border border-primary-soft/30">
      {/* ============================================
         CARD HEADER
         ============================================ */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary-soft rounded-full flex items-center justify-center">
          <i className="fas fa-store text-xl text-primary"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary-dark">
            {florist.name}
          </h3>
          <p className="text-primary text-sm">{florist.tagline}</p>
        </div>
      </div>

      {/* ============================================
         CONTACT ITEMS
         ============================================ */}
      <div className="space-y-6">
        {/* Address */}
        <div className="flex gap-4 pb-4 border-b border-primary-soft/20">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary-soft rounded-full flex items-center justify-center">
              <i className="fas fa-map-marker-alt text-lg text-primary"></i>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-primary-dark mb-1">Alamat</h4>
            <p className="text-text-dark/80 text-sm">{florist.address}</p>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex gap-4 pb-4 border-b border-primary-soft/20">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fab fa-whatsapp text-lg text-green-600"></i>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-primary-dark mb-1">WhatsApp</h4>
            <p className="text-text-dark/80 text-sm mb-2">
              {formatPhoneNumber(florist.phone)}
            </p>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg 
                         hover:bg-green-600 transition-all duration-300 text-sm font-medium"
            >
              <i className="fab fa-whatsapp"></i> Chat via WhatsApp
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4 pb-4 border-b border-primary-soft/20">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary-soft rounded-full flex items-center justify-center">
              <i className="fas fa-envelope text-lg text-primary"></i>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-primary-dark mb-1">Email</h4>
            <p className="text-text-dark/80 text-sm mb-2">{florist.email}</p>
            <a
              href={`mailto:${florist.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-soft text-primary 
                         rounded-lg hover:bg-primary-light transition-all duration-300 text-sm font-medium"
            >
              <i className="fas fa-paper-plane"></i> Kirim Email
            </a>
          </div>
        </div>

        {/* Instagram */}
        <div className="flex gap-4 pb-4 border-b border-primary-soft/20">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <i className="fab fa-instagram text-lg text-pink-600"></i>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-primary-dark mb-1">Instagram</h4>
            <p className="text-text-dark/80 text-sm mb-2">
              @{getInstagramHandle(florist.instagram)}
            </p>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 
                         via-pink-600 to-red-500 text-white rounded-lg hover:opacity-90 
                         transition-all duration-300 text-sm font-medium"
            >
              <i className="fab fa-instagram"></i> Follow Kami
            </a>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <i className="fas fa-clock text-lg text-amber-600"></i>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-primary-dark mb-3">
              Jam Operasional
            </h4>

            {/* FLEX WITH CLOSER SPACING */}
            <div className="space-y-2 mb-3">
              {/* Weekdays */}
              <div className="flex items-center justify-between w-full">
                <span className="text-text-dark/70 text-sm">
                  Senin - Jumat:
                </span>
                <span className="font-medium text-sm text-primary-dark ml-4">
                  {florist.operatingHours.weekdays}
                </span>
              </div>

              {/* Weekends */}
              <div className="flex items-center justify-between w-full">
                <span className="text-text-dark/70 text-sm">
                  Sabtu - Minggu:
                </span>
                <span className="font-medium text-sm text-primary-dark ml-4">
                  {florist.operatingHours.weekends}
                </span>
              </div>
            </div>

            {/* Note */}
            <div className="flex items-start gap-2 p-3 bg-primary-soft/20 rounded-lg">
              <i className="fas fa-info-circle text-primary mt-0.5"></i>
              <p className="text-primary text-sm italic">
                {florist.operatingHours.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
