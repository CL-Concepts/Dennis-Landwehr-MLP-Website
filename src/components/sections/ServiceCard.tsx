import Link from "next/link";
import BookingLink from "@/components/ui/BookingLink";
import ServiceIcon, { type IconName } from "@/components/ui/ServiceIcon";
import type { Service } from "@/config/services";
import { settings } from "@/lib/content";

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group bg-white border border-border rounded-card p-6 hover:shadow-card-hover hover:border-primary/30 transition-all duration-200 flex flex-col">
      <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200 flex-shrink-0">
        <ServiceIcon name={service.iconName as IconName} />
      </div>

      <h3 className="text-lg font-bold text-navy mb-3 text-balance">{service.title}</h3>

      <p className="text-sm text-muted leading-relaxed mb-4 flex-1">{service.shortText}</p>

      <ul className="space-y-1.5 mb-6" aria-label="Themen">
        {service.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2 text-sm text-muted">
            <svg
              className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            {highlight}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 mt-auto">
        <Link
          href={service.href}
          className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded py-1"
        >
          {service.ctaText}
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
        <BookingLink source="services" variant="secondary" size="sm" fullWidth>
          {settings.buttons.serviceCard}
        </BookingLink>
      </div>
    </article>
  );
}
