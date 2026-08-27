import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { allComparisonPairs } from "@/lib/comparisons";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { ServiceLogo } from "@/components/ServiceLogo";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Compare VPN services",
  description:
    "Direct comparisons of popular VPN providers: price, speed, platforms, and features for NordVPN, ExpressVPN, Surfshark, Proton VPN, and others.",
  alternates: {
    canonical: "/en/compare",
    languages: { ru: `${SITE_URL}/compare`, en: `${SITE_URL}/en/compare` },
  },
};

export default async function ComparePageEn() {
  const services = await getAllServices();
  const byId = new Map(services.map((s) => [s.slug, s]));
  const pairs = allComparisonPairs();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/en" className="hover:text-fg">
          Home
        </Link>
        {" / "}
        <span>Comparisons</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">Compare VPN services</h1>
      <p className="mt-2 max-w-2xl text-muted">
        A direct comparison of popular providers by price, claimed speed, platforms, and features
        — on {SITE_NAME}.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {pairs.map(({ a, b, pairSlug }) => {
          const sa = byId.get(a);
          const sb = byId.get(b);
          if (!sa || !sb) return null;
          return (
            <Link
              key={pairSlug}
              href={`/en/compare/${pairSlug}`}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-accent"
            >
              <ServiceLogo name={sa.name} emoji={sa.logo} websiteUrl={sa.websiteUrl} status={sa.status} locale="en" />
              <span className="font-medium">{sa.name}</span>
              <span className="text-muted">vs</span>
              <span className="font-medium">{sb.name}</span>
              <ServiceLogo name={sb.name} emoji={sb.logo} websiteUrl={sb.websiteUrl} status={sb.status} locale="en" />
            </Link>
          );
        })}
      </div>

      <p className="mt-10 flex flex-col gap-2 sm:flex-row sm:gap-4">
        <Link href="/en/vpn-prices" className="text-sm text-accent hover:underline">
          Price table for all providers →
        </Link>
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Back to the full VPN catalog
        </Link>
      </p>
    </main>
  );
}
