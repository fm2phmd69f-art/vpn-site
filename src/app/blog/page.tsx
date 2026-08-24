import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/posts";
import { BlogPostCard } from "@/components/BlogPostCard";
import { SITE_NAME } from "@/lib/seo";

const PAGE_SIZE = 9;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  return {
    title: "Блог о VPN",
    description: "Статьи о выборе VPN, приватности, бесплатных тарифах и обходе геоблокировок.",
    alternates: { canonical: page > 1 ? `/blog?page=${page}` : "/blog" },
  };
}

export default async function BlogIndexPage(props: Props) {
  const searchParams = await props.searchParams;

  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(totalPages, Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1));
  const pagePosts = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Главная
        </Link>
        {" / "}
        <span>Блог</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">Блог {SITE_NAME}</h1>
      <p className="mt-2 text-muted">Гайды по выбору VPN, приватности и стримингу.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pagePosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2 text-sm">
          {page > 1 && (
            <Link
              href={page - 1 === 1 ? "/blog" : `/blog?page=${page - 1}`}
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-accent"
            >
              ← Назад
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={p === 1 ? "/blog" : `/blog?page=${p}`}
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
              href={`/blog?page=${page + 1}`}
              className="rounded-full border border-border px-3 py-1.5 transition-colors hover:border-accent"
            >
              Вперёд →
            </Link>
          )}
        </nav>
      )}

      <p className="mt-10">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
      </p>
    </main>
  );
}
