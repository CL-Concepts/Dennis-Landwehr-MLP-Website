import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import type { StartseiteContent } from "@/lib/content";

/** Symbole der drei Karten – auswählbar im CMS. */
const ICON_PATHS: Record<string, string> = {
  studium:
    "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5",
  beruf:
    "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
  praxis:
    "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z",
};

function AudienceIcon({ name }: { name: string }) {
  return (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[name] ?? ICON_PATHS.beruf} />
    </svg>
  );
}

type AudienceSelectorProps = { data: StartseiteContent["audiences"] };

export default function AudienceSelector({ data }: AudienceSelectorProps) {
  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="audience-heading">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="audience-heading"
          as="h2"
          title={data.title}
          subtitle={data.subtitle}
          className="mb-12"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {data.cards.map((audience, index) => (
            <Reveal key={audience.href} delay={index * 120} className="flex">
              <Link
                href={audience.href}
                className="group relative flex flex-col w-full bg-white border border-border rounded-card overflow-hidden hover:border-primary hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
                aria-label={`${audience.title}: ${audience.ctaText}`}
              >
                {/* Illustration header */}
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-secondary">
                  <Image
                    src={audience.image}
                    alt={audience.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Card content */}
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex-shrink-0">
                    <AudienceIcon name={audience.icon} />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-3 text-balance">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed flex-1 mb-5">
                    {audience.description}
                  </p>
                  <span className="text-sm font-semibold text-primary group-hover:text-primary-hover flex items-center gap-1">
                    {audience.ctaText}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
