"use client";

import { useEffect, useState } from "react";
import { navSections, profile, socials } from "@/lib/data";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/**
 * Sticky left column: name, title, tagline, scroll-spy nav, socials.
 * Mirrors the reference site's fixed-sidebar layout on desktop and
 * stacks above the content on mobile.
 *
 * variant "home" (default): scroll-spy nav over homepage sections, plus a
 *   link to the /writing page.
 * variant "writing": used on /writing pages — nav links back to homepage
 *   sections, with Writing marked active. No scroll-spy.
 */
export default function Sidebar({ variant = "home" }: { variant?: "home" | "writing" }) {
  const [active, setActive] = useState<string>(
    variant === "writing" ? "writing" : "about"
  );

  useEffect(() => {
    if (variant !== "home") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    for (const { id } of navSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [variant]);

  const navItems = [
    ...navSections.map(({ id, label }) => ({
      key: id,
      label,
      href: variant === "home" ? `#${id}` : `/#${id}`,
    })),
    { key: "writing", label: "Writing", href: "/writing" },
  ];

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
          {profile.name}
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          {profile.title}
        </h2>
        <p className="mt-4 max-w-xs leading-normal text-slate-400">
          {profile.tagline}
        </p>

        <nav aria-label="Sections" className="mt-16 hidden lg:block">
          <ul className="w-max">
            {navItems.map(({ key, label, href }) => {
              const isActive = active === key;
              return (
                <li key={key}>
                  <a
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex items-center gap-4 py-3"
                  >
                    <span
                      className={`h-px transition-all duration-200 ${
                        isActive
                          ? "w-16 bg-accent"
                          : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-300"
                      }`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                        isActive
                          ? "text-slate-100"
                          : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    >
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <ul className="mt-8 flex items-center gap-5 lg:mt-0" aria-label="Socials">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="block text-slate-400 transition-colors hover:text-slate-100"
            >
              <GitHubIcon />
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
