"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle radial glow that follows the cursor, in the lineage of the
 * mouse-tracking spotlight on the reference site. Purely decorative:
 * pointer-events-none and very low opacity so it never distracts.
 */
export default function Glow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(45, 212, 191, 0.07), transparent 80%)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}
