import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free VPN tools",
  description:
    "Free tools to check your IP address, leaks, and blocklist status: what is my IP, WebRTC leak test, DNSBL blocklist check, and a combined VPN security check.",
  alternates: {
    canonical: "/en/tools",
    languages: { ru: `${SITE_URL}/tools`, en: `${SITE_URL}/en/tools` },
  },
};

const TOOLS = [
  {
    href: "/en/vpn-security-check",
    icon: "🛡️",
    title: "VPN security check",
    description: "All three checks below on one page — IP, blocklists, and WebRTC leak.",
  },
  {
    href: "/en/what-is-my-ip",
    icon: "🌐",
    title: "What is my IP",
    description: "Public IP address, country, region, and timezone from a real request.",
  },
  {
    href: "/en/webrtc-leak-test",
    icon: "🔍",
    title: "WebRTC leak test",
    description: "Whether WebRTC exposes your real IP address around your VPN — a browser test.",
  },
  {
    href: "/en/is-my-ip-blocked",
    icon: "🚫",
    title: "IP blocklist check",
    description: "Checks your current IP against public DNSBL lists — Spamhaus, SpamCop, and more.",
  },
];

export default function ToolsPageEn() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/en/tools` },
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
        <span>Tools</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Free VPN tools</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Real checks that run right in your browser — no signup, no third-party services unless
        explicitly noted.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <span className="text-2xl leading-none" aria-hidden>
              {tool.icon}
            </span>
            <div>
              <p className="font-semibold text-fg">{tool.title}</p>
              <p className="mt-1 text-sm text-muted">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10">
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Back to the full VPN catalog
        </Link>
      </p>
    </main>
  );
}
