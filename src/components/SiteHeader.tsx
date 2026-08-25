import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <span className="text-xl leading-none">🛡️</span>
          <span>{SITE_NAME}</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/compare" className="transition-colors hover:text-fg">
            Сравнить сервисы
          </Link>
          <Link href="/blog" className="transition-colors hover:text-fg">
            Блог
          </Link>
          <Link href="/about" className="transition-colors hover:text-fg">
            О проекте
          </Link>
        </nav>
      </div>
    </header>
  );
}
