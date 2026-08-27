import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS_EN } from "@/data/postsEn";
import { BlogPostCard } from "@/components/BlogPostCard";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const PAGE_SIZE = 9;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  return {
    title: "VPN Blog",
    description: "Articles on choosing a VPN, privacy, free plans, and bypassing geo-blocking.",
    alternates: {
      canonical: page > 1 ? `/en/blog?page=${page}` : "/en/blog",
      languages: { ru: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` },
    },
  };
}

export default async function BlogIndexPageEn(props: Props) {
  const searchParams = await props.searchParams;

  const sorted = [...BLOG_POSTS_EN].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(totalPages, Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1));
  const pagePosts = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/en" className="hover:text-fg">
          Home
        </Link>
        {" / "}
        <span>Blog</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">{SITE_NAME} Blog</h1>
      <p className="mt-2 text-muted">Guides on choosing a VPN, privacy, and streaming.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pagePosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} locale="en" />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2 text-sm">
          {page > 1 && (
            <Link
              href={page - 1 === 1 ? "/en/blog" : `/en/blog?page=${page - 1}`}
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-accent"
            >
              ← Back
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? "/en/blog" : `/en/blog?page=${p}`}
              className={`rounded-full border px-3 py-1.5 transition-colors ${
                p === page
                  ? "border-accent bg-accent text-white"
                  : "border-border hover:border-accent"
              }`}
            >
              {p}
            </Link>
          ))}
          {page < totalPages && (
            <Link
              href={`/en/blog?page=${page + 1}`}
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-accent"
            >
              Next →
            </Link>
          )}
        </nav>
      )}

      <p className="mt-10">
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Back to the full VPN catalog
        </Link>
      </p>
    </main>
  );
}
