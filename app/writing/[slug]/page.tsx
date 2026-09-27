import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { projects } from "@/lib/data";
import { formatPostDate, getAllPosts, getPostBySlug } from "@/lib/writing";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Michael`,
    description: post.description,
  };
}

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const project = post.project
    ? projects.find((p) => p.slug === post.project)
    : undefined;
  const isSample = slug.startsWith("sample-");

  return (
    <article className="mb-16 md:mb-24">
      <Link
        href="/writing"
        className="text-sm font-medium text-slate-400 transition-colors hover:text-accent"
      >
        ← All writing
      </Link>

      {isSample && (
        <p className="mt-6 rounded-md border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-slate-300">
          Sample post — delete{" "}
          <code className="font-mono text-[0.85em] text-accent">
            content/writing/{slug}.mdx
          </code>{" "}
          to remove it.
        </p>
      )}

      <p className="mt-6 text-xs uppercase tracking-widest text-slate-500">
        {formatPostDate(post.date)}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
        {post.title}
      </h1>

      {project && (
        <p className="mt-3 text-sm text-slate-400">
          Part of the{" "}
          <Link
            href={`/#project-${project.slug}`}
            className="font-medium text-accent hover:underline"
          >
            {project.title}
          </Link>{" "}
          project.
        </p>
      )}

      <div className="mt-8">
        <MDXRemote source={post.body} components={mdxComponents} />
      </div>
    </article>
  );
}
