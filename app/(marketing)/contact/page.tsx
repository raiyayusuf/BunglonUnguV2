/* 
  app/(marketing)/contact/page.tsx
  Organized by: raiyayusuf
*/

import ContactInfoCard from "@/components/marketing/contact-info-card";
import DeveloperCard from "@/components/marketing/developer-card";
import FAQAccordion from "@/components/marketing/faq-accordion";
import { contactData } from "@/lib/data/contact-data";
import Link from "next/link";

/* ============================================
   CONTACT PAGE COMPONENT
   ============================================ */

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-soft/20 to-bg-light">
      {/* ============================================
         HERO SECTION
         ============================================ */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-dark">
                Hubungi{" "}
                <span
                  className="text-gradient-primary bg-gradient-to-r from-primary-dark 
                               to-primary bg-clip-text text-transparent"
                >
                  Bakule Kembang
                </span>
              </h1>
              <p className="text-xl text-primary font-semibold">
                Siap melayani kebutuhan bunga Anda dengan senang hati
              </p>
            </div>

            <p className="text-text-dark/80 leading-relaxed text-lg">
              Butuh buket untuk momen spesial? Ingin bertanya tentang produk?
              Atau sekadar ingin ngobrol tentang bunga? Tim kami siap membantu!
            </p>
          </div>

          {/* Right Image/Placeholder */}
          <div className="relative">
            <div
              className="bg-gradient-to-br from-green-500 to-teal-600 rounded-bunglon-xl 
                          p-8 md:p-12 text-white text-center h-full min-h-[250px] 
                          flex flex-col justify-center items-center"
            >
              <i className="fas fa-envelope-open-text text-5xl mb-4 text-white/90"></i>
              <p className="text-xl font-medium">
                Mari berkomunikasi dengan kami
              </p>
              <p className="text-white/80 mt-2 text-sm">
                Respon cepat via WhatsApp
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-300/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-teal-400/20 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ============================================
         MAIN CONTACT GRID
         ============================================ */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* ============================================
             COLUMN 1: FLORIST CONTACT
             ============================================ */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
                <i className="fas fa-store text-lg text-primary"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-dark">
                  Kontak Bakule Kembang
                </h2>
                <p className="text-text-dark/70">
                  Untuk pemesanan bunga dan konsultasi florist
                </p>
              </div>
            </div>

            <ContactInfoCard
              florist={contactData.florist}
              socialLinks={contactData.socialLinks}
            />
          </div>

          {/* ============================================
             COLUMN 2: DEVELOPER CONTACT
             ============================================ */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
                <i className="fas fa-code text-lg text-primary"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-dark">
                  Tentang Developer
                </h2>
                <p className="text-text-dark/70">Website ini dibuat oleh</p>
              </div>
            </div>

            <DeveloperCard
              developer={contactData.developer}
              socialLinks={contactData.socialLinks}
            />
          </div>
        </div>
      </section>

      {/* ============================================
         FAQ SECTION
         ============================================ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-white/50">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-soft rounded-full flex items-center justify-center">
              <i className="fas fa-question-circle text-xl text-primary"></i>
            </div>
            <h2 className="text-3xl font-bold text-primary-dark">
              Pertanyaan yang Sering Ditanyakan
            </h2>
          </div>
          <p className="text-text-dark/70 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum
          </p>
        </div>

        <FAQAccordion faqs={contactData.faqs} />
      </section>

      {/* ============================================
         CALL TO ACTION SECTION
         ============================================ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div
          className="bg-gradient-to-br from-primary-soft to-white rounded-bunglon-xl 
                      p-8 md:p-12 border border-primary/20 text-center"
        >
          <h2 className="text-3xl font-bold text-primary-dark mb-4">
            Masih Ada Pertanyaan?
          </h2>
          <p className="text-text-dark/80 max-w-2xl mx-auto mb-8 text-lg">
            Jangan ragu untuk menghubungi kami melalui WhatsApp untuk respon
            cepat
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={contactData.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 bg-green-500 text-white 
                         rounded-full hover:bg-green-600 transition-all duration-300 
                         text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              Chat via WhatsApp Sekarang
            </a>

            <span className="text-text-dark/60">atau</span>

            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-white 
                         rounded-full hover:bg-primary-dark transition-all duration-300 
                         text-lg font-semibold shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-store"></i>
              Lihat Koleksi Bunga
            </Link>
          </div>

          <p className="text-text-dark/70 mt-6 text-sm">
            <i className="fas fa-info-circle text-primary mr-1"></i>
            Respon biasanya dalam 5-15 menit pada jam operasional
          </p>
        </div>
      </section>
    </div>
  );
}
