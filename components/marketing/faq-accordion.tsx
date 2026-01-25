/* 
  components/marketing/faq-accordion.tsx
  Organized by: raiyayusuf
*/

"use client";

import { FAQItem } from "@/lib/types/contact";
import { useState } from "react";

/* ============================================
   PROPS INTERFACE
   ============================================ */

interface FAQAccordionProps {
  faqs: FAQItem[];
}

/* ============================================
   FAQ ACCORDION COMPONENT
   ============================================ */

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* ============================================
     TOGGLE FAQ FUNCTION
     ============================================ */
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-primary-soft/30 overflow-hidden
                     shadow-bunglon-light transition-all duration-300"
        >
          {/* ============================================
             FAQ QUESTION
             ============================================ */}
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 flex justify-between items-center text-left
                       hover:bg-primary-soft/20 transition-colors duration-200"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-primary-dark text-base md:text-lg">
                {faq.question}
              </h3>
            </div>
            <div className="flex-shrink-0 ml-4">
              <i
                className={`fas fa-chevron-${openIndex === index ? "up" : "down"} 
                           text-primary transition-transform duration-300`}
              ></i>
            </div>
          </button>

          {/* ============================================
             FAQ ANSWER
             ============================================ */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out
                        ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-6 pb-4 pt-2">
              <p className="text-text-dark/80 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </p>

              {/* FAQ Number */}
              <div className="mt-4 pt-3 border-t border-primary-soft/20">
                <span className="text-xs text-primary/70 font-medium">
                  FAQ #{index + 1} • Total {faqs.length} FAQ
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
