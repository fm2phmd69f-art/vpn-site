import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "@/data/posts";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }}
      />

      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Главная
        </Link>
        {" / "}
        <Link href="/blog" className="hover:text-fg">
          Блог
        </Link>
        {" / "}
        <span>{post.title}</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-2 text-sm text-muted">
        {new Date(post.publishedAt).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <article className="mt-6 flex flex-col gap-4 text-sm leading-relaxed">
        {post.content.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2 key={i} className="mt-2 text-lg font-semibold text-fg">
                {block.text}
              </h2>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={i} className="ml-5 flex list-disc flex-col gap-1.5">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="text-fg">
              {block.text}
            </p>
          );
        })}
      </article>

      <div className="mt-10 flex flex-col gap-2 sm:flex-row">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
        <Link href="/blog" className="text-sm text-accent hover:underline sm:ml-6">
          Все статьи блога →
        </Link>
      </div>
    </main>
  );
}
