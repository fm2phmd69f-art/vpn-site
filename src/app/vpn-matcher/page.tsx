import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { VpnMatcher } from "@/components/VpnMatcher";
import { SITE_URL, jsonLdScript } from "@/lib/seo";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "VPN Matcher — подбор VPN за 4 вопроса",
  description:
    "Ответьте на 4 вопроса о задаче, платформе и бюджете — получите подборку из 5 подходящих VPN-сервисов из каталога.",
  alternates: {
    canonical: "/vpn-matcher",
    languages: { ru: `${SITE_URL}/vpn-matcher`, en: `${SITE_URL}/en/vpn-matcher` },
  },
};

const FAQ = [
  {
    q: "Как работает подбор?",
    a: "Ваши ответы сопоставляются с тегами и характеристиками сервисов в каталоге (задача, платформа, бюджет, приоритет) — каждому сервису начисляются баллы, топ-5 показываются как результат.",
  },
  {
    q: "Это независимая рекомендация?",
    a: "Нет — подбор строится по данным, которые сами провайдеры указывают о себе (цена, платформы, теги вроде «no-logs» или «Netflix»). Это не результат независимого тестирования конкретных серверов.",
  },
  {
    q: "Можно ли пройти квиз заново с другими ответами?",
    a: "Да, кнопка «Пройти заново» на экране результатов сбрасывает все ответы.",
  },
];

export default async function VpnMatcherPage() {
  const services = await getAllServices();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "VPN Matcher", item: `${SITE_URL}/vpn-matcher` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
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
        <span>VPN Matcher</span>
      </nav>

      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Подберите VPN за 4 вопроса
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          Вместо того чтобы изучать десятки сервисов самостоятельно — ответьте на несколько
          вопросов и получите подборку из {services.length}-сервисного каталога.
        </p>
      </div>

      <VpnMatcher services={services} />

      <section className="mt-12 max-w-2xl">
        <h2 className="mb-4 text-lg font-semibold">Частые вопросы</h2>
        <div className="flex flex-col gap-4">
          {FAQ.map((item) => (
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
