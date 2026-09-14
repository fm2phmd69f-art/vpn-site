import Link from "next/link";

const COPY = {
  ru: {
    title: "Актуальные бесплатные VPN — в нашем Telegram",
    subtitle: "Изменения цен, блокировки провайдеров и новые обзоры коротко и без спама.",
    cta: "Подписаться →",
    href: "/telegram",
  },
  en: {
    title: "Current free VPNs — on our Telegram",
    subtitle: "Price changes, provider blackouts, and new reviews — short and no spam.",
    cta: "Subscribe →",
    href: "/en/telegram",
  },
};

export function TelegramBanner({ locale = "ru" }: { locale?: "ru" | "en" }) {
  const c = COPY[locale];
  return (
    <div className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <span className="text-2xl leading-none" aria-hidden>
          📱
        </span>
        <div>
          <p className="text-sm font-semibold text-fg">{c.title}</p>
          <p className="text-xs text-muted">{c.subtitle}</p>
        </div>
      </div>
      <Link
        href={c.href}
        className="w-full shrink-0 rounded-full bg-accent px-4 py-2 text-center text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
      >
        {c.cta}
      </Link>
    </div>
  );
}
