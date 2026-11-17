import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export function useAos() {
  const { url } = usePage();
  useEffect(() => {
    let cancelled = false;
    void import("aos").then(({ default: AOS }) => {
      if (cancelled) return;
      AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 80,
        disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches });
    });
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      void import("aos").then(({ default: AOS }) => { if (!cancelled) { AOS.refreshHard(); AOS.refresh(); } });
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [url]);
}