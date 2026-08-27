import type { Metadata } from "next";
import Link from "next/link";
import { WebRtcLeakTest } from "@/components/WebRtcLeakTest";
import { SITE_URL, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Проверка утечки WebRTC",
  description:
    "Проверьте, не раскрывает ли WebRTC ваш настоящий IP-адрес в обход VPN. Бесплатный тест прямо в браузере.",
  alternates: {
    canonical: "/webrtc-leak-test",
    languages: { ru: `${SITE_URL}/webrtc-leak-test`, en: `${SITE_URL}/en/webrtc-leak-test` },
  },
};

const FAQ = [
  {
    q: "Что такое утечка WebRTC?",
    a: "WebRTC — технология для видеозвонков и P2P-соединений прямо в браузере. Для установления соединения она может раскрывать ваш реальный публичный IP-адрес через протокол STUN, даже если весь остальной трафик браузера идёт через VPN.",
  },
  {
    q: "Как защититься от утечки WebRTC?",
    a: "Часть VPN-приложений сама блокирует такие утечки. Также можно отключить WebRTC в браузере (для Firefox — через about:config, флаг media.peerconnection.enabled) или использовать расширение-блокировщик WebRTC.",
  },
  {
    q: "Почему тест ничего не находит, хотя VPN выключен?",
    a: "Часть браузеров и сетевых конфигураций не отдают публичный IP через WebRTC вообще (например, из-за настроек firewall или блокировки STUN) — отсутствие результата не всегда означает отсутствие утечки в других сценариях.",
  },
];

export default function WebRtcLeakTestPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Проверка утечки WebRTC",
        item: `${SITE_URL}/webrtc-leak-test`,
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
        <span>Проверка утечки WebRTC</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Проверка утечки WebRTC
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        WebRTC может раскрывать ваш реальный IP-адрес в обход VPN. Тест выполняется прямо в
        браузере — ничего не отправляется на сторонние серверы, кроме публичного STUN-сервера
        Google, стандартного для этой технологии.
      </p>

      <WebRtcLeakTest />

      <div className="mt-8">
        <Link
          href="/what-is-my-ip"
          className="text-sm text-accent hover:underline"
        >
          ← Узнать мой IP-адрес
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
