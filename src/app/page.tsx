import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { CatalogClient } from "@/components/CatalogClient";
import LightRays from "@/components/LightRays";
import { TAG_LABELS } from "@/data/services";
import { INTENTS } from "@/data/intents";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const revalidate = 1800;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
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
          Сравнение VPN-сервисов {new Date().getFullYear()}
        </h1>
        <p className="relative z-10 max-w-2xl text-white/70">
          Каталог из {services.length} VPN-провайдеров: цены, заявленная скорость, платформы и
          особенности — от no-logs и бесплатных тарифов до сервисов для Netflix и торрентов.
          Статус «сайт доступен» и задержка проверяются автоматически по расписанию.
        </p>
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
        </div>
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

      <section className="mt-12 max-w-3xl">
        <h2 className="mb-4 text-lg font-semibold">Частые вопросы</h2>
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q}>
              <h3 className="text-sm font-medium">{item.q}</h3>
              <p className="mt-1 text-sm text-muted">{item.a}</p>
            </div>
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
