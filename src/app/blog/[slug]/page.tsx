import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug, getRandomPosts } from "@/data/posts";
import { getPostBySlugEn } from "@/data/postsEn";
import { BlogPostCard } from "@/components/BlogPostCard";
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
  const hasEn = Boolean(getPostBySlugEn(post.slug));

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
      ...(hasEn
        ? {
            languages: {
              ru: `${SITE_URL}/blog/${post.slug}`,
              en: `${SITE_URL}/en/blog/${post.slug}`,
            },
          }
        : {}),
    },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      images: post.coverImage
        ? [{ url: post.coverImage.url, width: 1200, height: 630, alt: post.coverImage.alt }]
        : undefined,
    },
  };
}

export default async function BlogPostPage(props: Props) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRandomPosts(post.slug, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.coverImage ? [post.coverImage.url] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
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

      {post.coverImage && (
        <figure className="mt-6">
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt}
            width={1200}
            height={630}
            priority
            className="w-full rounded-2xl object-cover"
            style={{ aspectRatio: "16 / 9" }}
          />
          {post.coverImage.credit && (
            <figcaption className="mt-1.5 text-xs text-muted">
              {post.coverImage.credit}
            </figcaption>
          )}
        </figure>
      )}

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
          if (block.type === "image") {
            return (
              <figure key={i} className="my-2">
                <Image
                  src={block.image.url}
                  alt={block.image.alt}
                  width={1200}
                  height={800}
                  className="w-full rounded-2xl object-cover"
                />
                {block.image.credit && (
                  <figcaption className="mt-1.5 text-xs text-muted">
                    {block.image.credit}
                  </figcaption>
                )}
              </figure>
            );
          }
          return (
            <p key={i} className="text-fg">
              {block.text}
            </p>
          );
        })}
      </article>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-base font-semibold text-fg">Не хотите разбираться сами?</p>
        <p className="mt-1.5 text-sm text-muted">
          Ответьте на 4 вопроса — подберём VPN под вашу задачу, платформу и бюджет.
        </p>
        <Link
          href="/vpn-matcher"
          className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Подобрать VPN →
        </Link>
      </div>

      {relatedPosts.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="mb-4 text-lg font-semibold">Вам может быть интересно</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p) => (
              <BlogPostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

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
