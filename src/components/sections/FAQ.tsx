"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/faqs";
import SectionHeading from "@/components/ui/SectionHeading";

type FAQProps = {
  faqs: FaqItem[];
  headingId?: string;
  title?: string;
};

export default function FAQ({
  faqs,
  headingId = "faq-heading",
  title = "Häufige Fragen",
}: FAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby={headingId}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading id={headingId} as="h2" title={title} className="mb-12" />
        <div className="max-w-3xl mx-auto divide-y divide-border">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id}>
                <h3>
                  <button
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-btn-${faq.id}`}
                    className="w-full flex items-start justify-between gap-4 py-5 text-left text-base font-semibold text-navy hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 text-primary transition-transform duration-200 mt-0.5 ${isOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>
                </h3>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      aria-hidden={!isOpen}
                      className="pb-5"
                    >
                      <p className="text-muted leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
