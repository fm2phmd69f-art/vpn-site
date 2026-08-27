import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About",
  description:
    "How VPN Marketplace works: where our provider data comes from, how we check site availability, and how we make money.",
  alternates: {
    canonical: "/en/about",
    languages: { ru: `${SITE_URL}/about`, en: `${SITE_URL}/en/about` },
  },
  openGraph: { type: "website", locale: "en_US", siteName: SITE_NAME, title: "About" },
};

const SECTIONS = [
  {
    h2: "What this site is",
    body: [
      `${SITE_NAME} is a catalog and comparison service for VPN providers. We don't sell VPN access and we're not a middleman between you and a provider: you always subscribe directly on the provider's own site.`,
      "The site helps you quickly compare prices, platforms, claimed speed, and features across providers in one place, and pick a service for a specific task — Netflix, torrenting, or anonymity, for example.",
    ],
  },
  {
    h2: "Where the provider data comes from",
    body: [
      "Each service's specs (price, platforms, server count, logging policy, claimed speed) are stated by the provider itself — from its official site or public documentation. We don't run our own lab speed tests or our own no-logs audits.",
      "If a provider has undergone an independent external audit (e.g. a no-logs policy audit by an auditing firm), that's noted separately in the service description as the fact that such an audit was published — not as our own assessment.",
      "\"Site is up\" status and response latency are the only metrics we measure ourselves: an automated check regularly requests the provider's site and times the response. That shows whether the provider's site is alive right now, not the quality or speed of the VPN tunnel itself.",
    ],
  },
  {
    h2: "How often the catalog updates",
    body: [
      "New providers are added to the list on a regular basis, and site-availability checks run automatically on a schedule. That said, providers can change prices and terms faster than we can track — always check the current terms on the provider's own site before paying.",
    ],
  },
  {
    h2: "How we make money",
    body: [
      "The catalog and every tool on the site (IP check, WebRTC test, blocklist check, VPN matcher) are free and require no signup.",
      "Some links to provider sites may be affiliate links — following one and later paying for a subscription may earn us a small commission from the provider. That doesn't affect your price at all, and it doesn't affect the catalog's sort order — sorting is controlled by you, by price, speed, or other criteria, not by us.",
    ],
  },
  {
    h2: "Editorial policy",
    body: [
      "We don't publish paid reviews and we don't take money for a listing or a higher position in the catalog.",
      "We don't show made-up ratings, reviews, or user scores — there isn't a single star rating or \"review count\" on this site that wasn't sourced from real users through a separately disclosed review program.",
      "If you spot an inaccuracy on a provider's card — an out-of-date price, feature set, or audit status — you can report it through the form on that service's page.",
    ],
  },
];

export default function AboutPageEn() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/en/about` },
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
        <span>About</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">About {SITE_NAME}</h1>

      <div className="mt-8 flex flex-col gap-8">
        {SECTIONS.map((section) => (
          <section key={section.h2}>
            <h2 className="mb-2 text-lg font-semibold">{section.h2}</h2>
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/en"
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Browse the catalog →
        </Link>
        <Link
          href="/en/vpn-matcher"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Find my VPN →
        </Link>
        <Link
          href="/en/vpnmarket-score"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          How Score works →
        </Link>
      </div>
    </main>
  );
}
