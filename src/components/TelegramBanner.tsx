import { TelegramIcon } from "./TelegramIcon";

const TELEGRAM_URL = "https://t.me/vpnmarketonline";

const COPY = {
  ru: {
    title: "Актуальные бесплатные VPN — в нашем Telegram",
    subtitle: "Изменения цен, блокировки провайдеров и новые обзоры коротко и без спама.",
    cta: "Подписаться →",
  },
  en: {
    title: "Current free VPNs — on our Telegram",
    subtitle: "Price changes, provider blackouts, and new reviews — short and no spam.",
    cta: "Subscribe →",
  },
};

export function TelegramBanner({ locale = "ru" }: { locale?: "ru" | "en" }) {
  const c = COPY[locale];
  return (
    <div
      className="mt-6 flex flex-col items-start justify-between gap-3 rounded-2xl p-4 sm:flex-row sm:items-center"
      style={{ background: "linear-gradient(to right, #2AABEE, #229ED9)" }}
    >
      <div className="flex items-center gap-3">
        <TelegramIcon className="h-8 w-8 shrink-0 text-white" />
        <div>
          <p className="text-sm font-semibold text-white">{c.title}</p>
          <p className="text-xs text-white/80">{c.subtitle}</p>
        </div>
      </div>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full shrink-0 rounded-full bg-white px-4 py-2 text-center text-sm font-medium text-[#229ED9] transition-opacity hover:opacity-90 sm:w-auto"
      >
        {c.cta}
      </a>
    </div>
  );
}
