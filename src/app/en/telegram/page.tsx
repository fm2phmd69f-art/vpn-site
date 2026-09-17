import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME_EN, jsonLdScript } from "@/lib/seo";

export const revalidate = 86400;

const TELEGRAM_URL = "https://t.me/vpnmarketonline";

export const metadata: Metadata = {
  title: "Telegram Channel — Free VPN Updates & News",
  description:
    "Join the VPN Marketplace Telegram channel: current free VPN plans, price changes, provider blackouts, and new reviews.",
  alternates: {
    canonical: "/en/telegram",
    languages: { ru: `${SITE_URL}/telegram`, en: `${SITE_URL}/en/telegram` },
  },
};

const POINTS = [
  "Current free VPN plans — honest tariffs without hidden caps or P2P bandwidth-sharing models, first.",
  "Price and terms changes at popular providers, as soon as we notice them.",
  "Blackout news — which services stopped working in specific countries and why.",
  "New reviews and comparisons from the catalog.",
];

export default function TelegramPageEn() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "Telegram Channel", item: `${SITE_URL}/en/telegram` },
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
        <span>Telegram Channel</span>
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-4xl leading-none">📱</span>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {SITE_NAME_EN} Telegram Channel
        </h1>
      </div>

      <p className="mt-4 text-base text-muted">
        Current free VPNs — on our Telegram. Short and to the point: no ads, no spam.
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {POINTS.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm text-fg">
            <span className="mt-0.5 text-accent">✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Join the channel →
      </a>

      <p className="mt-10">
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Back to the full VPN catalog
        </Link>
      </p>
    </main>
  );
}
