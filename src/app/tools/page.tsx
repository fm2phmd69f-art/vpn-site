import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Бесплатные VPN-инструменты",
  description:
    "Бесплатные инструменты для проверки IP-адреса, утечек и статуса блокировок: узнать IP, тест WebRTC, проверка на блок-списки, комплексная проверка безопасности.",
  alternates: {
    canonical: "/tools",
    languages: { ru: `${SITE_URL}/tools`, en: `${SITE_URL}/en/tools` },
  },
};

const TOOLS = [
  {
    href: "/vpn-security-check",
    icon: "🛡️",
    title: "Проверка безопасности VPN",
    description: "Все три проверки ниже на одной странице — IP, блок-списки и утечка WebRTC.",
  },
  {
    href: "/what-is-my-ip",
    icon: "🌐",
    title: "Мой IP-адрес",
    description: "Публичный IP-адрес, страна, регион и часовой пояс по данным реального запроса.",
  },
  {
    href: "/webrtc-leak-test",
    icon: "🔍",
    title: "Проверка утечки WebRTC",
    description: "Не раскрывает ли WebRTC ваш реальный IP-адрес в обход VPN — тест в браузере.",
  },
  {
    href: "/is-my-ip-blocked",
    icon: "🚫",
    title: "Проверка IP на блокировки",
    description: "Проверка текущего IP по публичным DNSBL-спискам — Spamhaus, SpamCop и другим.",
  },
];

export default function ToolsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Инструменты", item: `${SITE_URL}/tools` },
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
        <span>Инструменты</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Бесплатные VPN-инструменты
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Реальные проверки прямо в браузере — без регистрации и без сторонних сервисов, кроме
        случаев, где это явно указано.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <span className="text-2xl leading-none" aria-hidden>
              {tool.icon}
            </span>
            <div>
              <p className="font-semibold text-fg">{tool.title}</p>
              <p className="mt-1 text-sm text-muted">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10">
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
      </p>
    </main>
  );
}
