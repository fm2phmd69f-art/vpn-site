export interface SeedService {
  slug: string;
  name: string;
  logo: string;
  websiteUrl: string;
  referralUrl?: string;
  priceFrom: string;
  priceMonthlyUsd?: number;
  claimedSpeedMbps?: number;
  freeOption?: string;
  rating?: number;
  platforms: string[];
  tags: string[];
  description: string;
}

/**
 * Curated catalog. Prices/specs are self-reported by providers and go stale —
 * update this list periodically. Automated checks (scripts/check-services.ts)
 * only refresh `status` / `latencyMs`, never these fields.
 */
export const SEED_SERVICES: SeedService[] = [
  {
    slug: "nordvpn",
    name: "NordVPN",
    logo: "🛡",
    websiteUrl: "https://nordvpn.com/",
    priceFrom: "3.5 $/мес",
    priceMonthlyUsd: 3.5,
    claimedSpeedMbps: 950,
    freeOption: "7-дневный пробный период",
    rating: 4.7,
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux"],
    tags: ["no-logs", "netflix", "torrents", "double-vpn"],
    description:
      "Один из крупнейших VPN-провайдеров. Более 6000 серверов в 60+ странах, политика no-logs, собственный протокол NordLynx на базе WireGuard.",
  },
  {
    slug: "expressvpn",
    name: "ExpressVPN",
    logo: "🚀",
    websiteUrl: "https://www.expressvpn.com/",
    priceFrom: "6.7 $/мес",
    priceMonthlyUsd: 6.7,
    claimedSpeedMbps: 1000,
    freeOption: "нет, но 30 дней возврат денег",
    rating: 4.8,
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux", "Router"],
    tags: ["no-logs", "netflix", "streaming", "fast"],
    description:
      "Premium-сервис с упором на скорость и простоту. Собственный протокол Lightway, серверы в 105 странах.",
  },
  {
    slug: "surfshark",
    name: "Surfshark",
    logo: "🐙",
    websiteUrl: "https://surfshark.com/",
    priceFrom: "2.19 $/мес",
    priceMonthlyUsd: 2.19,
    claimedSpeedMbps: 900,
    freeOption: "7-дневный пробный период",
    rating: 4.5,
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux", "TV"],
    tags: ["no-logs", "netflix", "torrents", "budget", "unlimited-devices"],
    description:
      "Бюджетный вариант с неограниченным числом устройств на одной подписке. Есть CleanWeb — блокировка рекламы и трекеров.",
  },
  {
    slug: "protonvpn",
    name: "Proton VPN",
    logo: "🔒",
    websiteUrl: "https://protonvpn.com/",
    priceFrom: "0 $ (есть бесплатный тариф)",
    priceMonthlyUsd: 0,
    claimedSpeedMbps: 800,
    freeOption: "бессрочный бесплатный план",
    rating: 4.6,
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux"],
    tags: ["no-logs", "free-tier", "open-source", "swiss-based"],
    description:
      "От создателей ProtonMail. Швейцарская юрисдикция, открытый код клиентов, есть полностью бесплатный тариф без ограничения трафика.",
  },
  {
    slug: "mullvad",
    name: "Mullvad VPN",
    logo: "🐺",
    websiteUrl: "https://mullvad.net/",
    priceFrom: "5 €/мес (фикс. цена)",
    priceMonthlyUsd: 5.4,
    claimedSpeedMbps: 900,
    freeOption: "нет",
    rating: 4.6,
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux"],
    tags: ["no-logs", "privacy", "wireguard", "anonymous-payment"],
    description:
      "Максимальный фокус на приватность: регистрация без email, оплата криптой или наличными по почте, поддержка WireGuard.",
  },
  {
    slug: "pia",
    name: "Private Internet Access",
    logo: "🕶",
    websiteUrl: "https://www.privateinternetaccess.com/",
    priceFrom: "2.03 $/мес",
    priceMonthlyUsd: 2.03,
    claimedSpeedMbps: 800,
    freeOption: "нет, но 30 дней возврат денег",
    rating: 4.3,
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux", "Router"],
    tags: ["no-logs", "torrents", "budget", "open-source"],
    description:
      "Большое количество серверов (35000+), гибкая настройка, открытый исходный код приложений.",
  },
  {
    slug: "windscribe",
    name: "Windscribe",
    logo: "🌬",
    websiteUrl: "https://windscribe.com/",
    priceFrom: "0 $ (10 ГБ бесплатно)",
    priceMonthlyUsd: 0,
    claimedSpeedMbps: 500,
    freeOption: "бесплатный тариф 10 ГБ/мес",
    rating: 4.4,
    platforms: ["Windows", "macOS", "iOS", "Android", "Linux", "Browser"],
    tags: ["free-tier", "torrents", "ad-block"],
    description:
      "Гибкий бесплатный тариф, встроенный блокировщик рекламы (R.O.B.E.R.T), генератор конфигов OpenVPN/WireGuard.",
  },
];

export const TAG_LABELS: Record<string, string> = {
  "no-logs": "🚫 No-logs",
  netflix: "🎬 Netflix/стриминг",
  torrents: "⬇️ Торренты",
  "free-tier": "🆓 Бесплатный тариф",
  budget: "💸 Бюджетные",
  privacy: "🕵️ Приватность",
  "open-source": "🧩 Open-source",
  fast: "⚡ Высокая скорость",
  "unlimited-devices": "📱 Много устройств",
  wireguard: "🔌 WireGuard",
  "double-vpn": "🔁 Double VPN",
  streaming: "📺 Стриминг",
  "swiss-based": "🇨🇭 Швейцария",
  "anonymous-payment": "💰 Анонимная оплата",
  "ad-block": "🛑 Блок рекламы",
};
