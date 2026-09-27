import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  /** YYYY-MM-DD */
  date: string;
  description: string;
  /** Posts with draft: true are hidden from the index and return 404. */
  draft?: boolean;
  /**
   * Ties the post to a project. Must match a project `slug` in lib/data.ts.
   * Omit for standalone posts — they appear only in the /writing index.
   */
  project?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  draft: boolean;
  project?: string;
}

export interface Post extends PostMeta {
  /** Raw MDX body (frontmatter stripped), rendered with next-mdx-remote. */
  body: string;
}

const WRITING_DIR = path.join(process.cwd(), "content", "writing");

function readPostFile(fileName: string): Post | null {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(WRITING_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<PostFrontmatter>;
  if (!fm.title || !fm.date || !fm.description) {
    throw new Error(
      `Post "${fileName}" is missing required frontmatter (title, date, description).`
    );
  }
  return {
    slug,
    title: fm.title,
    date: fm.date,
    description: fm.description,
    draft: fm.draft === true,
    project: fm.project || undefined,
    body: content,
  };
}

/** All published posts, newest first. Drafts are excluded. */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  return fs
    .readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPostFile)
    .filter((p): p is Post => p !== null && !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((post): PostMeta => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      description: post.description,
      draft: post.draft,
      project: post.project,
    }));
}

/** Full post including MDX body, or null when missing or draft. */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(WRITING_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const post = readPostFile(`${slug}.mdx`);
  if (!post || post.draft) return null;
  return post;
}

/** Published posts tied to a project slug, newest first. */
export function getPostsByProject(projectSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.project === projectSlug);
}

/** "2026-09-27" -> "Sep 27, 2026" */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  if (!y || !m || !d || m < 1 || m > 12) return iso;
  return `${months[m - 1]} ${d}, ${y}`;
}
