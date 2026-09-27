/**
 * All portfolio content lives here. Edit this file to update the site —
 * no component changes needed.
 *
 * PLACEHOLDER items for Michael to fill in are marked with "TODO(michael)".
 */

export interface SocialLink {
  label: string;
  href: string;
}

export interface ExperienceItem {
  /** e.g. "2024 — Present". Leave "" to hide the date column. */
  dateRange: string;
  title: string;
  organization: string;
  description: string;
  tech: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  /** URL-safe id, e.g. "capacity-planner". Post frontmatter `project` matches this. Also used as the card's anchor id. */
  slug: string;
  title: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  /** Rendered when there is no public link yet, e.g. "Private repo". */
  note?: string;
  /** e.g. "In progress". Omitted for finished work. */
  status?: string;
}

export const profile = {
  name: "Michael",
  title: "Software Engineering M.S. Student",
  tagline:
    "I build systems that allocate scarce resources — inventory at my internship, compute in my projects. Into infra and SRE.",
  location: "Cupertino, California",
  // TODO(michael): add your email and LinkedIn URL.
  email: "",
  linkedin: "",
  github: "https://github.com/mkao823",
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github },
];

export const about: string[] = [
  "I'm a Software Engineering master's student at San José State University, graduating December 2027, based in Cupertino, California. I keep ending up at the same problem from different angles: finite supply, uncertain demand, and who gets what.",
  "At my internship I built internal tooling around how stock is allocated to satisfy supply and demand. Now I'm applying that same thinking to compute: AINS is an execution layer for legacy ERP inventory, and my capacity planner forecasts demand and optimizes headroom against cost and SLO tradeoffs.",
  "Outside of that, I run MLB and NFL projection models on my Gametime site. Off the clock you'll find me playing Valorant, taking my dog to In-N-Out, or putting my AI assistant — named after my dog — to work.",
];

export const experience: ExperienceItem[] = [
  {
    // TODO(michael): fill in the date range for the internship.
    dateRange: "",
    title: "Software Engineering Intern",
    organization: "Internal Tooling",
    description:
      "Built internal tooling for the company. Worked on how stock gets allocated to satisfy supply and demand — the inventory side of the allocation problems I keep coming back to.",
    tech: [],
  },
];

export const education = {
  degree: "M.S. Software Engineering",
  school: "San José State University",
  dateRange: "Fall 2026 — Dec 2027",
  note: "Graduating December 2027.",
};

export const projects: Project[] = [
  {
    slug: "ains",
    title: "AINS",
    description:
      "AI-native service company: an allocation layer that links sales orders to purchase orders and on-hand inventory for legacy ERPs (Sage 100). Anaplan is a planning canvas; AINS is an execution layer.",
    tech: ["Python", "FastMCP", "MCP", "Sage 100"],
    links: [],
    note: "Private repo",
  },
  {
    slug: "capacity-planner",
    title: "Capacity Planner",
    status: "In progress",
    description:
      "Compute capacity planning: demand forecasting plus a headroom optimizer with cost-vs-SLO tradeoff curves — the compute analog of inventory allocation.",
    tech: ["Python", "Forecasting", "Optimization"],
    links: [],
    note: "Repo coming soon",
  },
  {
    slug: "gametime",
    title: "Gametime",
    description:
      "MLB ensemble and NFL projection models served through a live web app.",
    tech: ["Next.js", "TypeScript", "Python", "Vercel"],
    links: [
      { label: "Live site", href: "https://gametime-beta.vercel.app" },
      { label: "GitHub", href: "https://github.com/mkao823/gametime" },
    ],
  },
  {
    slug: "valorant-champions-2026",
    title: "Valorant Champions 2026 Predictions",
    description:
      "Ensemble prediction model for the 2026 Valorant Champions tournament.",
    tech: ["Python"],
    links: [],
    note: "Write-up coming soon",
  },
];

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
] as const;
