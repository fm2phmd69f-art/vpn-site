import type { Metadata } from "next";
import Link from "next/link";
import { getClientInfo } from "@/lib/clientInfo";
import { checkBlocklists } from "@/lib/blocklist";
import { WebRtcLeakTest } from "@/components/WebRtcLeakTest";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Проверка безопасности VPN",
  description:
    "Комплексная проверка вашего текущего подключения: IP-адрес и геолокация, попадание в блок-списки DNSBL и утечка реального IP через WebRTC — на одной странице.",
  alternates: {
    canonical: "/vpn-security-check",
    languages: {
      ru: `${SITE_URL}/vpn-security-check`,
      en: `${SITE_URL}/en/vpn-security-check`,
    },
  },
};

const FAQ = [
  {
    q: "Что именно проверяет эта страница?",
    a: "Три независимые вещи: какой IP-адрес и геолокацию видят внешние сайты, числится ли этот IP в публичных блок-списках DNSBL, и не раскрывает ли WebRTC ваш реальный адрес в обход VPN. Каждая проверка выполняется по-настоящему — это не симуляция.",
  },
  {
    q: "Достаточно ли этой страницы, чтобы быть уверенным в безопасности VPN?",
    a: "Нет. Это набор из трёх конкретных, проверяемых технических тестов, а не полный аудит безопасности. Мы не тестируем сам VPN-туннель, шифрование или политику логов провайдера — за подробностями по конкретному сервису смотрите его страницу в каталоге.",
  },
  {
    q: "Почему результаты меняются, если включить и выключить VPN?",
    a: "IP-адрес, геолокация и результат DNSBL зависят от того, чей адрес виден внешним серверам в момент запроса — с VPN это адрес сервера провайдера, без VPN — адрес вашего интернет-провайдера. WebRTC может показывать ваш реальный адрес независимо от VPN, если приложение не блокирует такие запросы.",
  },
];

export default async function VpnSecurityCheckPage() {
  const info = await getClientInfo();
  const check = info.ip ? await checkBlocklists(info.ip) : null;
  const listedCount = check?.results.filter((r) => r.listed === true).length ?? 0;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Проверка безопасности VPN",
        item: `${SITE_URL}/vpn-security-check`,
      },
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
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
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
        <span>Проверка безопасности VPN</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Проверка безопасности VPN
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Три реальные проверки вашего текущего подключения на одной странице — включите VPN и
        сравните результат. Ничего из этого не проверяет сам VPN-туннель или политику
        провайдера — только то, что видно снаружи прямо сейчас.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-fg">1. IP-адрес и геолокация</p>
            <Link href="/what-is-my-ip" className="text-xs text-accent hover:underline">
              подробнее →
            </Link>
          </div>
          <p className="mt-2 break-all text-xl font-semibold tracking-tight">
            {info.ip ?? "не удалось определить"}
          </p>
          <p className="mt-1 text-sm text-muted">
            {info.country ? `${info.city ? `${info.city}, ` : ""}${info.country}` : "Локация не определена"}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-fg">2. Блок-списки DNSBL</p>
            <Link href="/is-my-ip-blocked" className="text-xs text-accent hover:underline">
              подробнее →
            </Link>
          </div>
          {!check?.supported ? (
            <p className="mt-2 text-sm text-muted">
              {info.ip
                ? "Проверка поддерживает только IPv4-адреса — текущий адрес не в этом формате."
                : "Не удалось определить IP-адрес для проверки."}
            </p>
          ) : (
            <p
              className={`mt-2 text-sm font-medium ${
                listedCount > 0 ? "text-[var(--offline)]" : "text-[var(--online)]"
              }`}
            >
              {listedCount > 0
                ? `Найден в ${listedCount} из ${check.results.length} списков`
                : `Чисто — не найден ни в одном из ${check.results.length} списков`}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-fg">3. Утечка через WebRTC</p>
            <Link href="/webrtc-leak-test" className="text-xs text-accent hover:underline">
              подробнее →
            </Link>
          </div>
          <div className="mt-3">
            <WebRtcLeakTest locale="ru" />
          </div>
        </div>
      </div>

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

      <p className="mt-10 text-xs text-muted">
        {SITE_NAME} не сохраняет ваш IP-адрес и результаты проверок в базе данных — они
        используются только для отображения результата на этой странице.
      </p>

      <p className="mt-6">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
      </p>
    </main>
  );
}
