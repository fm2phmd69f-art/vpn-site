import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { CatalogClient } from "@/components/CatalogClient";
import LightRays from "@/components/LightRays";
import { TAG_LABELS } from "@/data/services";
import { INTENTS } from "@/data/intents";
import { BLOG_POSTS } from "@/data/posts";
import { pairSlug } from "@/lib/comparisons";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

const POPULAR_COMPARISONS: [string, string][] = [
  ["nordvpn", "surfshark"],
  ["nordvpn", "expressvpn"],
  ["surfshark", "protonvpn"],
  ["expressvpn", "surfshark"],
];

export const revalidate = 1800;

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { ru: SITE_URL, en: `${SITE_URL}/en` } },
};

const FEATURED_TAGS = [
  "free-tier",
  "no-logs",
  "netflix",
  "torrents",
  "budget",
  "privacy",
  "unlimited-devices",
  "open-source",
  "china-friendly",
  "wireguard",
];

const FAQ_ITEMS = [
  {
    q: "Какой VPN выбрать бесплатно?",
    a: "Из каталога честные бесплатные тарифы без агрессивных ограничений предлагают Proton VPN, Windscribe, Hide.me и Cloudflare WARP. У части бесплатных VPN (например, Urban VPN, Hola) трафик других пользователей может идти через ваше устройство по P2P-модели — это стоит учитывать, если приоритет — приватность.",
  },
  {
    q: "Какой VPN лучше для Netflix и стриминга?",
    a: "Для разблокировки стриминговых сервисов чаще всего называют NordVPN, ExpressVPN и Surfshark — у них много серверов, оптимизированных под конкретные платформы. Доступность конкретного каталога зависит от страны сервера и может меняться без предупреждения.",
  },
  {
    q: "Чем отличается no-logs VPN от обычного?",
    a: "«No-logs» означает, что провайдер заявляет об отсутствии хранения логов активности и подключений пользователей. Часть провайдеров (например, NordVPN, ExpressVPN, Surfshark) проходили независимый аудит этой политики — это указано в описании сервиса в каталоге.",
  },
  {
    q: "Что значит статус «сайт доступен» на карточке?",
    a: "Это результат автоматической проверки — наш сервер регулярно делает запрос к сайту провайдера и измеряет время ответа. Это показывает, жив ли сайт провайдера прямо сейчас, а не скорость самого VPN-туннеля.",
  },
  {
    q: "Можно ли доверять «заявленной скорости» в каталоге?",
    a: "Это маркетинговый показатель самого провайдера («до X Мбит/с»), а не независимое измерение — реальная скорость зависит от вашего интернета, расстояния до сервера и нагрузки. Ориентируйтесь на неё как на верхнюю границу, а не гарантию.",
  },
];

