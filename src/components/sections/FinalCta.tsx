import BookingLink from "@/components/ui/BookingLink";
import { siteConfig } from "@/config/site";
import { fill, settings } from "@/lib/content";

export default function FinalCta() {
  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-br from-warm-light via-secondary to-white"
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="final-cta-heading"
            className="text-3xl md:text-4xl font-bold text-navy mb-4 text-balance"
          >
            {settings.finalCta.title}
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-8">{settings.finalCta.text}</p>

          <BookingLink source="final-cta" size="lg" className="mb-6">
            {settings.finalCta.button}
          </BookingLink>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:+49${siteConfig.phone}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded px-2 py-1"
              aria-label={`Telefon: ${siteConfig.phoneFormatted}`}
            >
              <svg
                className="w-5 h-5 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              {siteConfig.phoneFormatted}
            </a>
            <span className="hidden sm:block text-border">|</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded px-2 py-1"
            >
              <svg
                className="w-5 h-5 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              {siteConfig.email}
            </a>
          </div>
          <p className="mt-4 text-xs text-muted">{fill(settings.finalCta.note)}</p>
        </div>
      </div>
    </section>
  );
}
