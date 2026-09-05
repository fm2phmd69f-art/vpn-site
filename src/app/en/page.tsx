import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { CatalogClient } from "@/components/CatalogClient";
import LightRays from "@/components/LightRays";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";
import { INTENTS_EN } from "@/data/intentsEn";
import { allIntentSlugs } from "@/data/intents";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";
import { localizeServiceEn } from "@/lib/localizeService";
import { BLOG_POSTS_EN } from "@/data/postsEn";
import { pairSlug } from "@/lib/comparisons";

const POPULAR_COMPARISONS: [string, string][] = [
  ["nordvpn", "surfshark"],
  ["nordvpn", "expressvpn"],
  ["surfshark", "protonvpn"],
  ["expressvpn", "surfshark"],
];

export const revalidate = 1800;

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — VPN comparison` },
  description:
    "A catalog of 60+ VPN providers: prices, claimed speed, platforms, and features. Filter by no-logs, free tiers, Netflix, torrenting. Site availability status checked automatically.",
  alternates: { canonical: "/en", languages: { ru: SITE_URL, en: `${SITE_URL}/en` } },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — VPN comparison`,
    url: `${SITE_URL}/en`,
  },
};

const FEATURED_TAGS = [
  "free-tier",
  "no-logs",
  "netflix",
  "torrents",
  "budget",
  "privacy",
  "unlimited-devices",
  "open-source",
  "china-friendly",
  "wireguard",
];

const FAQ_ITEMS = [
  {
    q: "Which VPN should I pick for free?",
    a: "Proton VPN, Windscribe, Hide.me, and Cloudflare WARP offer honest free tiers in the catalog without aggressive limits. Some free VPNs (Urban VPN, Hola, for example) route other users' traffic through your device on a P2P model — worth keeping in mind if privacy is your priority.",
  },
  {
    q: "Which VPN is best for Netflix and streaming?",
    a: "NordVPN, ExpressVPN, and Surfshark are the most commonly recommended for unblocking streaming services — they run large server networks tuned for specific platforms. Whether a specific catalog is unblocked depends on the server's country and can change without notice.",
  },
  {
    q: "What's the difference between a no-logs VPN and a regular one?",
    a: "\"No-logs\" means the provider claims it doesn't store activity or connection logs. Some providers (NordVPN, ExpressVPN, Surfshark, for example) have had this policy independently audited — noted in the service's description in the catalog.",
  },
  {
    q: "What does \"site is up\" mean on a card?",
    a: "It's the result of an automated check — our server regularly requests the provider's site and times the response. It shows whether the provider's site is alive right now, not the speed of the VPN tunnel itself.",
  },
  {
    q: "Can I trust the \"claimed speed\" in the catalog?",
    a: "It's a marketing figure from the provider itself (\"up to X Mbps\"), not an independent measurement — real speed depends on your own connection, distance to the server, and load. Treat it as an upper bound, not a guarantee.",
  },
];

