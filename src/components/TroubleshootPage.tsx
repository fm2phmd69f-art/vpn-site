import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices } from "@/lib/getServices";
import { getPostBySlug } from "@/data/posts";
import { ServiceCard } from "./ServiceCard";
import { TroubleshootConfig } from "@/data/troubleshooting";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export function generateTroubleshootMetadata(config: TroubleshootConfig | undefined): Metadata {
  if (!config) return {};
  const path = `/${config.slug}`;
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${config.metaTitle} | ${SITE_NAME}`,
      description: config.metaDescription,
      type: "website",
    },
  };
}

export async function TroubleshootPage({ config }: { config: TroubleshootConfig | undefined }) {
  if (!config) notFound();

  const services = await getAllServices();
  const matches = config.matchTag
    ? services.filter((s) => s.tags.includes(config.matchTag!)).slice(0, 3)
    : [];
  const relatedArticle = config.relatedArticleSlug ? getPostBySlug(config.relatedArticleSlug) : null;

  const path = `/${config.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: config.h1, item: `${SITE_URL}${path}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />

      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Главная
        </Link>
        {" / "}
        <span>{config.h1}</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{config.h1}</h1>

      <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-fg">
        {config.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Возможные причины</h2>
        <div className="flex flex-col gap-3">
          {config.causes.map((cause, i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface p-4">
              <p className="font-medium text-fg">{cause.title}</p>
              <p className="mt-1 text-sm text-muted">{cause.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Как исправить</h2>
        <ol className="flex flex-col gap-2">
          {config.fixSteps.map((step, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-border bg-surface p-3 text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-fg">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-2 text-lg font-semibold">Как проверить, что всё работает</h2>
        <p className="text-sm text-muted">{config.checkText}</p>
        <Link
          href={config.checkHref}
          className="mt-3 inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
        >
          {config.checkLinkLabel} →
        </Link>
      </section>

      {matches.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Подходящие VPN</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </section>
      )}

      {relatedArticle && (
        <section className="mt-8 rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">Разобрали тему подробнее в статье:</p>
          <Link
            href={`/blog/${relatedArticle.slug}`}
            className="mt-1 inline-block font-medium text-accent hover:underline"
          >
            {relatedArticle.title} →
          </Link>
        </section>
      )}

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Частые вопросы</h2>
        <div className="flex flex-col gap-2">
          {config.faq.map((item) => (
            <details key={item.q} className="group rounded-xl border border-border p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180">
                  ⌄
                </span>
              </summary>
              <p className="mt-2 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-10">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
      </p>
    </main>
  );
}
