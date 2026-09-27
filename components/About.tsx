import { about } from "@/lib/data";

export default function About() {
  return (
    <section id="about" aria-label="About" className="mb-16 scroll-mt-24 md:mb-24">
      <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-200 lg:hidden">
        About
      </h2>
      <div className="space-y-4 leading-relaxed text-slate-400">
        {about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
