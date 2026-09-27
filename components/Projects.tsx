import { projects, type Project } from "@/lib/data";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const primaryLink = project.links[0];
  const title = (
    <span className="inline-flex items-baseline font-medium leading-snug text-slate-200 group-hover:text-accent">
      {project.title}
      {primaryLink && <ArrowIcon />}
    </span>
  );

  return (
    <div className="group relative grid gap-4 rounded-md p-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:bg-slate-800/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]">
      <div
        aria-hidden="true"
        className="absolute -inset-x-4 -inset-y-2.5 hidden rounded-md lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
      />
      <div className="z-10 sm:order-1 sm:col-span-8">
        <h3>
          {primaryLink ? (
            <a
              href={primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${primaryLink.label} (opens in a new tab)`}
            >
              {title}
            </a>
          ) : (
            title
          )}
          {project.status && (
            <span className="ml-3 rounded-full border border-accent/30 px-2.5 py-0.5 align-middle text-[11px] font-semibold uppercase tracking-wide text-accent">
              {project.status}
            </span>
          )}
        </h3>
        <p className="mt-2 text-sm leading-normal text-slate-400">
          {project.description}
        </p>
        {project.links.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-4">
            {project.links.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-accent"
              >
                {link.label}
                <ArrowIcon />
              </a>
            ))}
          </div>
        )}
        {project.note && (
          <p className="mt-3 text-xs italic text-slate-500">{project.note}</p>
        )}
        <ul
          className="mt-2 flex flex-wrap gap-2"
          aria-label="Technologies used"
        >
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="mb-16 scroll-mt-24 md:mb-24"
    >
      <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-200 lg:hidden">
        Projects
      </h2>
      <ol className="group/list space-y-8">
        {projects.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ol>
    </section>
  );
}
