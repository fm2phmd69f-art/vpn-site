import type { Metadata } from "next";
import Link from "next/link";
import { getClientInfo } from "@/lib/clientInfo";
import { checkBlocklists } from "@/lib/blocklist";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Проверка IP на блокировки (DNSBL)",
  description:
    "Проверьте свой текущий IP-адрес по публичным спам-блокспискам (DNSBL) — Spamhaus, SpamCop, SORBS и другим.",
  alternates: {
    canonical: "/is-my-ip-blocked",
    languages: { ru: `${SITE_URL}/is-my-ip-blocked`, en: `${SITE_URL}/en/is-my-ip-blocked` },
  },
};

const FAQ = [
  {
    q: "Что такое DNSBL?",
    a: "DNS-based Blackhole List — публичный список IP-адресов, с которых замечена подозрительная активность (спам-рассылки, сканирование, заражённые устройства). Почтовые серверы и часть сайтов используют такие списки для фильтрации трафика.",
  },
  {
    q: "Почему мой IP может быть в списке?",
    a: "Часто это происходит не из-за ваших действий: у VPN-провайдеров и хостингов один IP-адрес используют много разных людей одновременно (shared IP), и если кто-то из них рассылал спam, в блок иногда попадает весь адрес целиком.",
  },
  {
    q: "Что делать, если IP заблокирован?",
    a: "Если это IP вашего провайдера или VPN — обычно ничего делать не нужно, адреса регулярно ротируются и вычищаются из списков автоматически. Если ситуация повторяется постоянно, можно попробовать сменить сервер VPN или обратиться в поддержку провайдера.",
  },
  {
    q: "Означает ли попадание в список, что меня заблокируют везде?",
    a: "Нет. DNSBL используются в основном почтовыми серверами для фильтрации спама и некоторыми сайтами для антифрод-проверок — это не единый глобальный бан, а отдельные независимые списки с разным назначением.",
  },
];

export default async function IsMyIpBlockedPage() {
  const info = await getClientInfo();
  const check = info.ip ? await checkBlocklists(info.ip) : null;

  const listedCount = check?.results.filter((r) => r.listed === true).length ?? 0;
  const failedCount = check?.results.filter((r) => r.listed === null).length ?? 0;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Проверка IP на блокировки",
        item: `${SITE_URL}/is-my-ip-blocked`,
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
        <span>Проверка IP на блокировки</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Проверка IP на блокировки
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Реальная проверка вашего текущего IP-адреса по публичным DNSBL-спискам — прямые DNS-запросы
        к спискам, без сторонних API и ключей.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted">Проверяемый IP-адрес</p>
        <p className="mt-2 break-all text-2xl font-semibold tracking-tight">
          {info.ip ?? "не удалось определить"}
        </p>
      </div>

      {!check?.supported ? (
        <p className="mt-4 rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
          {info.ip
            ? "Проверка поддерживает только IPv4-адреса — ваш текущий адрес не в этом формате."
            : "Не удалось определить ваш IP-адрес для проверки."}
        </p>
      ) : (
        <>
          <div
            className={`mt-4 rounded-2xl border p-5 text-sm ${
              listedCount > 0
                ? "border-[var(--offline)] bg-[var(--offline)]/10"
                : "border-[var(--online)] bg-[var(--online)]/10"
            }`}
          >
            {listedCount > 0 ? (
              <p>
                <strong>Найден в {listedCount} из {check.results.length} списков.</strong> Смотрите
                детали ниже — это не всегда означает проблему конкретно с вашим устройством (см.
                FAQ).
              </p>
            ) : (
              <p>
                <strong>Чисто.</strong> IP не найден ни в одном из {check.results.length}{" "}
                проверенных списков{failedCount > 0 ? ` (${failedCount} проверить не удалось)` : ""}.
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5">
            {check.results.map((r) => (
              <div
                key={r.zone}
                className="flex items-center justify-between border-b border-border py-2 text-sm last:border-b-0"
              >
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted">{r.zone}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    r.listed === true
                      ? "bg-[var(--offline)]/15 text-[var(--offline)]"
                      : r.listed === false
                        ? "bg-[var(--online)]/15 text-[var(--online)]"
                        : "bg-[var(--unknown)]/15 text-muted"
                  }`}
                >
                  {r.listed === true ? "В списке" : r.listed === false ? "Чисто" : "Не удалось"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/what-is-my-ip"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          ← Узнать мой IP
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
        {SITE_NAME} не сохраняет ваш IP-адрес в базе данных — он используется только для проверки и
        отображения результата на этой странице.
      </p>
    </main>
  );
}
