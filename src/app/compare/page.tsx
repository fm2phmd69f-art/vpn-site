import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { allComparisonPairs } from "@/lib/comparisons";
import { SITE_NAME } from "@/lib/seo";
import { ServiceLogo } from "@/components/ServiceLogo";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Сравнение VPN-сервисов между собой",
  description:
    "Прямые сравнения популярных VPN-провайдеров: цена, скорость, платформы и функции NordVPN, ExpressVPN, Surfshark, Proton VPN и других.",
  alternates: { canonical: "/compare" },
};

export default async function ComparePage() {
  const services = await getAllServices();
  const byId = new Map(services.map((s) => [s.slug, s]));
  const pairs = allComparisonPairs();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-fg">
          Главная
        </Link>
        {" / "}
        <span>Сравнения</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">Сравнение VPN-сервисов</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Прямое сравнение популярных провайдеров по цене, заявленной скорости, платформам и
        функциям — на {SITE_NAME}.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {pairs.map(({ a, b, pairSlug }) => {
          const sa = byId.get(a);
          const sb = byId.get(b);
          if (!sa || !sb) return null;
          return (
            <Link
              key={pairSlug}
              href={`/compare/${pairSlug}`}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-accent"
            >
              <ServiceLogo name={sa.name} emoji={sa.logo} websiteUrl={sa.websiteUrl} status={sa.status} />
              <span className="font-medium">{sa.name}</span>
              <span className="text-muted">vs</span>
              <span className="font-medium">{sb.name}</span>
              <ServiceLogo name={sb.name} emoji={sb.logo} websiteUrl={sb.websiteUrl} status={sb.status} />
            </Link>
          );
        })}
      </div>

      <p className="mt-10 flex flex-col gap-2 sm:flex-row sm:gap-4">
        <Link href="/vpn-prices" className="text-sm text-accent hover:underline">
          Таблица цен всех провайдеров →
        </Link>
        <Link href="/" className="text-sm text-accent hover:underline">
          ← Ко всему каталогу VPN-сервисов
        </Link>
      </p>
    </main>
  );
}
