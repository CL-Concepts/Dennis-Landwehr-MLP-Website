import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { settings } from "@/lib/content";

type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: settings.breadcrumbHome, href: "/" }, ...items];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(allItems)} />
      <nav aria-label="Brotkrümelpfad" className="py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {index > 0 && (
                  <span aria-hidden="true" className="text-border select-none">
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors underline-offset-2 hover:underline"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
