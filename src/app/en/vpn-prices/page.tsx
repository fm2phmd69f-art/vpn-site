import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";
import { ServiceLogo } from "@/components/ServiceLogo";
import { ScoreBadge } from "@/components/ScoreBadge";
import { computeScore } from "@/lib/score";
import { localizeServiceEn } from "@/lib/localizeService";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "VPN prices — plan comparison table for every provider",
  description:
    "Compare VPN subscription prices: minimum plan cost, free options, and claimed speed for every provider in the catalog.",
  alternates: {
    canonical: "/en/vpn-prices",
    languages: { ru: `${SITE_URL}/vpn-prices`, en: `${SITE_URL}/en/vpn-prices` },
  },
};

const FAQ = [
  {
    q: "Where do the prices in the table come from?",
    a: "Prices are stated by the providers themselves — from their official sites, usually for the longest available plan (where the per-month price is lowest). We don't negotiate prices ourselves and don't guarantee the listed price will still be available when you pay.",
  },
  {
    q: "Why are some prices in dollars and others in euros?",
    a: "We show the price in whatever currency the provider itself displays on its site — we don't convert to a single currency, to avoid introducing exchange-rate error.",
  },
  {
    q: "What if a service has a free tier?",
    a: "If a provider has a standing free plan (not just a trial period), it's listed in a separate \"Free tier\" column — those services are sorted near the top of the table.",
  },
];

export default async function VpnPricesPageEn() {
  const services = (await getAllServices()).map(localizeServiceEn);

  const sorted = [...services].sort((a, b) => {
    const pa = a.priceMonthlyUsd ?? Infinity;
    const pb = b.priceMonthlyUsd ?? Infinity;
    return pa - pb;
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "VPN prices", item: `${SITE_URL}/en/vpn-prices` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "VPN service prices",
    itemListElement: sorted.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/en/vpn/${s.slug}`,
      name: s.name,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />

      <nav className="mb-6 text-sm text-muted">
        <Link href="/en" className="hover:text-fg">
          Home
        </Link>
        {" / "}
        <span>VPN prices</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        VPN prices — plan comparison
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        All {sorted.length} providers from the {SITE_NAME} catalog, sorted from cheapest to most
        expensive by minimum claimed subscription price.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">
                <Link href="/en/vpnmarket-score" className="hover:text-fg hover:underline">
                  Score
                </Link>
              </th>
              <th className="px-4 py-3">Price from</th>
              <th className="px-4 py-3">Free tier</th>
              <th className="px-4 py-3">Speed</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <Link
                    href={`/en/vpn/${s.slug}`}
                    className="flex items-center gap-2 font-medium hover:text-accent"
                  >
                    <ServiceLogo
                      name={s.name}
                      emoji={s.logo}
                      websiteUrl={s.websiteUrl}
                      status={s.status}
                      locale="en"
                    />
                    {s.name}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <ScoreBadge score={computeScore(s).overall} size="sm" locale="en" />
                </td>
                <td className="px-4 py-3">{s.priceFrom}</td>
                <td className="px-4 py-3 text-muted">{s.freeOption ?? "—"}</td>
                <td className="px-4 py-3 text-muted">
                  {s.claimedSpeedMbps != null ? `up to ${s.claimedSpeedMbps} Mbps` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted">
        Prices are stated by the providers and may differ from current terms — check the
        provider&apos;s site before purchasing.
      </p>

      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/en/compare"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Compare services side by side →
        </Link>
        <Link
          href="/en/vpn-matcher"
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Find a VPN for your use case →
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Frequently asked questions</h2>
        <div className="flex flex-col gap-2">
          {FAQ.map((item) => (
            <details key={item.q} className="group rounded-xl border border-border p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180">
                  ⌄
                </span>
              </summary>
              <p className="mt-2 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-10">
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Back to the full VPN catalog
        </Link>
      </p>
    </main>
  );
}
