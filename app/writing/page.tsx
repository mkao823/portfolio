import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing — Michael",
  description:
    "Occasional notes on allocation systems, infrastructure, and things I'm building.",
};

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <section aria-label="Writing" className="mb-16 md:mb-24">
      <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
        Writing
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-slate-400">
        Occasional notes on allocation systems, infrastructure, and things
        I&apos;m building.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-slate-500">
          No posts yet — check back soon.
        </p>
      ) : (
        <ol className="mt-8 space-y-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group -mx-4 block rounded-md p-4 transition-colors lg:hover:bg-slate-800/50"
              >
                <h2 className="font-medium leading-snug text-slate-200 group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                  {formatPostDate(post.date)}
                </p>
                <p className="mt-2 text-sm leading-normal text-slate-400">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
