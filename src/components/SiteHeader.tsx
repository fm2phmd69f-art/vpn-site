"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SITE_NAME } from "@/lib/seo";
import { localeFromPathname } from "@/lib/i18n";
import { UI } from "@/lib/uiDictionary";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const nav = UI[locale].nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);

  const homeHref = locale === "en" ? "/en" : "/";
  const aboutHref = locale === "en" ? "/en/about" : "/about";
  const pricesHref = locale === "en" ? "/en/vpn-prices" : "/vpn-prices";
  const compareHref = locale === "en" ? "/en/compare" : "/compare";
  const blogHref = locale === "en" ? "/en/blog" : "/blog";

  const links = [
    { href: compareHref, label: nav.compare },
    { href: pricesHref, label: nav.prices },
    { href: blogHref, label: nav.blog },
    { href: aboutHref, label: nav.about },
  ];

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={homeHref}
          className="flex items-center gap-2 text-base font-semibold leading-none tracking-tight"
        >
          <span className="text-xl leading-none">🛡️</span>
          <span>{SITE_NAME}</span>
        </Link>

        <div ref={navRef} className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden items-center gap-5 text-sm text-muted sm:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            ))}
          </nav>

          <LocaleSwitcher />

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={nav.menu}
            aria-expanded={menuOpen}
            className="flex h-8 w-8 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="M2 4.5H16M2 9H16M2 13.5H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-border sm:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-3 text-sm text-muted transition-colors last:border-b-0 hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
