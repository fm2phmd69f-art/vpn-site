import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices } from "@/lib/getServices";
import { ServiceCard } from "./ServiceCard";
import { IntentConfig } from "@/data/intents";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export function generateIntentMetadata(config: IntentConfig | undefined): Metadata {
  if (!config) return {};
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: `/${config.slug}` },
    openGraph: {
      title: `${config.metaTitle} | ${SITE_NAME}`,
      description: config.metaDescription,
      type: "website",
    },
  };
}

export async function IntentPage({ config }: { config: IntentConfig | undefined }) {
  if (!config) notFound();

  const services = await getAllServices();
  const matches = services.filter(config.filter).sort(config.sort ?? (() => 0));
  const limited = matches.slice(0, config.limit ?? 6);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: config.h1, item: `${SITE_URL}/${config.slug}` },
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
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
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

      <div className="mt-4 flex max-w-3xl flex-col gap-3 text-sm leading-relaxed text-muted">
        {config.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <p className="mt-4 max-w-3xl rounded-xl border border-border bg-surface p-3 text-xs text-muted">
        <strong className="text-fg">Как мы выбираем:</strong> {config.methodology}
      </p>

      {limited.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-border bg-surface p-8 text-center text-muted">
          В каталоге пока нет подходящих сервисов под этот сценарий.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {limited.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}

      <section className="mt-12 max-w-3xl">
        <h2 className="mb-4 text-lg font-semibold">Частые вопросы</h2>
        <div className="flex flex-col gap-4">
          {config.faq.map((item) => (
            <div key={item.q}>
              <h3 className="text-sm font-medium">{item.q}</h3>
              <p className="mt-1 text-sm text-muted">{item.a}</p>
            </div>
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
