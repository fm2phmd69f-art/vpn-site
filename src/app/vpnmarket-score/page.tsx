import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "VPNmarket Score — как считается",
  description:
    "Как устроен VPNmarket Score — наш собственный индекс 0–100 для сравнения VPN-провайдеров по цене, скорости, приватности, стримингу, функциям и надёжности.",
  alternates: { canonical: "/vpnmarket-score" },
};

const COMPONENTS = [
  {
    h3: "Цена — 0–100",
    body: "Линейная шкала от 0 $/мес (100 баллов) до 15 $/мес и выше (0 баллов). Если у сервиса нет постоянного бесплатного тарифа и нет числовой цены в каталоге — 50 баллов (нейтральное значение).",
  },
  {
    h3: "Скорость — 0–100",
    body: "Линейная шкала от 0 до 1000 Мбит/с заявленной провайдером скорости. Это не независимый замер — мы явно подписываем такие цифры как «заявлено провайдером» везде на сайте, и Score здесь не исключение.",
  },
  {
    h3: "Приватность — 0–100",
    body: "Начисляется по тегам в каталоге: no-logs (+40), приватность (+20), open-source (+15), анонимная оплата (+15), double VPN (+10), сумма ограничена 100. Если ни один из этих тегов не проставлен — базовые 20 баллов.",
  },
  {
    h3: "Стриминг — 0–100",
    body: "Тег Netflix/стриминг (+70) и тег «стриминг» (+30), сумма ограничена 100. Если ни один тег не проставлен — базовые 15 баллов.",
  },
  {
    h3: "Функции — 0–100",
    body: "До 60 баллов за число поддерживаемых платформ (из расчёта на 5 платформ), плюс бонусы за WireGuard, безлимит устройств, статический IP, объединение соединений, свой сервер, блок рекламы, тариф для бизнеса и обход блокировок.",
  },
  {
    h3: "Надёжность — 0–100",
    body: "Основана на нашей собственной автоматической проверке доступности сайта провайдера: 100 баллов, если сайт сейчас доступен, 55 — если статус ещё не определён, 10 — если сайт недоступен на момент последней проверки.",
  },
];

export default function VpnmarketScorePage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "VPNmarket Score",
        item: `${SITE_URL}/vpnmarket-score`,
      },
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
        <span>VPNmarket Score</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Как считается VPNmarket Score
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        VPNmarket Score — наш собственный индекс от 0 до 100, который {SITE_NAME} считает для
        каждого провайдера в каталоге автоматически, по формуле ниже. Это не рейтинг пользователей
        и не оценка провайдера — сумма шести компонентов, посчитанная из данных, которые уже есть
        в карточке сервиса.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <p>
          <strong className="text-fg">Итоговый Score</strong> — среднее арифметическое шести
          компонентов, округлённое до целого числа. Каждый компонент весит одинаково (⅙ от
          итога).
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {COMPONENTS.map((c) => (
          <section key={c.h3}>
            <h2 className="mb-1.5 text-base font-semibold">{c.h3}</h2>
            <p className="text-sm leading-relaxed text-muted">{c.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <h2 className="mb-1.5 text-base font-semibold text-fg">Почему не «Поддержка»</h2>
        <p>
          В индустрии такие индексы часто включают компонент «Качество поддержки». Мы его
          сознательно не считаем — у нас нет реальных данных о качестве службы поддержки
          провайдеров (мы не тестируем их чат и почту), а придумывать такую оценку значило бы
          выдавать вымышленные данные за настоящие. Вместо этого шестой компонент — «Надёжность»,
          основанная на нашей собственной автоматической проверке доступности сайта.
        </p>
      </div>

      <p className="mt-8 text-xs text-muted">
        Шкала фиксированная (не зависит от того, какие ещё провайдеры сейчас в каталоге), поэтому
        Score одного и того же сервиса не «плывёт» просто оттого, что мы добавили или убрали
        другого провайдера — он меняется только когда меняются реальные данные самого сервиса.
      </p>

      <p className="mt-10">
        <Link href="/about" className="text-sm text-accent hover:underline">
          ← О проекте и методологии данных
        </Link>
      </p>
    </main>
  );
}