export default async function HomePageEn() {
  const services = (await getAllServices()).map(localizeServiceEn);

  const lastCheckedTimestamps = services
    .map((s) => s.lastCheckedAt)
    .filter((d): d is string => Boolean(d))
    .map((d) => new Date(d).getTime());
  const lastChecked =
    lastCheckedTimestamps.length > 0 ? new Date(Math.max(...lastCheckedTimestamps)) : null;

  const recentPosts = [...BLOG_POSTS_EN]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "VPN service catalog",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/en/vpn/${s.slug}`,
      name: s.name,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />

      <header className="relative mb-8 flex flex-col items-center gap-2 overflow-hidden rounded-3xl bg-[#05070d] px-4 py-16 text-center">
        <div className="pointer-events-none absolute inset-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.6}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse
            mouseInfluence={0.5}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>
        <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">
          <span aria-hidden>🛡️</span>
          <span>{SITE_NAME}</span>
        </div>
        <h1 className="relative z-10 text-4xl font-semibold tracking-tight text-white">
          Best VPN services {new Date().getFullYear()}
        </h1>
        <p className="relative z-10 max-w-2xl text-white/70">
          A catalog of {services.length} VPN providers: prices, claimed speed, platforms, and
          features — from no-logs and free tiers to services built for Netflix and torrenting.
          &quot;Site is up&quot; status and latency are checked automatically on a schedule.
        </p>
        {lastChecked && (
          <p className="relative z-10 text-xs text-white/50">
            Last automated availability check:{" "}
            {lastChecked.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        )}
        <Link
          href="/en/vpnmarket-score"
          className="relative z-10 mt-1 text-xs text-white/60 underline underline-offset-2 hover:text-white/90"
        >
          How VPNmarket Score is calculated →
        </Link>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-center text-lg font-semibold">Popular categories</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {FEATURED_TAGS.map((tag) => (
            <Link
              key={tag}
              href={`/en/vpn/category/${tag}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
            >
              {TAG_LABELS_EN[tag] ?? tag}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-center text-lg font-semibold">Shortlists by use case</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {allIntentSlugs().map((slug) => (
            <Link
              key={slug}
              href={`/en/${slug}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
            >
              {INTENTS_EN[slug]?.h1 ?? slug}
            </Link>
          ))}
        </div>
      </section>

      <CatalogClient services={services} locale="en" />

      <section className="mt-12">
        <h2 className="mb-3 text-center text-lg font-semibold">Free tools</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href="/en/vpn-security-check"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            🛡️ VPN security check
          </Link>
          <Link
            href="/en/what-is-my-ip"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            🌐 What is my IP
          </Link>
          <Link
            href="/en/webrtc-leak-test"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            🔍 WebRTC leak test
          </Link>
          <Link
            href="/en/is-my-ip-blocked"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            🚫 Is my IP blocked
          </Link>
          <Link
            href="/en/tools"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            All tools →
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-3 text-center text-lg font-semibold">Popular comparisons</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {POPULAR_COMPARISONS.map(([a, b]) => (
            <Link
              key={pairSlug(a, b)}
              href={`/en/compare/${pairSlug(a, b)}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
            >
              {a} vs {b}
            </Link>
          ))}
          <Link
            href="/en/compare"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent"
          >
            All comparisons →
          </Link>
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-surface p-6 text-center">
        <h2 className="text-lg font-semibold">How much does a VPN cost?</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          A price table of all {services.length} providers in the catalog — from cheapest to
          priciest.
        </p>
        <Link
          href="/en/vpn-prices"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent"
        >
          💰 Compare prices →
        </Link>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-surface p-6 text-center">
        <h2 className="text-lg font-semibold">Don&apos;t want to figure it out yourself?</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Answer 4 questions — we&apos;ll match a VPN to your task, platform, and budget.
        </p>
        <Link
          href="/en/vpn-matcher"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          🎯 Find my VPN
        </Link>
      </section>

      {recentPosts.length > 0 && (
        <section className="mt-12">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Latest articles</h2>
            <Link href="/en/blog" className="text-sm text-accent hover:underline">
              All articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/en/blog/${post.slug}`}
                className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent"
              >
                <p className="text-sm font-medium text-fg">{post.title}</p>
                <p className="mt-1.5 line-clamp-2 text-xs text-muted">{post.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 max-w-3xl">
        <h2 className="mb-4 text-lg font-semibold">Frequently asked questions</h2>
        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((item) => (
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

      <div className="mt-12 border-t border-border pt-6">
        <h2 className="mb-2 text-sm font-semibold">How to choose a VPN?</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Start with your task: for private browsing, look for a provider with an independently
          verified no-logs policy; for unblocking streaming catalogs abroad, pick a service with a
          large server network and reliable Netflix unblocking; and for saving money, one of the
          honest free tiers above will do. The full catalog above has filters by price, speed, and
          features, plus a dedicated page for every service with the details.
        </p>
        <p className="mt-6 text-xs text-muted">
          Prices, speed, and features are stated by the providers and may differ from current
          terms — check the provider&apos;s site. We don&apos;t sell or resell VPN access ourselves.
        </p>
      </div>
    </main>
  );
}