export default async function HomePage() {
  const services = await getAllServices();

  const lastCheckedTimestamps = services
    .map((s) => s.lastCheckedAt)
    .filter((d): d is string => Boolean(d))
    .map((d) => new Date(d).getTime());
  const lastChecked =
    lastCheckedTimestamps.length > 0 ? new Date(Math.max(...lastCheckedTimestamps)) : null;

  const recentPosts = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Каталог VPN-сервисов",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/vpn/${s.slug}`,
      name: s.name,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />

      <header className="relative mb-8 flex flex-col items-center gap-2 overflow-hidden rounded-3xl bg-[#05070d] px-4 py-16 text-center">
        <div className="pointer-events-none absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.6}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse
            mouseInfluence={0.5}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>
        <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">
          <span aria-hidden>🛡️</span>
          <span>{SITE_NAME}</span>
        </div>
        <h1 className="relative z-10 text-4xl font-semibold tracking-tight text-white">
          Лучшие VPN-сервисы {new Date().getFullYear()}
        </h1>
        <p className="relative z-10 max-w-2xl text-white/70">
          Каталог из {services.length} VPN-провайдеров: цены, заявленная скорость, платформы и
          особенности — от no-logs и бесплатных тарифов до сервисов для Netflix и торрентов.
          Статус «сайт доступен» и задержка проверяются автоматически по расписанию.
        </p>
        {lastChecked && (
          <p className="relative z-10 text-xs text-white/50">
            Последняя автопроверка доступности сайтов:{" "}
            {lastChecked.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        )}
        <Link
          href="/vpnmarket-score"
          className="relative z-10 mt-1 text-xs text-white/60 underline underline-offset-2 hover:text-white/90"
        >
          Как считается рейтинг VPNmarket Score →
        </Link>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-center text-lg font-semibold">Популярные категории</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {FEATURED_TAGS.map((tag) => (
            <Link
              key={tag}
              href={`/vpn/category/${tag}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
            >
              {TAG_LABELS[tag] ?? tag}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-center text-lg font-semibold">Подборки под задачу</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.values(INTENTS).map((intent) => (
            <Link
              key={intent.slug}
              href={`/${intent.slug}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
            >
              {intent.h1}
            </Link>
          ))}
        </div>
      </section>

      <CatalogClient services={services} />

      <section className="mt-12">
        <h2 className="mb-3 text-center text-lg font-semibold">Бесплатные инструменты</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href="/vpn-security-check"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            🛡️ Проверка безопасности VPN
          </Link>
          <Link
            href="/what-is-my-ip"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            🌐 Мой IP-адрес
          </Link>
          <Link
            href="/webrtc-leak-test"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            🔍 Проверка утечки WebRTC
          </Link>
          <Link
            href="/is-my-ip-blocked"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            🚫 Проверка IP на блокировки
          </Link>
          <Link
            href="/tools"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            Все инструменты →
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-center text-lg font-semibold">Популярные сравнения</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {POPULAR_COMPARISONS.map(([a, b]) => (
            <Link
              key={pairSlug(a, b)}
              href={`/compare/${pairSlug(a, b)}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
            >
              {a} vs {b}
            </Link>
          ))}
          <Link
            href="/compare"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            Все сравнения →
          </Link>
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-surface p-6 text-center">
        <h2 className="text-lg font-semibold">Сколько стоит VPN?</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Таблица цен всех {services.length} провайдеров из каталога — от дешёвых к дорогим.
        </p>
        <Link
          href="/vpn-prices"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
        >
          💰 Сравнить цены →
        </Link>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-surface p-6 text-center">
        <h2 className="text-lg font-semibold">Не хотите разбираться сами?</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Ответьте на 4 вопроса — подберём VPN под вашу задачу, платформу и бюджет.
        </p>
        <Link
          href="/vpn-matcher"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          🎯 Подобрать VPN
        </Link>
      </section>

      <section className="mt-12">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Последние статьи</h2>
          <Link href="/blog" className="text-sm text-accent hover:underline">
            Все статьи →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent"
            >
              <p className="text-sm font-medium text-fg">{post.title}</p>
              <p className="mt-1.5 line-clamp-2 text-xs text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="mb-4 text-lg font-semibold">Частые вопросы</h2>
        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item) => (
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

      <footer className="mt-12 border-t border-border pt-6">
        <h2 className="mb-2 text-sm font-semibold">Как выбрать VPN?</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Прежде всего определитесь с задачей: для приватного сёрфинга подойдёт провайдер с
          независимо проверенной политикой no-logs, для просмотра зарубежных стриминговых
          каталогов — сервис с большим числом серверов и стабильной разблокировкой Netflix, а для
          экономии — один из бесплатных тарифов с честными условиями. Выше — весь каталог с
          фильтрами по цене, скорости и функциям, плюс отдельная страница у каждого сервиса с
          подробностями.
        </p>
        <p className="mt-6 text-xs text-muted">
          Цены, скорость и функции указаны со слов провайдеров и могут отличаться от актуальных —
          уточняйте на сайте сервиса. Мы не продаём и не выдаём доступ к VPN сами.
        </p>
      </footer>
    </main>
  );
}
