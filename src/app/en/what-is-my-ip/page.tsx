import type { Metadata } from "next";
import Link from "next/link";
import { getClientInfo } from "@/lib/clientInfo";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "What Is My IP",
  description:
    "Find your public IP address, country, region, and timezone — determined from your actual request, no third-party services.",
  alternates: {
    canonical: "/en/what-is-my-ip",
    languages: { ru: `${SITE_URL}/what-is-my-ip`, en: `${SITE_URL}/en/what-is-my-ip` },
  },
};

const FAQ = [
  {
    q: "Why is my IP different from what my router shows?",
    a: "A router usually shows a local (internal) address on your network. This page shows your public IP address — the one external sites see, including our server.",
  },
  {
    q: "Can other sites see my IP?",
    a: "Yes, any site you visit sees your public IP address — that's a standard part of how the internet protocol works. A VPN replaces this address with the VPN server's address.",
  },
  {
    q: "How does this page know my IP and city?",
    a: "The data comes directly from your request's technical information at Vercel's edge network, with no third-party geolocation API. City accuracy depends on the network provider's database and may be imprecise.",
  },
];

export default async function WhatIsMyIpPageEn() {
  const info = await getClientInfo();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "My IP", item: `${SITE_URL}/en/what-is-my-ip` },
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
        <span>My IP</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">My IP Address</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Determined from your current request to the server — real data, no third-party
        geolocation services.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted">Your public IP address</p>
        <p className="mt-2 break-all text-3xl font-semibold tracking-tight sm:text-4xl">
          {info.ip ?? "couldn't be determined"}
        </p>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-border bg-surface p-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">Country</dt>
          <dd className="font-medium">{info.country ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">Region</dt>
          <dd className="font-medium">{info.region ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">City</dt>
          <dd className="font-medium">{info.city ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">Timezone</dt>
          <dd className="font-medium">{info.timezone ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">Latitude</dt>
          <dd className="font-medium">{info.latitude ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted">Longitude</dt>
          <dd className="font-medium">{info.longitude ?? "—"}</dd>
        </div>
      </dl>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <p>
          Your IP address is visible to every site you visit and can be used to roughly estimate
          your location, as shown above. A VPN replaces this address with the provider&apos;s
          server address — sites see the server&apos;s location, not your real one.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link
          href="/en/webrtc-leak-test"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Check for a WebRTC leak →
        </Link>
        <Link
          href="/en/is-my-ip-blocked"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Check IP against blocklists →
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
        {SITE_NAME} doesn&apos;t store your IP address in a database — it&apos;s used only to compute and
        display the result on this page.
      </p>
    </main>
  );
}
