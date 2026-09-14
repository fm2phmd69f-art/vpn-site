import { TelegramIcon } from "./TelegramIcon";

const TELEGRAM_URL = "https://t.me/vpnmarketonline";

const COPY = {
  ru: "Актуальные бесплатные VPN — в нашем Telegram",
  en: "Current free VPNs — on our Telegram",
};

export function TelegramTopBanner({ locale = "ru" }: { locale?: "ru" | "en" }) {
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-6 flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition-opacity hover:opacity-90"
      style={{ background: "linear-gradient(to right, #2AABEE, #229ED9)" }}
    >
      <span className="text-[16px] font-medium leading-snug text-white">{COPY[locale]}</span>
      <TelegramIcon className="h-6 w-6 shrink-0 text-white" />
    </a>
  );
}
