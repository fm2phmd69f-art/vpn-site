import type { Metadata } from "next";
import Link from "next/link";
import { getClientInfo } from "@/lib/clientInfo";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Мой IP-адрес",
  description:
    "Узнайте свой публичный IP-адрес, страну, регион и часовой пояс — определяется по реальному запросу, без сторонних сервисов.",
  alternates: { canonical: "/what-is-my-ip" },
};

const FAQ = [
  {
    q: "Почему мой IP отличается от того, что показывает роутер?",
    a: "Роутер обычно показывает локальный (внутренний) адрес вашей сети. Здесь отображается публичный IP-адрес — тот, который видят внешние сайты, включая наш сервер.",
  },
  {
    q: "Виден ли мой IP другим сайтам?",
    a: "Да, любой сайт, который вы посещаете, видит ваш публичный IP-адрес — это стандартная часть работы интернет-протокола. VPN подменяет этот адрес на адрес сервера VPN-провайдера.",
  },
  {
    q: "Как эта страница узнаёт мой IP и город?",
    a: "Данные берутся напрямую из технической информации вашего запроса на edge-сети Vercel, без обращения к сторонним геолокационным API. Точность города зависит от базы данных провайдера сети и может быть неточной.",
  },
];

export default async function WhatIsMyIpPage() {
  const info = await getClientInfo();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Мой IP", item: `${SITE_URL}/what-is-my-ip` },
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
        <span>Мой IP</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Мой IP-адрес</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Определяется по вашему текущему запросу к серверу — реальные данные, без сторонних
        геолокационных сервисов.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted">Ваш публичный IP-адрес</p>
        <p className="mt-2 break-all text-3xl font-semibold tracking-tight sm:text-4xl">
          {info.ip ?? "не удалось определить"}
        </p>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-border bg-surface p-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">Страна</dt>
          <dd className="font-medium">{info.country ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">Регион</dt>
          <dd className="font-medium">{info.region ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">Город</dt>
          <dd className="font-medium">{info.city ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">Часовой пояс</dt>
          <dd className="font-medium">{info.timezone ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">Широта</dt>
          <dd className="font-medium">{info.latitude ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">Долгота</dt>
          <dd className="font-medium">{info.longitude ?? "—"}</dd>
        </div>
      </dl>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <p>
          Ваш IP-адрес виден каждому сайту, который вы посещаете, и может использоваться для
          примерного определения вашей геолокации, как показано выше. VPN подменяет этот адрес
          на адрес сервера провайдера — сайты видят локацию сервера, а не вашу настоящую.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/webrtc-leak-test"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Проверить утечку через WebRTC →
        </Link>
        <Link
          href="/"
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Сравнить VPN-сервисы →
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

      <p className="mt-10 text-xs text-muted">
        {SITE_NAME} не сохраняет ваш IP-адрес в базе данных — он используется только для расчёта и
        отображения результата на этой странице.
      </p>
    </main>
  );
}
