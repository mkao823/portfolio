import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-24">
      <p>
        Designed &amp; built by {profile.name}. Built with Next.js and Tailwind
        CSS.
      </p>
      <p className="mt-1">© {new Date().getFullYear()} {profile.name}.</p>
    </footer>
  );
}
