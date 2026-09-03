"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/seo";
import { localeFromPathname } from "@/lib/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface TopService {
  slug: string;
  name: string;
}

interface SiteFooterProps {
  topServices: TopService[];
}

const USE_CASE_LINKS = [
  { slug: "vpn-for-netflix", ru: "VPN для Netflix", en: "VPN for Netflix" },
  { slug: "free-vpn", ru: "Бесплатный VPN", en: "Free VPN" },
  { slug: "vpn-for-torrents", ru: "VPN для торрентов", en: "VPN for torrenting" },
  { slug: "vpn-for-gaming", ru: "VPN для игр", en: "VPN for gaming" },
  { slug: "vpn-for-privacy", ru: "VPN для приватности", en: "VPN for privacy" },
  { slug: "vpn-without-registration", ru: "VPN без регистрации", en: "VPN without registration" },
  { slug: "vpn-for-mac", ru: "VPN для Mac", en: "VPN for Mac" },
  { slug: "vpn-for-iphone", ru: "VPN для iPhone", en: "VPN for iPhone" },
  { slug: "vpn-for-android", ru: "VPN для Android", en: "VPN for Android" },
  { slug: "vpn-for-windows", ru: "VPN для Windows", en: "VPN for Windows" },
  { slug: "vpn-for-streaming", ru: "VPN для стриминга", en: "VPN for streaming" },
  { slug: "vpn-for-travel", ru: "VPN для путешествий", en: "VPN for travel" },
] as const;

const TOOL_LINKS = [
  { slug: "vpn-matcher", ru: "VPN Matcher — подбор VPN", en: "VPN Matcher" },
  { slug: "vpn-prices", ru: "Цены на VPN", en: "VPN Prices" },
  { slug: "compare", ru: "Сравнить сервисы", en: "Compare services" },
  { slug: "what-is-my-ip", ru: "Мой IP-адрес", en: "What is my IP" },
  { slug: "is-my-ip-blocked", ru: "Проверка IP на блокировки", en: "IP blocklist check" },
  { slug: "webrtc-leak-test", ru: "Проверка утечки WebRTC", en: "WebRTC leak test" },
] as const;

const COPY = {
  ru: {
    tagline: "Каталог и сравнение VPN-сервисов. Не продаём доступ к VPN.",
    about: "О проекте",
    aboutLinks: [
      { href: "about", label: "О проекте" },
      { href: "vpnmarket-score", label: "VPNmarket Score — как считается" },
      { href: "blog", label: "Блог" },
    ],
    topTitle: "Топ-5 VPN",
    topSubtitle: "по VPNmarket Score",
    useCasesTitle: "VPN по задачам",
    toolsTitle: "Инструменты",
    rights: "Все права защищены.",
  },
  en: {
    tagline: "A VPN comparison catalog. We don't sell VPN access ourselves.",
    about: "About",
    aboutLinks: [
      { href: "about", label: "About" },
      { href: "vpnmarket-score", label: "VPNmarket Score — how it works" },
      { href: "blog", label: "Blog" },
    ],
    topTitle: "Top 5 VPNs",
    topSubtitle: "by VPNmarket Score",
    useCasesTitle: "VPN by use case",
    toolsTitle: "Tools",
    rights: "All rights reserved.",
  },
};

export function SiteFooter({ topServices }: SiteFooterProps) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const c = COPY[locale];
  const prefix = locale === "en" ? "/en" : "";
  const homeHref = locale === "en" ? "/en" : "/";

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href={homeHref} className="flex items-center gap-2 text-base font-semibold">
              <span className="text-xl leading-none">🛡️</span>
              <span>{SITE_NAME}</span>
            </Link>
            <p className="mt-3 max-w-xs text-xs text-muted">{c.tagline}</p>
            <div className="mt-4">
              <LocaleSwitcher />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{c.about}</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {c.aboutLinks.map((l) => (
                <li key={l.href}>
                  <Link href={`${prefix}/${l.href}`} className="text-muted transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{c.topTitle}</p>
            <p className="mt-0.5 text-[11px] text-muted">{c.topSubtitle}</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {topServices.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    href={`${prefix}/vpn/${s.slug}`}
                    className="text-muted transition-colors hover:text-fg"
                  >
                    <span className="text-fg/60">{i + 1}.</span> {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {c.useCasesTitle}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {USE_CASE_LINKS.map((l) => (
                <li key={l.slug}>
                  <Link href={`${prefix}/${l.slug}`} className="text-muted transition-colors hover:text-fg">
                    {locale === "en" ? l.en : l.ru}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {c.toolsTitle}
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {TOOL_LINKS.map((l) => (
                <li key={l.slug}>
                  <Link href={`${prefix}/${l.slug}`} className="text-muted transition-colors hover:text-fg">
                    {locale === "en" ? l.en : l.ru}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. {c.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
