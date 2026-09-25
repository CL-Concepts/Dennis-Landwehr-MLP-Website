"use client";

import { useState } from "react";
import Link from "next/link";
import { careerPhases } from "@/config/services";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CareerTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePhase = careerPhases[activeIndex];
  const progress = (activeIndex / (careerPhases.length - 1)) * 100;

  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="timeline-heading">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="timeline-heading"
          as="h2"
          eyebrow="Von Studium bis Ruhestand"
          title="Finanzplanung, die mit deiner Karriere mitwächst"
          subtitle="Tippe auf eine Karrierephase und sieh, welche Finanzthemen dann im Mittelpunkt stehen."
          className="mb-12"
        />

        {/* Desktop: horizontale klickbare Timeline */}
        <div className="hidden md:block relative mb-10" role="tablist" aria-label="Karrierephasen">
          <div
            className="absolute top-8 left-0 right-0 h-1 bg-border rounded-full"
            aria-hidden="true"
          />
          <div
            className="absolute top-8 left-0 h-1 bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
          <ol className="grid grid-cols-7 gap-2 relative">
            {careerPhases.map((phase, index) => {
              const isActive = index === activeIndex;
              const isPassed = index < activeIndex;
              return (
                <li key={phase.id} className="flex flex-col items-center text-center">
                  <button
                    type="button"
                    role="tab"
                    id={`phase-tab-${phase.id}`}
                    aria-selected={isActive}
                    aria-controls="phase-panel"
                    onClick={() => setActiveIndex(index)}
                    className="group flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded-lg px-1 pb-1"
                  >
                    <span
                      className={`w-16 h-16 rounded-full flex items-center justify-center z-10 relative mb-4 border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-primary border-primary text-white scale-110 shadow-card-hover"
                          : isPassed
                            ? "bg-secondary border-primary text-primary"
                            : "bg-white border-border text-muted group-hover:border-primary group-hover:text-primary"
                      }`}
                    >
                      <span className="text-lg font-bold">{index + 1}</span>
                    </span>
                    <span
                      className={`text-sm font-semibold text-balance transition-colors ${
                        isActive ? "text-primary" : "text-navy group-hover:text-primary"
                      }`}
                    >
                      {phase.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile: horizontal scrollbare Phasen-Chips */}
        <div
          className="md:hidden flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 mb-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Karrierephasen"
        >
          {careerPhases.map((phase, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={phase.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="phase-panel"
                onClick={() => setActiveIndex(index)}
                className={`snap-start flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold border transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-foreground border-border"
                }`}
              >
                <span className="mr-1.5 opacity-70">{index + 1}.</span>
                {phase.label.replace("­", "")}
              </button>
            );
          })}
        </div>

        {/* Detail-Panel */}
        <div
          id="phase-panel"
          role="tabpanel"
          aria-labelledby={`phase-tab-${activePhase.id}`}
          className="bg-surface border border-border rounded-2xl p-6 md:p-10 max-w-4xl mx-auto"
        >
          <div key={activePhase.id} className="animate-fade-up">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
              Phase {activeIndex + 1} von {careerPhases.length}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3">
              {activePhase.label.replace("­", "")}
            </h3>
            <p className="text-muted leading-relaxed mb-6 max-w-2xl">{activePhase.detail}</p>
            <ul className="flex flex-wrap gap-2 mb-8" aria-label="Typische Themen dieser Phase">
              {activePhase.topics.map((topic) => (
                <li
                  key={topic}
                  className="inline-flex items-center gap-2 bg-white border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-warm flex-shrink-0"
                    aria-hidden="true"
                  />
                  {topic}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href={activePhase.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
              >
                {activePhase.hrefLabel}
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              {activeIndex < careerPhases.length - 1 && (
                <button
                  type="button"
                  onClick={() => setActiveIndex(activeIndex + 1)}
                  className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors min-h-[44px] px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
                >
                  Nächste Phase ansehen
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
