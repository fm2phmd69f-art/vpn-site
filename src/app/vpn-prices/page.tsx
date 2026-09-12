import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { getServiceExtras } from "@/data/services";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";
import { ServiceLogo } from "@/components/ServiceLogo";
import { TopBadge } from "@/components/TopBadge";
import { ScoreBadge } from "@/components/ScoreBadge";
import { computeScore } from "@/lib/score";
import { withUtm } from "@/lib/utm";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Цены на VPN 2026 — сравнение тарифов и дешёвые подписки",
  description:
    "Сравнение цен на VPN в 2026 году: минимальная стоимость тарифа, поддержка WireGuard, no-logs политика, число устройств и заявленная скорость — весь каталог провайдеров в одной таблице.",
  alternates: {
    canonical: "/vpn-prices",
    languages: { ru: `${SITE_URL}/vpn-prices`, en: `${SITE_URL}/en/vpn-prices` },
  },
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
  {
    q: "Есть ли гарантия возврата денег?",
    a: "У многих провайдеров есть период гарантированного возврата денег (обычно от 7 до 45 дней) — точный срок и условия отличаются у каждого сервиса. Мы не храним эти данные в общей таблице, чтобы не давать неточную информацию, — уточняйте актуальные условия на сайте провайдера перед оплатой.",
  },
  {
    q: "Что означают отметки «No-logs» и «WireGuard» в таблице?",
    a: "Это теги из карточки провайдера в нашем каталоге: «No-logs» — провайдер заявляет об отсутствии логов активности, «WireGuard» — поддерживается современный быстрый протокол WireGuard (или его вариация). Прочерк означает не «нет», а то, что мы не нашли подтверждения этому в открытых источниках — уточняйте у провайдера.",
  },
];

const PINNED_SLUG = "geodema";

export default async function VpnPricesPage() {
  const services = await getAllServices();

  const byPrice = [...services].sort((a, b) => {
    const pa = a.priceMonthlyUsd ?? Infinity;
    const pb = b.priceMonthlyUsd ?? Infinity;
    return pa - pb;
  });

  const pinnedIndex = byPrice.findIndex((s) => s.slug === PINNED_SLUG);
  let sorted = byPrice;
  if (pinnedIndex > 2) {
    const pinned = byPrice[pinnedIndex];
    const rest = byPrice.filter((s) => s.slug !== PINNED_SLUG);
    sorted = [...rest.slice(0, 2), pinned, ...rest.slice(2)];
  }

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
      item: {
        "@type": "SoftwareApplication",
        name: s.name,
        url: `${SITE_URL}/vpn/${s.slug}`,
        applicationCategory: "SecurityApplication",
        operatingSystem: s.platforms.join(", "),
        ...(s.priceMonthlyUsd != null
          ? {
              offers: {
                "@type": "Offer",
                price: s.priceMonthlyUsd,
                priceCurrency: "USD",
                url: `${SITE_URL}/vpn/${s.slug}`,
              },
            }
          : {}),
      },
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
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
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
        Все {sorted.length} провайдеров из каталога {SITE_NAME} — от бюджетных вариантов к более
        дорогим тарифам, с ценой, которую заявляет сам сервис.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Сервис</th>
              <th className="px-4 py-3">
                <Link href="/vpnmarket-score" className="hover:text-fg hover:underline">
                  Score
                </Link>
              </th>
              <th className="px-4 py-3">Цена от</th>
              <th className="px-4 py-3">Устройств</th>
              <th className="px-4 py-3">No-logs</th>
              <th className="px-4 py-3">WireGuard</th>
              <th className="px-4 py-3">Бесплатно</th>
              <th className="px-4 py-3">Скорость</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => {
              const extras = getServiceExtras(s.slug);
              return (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <Link
                      href={`/vpn/${s.slug}`}
                      className="flex items-center gap-2 font-medium hover:text-accent"
                    >
                      <ServiceLogo
                        name={s.name}
                        emoji={s.logo}
                        websiteUrl={s.websiteUrl}
                        status={s.status}
                        slug={s.slug}
                      />
                      {s.name}
                      {s.slug === "geodema" && <TopBadge />}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <ScoreBadge score={computeScore(s).overall} size="sm" />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-base font-bold text-fg">{s.priceFrom}</span>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {extras.simultaneousConnections != null ? extras.simultaneousConnections : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {s.tags.includes("no-logs") ? (
                      <span style={{ color: "var(--online)" }}>✓</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {s.tags.includes("wireguard") ? (
                      <span style={{ color: "var(--online)" }}>✓</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{s.freeOption ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">
                    {s.claimedSpeedMbps != null ? `до ${s.claimedSpeedMbps} Мбит/с` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={withUtm(s.referralUrl ?? s.websiteUrl, s.slug)}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      Перейти →
                    </a>
                  </td>
                </tr>
              );
            })}
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
        <div className="flex flex-col gap-2">
          {FAQ.map((item) => (
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
