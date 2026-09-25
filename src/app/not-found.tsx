import Link from "next/link";
import BookingLink from "@/components/ui/BookingLink";
import { settings } from "@/lib/content";

export default function NotFound() {
  const t = settings.notFound;
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="max-w-lg text-center px-4">
        <p className="text-8xl font-bold text-border mb-4" aria-hidden="true">
          {t.code}
        </p>
        <h1 className="text-2xl font-bold text-navy mb-4">{t.title}</h1>
        <p className="text-muted leading-relaxed mb-8">{t.text}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary bg-white border border-primary rounded-lg hover:bg-secondary transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus min-h-[44px]"
          >
            {t.homeButton}
          </Link>
          <BookingLink source="hero">{t.bookingButton}</BookingLink>
        </div>
      </div>
    </div>
  );
}
