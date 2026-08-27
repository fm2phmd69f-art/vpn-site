import type { Metadata } from "next";
import Link from "next/link";
import { getClientInfo } from "@/lib/clientInfo";
import { checkBlocklists } from "@/lib/blocklist";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Is My IP Blocked? (DNSBL check)",
  description:
    "Check your current IP address against public spam blocklists (DNSBL) — Spamhaus, SpamCop, SORBS, and others.",
  alternates: {
    canonical: "/en/is-my-ip-blocked",
    languages: { ru: `${SITE_URL}/is-my-ip-blocked`, en: `${SITE_URL}/en/is-my-ip-blocked` },
  },
};

const FAQ = [
  {
    q: "What's a DNSBL?",
    a: "A DNS-based Blackhole List — a public list of IP addresses seen engaging in suspicious activity (spam, scanning, infected devices). Mail servers and some sites use these lists to filter traffic.",
  },
  {
    q: "Why might my IP be on a list?",
    a: "Often it's not about anything you did: VPN providers and hosts share one IP address across many different people at once (a shared IP), and if any of them sent spam, the whole address can end up blocked.",
  },
  {
    q: "What should I do if my IP is blocked?",
    a: "If it's your ISP's or VPN's IP, there's usually nothing to do — addresses get rotated and cleared from lists automatically over time. If it keeps happening, try switching VPN servers or contact the provider's support.",
  },
  {
    q: "Does being on a list mean I'm blocked everywhere?",
    a: "No. DNSBLs are mainly used by mail servers for spam filtering and by some sites for anti-fraud checks — it isn't a single global ban, just separate, independent lists with different purposes.",
  },
];

export default async function IsMyIpBlockedPageEn() {
  const info = await getClientInfo();
  const check = info.ip ? await checkBlocklists(info.ip) : null;

  const listedCount = check?.results.filter((r) => r.listed === true).length ?? 0;
  const failedCount = check?.results.filter((r) => r.listed === null).length ?? 0;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Is My IP Blocked?",
        item: `${SITE_URL}/en/is-my-ip-blocked`,
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
        <span>Is My IP Blocked?</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Is My IP Blocked?</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        A real check of your current IP address against public DNSBL lists — direct DNS queries
        to the lists, no third-party APIs or keys.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted">IP address being checked</p>
        <p className="mt-2 break-all text-2xl font-semibold tracking-tight">
          {info.ip ?? "couldn't be determined"}
        </p>
      </div>

      {!check?.supported ? (
        <p className="mt-4 rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
          {info.ip
            ? "This check only supports IPv4 addresses — your current address isn't in that format."
            : "Couldn't determine your IP address to run the check."}
        </p>
      ) : (
        <>
          <div
            className={`mt-4 rounded-2xl border p-5 text-sm ${
              listedCount > 0
                ? "border-[var(--offline)] bg-[var(--offline)]/10"
                : "border-[var(--online)] bg-[var(--online)]/10"
            }`}
          >
            {listedCount > 0 ? (
              <p>
                <strong>Found on {listedCount} of {check.results.length} lists.</strong> See the
                details below — this doesn&apos;t always mean a problem specifically with your device
                (see the FAQ).
              </p>
            ) : (
              <p>
                <strong>Clean.</strong> IP not found on any of the {check.results.length}{" "}
                lists checked{failedCount > 0 ? ` (${failedCount} couldn't be checked)` : ""}.
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5">
            {check.results.map((r) => (
              <div
                key={r.zone}
                className="flex items-center justify-between border-b border-border py-2 text-sm last:border-b-0"
              >
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted">{r.zone}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    r.listed === true
                      ? "bg-[var(--offline)]/15 text-[var(--offline)]"
                      : r.listed === false
                        ? "bg-[var(--online)]/15 text-[var(--online)]"
                        : "bg-[var(--unknown)]/15 text-muted"
                  }`}
                >
                  {r.listed === true ? "Listed" : r.listed === false ? "Clean" : "Failed"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/en/what-is-my-ip"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          ← Find my IP
        </Link>
        <Link
          href="/en"
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Compare VPN services →
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">Frequently asked questions</h2>
        <div className="flex flex-col gap-4">
          {FAQ.map((item) => (
            <div key={item.q}>
              <h3 className="text-sm font-medium">{item.q}</h3>
              <p className="mt-1 text-sm text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-10 text-xs text-muted">
        {SITE_NAME} doesn&apos;t store your IP address in a database — it&apos;s used only to run the check
        and display the result on this page.
      </p>
    </main>
  );
}
