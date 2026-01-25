// components\marketing\testimonial-card.tsx:
/* 
  components/marketing/testimonial-card.tsx
  Organized by: raiyayusuf
*/

"use client";

import { Testimonial } from "@/lib/data/testimonials";

/* ============================================
   PROPS INTERFACE
   ============================================ */

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/* ============================================
   TESTIMONIAL CARD COMPONENT
   ============================================ */

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  /* ============================================
     FORMAT DATE FUNCTION
     ============================================ */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /* ============================================
     RENDER STAR RATING
     ============================================ */
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i
        key={index}
        className={`fas fa-star ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      ></i>
    ));
  };

  return (
    <div
      className="bg-white rounded-bunglon-xl p-6 shadow-bunglon-light border border-primary-soft/20
                   hover:shadow-md transition-all duration-300"
    >
      {/* ============================================
         TESTIMONIAL HEADER
         ============================================ */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-bold text-primary-dark">{testimonial.name}</h4>
          <p className="text-sm text-text-dark/70">{testimonial.role}</p>
        </div>

        {/* Date */}
        <div className="text-xs text-text-dark/50">
          {formatDate(testimonial.date)}
        </div>
      </div>

      {/* ============================================
         RATING STARS
         ============================================ */}
      <div className="flex gap-1 mb-4">
        {renderStars(testimonial.rating)}
        <span className="ml-2 text-sm font-medium text-text-dark">
          {testimonial.rating}.0
        </span>
      </div>

      {/* ============================================
         TESTIMONIAL COMMENT
         ============================================ */}
      <blockquote className="mb-5">
        <p className="text-text-dark italic text-sm leading-relaxed">
          "{testimonial.comment}"
        </p>
      </blockquote>

      {/* ============================================
         PRODUCT REFERENCE
         ============================================ */}
      <div className="pt-4 border-t border-primary-soft/20">
        <div className="flex items-center gap-2 text-xs">
          <i className="fas fa-shopping-bag text-primary"></i>
          <span className="text-text-dark/70">
            Membeli produk #{testimonial.productId}
          </span>
          <a
            href={`/products/${testimonial.productId}`}
            className="ml-auto text-primary hover:text-primary-dark text-xs font-medium"
          >
            Lihat Produk <i className="fas fa-arrow-right ml-1"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
