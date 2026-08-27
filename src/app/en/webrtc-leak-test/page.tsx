import type { Metadata } from "next";
import Link from "next/link";
import { WebRtcLeakTest } from "@/components/WebRtcLeakTest";
import { SITE_URL, jsonLdScript } from "@/lib/seo";

export const metadata: Metadata = {
  title: "WebRTC Leak Test",
  description:
    "Check whether WebRTC exposes your real IP address around a VPN. A free test that runs right in your browser.",
  alternates: {
    canonical: "/en/webrtc-leak-test",
    languages: { ru: `${SITE_URL}/webrtc-leak-test`, en: `${SITE_URL}/en/webrtc-leak-test` },
  },
};

const FAQ = [
  {
    q: "What's a WebRTC leak?",
    a: "WebRTC is a technology for video calls and P2P connections right in the browser. To set up a connection, it can expose your real public IP address via the STUN protocol, even if all your browser's other traffic goes through a VPN.",
  },
  {
    q: "How do I protect against a WebRTC leak?",
    a: "Some VPN apps block this kind of leak themselves. You can also disable WebRTC in your browser (in Firefox, via about:config, the media.peerconnection.enabled flag) or use a WebRTC-blocking extension.",
  },
  {
    q: "Why doesn't the test find anything even though my VPN is off?",
    a: "Some browsers and network configurations don't expose a public IP via WebRTC at all (due to firewall settings or STUN being blocked, for example) — no result here doesn't always mean there's no leak in other scenarios.",
  },
];

export default function WebRtcLeakTestPageEn() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      {
        "@type": "ListItem",
        position: 2,
        name: "WebRTC Leak Test",
        item: `${SITE_URL}/en/webrtc-leak-test`,
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
        <span>WebRTC Leak Test</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">WebRTC Leak Test</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        WebRTC can expose your real IP address around a VPN. The test runs right in your browser
        — nothing is sent to third-party servers other than Google&apos;s public STUN server,
        standard for this technology.
      </p>

      <WebRtcLeakTest locale="en" />

      <div className="mt-8">
        <Link href="/en/what-is-my-ip" className="text-sm text-accent hover:underline">
          ← Find my IP address
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

      <p className="mt-10">
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Back to the full VPN catalog
        </Link>
      </p>
    </main>
  );
}
