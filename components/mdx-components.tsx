import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes, ReactNode } from "react";

function H1({ children }: { children?: ReactNode }) {
  return (
    <h1 className="mb-4 mt-2 text-3xl font-bold tracking-tight text-slate-100">
      {children}
    </h1>
  );
}

function H2({ children }: { children?: ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 text-xl font-semibold tracking-tight text-slate-100">
      {children}
    </h2>
  );
}

function H3({ children }: { children?: ReactNode }) {
  return (
    <h3 className="mb-2 mt-8 text-lg font-semibold tracking-tight text-slate-200">
      {children}
    </h3>
  );
}

function P({ children }: { children?: ReactNode }) {
  return <p className="mb-4 leading-relaxed text-slate-400">{children}</p>;
}

function A({
  href,
  children,
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className="font-medium text-accent hover:underline"
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}

function Ul({ children }: { children?: ReactNode }) {
  return (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-400 marker:text-slate-600">
      {children}
    </ul>
  );
}

function Ol({ children }: { children?: ReactNode }) {
  return (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-400 marker:text-slate-600">
      {children}
    </ol>
  );
}

function Blockquote({ children }: { children?: ReactNode }) {
  return (
    <blockquote className="my-6 border-l-2 border-accent/60 pl-4 italic text-slate-400 [&>p]:mb-0">
      {children}
    </blockquote>
  );
}

function Pre({ children }: { children?: ReactNode }) {
  return (
    <pre className="my-6 overflow-x-auto rounded-lg border border-slate-800 bg-navy-900 p-4 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-slate-200">
      {children}
    </pre>
  );
}

function Code({ children }: { children?: ReactNode }) {
  return (
    <code className="rounded bg-navy-800 px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
      {children}
    </code>
  );
}

function Hr() {
  return <hr className="my-8 border-slate-800" />;
}

/**
 * Theme-styled MDX element map (dark navy + teal), shared by every post.
 * Passed to <MDXRemote components={mdxComponents} />.
 */
export const mdxComponents: MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  a: A,
  ul: Ul,
  ol: Ol,
  blockquote: Blockquote,
  pre: Pre,
  code: Code,
  hr: Hr,
};
