"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import BookingLink from "@/components/ui/BookingLink";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
      ref={navRef}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Wortmarke */}
          <Link
            href="/"
            className="flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus rounded"
            onClick={() => setMobileOpen(false)}
          >
            <span className="font-bold text-lg text-navy leading-tight">{siteConfig.name}</span>
            <span className="text-xs text-muted leading-tight">{siteConfig.professionalTitle}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-1">
            {mainNav.map((item) => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                      aria-expanded={openDropdown === item.href}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg hover:bg-surface transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus ${
                        isActive(item.href)
                          ? "text-primary font-semibold"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${openDropdown === item.href ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === item.href && (
                      <div
                        role="menu"
                        className="absolute top-full left-0 mt-1 w-64 bg-white border border-border rounded-xl shadow-card-hover py-2 z-50"
                      >
                        <Link
                          href={item.href}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 text-sm font-semibold text-navy hover:bg-surface transition-colors"
                        >
                          Alle Leistungen
                        </Link>
                        <div className="my-1 border-t border-border" />
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-surface transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`px-4 py-2 text-sm font-medium rounded-lg hover:bg-surface transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus block ${
                      isActive(item.href)
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <BookingLink source="nav" size="sm">
              Termin vereinbaren
            </BookingLink>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-navy hover:bg-surface transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
          >
            {mobileOpen ? (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-border"
          role="navigation"
          aria-label="Mobile Navigation"
        >
          <div className="max-w-content mx-auto px-4 py-4 space-y-1">
            {mainNav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base font-semibold text-navy rounded-lg hover:bg-surface transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2 text-sm text-muted hover:text-primary rounded-lg hover:bg-surface transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 pb-2">
              <BookingLink source="nav" fullWidth>
                Termin vereinbaren
              </BookingLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
