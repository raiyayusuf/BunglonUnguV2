// app\(marketing)\about\page.tsx:
/* 
  app/(marketing)/about/page.tsx
  Organized by: raiyayusuf
*/

import AboutCard from "@/components/marketing/about-card";
import TeamMemberCard from "@/components/marketing/team-member-card";
import TestimonialCard from "@/components/marketing/testimonial-card";
import { aboutData, companyStats } from "@/lib/data/about-data";
import { teamMembers } from "@/lib/data/team-members";
import { getRecentTestimonials } from "@/lib/data/testimonials";
import Link from "next/link";

/* ============================================
   ABOUT PAGE COMPONENT
   ============================================ */

export default function AboutPage() {
  const recentTestimonials = getRecentTestimonials(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-soft/20 to-bg-light">
      {/* ============================================
         HERO SECTION
         ============================================ */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-dark">
                Tentang{" "}
                <span className="text-gradient-primary bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                  Bakule Kembang
                </span>
              </h1>
              <p className="text-xl text-primary font-semibold">
                {aboutData.companyInfo.tagline}
              </p>
            </div>

            <p className="text-text-dark/80 leading-relaxed text-lg">
              {aboutData.companyInfo.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {companyStats.yearsExperience}+
                </div>
                <div className="text-sm text-text-dark/70">
                  Tahun Pengalaman
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {companyStats.happyCustomers}+
                </div>
                <div className="text-sm text-text-dark/70">
                  Pelanggan Bahagia
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {teamMembers.length}
                </div>
                <div className="text-sm text-text-dark/70">Tim Profesional</div>
              </div>
            </div>
          </div>

          {/* Right Image/Placeholder */}
          <div className="relative">
            <div
              className="bg-gradient-to-br from-primary to-primary-dark rounded-bunglon-xl p-8 md:p-12 
                          text-white text-center h-full min-h-[300px] flex flex-col justify-center items-center"
            >
              <i className="fas fa-store text-5xl mb-4 text-primary-light"></i>
              <p className="text-xl font-medium">
                Toko Bakule Kembang di Yogyakarta
              </p>
              <p className="text-primary-soft/80 mt-2">Melayani sejak 2020</p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-light/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ============================================
         VISION & MISSION SECTION
         ============================================ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-dark mb-3">
            Visi & Misi Kami
          </h2>
          <p className="text-text-dark/70 max-w-2xl mx-auto">
            Arah dan tujuan yang memandu setiap langkah kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white rounded-bunglon-xl p-8 shadow-bunglon border-t-4 border-primary">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary-soft rounded-full flex items-center justify-center">
                <i className="fas fa-eye text-xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold text-primary-dark">Visi Kami</h3>
            </div>
            <p className="text-text-dark/80 leading-relaxed">
              {aboutData.visionMission.vision}
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-bunglon-xl p-8 shadow-bunglon border-t-4 border-emerald-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <i className="fas fa-bullseye text-xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-bold text-primary-dark">Misi Kami</h3>
            </div>
            <ul className="space-y-3">
              {aboutData.visionMission.missions.map((mission, index) => (
                <li key={index} className="flex items-start gap-3">
                  <i className="fas fa-check-circle text-emerald-500 mt-1"></i>
                  <span className="text-text-dark/80">{mission}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================
         COMPANY VALUES SECTION
         ============================================ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-white/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-dark mb-3">
            Nilai-Nilai Kami
          </h2>
          <p className="text-text-dark/70 max-w-2xl mx-auto">
            Prinsip yang menjadi fondasi setiap karya kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutData.companyValues.map((value, index) => (
            <AboutCard key={value.id} type="value" data={value} index={index} />
          ))}
        </div>
      </section>

      {/* ============================================
         TEAM SECTION
         ============================================ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-dark mb-3">
            Tim Kami
          </h2>
          <p className="text-text-dark/70 max-w-2xl mx-auto">
            Orang-orang di balik keindahan Bakule Kembang
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* ============================================
         MILESTONES SECTION
         ============================================ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-primary-soft/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-dark mb-3">
            Perjalanan Kami
          </h2>
          <p className="text-text-dark/70 max-w-2xl mx-auto">
            Tonggak sejarah Bakule Kembang
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-light/30 
                        hidden md:block"
          ></div>

          {/* Milestones */}
          <div className="space-y-8">
            {aboutData.milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Year */}
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <div
                    className={`text-center md:text-${index % 2 === 0 ? "left" : "right"} px-4`}
                  >
                    <div className="text-2xl font-bold text-primary">
                      {milestone.year}
                    </div>
                  </div>
                </div>

                {/* Milestone Card */}
                <div className="md:w-1/2">
                  <div className="relative">
                    {/* Timeline Dot */}
                    <div
                      className="hidden md:block absolute top-1/2 transform -translate-y-1/2 
                                  w-4 h-4 bg-primary rounded-full border-4 border-white
                                  left-0 md:left-auto md:right-0"
                    ></div>

                    <AboutCard type="milestone" data={milestone} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
         TESTIMONIALS SECTION
         ============================================ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-dark mb-3">
            Kata Mereka
          </h2>
          <p className="text-text-dark/70 max-w-2xl mx-auto">
            Testimoni dari pelanggan yang puas dengan layanan kami
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {recentTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* ============================================
         CALL TO ACTION SECTION
         ============================================ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div
          className="bg-gradient-to-br from-primary-soft to-white rounded-bunglon-xl p-8 md:p-12 
                      border border-primary/20 text-center"
        >
          <h2 className="text-3xl font-bold text-primary-dark mb-4">
            Siap Menghadirkan Keindahan untuk Anda
          </h2>
          <p className="text-text-dark/80 max-w-2xl mx-auto mb-8 text-lg">
            Mari ciptakan momen spesial dengan rangkaian bunga yang bermakna
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="btn-primary px-8 py-3 rounded-full text-lg"
            >
              <i className="fas fa-store"></i> Lihat Koleksi
            </Link>
            <Link
              href="/contact"
              className="btn-outline px-8 py-3 rounded-full text-lg"
            >
              <i className="fas fa-envelope"></i> Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
