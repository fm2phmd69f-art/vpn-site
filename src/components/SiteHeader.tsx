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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false);
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
    <header ref={headerRef} className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={homeHref}
          className="flex items-center gap-2 text-base font-semibold leading-none tracking-tight"
        >
          <span className="text-xl leading-none">🛡️</span>
          <span>{SITE_NAME}</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
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
            aria-label={menuOpen ? nav.close : nav.menu}
            aria-expanded={menuOpen}
            className="relative z-[60] flex h-8 w-8 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface sm:hidden"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 bg-current transition-opacity duration-150 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-[1.5px] w-[18px] -translate-x-1/2 bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-bg sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-[24px] font-medium text-fg transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
