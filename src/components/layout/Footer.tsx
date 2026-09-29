import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { legalTexts } from "@/content/legal";
import BookingLink from "@/components/ui/BookingLink";
import { settings } from "@/lib/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const f = settings.footer;

  return (
    <footer className="bg-navy text-white mt-auto" role="contentinfo">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Spalte 1: Person & Booking */}
          <div>
            <p className="font-bold text-lg mb-1">{siteConfig.name}</p>
            <p className="text-blue-200 text-sm mb-4">{siteConfig.professionalTitle}</p>
            <BookingLink source="final-cta" variant="secondary" size="sm">
              {f.bookingButton}
            </BookingLink>
          </div>

          {/* Spalte 2: Kontakt */}
          <div>
            <p className="font-semibold mb-3 text-blue-100">{f.contactTitle}</p>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <a
                  href={`tel:+49${siteConfig.phone}`}
                  className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
                  aria-label={`Telefon: ${siteConfig.phoneFormatted}`}
                >
                  {siteConfig.phoneFormatted}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded break-all"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-blue-300">{siteConfig.address.full}</li>
            </ul>
            <div className="mt-4">
              <a
                href={siteConfig.mlpProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-200 hover:text-white transition-colors underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
              >
                {f.mlpLinkText}
                <span className="sr-only">(öffnet in neuem Tab)</span>
              </a>
            </div>
          </div>

          {/* Spalte 3: Rechtliches */}
          <div>
            <p className="font-semibold mb-3 text-blue-100">{f.legalTitle}</p>
            <ul className="space-y-2">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-blue-200 hover:text-white transition-colors underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-6 space-y-2">
          <p className="text-xs text-blue-300">{legalTexts.personalSite}</p>
          <p className="text-xs text-blue-400">
            &copy; {currentYear} {siteConfig.name} – {f.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
