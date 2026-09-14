import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const revalidate = 86400;

const TELEGRAM_URL = "https://t.me/vpnmarketonline";

export const metadata: Metadata = {
  title: "Telegram-канал — актуальные бесплатные VPN и новости",
  description:
    "Подпишитесь на Telegram-канал VPN Маркетплейс: актуальные бесплатные VPN, изменения цен, блокировки провайдеров и новые обзоры.",
  alternates: {
    canonical: "/telegram",
    languages: { ru: `${SITE_URL}/telegram`, en: `${SITE_URL}/en/telegram` },
  },
};

const POINTS = [
  "Актуальные бесплатные VPN — в первую очередь честные тарифы без скрытых лимитов и без P2P-модели.",
  "Изменения цен и условий у популярных провайдеров, как только мы их замечаем.",
  "Новости о блокировках — какие сервисы перестали работать в конкретных странах и почему.",
  "Новые обзоры и сравнения VPN-сервисов из каталога.",
];

export default function TelegramPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Telegram-канал", item: `${SITE_URL}/telegram` },
    ],
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Главная
        </Link>
        {" / "}
        <span>Telegram-канал</span>
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-4xl leading-none">📱</span>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Telegram-канал {SITE_NAME}
        </h1>
      </div>

      <p className="mt-4 text-base text-muted">
        Актуальные бесплатные VPN — в нашем Telegram. Коротко и по делу: без рекламы и без спама.
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {POINTS.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-fg">
            <span className="mt-0.5 text-accent">✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Подписаться на канал →
      </a>

      <p className="mt-10">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
      </p>
    </main>
  );
}
