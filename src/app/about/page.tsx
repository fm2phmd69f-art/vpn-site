import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "О проекте",
  description:
    "Как устроен VPN Маркетплейс: откуда берутся данные о провайдерах, как мы проверяем доступность сайтов и на чём зарабатываем.",
  alternates: {
    canonical: "/about",
    languages: { ru: `${SITE_URL}/about`, en: `${SITE_URL}/en/about` },
  },
};

const SECTIONS = [
  {
    h2: "Что это за сайт",
    body: [
      `${SITE_NAME} — это каталог и сервис сравнения VPN-провайдеров. Мы не продаём доступ к VPN и не являемся посредником между вами и провайдером: вы всегда оформляете подписку напрямую на сайте выбранного сервиса.`,
      "Сайт помогает быстро сравнить цены, платформы, заявленную скорость и особенности разных провайдеров в одном месте, а также подобрать сервис под конкретную задачу — например, для Netflix, торрентов или анонимности.",
    ],
  },
  {
    h2: "Откуда берутся данные о провайдерах",
    body: [
      "Характеристики каждого сервиса (цена, платформы, число серверов, политика логирования, заявленная скорость) указаны со слов самого провайдера — с официального сайта или публичной документации. Мы не проводим независимых лабораторных измерений скорости или собственных аудитов no-logs политики.",
      "Если провайдер проходил независимый внешний аудит (например, аудит политики no-logs от аудиторской компании), это отдельно отмечается в описании сервиса — как факт публикации такого аудита, а не как наша собственная оценка.",
      "Статус «сайт доступен» и задержка ответа — единственные метрики, которые мы измеряем сами: автоматическая проверка регулярно обращается к сайту провайдера и замеряет время ответа. Это показывает, жив ли сайт провайдера прямо сейчас, а не качество или скорость самого VPN-туннеля.",
    ],
  },
  {
    h2: "Как часто обновляется каталог",
    body: [
      "Список провайдеров пополняется новыми карточками на регулярной основе, а проверка доступности сайтов происходит автоматически по расписанию. Тем не менее цены и условия у провайдеров могут меняться быстрее, чем мы успеваем это отследить — перед оплатой всегда сверяйтесь с актуальными условиями на сайте самого сервиса.",
    ],
  },
  {
    h2: "На чём мы зарабатываем",
    body: [
      "Каталог и все инструменты на сайте (проверка IP, WebRTC-тест, проверка блокировок, подбор VPN) бесплатны и не требуют регистрации.",
      "Часть ссылок на сайты провайдеров может быть партнёрской (affiliate) — переход по такой ссылке и последующая оплата подписки может принести нам небольшое вознаграждение от провайдера. Это никак не влияет на цену для вас и не влияет на порядок сортировки каталога — сортировка настраивается вами вручную по цене, скорости или другим параметрам, а не нами.",
    ],
  },
  {
    h2: "Редакционная политика",
    body: [
      "Мы не публикуем платные обзоры и не берём деньги за размещение сервиса в каталоге или за более высокую позицию в списке.",
      "Мы не показываем выдуманные рейтинги, отзывы или оценки пользователей — на сайте нет ни одной звёздной оценки или количества «отзывов», которые не были бы получены от реальных пользователей через отдельно подписанную партнёрскую программу.",
      "Если вы заметили неточность в карточке провайдера — цену, набор функций или статус аудита, который устарел, — вы можете сообщить об этом через форму жалобы на странице сервиса.",
    ],
  },
];

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "О проекте", item: `${SITE_URL}/about` },
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
        <span>О проекте</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        О проекте {SITE_NAME}
      </h1>

      <div className="mt-8 flex flex-col gap-8">
        {SECTIONS.map((section) => (
          <section key={section.h2}>
            <h2 className="mb-2 text-lg font-semibold">{section.h2}</h2>
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/"
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Смотреть каталог →
        </Link>
        <Link
          href="/vpn-matcher"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Подобрать VPN →
        </Link>
        <Link
          href="/vpnmarket-score"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Как считается Score →
        </Link>
      </div>
    </main>
  );
}
