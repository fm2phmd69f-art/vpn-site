import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { VpnMatcher } from "@/components/VpnMatcher";
import { SITE_URL, jsonLdScript } from "@/lib/seo";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "VPN Matcher — find your VPN in 4 questions",
  description:
    "Answer 4 questions about your use case, platform, and budget — get a shortlist of 5 matching VPN services from the catalog.",
  alternates: {
    canonical: "/en/vpn-matcher",
    languages: { ru: `${SITE_URL}/vpn-matcher`, en: `${SITE_URL}/en/vpn-matcher` },
  },
};

const FAQ = [
  {
    q: "How does the matcher work?",
    a: "Your answers are matched against the tags and specs of services in the catalog (use case, platform, budget, priority) — each service earns points, and the top 5 are shown as the result.",
  },
  {
    q: "Is this an independent recommendation?",
    a: "No — the matching is built from data providers state about themselves (price, platforms, tags like \"no-logs\" or \"Netflix\"). It isn't the result of independent testing of specific servers.",
  },
  {
    q: "Can I retake the quiz with different answers?",
    a: "Yes, the \"Start over\" button on the results screen resets all your answers.",
  },
];

export default async function VpnMatcherPageEn() {
  const services = await getAllServices();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "VPN Matcher", item: `${SITE_URL}/en/vpn-matcher` },
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
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
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
        <span>VPN Matcher</span>
      </nav>

      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Find your VPN in 4 questions
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          Instead of researching dozens of services yourself — answer a few questions and get a
          shortlist from our {services.length}-service catalog.
        </p>
      </div>

      <VpnMatcher services={services} locale="en" />

      <section className="mt-12 max-w-2xl">
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
