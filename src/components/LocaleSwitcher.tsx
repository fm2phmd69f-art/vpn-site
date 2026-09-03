"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, switchLocalePath } from "@/lib/i18n";
import { UI } from "@/lib/uiDictionary";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const labels = UI[locale].langSwitcher;

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border p-0.5 text-xs font-medium">
      <Link
        href={switchLocalePath(pathname, "ru")}
        className={`rounded-full px-2 py-1 transition-colors ${
          locale === "ru" ? "bg-accent text-white" : "text-muted hover:text-fg"
        }`}
      >
        {labels.ru}
      </Link>
      <Link
        href={switchLocalePath(pathname, "en")}
        className={`rounded-full px-2 py-1 transition-colors ${
          locale === "en" ? "bg-accent text-white" : "text-muted hover:text-fg"
        }`}
      >
        {labels.en}
      </Link>
    </div>
  );
}
