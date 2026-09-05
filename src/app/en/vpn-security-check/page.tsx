import type { Metadata } from "next";
import Link from "next/link";
import { getClientInfo } from "@/lib/clientInfo";
import { checkBlocklists } from "@/lib/blocklist";
import { WebRtcLeakTest } from "@/components/WebRtcLeakTest";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VPN security check",
  description:
    "A combined check of your current connection: IP address and geolocation, DNSBL blocklist status, and a WebRTC real-IP leak test — all on one page.",
  alternates: {
    canonical: "/en/vpn-security-check",
    languages: {
      ru: `${SITE_URL}/vpn-security-check`,
      en: `${SITE_URL}/en/vpn-security-check`,
    },
  },
};

const FAQ = [
  {
    q: "What exactly does this page check?",
    a: "Three independent things: what IP address and geolocation external sites see, whether that IP is listed on public DNSBL blocklists, and whether WebRTC exposes your real address around your VPN. Each check is real — this isn't a simulation.",
  },
  {
    q: "Is this page enough to be confident a VPN is secure?",
    a: "No. This is a set of three specific, verifiable technical tests, not a full security audit. We don't test the VPN tunnel itself, its encryption, or the provider's logging policy — see the provider's own catalog page for that.",
  },
  {
    q: "Why do the results change when I turn a VPN on and off?",
    a: "IP address, geolocation, and the DNSBL result depend on whose address external servers see at request time — with a VPN it's the provider's server address, without one it's your ISP's address. WebRTC can reveal your real address regardless of VPN if the app doesn't block such requests.",
  },
];

export default async function VpnSecurityCheckPageEn() {
  const info = await getClientInfo();
  const check = info.ip ? await checkBlocklists(info.ip) : null;
  const listedCount = check?.results.filter((r) => r.listed === true).length ?? 0;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      {
        "@type": "ListItem",
        position: 2,
        name: "VPN security check",
        item: `${SITE_URL}/en/vpn-security-check`,
      },
    ],
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
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
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
        <span>VPN security check</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">VPN security check</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Three real checks of your current connection on one page — turn your VPN on and off to
        compare. None of this tests the VPN tunnel itself or the provider&apos;s policies — only
        what&apos;s visible from the outside right now.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-fg">1. IP address and geolocation</p>
            <Link href="/en/what-is-my-ip" className="text-xs text-accent hover:underline">
              details →
            </Link>
          </div>
          <p className="mt-2 break-all text-xl font-semibold tracking-tight">
            {info.ip ?? "couldn't be determined"}
          </p>
          <p className="mt-1 text-sm text-muted">
            {info.country ? `${info.city ? `${info.city}, ` : ""}${info.country}` : "Location not determined"}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-fg">2. DNSBL blocklists</p>
            <Link href="/en/is-my-ip-blocked" className="text-xs text-accent hover:underline">
              details →
            </Link>
          </div>
          {!check?.supported ? (
            <p className="mt-2 text-sm text-muted">
              {info.ip
                ? "The check only supports IPv4 addresses — your current address isn't in that format."
                : "Couldn't determine an IP address to check."}
            </p>
          ) : (
            <p
              className={`mt-2 text-sm font-medium ${
                listedCount > 0 ? "text-[var(--offline)]" : "text-[var(--online)]"
              }`}
            >
              {listedCount > 0
                ? `Listed on ${listedCount} of ${check.results.length} lists`
                : `Clean — not listed on any of ${check.results.length} lists`}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-fg">3. WebRTC leak</p>
            <Link href="/en/webrtc-leak-test" className="text-xs text-accent hover:underline">
              details →
            </Link>
          </div>
          <div className="mt-3">
            <WebRtcLeakTest locale="en" />
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-base font-semibold text-fg">Don&apos;t want to figure it out yourself?</p>
        <p className="mt-1.5 text-sm text-muted">
          Answer 4 questions — we&apos;ll match a VPN to your task, platform, and budget.
        </p>
        <Link
          href="/en/vpn-matcher"
          className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Find my VPN →
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

      <p className="mt-10 text-xs text-muted">
        {SITE_NAME} doesn&apos;t store your IP address or check results in a database — they&apos;re
        only used to render the result on this page.
      </p>

      <p className="mt-6">
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Back to the full VPN catalog
        </Link>
      </p>
    </main>
  );
}
