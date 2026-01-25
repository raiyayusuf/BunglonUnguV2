/* 
  app/(marketing)/page.tsx
  Organized by: raiyayusuf
*/

import FeaturedProductsSection from "@/components/sections/featured-products-section";
import { getFeaturedProducts } from "@/lib/data/products";
import { getRecentTestimonials } from "@/lib/data/testimonials";

/* ============================================
   HOME PAGE COMPONENT
   ============================================ */

export default function HomePage() {
  /* ============================================
     DATA FETCHING
     ============================================ */
  const featuredProducts = getFeaturedProducts();
  const recentTestimonials = getRecentTestimonials(3);

  /* ============================================
     RENDER COMPONENT
     ============================================ */
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-soft to-white">
      {/* ============================================
         1. HERO SECTION
         ============================================ */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* HERO TEXT CONTENT */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">
                Keindahan dalam Setiap Kelopak
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Bakule Kembang menghadirkan buket bunga segar dengan sentuhan
                tradisional dan modern untuk setiap momen spesial Anda.
              </p>

              {/* HERO BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="/products"
                  className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Lihat Koleksi
                </a>
                <a
                  href="/categories"
                  className="border-2 border-primary text-primary hover:bg-primary-soft font-semibold py-3 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  Jelajahi Kategori
                </a>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="bg-gradient-to-br from-primary-light to-primary rounded-2xl h-64 md:h-80 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <div className="text-6xl mb-4 animate-pulse">🌸</div>
                <p className="text-xl opacity-90">Bunga Segar Setiap Hari</p>
                <p className="text-sm opacity-75 mt-2">
                  Siap kirim ke seluruh Yogyakarta
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
         2. FEATURES SECTION
         ============================================ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-primary-dark mb-12">
            Mengapa Memilih Kami?
          </h2>

          {/* FEATURES GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🌸",
                title: "Bunga Segar",
                description:
                  "Bunga pilihan dengan kualitas terbaik langsung dari petani handal",
              },
              {
                icon: "🚚",
                title: "Gratis Pengiriman",
                description:
                  "Gratis ongkir untuk area Yogyakarta dengan pembelian minimal Rp 250.000",
              },
              {
                icon: "💝",
                title: "Kustomisasi",
                description:
                  "Buat buket sesuai keinginan Anda dengan bantuan florist profesional",
              },
              {
                icon: "⭐",
                title: "Kualitas Terbaik",
                description:
                  "Garansi 100% kepuasan pelanggan dengan kualitas terbaik atau uang kembali",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
         3. FEATURED PRODUCTS SECTION
         ============================================ */}
      <FeaturedProductsSection
        products={featuredProducts}
        title="🌺 Produk Unggulan"
        description="Koleksi bunga pilihan terbaik kami yang selalu menjadi favorit pelanggan"
        maxItems={8}
        showViewAll={true}
      />

      {/* ============================================
         4. TESTIMONIALS SECTION
         ============================================ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* TESTIMONIALS HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-dark mb-4">
              💬 Testimoni Pelanggan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lihat apa kata pelanggan yang sudah merasakan keindahan bunga dari
              Bakule Kembang
            </p>
          </div>

          {/* TESTIMONIALS GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-yellow-500 text-lg">
                    {"⭐".repeat(testimonial.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-600 italic mb-4 text-sm">
                  "{testimonial.comment}"
                </p>
                <div className="font-semibold text-primary-dark">
                  {testimonial.name}
                  <span className="text-gray-500 font-normal ml-2">
                    • {testimonial.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* VIEW MORE LINK */}
          {recentTestimonials.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="/testimonials"
                className="inline-flex items-center text-primary hover:text-primary-dark font-medium gap-1"
              >
                Lihat lebih banyak testimoni
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ============================================
         5. CALL TO ACTION SECTION
         ============================================ */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-dark to-primary">
        <div className="container mx-auto max-w-6xl text-center">
          {/* CTA HEADER */}
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Memberikan Kebahagiaan?
          </h2>
          <p className="text-primary-soft mb-8 max-w-2xl mx-auto">
            Pesan sekarang dan dapatkan bunga segar dengan kualitas terbaik
            untuk orang tersayang
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-primary-dark hover:bg-primary-soft font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Beli Sekarang
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
