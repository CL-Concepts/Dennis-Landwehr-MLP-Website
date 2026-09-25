import Image from "next/image";
import Link from "next/link";
import BookingLink from "@/components/ui/BookingLink";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { splitParagraphs, type StartseiteContent } from "@/lib/content";

type AdvisorProfileProps = { data: StartseiteContent["profile"] };

export default function AdvisorProfile({ data }: AdvisorProfileProps) {
  return (
    <section className="py-16 md:py-24 gradient-section" aria-labelledby="advisor-heading">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-card-hover">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 384px"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-navy/20 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              as="h2"
              id="advisor-heading"
              title={data.title}
              align="left"
              className="mb-6"
            />
            <div className="space-y-4 text-muted leading-relaxed mb-8">
              {splitParagraphs(data.text).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <BookingLink source="ueber-mich">{data.primaryButton}</BookingLink>
              <Link
                href="/ueber-mich"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary bg-white border border-primary rounded-lg hover:bg-secondary transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus min-h-[44px]"
              >
                {data.secondaryButton}
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted">
                {data.mlpPrefix}{" "}
                <a
                  href={siteConfig.mlpProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
                >
                  {data.mlpLinkText}
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>{" "}
                · {siteConfig.address.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
