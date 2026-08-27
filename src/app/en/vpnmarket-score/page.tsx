import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "VPNmarket Score — how it's calculated",
  description:
    "How VPNmarket Score works — our own 0–100 index for comparing VPN providers on price, speed, privacy, streaming, features, and reliability.",
  alternates: {
    canonical: "/en/vpnmarket-score",
    languages: { ru: `${SITE_URL}/vpnmarket-score`, en: `${SITE_URL}/en/vpnmarket-score` },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: "VPNmarket Score — how it's calculated",
  },
};

const COMPONENTS = [
  {
    h3: "Price — 0–100",
    body: "A linear scale from $0/mo (100 points) to $15/mo and up (0 points). If a service has no standing free tier and no numeric price in the catalog, it gets 50 points (a neutral value).",
  },
  {
    h3: "Speed — 0–100",
    body: "A linear scale from 0 to 1000 Mbps of the provider's claimed speed. This isn't an independent measurement — we label such numbers \"claimed by the provider\" everywhere on the site, and the Score is no exception.",
  },
  {
    h3: "Privacy — 0–100",
    body: "Awarded by catalog tags: no-logs (+40), privacy (+20), open-source (+15), anonymous payment (+15), double VPN (+10), capped at 100. If none of these tags are set, it gets a baseline 20 points.",
  },
  {
    h3: "Streaming — 0–100",
    body: "Netflix/streaming tag (+70) and a \"streaming\" tag (+30), capped at 100. If neither tag is set, it gets a baseline 15 points.",
  },
  {
    h3: "Features — 0–100",
    body: "Up to 60 points for the number of supported platforms (out of 5), plus bonuses for WireGuard, unlimited devices, static IP, channel bonding, self-hosting, ad blocking, a business plan, and censorship circumvention.",
  },
  {
    h3: "Reliability — 0–100",
    body: "Based on our own automated check of the provider's site availability: 100 points if the site is currently up, 55 if the status hasn't been determined yet, 10 if the site was down at the last check.",
  },
];

export default function VpnmarketScorePageEn() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      {
        "@type": "ListItem",
        position: 2,
        name: "VPNmarket Score",
        item: `${SITE_URL}/en/vpnmarket-score`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <nav className="mb-6 text-sm text-muted">
        <Link href="/en" className="hover:text-fg">
          Home
        </Link>
        {" / "}
        <span>VPNmarket Score</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        How VPNmarket Score is calculated
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        VPNmarket Score is our own index from 0 to 100, which {SITE_NAME} calculates
        automatically for every provider in the catalog, using the formula below. It&apos;s not a
        user rating and not the provider&apos;s own rating — it&apos;s the sum of six components
        computed from data that&apos;s already in the service&apos;s card.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <p>
          <strong className="text-fg">The overall Score</strong> is the arithmetic mean of six
          components, rounded to a whole number. Each component is weighted equally (⅙ of the
          total).
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {COMPONENTS.map((c) => (
          <section key={c.h3}>
            <h2 className="mb-1.5 text-base font-semibold">{c.h3}</h2>
            <p className="text-sm leading-relaxed text-muted">{c.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <h2 className="mb-1.5 text-base font-semibold text-fg">
          Why not &quot;Support&quot;
        </h2>
        <p>
          Indexes like this often include a &quot;support quality&quot; component. We
          deliberately don&apos;t — we have no real data on providers&apos; support quality (we
          don&apos;t test their live chat or email), and inventing such a score would mean passing
          off made-up data as real. Instead, the sixth component is &quot;Reliability,&quot; based
          on our own automated check of site availability.
        </p>
      </div>

      <p className="mt-8 text-xs text-muted">
        The scale is fixed (it doesn&apos;t depend on which other providers are currently in the
        catalog), so a given service&apos;s Score doesn&apos;t drift just because we added or
        removed another provider — it only changes when the service&apos;s own real data changes.
      </p>

      <p className="mt-10">
        <Link href="/en/about" className="text-sm text-accent hover:underline">
          ← About the project and our data methodology
        </Link>
      </p>
    </main>
  );
}
