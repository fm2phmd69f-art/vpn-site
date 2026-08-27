import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices } from "@/lib/getServices";
import { ServiceCard } from "./ServiceCard";
import { IntentConfig } from "@/data/intents";
import { INTENTS_EN } from "@/data/intentsEn";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";
import { Locale } from "@/lib/i18n";
import { localizeServiceEn } from "@/lib/localizeService";

export function generateIntentMetadata(
  config: IntentConfig | undefined,
  locale: Locale = "ru"
): Metadata {
  if (!config) return {};
  const en = INTENTS_EN[config.slug];
  const ruPath = `/${config.slug}`;
  const enPath = `/en/${config.slug}`;

  if (locale === "en" && en) {
    return {
      title: en.metaTitle,
      description: en.metaDescription,
      alternates: {
        canonical: enPath,
        languages: { ru: `${SITE_URL}${ruPath}`, en: `${SITE_URL}${enPath}` },
      },
      openGraph: {
        title: `${en.metaTitle} | ${SITE_NAME}`,
        description: en.metaDescription,
        type: "website",
        locale: "en_US",
      },
    };
  }

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: ruPath,
      ...(en ? { languages: { ru: `${SITE_URL}${ruPath}`, en: `${SITE_URL}${enPath}` } } : {}),
    },
    openGraph: {
      title: `${config.metaTitle} | ${SITE_NAME}`,
      description: config.metaDescription,
      type: "website",
    },
  };
}

const UI = {
  ru: {
    home: "Главная",
    howWeChoose: "Как мы выбираем:",
    faq: "Частые вопросы",
    empty: "В каталоге пока нет подходящих сервисов под этот сценарий.",
    back: "← Ко всему каталогу VPN-сервисов",
  },
  en: {
    home: "Home",
    howWeChoose: "How we choose:",
    faq: "Frequently asked questions",
    empty: "There aren't any matching services in the catalog for this scenario yet.",
    back: "← Back to the full VPN catalog",
  },
};

export async function IntentPage({
  config,
  locale = "ru",
}: {
  config: IntentConfig | undefined;
  locale?: Locale;
}) {
  if (!config) notFound();

  const en = locale === "en" ? INTENTS_EN[config.slug] : undefined;
  const t = UI[locale];
  const h1 = en?.h1 ?? config.h1;
  const intro = en?.intro ?? config.intro;
  const methodology = en?.methodology ?? config.methodology;
  const faq = en?.faq ?? config.faq;
  const homeHref = locale === "en" ? "/en" : "/";

  const services = await getAllServices();
  const matches = services.filter(config.filter).sort(config.sort ?? (() => 0));
  const limitedRaw = matches.slice(0, config.limit ?? 6);
  const limited = locale === "en" ? limitedRaw.map(localizeServiceEn) : limitedRaw;

  const pagePath = locale === "en" ? `/en/${config.slug}` : `/${config.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: locale === "en" ? `${SITE_URL}/en` : SITE_URL },
      { "@type": "ListItem", position: 2, name: h1, item: `${SITE_URL}${pagePath}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
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
        <Link href={homeHref} className="hover:text-fg">
          {t.home}
        </Link>
        {" / "}
        <span>{h1}</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{h1}</h1>

      <div className="mt-4 flex max-w-3xl flex-col gap-3 text-sm leading-relaxed text-muted">
        {intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <p className="mt-4 max-w-3xl rounded-xl border border-border bg-surface p-3 text-xs text-muted">
        <strong className="text-fg">{t.howWeChoose}</strong> {methodology}
      </p>

      {limited.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-border bg-surface p-8 text-center text-muted">
          {t.empty}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {limited.map((s) => (
            <ServiceCard key={s.id} service={s} locale={locale} />
          ))}
        </div>
      )}

      <section className="mt-12 max-w-3xl">
        <h2 className="mb-4 text-lg font-semibold">{t.faq}</h2>
        <div className="flex flex-col gap-4">
          {faq.map((item) => (
            <div key={item.q}>
              <h3 className="text-sm font-medium">{item.q}</h3>
              <p className="mt-1 text-sm text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10">
        <Link href={homeHref} className="text-sm text-accent hover:underline">
          {t.back}
        </Link>
      </p>
    </main>
  );
}
