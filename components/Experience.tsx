import { education, experience } from "@/lib/data";

function TechTags({ tech }: { tech: string[] }) {
  if (tech.length === 0) return null;
  return (
    <ul className="mt-2 flex flex-wrap gap-2" aria-label="Technologies used">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="mb-16 scroll-mt-24 md:mb-24"
    >
      <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-200 lg:hidden">
        Experience
      </h2>

      <ol className="group/list">
        {experience.map((item) => (
          <li key={`${item.title}-${item.organization}`} className="mb-8">
            <div className="group relative grid gap-4 rounded-md p-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:bg-slate-800/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
              <div
                aria-hidden="true"
                className="absolute -inset-x-4 -inset-y-2.5 hidden rounded-md lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
              />
              {item.dateRange && (
                <div className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                  {item.dateRange}
                </div>
              )}
              <div
                className={`z-10 ${item.dateRange ? "sm:col-span-6" : "sm:col-span-8"}`}
              >
                <h3 className="font-medium leading-snug text-slate-200">
                  {item.title} ·{" "}
                  <span className="text-slate-400">{item.organization}</span>
                </h3>
                <p className="mt-2 text-sm leading-normal text-slate-400">
                  {item.description}
                </p>
                <TechTags tech={item.tech} />
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-md border border-slate-800 bg-navy-900/60 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Education
        </p>
        <h3 className="mt-2 font-medium text-slate-200">
          {education.degree} ·{" "}
          <span className="text-slate-400">{education.school}</span>
        </h3>
        <p className="mt-1 text-sm text-slate-500">{education.dateRange}</p>
        <p className="mt-2 text-sm text-slate-400">{education.note}</p>
      </div>
    </section>
  );
}
