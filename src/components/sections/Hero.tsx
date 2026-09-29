import Image from "next/image";
import Link from "next/link";
import BookingLink from "@/components/ui/BookingLink";
import type { StartseiteContent } from "@/lib/content";

type HeroProps = { data: StartseiteContent["hero"] };

export default function Hero({ data }: HeroProps) {
  return (
    <section
      className="relative gradient-hero py-16 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Dekorative, animierte Farbflächen */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary/70 blur-3xl animate-blob pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-warm-light blur-3xl animate-blob pointer-events-none"
        style={{ animationDelay: "-9s" }}
        aria-hidden="true"
      />

      {/* EKG-Linie als medizinischer Akzent */}
      <svg
        className="absolute bottom-6 left-0 w-full h-16 text-primary/15 pointer-events-none"
        viewBox="0 0 900 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,30 L180,30 L200,30 L210,12 L222,48 L232,6 L244,52 L254,30 L280,30 L900,30"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        />
        <path
          d="M0,30 L180,30 L200,30 L210,12 L222,48 L232,6 L244,52 L254,30 L280,30 L900,30"
          fill="none"
          stroke="var(--color-teal)"
          strokeWidth={2}
          className="animate-ecg"
        />
      </svg>

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <p className="animate-fade-up text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              {data.eyebrow}
            </p>
            <h1
              id="hero-heading"
              className="animate-fade-up animate-delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-tight text-balance mb-6"
            >
              {data.title}
            </h1>
            <p className="animate-fade-up animate-delay-200 text-xl text-foreground font-medium mb-4 text-balance">
              {data.lead}
            </p>
            <p className="animate-fade-up animate-delay-200 text-base text-muted leading-relaxed mb-8 max-w-lg">
              {data.text}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up animate-delay-300 flex flex-col sm:flex-row gap-3 mb-10">
              <BookingLink source="hero" size="lg">
                {data.primaryButton}
              </BookingLink>
              <Link
                href="/#rechner"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-primary bg-white border border-primary rounded-lg hover:bg-secondary transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus min-h-[44px]"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
                {data.secondaryButton}
              </Link>
            </div>

            {/* Trust Indicators */}
            <ul
              className="animate-fade-up animate-delay-400 space-y-2"
              aria-label="Leistungsmerkmale"
            >
              {data.trustItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted">
                  <span className="w-5 h-5 bg-warm rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up animate-delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover bg-secondary aspect-[4/5] lg:aspect-[3/4]">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-card p-4 border border-border max-w-[210px]">
              <p className="flex items-center gap-2 text-xs text-muted font-medium">
                <span
                  className="w-2 h-2 rounded-full bg-teal animate-pulse-dot flex-shrink-0"
                  aria-hidden="true"
                />
                {data.badgeStatus}
              </p>
              <p className="text-sm font-semibold text-navy mt-1">{data.badgeTitle}</p>
              <p className="text-xs text-muted mt-1">{data.badgeText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
