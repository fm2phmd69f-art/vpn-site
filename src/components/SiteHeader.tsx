"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SITE_NAME } from "@/lib/seo";
import { localeFromPathname } from "@/lib/i18n";
import { UI } from "@/lib/uiDictionary";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const nav = UI[locale].nav;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const homeHref = locale === "en" ? "/en" : "/";
  const aboutHref = locale === "en" ? "/en/about" : "/about";
  const pricesHref = locale === "en" ? "/en/vpn-prices" : "/vpn-prices";

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={homeHref}
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span className="text-xl leading-none">🛡️</span>
          <span>{SITE_NAME}</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/compare" className="transition-colors hover:text-fg">
            {nav.compare}
          </Link>
          <Link href={pricesHref} className="transition-colors hover:text-fg">
            {nav.prices}
          </Link>
          <Link href="/blog" className="transition-colors hover:text-fg">
            {nav.blog}
          </Link>
          <Link href={aboutHref} className="transition-colors hover:text-fg">
            {nav.about}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
