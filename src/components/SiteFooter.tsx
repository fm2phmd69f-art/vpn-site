"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/seo";
import { localeFromPathname } from "@/lib/i18n";
import { LocaleSwitcher } from "./LocaleSwitcher";

const COPY = {
  ru: {
    about: "О проекте",
    compare: "Сравнить сервисы",
    prices: "Цены на VPN",
    blog: "Блог",
    score: "VPNmarket Score",
    tagline: "Каталог и сравнение VPN-сервисов. Не продаём доступ к VPN.",
  },
  en: {
    about: "About",
    compare: "Compare services",
    prices: "VPN Prices",
    blog: "Blog",
    score: "VPNmarket Score",
    tagline: "A VPN comparison catalog. We don't sell VPN access ourselves.",
  },
};

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const c = COPY[locale];
  const aboutHref = locale === "en" ? "/en/about" : "/about";
  const scoreHref = locale === "en" ? "/en/vpnmarket-score" : "/vpnmarket-score";
  const pricesHref = locale === "en" ? "/en/vpn-prices" : "/vpn-prices";

  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold">{SITE_NAME}</p>
          <p className="mt-1 max-w-md text-xs text-muted">{c.tagline}</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <Link href={aboutHref} className="transition-colors hover:text-fg">
            {c.about}
          </Link>
          <Link href="/compare" className="transition-colors hover:text-fg">
            {c.compare}
          </Link>
          <Link href={pricesHref} className="transition-colors hover:text-fg">
            {c.prices}
          </Link>
          <Link href="/blog" className="transition-colors hover:text-fg">
            {c.blog}
          </Link>
          <Link href={scoreHref} className="transition-colors hover:text-fg">
            {c.score}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </footer>
  );
}
