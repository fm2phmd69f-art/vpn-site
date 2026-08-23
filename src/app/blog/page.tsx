import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/posts";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Блог о VPN",
  description: "Статьи о выборе VPN, приватности, бесплатных тарифах и обходе геоблокировок.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Главная
        </Link>
        {" / "}
        <span>Блог</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">Блог {SITE_NAME}</h1>
      <p className="mt-2 text-muted">Гайды по выбору VPN, приватности и стримингу.</p>

      <div className="mt-8 flex flex-col gap-4">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            {post.coverImage && (
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                width={112}
                height={112}
                className="h-28 w-28 shrink-0 rounded-xl object-cover"
              />
            )}
            <div>
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="mt-1 text-sm text-muted">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
      </p>
    </main>
  );
}
