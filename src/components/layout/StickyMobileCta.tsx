"use client";

import { useEffect, useState } from "react";
import BookingLink from "@/components/ui/BookingLink";
import { settings } from "@/lib/content";

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <BookingLink source="sticky-mobile" fullWidth size="md">
        {settings.buttons.mobile}
      </BookingLink>
    </div>
  );
}
