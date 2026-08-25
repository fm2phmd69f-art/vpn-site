import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";
import { ServiceLogo } from "@/components/ServiceLogo";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Цены на VPN — таблица тарифов всех провайдеров",
  description:
    "Сравнение цен на VPN-подписки: минимальная стоимость тарифа, бесплатные варианты и заявленная скорость для всех провайдеров в каталоге.",
  alternates: { canonical: "/vpn-prices" },
};

const FAQ = [
  {
    q: "Откуда цены в таблице?",
    a: "Цены указаны со слов самих провайдеров — с их официальных сайтов, обычно за самый длинный доступный тарифный период (где цена в пересчёте на месяц минимальна). Мы не проводим собственных переговоров о цене и не гарантируем, что указанная цена сохранится к моменту оплаты.",
  },
  {
    q: "Почему у одних сервисов цена в долларах, а у других в евро?",
    a: "Мы указываем цену в той валюте, в которой её показывает сам провайдер на своём сайте — конвертация в единую валюту не производится, чтобы не создавать курсовую погрешность.",
  },
  {
    q: "Что если у сервиса есть бесплатный тариф?",
    a: "Если у провайдера есть постоянный бесплатный план (не просто пробный период), это указано отдельным столбцом «Бесплатно» — такие сервисы отсортированы в начале таблицы.",
  },
];

export default async function VpnPricesPage() {
  const services = await getAllServices();

  const sorted = [...services].sort((a, b) => {
    const pa = a.priceMonthlyUsd ?? Infinity;
    const pb = b.priceMonthlyUsd ?? Infinity;
    return pa - pb;
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Цены на VPN", item: `${SITE_URL}/vpn-prices` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Цены на VPN-сервисы",
    itemListElement: sorted.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/vpn/${s.slug}`,
      name: s.name,
    })),
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
        dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }}
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
        <span>Цены на VPN</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Цены на VPN — сравнение тарифов
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Все {sorted.length} провайдеров из каталога {SITE_NAME}, отсортированные от дешёвых к
        дорогим по минимальной заявленной цене подписки.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Сервис</th>
              <th className="px-4 py-3">Цена от</th>
              <th className="px-4 py-3">Бесплатно</th>
              <th className="px-4 py-3">Скорость</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <Link
                    href={`/vpn/${s.slug}`}
                    className="flex items-center gap-2 font-medium hover:text-accent"
                  >
                    <ServiceLogo name={s.name} emoji={s.logo} websiteUrl={s.websiteUrl} />
                    {s.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{s.priceFrom}</td>
                <td className="px-4 py-3 text-muted">{s.freeOption ?? "—"}</td>
                <td className="px-4 py-3 text-muted">
                  {s.claimedSpeedMbps != null ? `до ${s.claimedSpeedMbps} Мбит/с` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted">
        Цены указаны со слов провайдеров и могут отличаться от актуальных на момент оплаты —
        уточняйте на сайте сервиса перед покупкой.
      </p>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/compare"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Сравнить сервисы попарно →
        </Link>
        <Link
          href="/vpn-matcher"
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Подобрать VPN под задачу →
        </Link>
      </div>

      <section className="mt-12">
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
