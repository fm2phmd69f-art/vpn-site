import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/getServices";
import { parsePairSlug, COMPARISON_SLUGS } from "@/lib/comparisons";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";
import { localizeServiceEn } from "@/lib/localizeService";
import { StatusBadge } from "@/components/StatusBadge";
import { SITE_NAME, jsonLdScript, SITE_URL } from "@/lib/seo";
import { ServiceDTO } from "@/lib/types";
import { ServiceLogo } from "@/components/ServiceLogo";
import { ScoreBadge } from "@/components/ScoreBadge";
import { computeScore } from "@/lib/score";

export const revalidate = 1800;

interface Props {
  params: Promise<{ pair: string }>;
}

async function loadPair(pair: string): Promise<{ a: ServiceDTO; b: ServiceDTO } | null> {
  const parsed = parsePairSlug(pair);
  if (!parsed) return null;
  if (!COMPARISON_SLUGS.includes(parsed.a) || !COMPARISON_SLUGS.includes(parsed.b)) return null;

  const [a, b] = await Promise.all([getServiceBySlug(parsed.a), getServiceBySlug(parsed.b)]);
  if (!a || !b) return null;
  return { a: localizeServiceEn(a), b: localizeServiceEn(b) };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const data = await loadPair(params.pair);
  if (!data) return {};

  const title = `${data.a.name} vs ${data.b.name} — which to choose`;
  const description = `Comparing ${data.a.name} and ${data.b.name}: price, claimed speed, platforms, and features.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/compare/${params.pair}`,
      languages: {
        ru: `${SITE_URL}/compare/${params.pair}`,
        en: `${SITE_URL}/en/compare/${params.pair}`,
      },
    },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, type: "website", locale: "en_US" },
  };
}

function Row({ label, a, b }: { label: string; a: React.ReactNode; b: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr,1.2fr,1.2fr] items-start gap-2 border-b border-border py-3 text-sm last:border-b-0">
      <div className="text-muted">{label}</div>
      <div className="font-medium">{a}</div>
      <div className="font-medium">{b}</div>
    </div>
  );
}

export default async function ComparePairPageEn(props: Props) {
  const params = await props.params;
  const data = await loadPair(params.pair);
  if (!data) notFound();
  const { a, b } = data;

  const notes: string[] = [];
  if (a.priceMonthlyUsd != null && b.priceMonthlyUsd != null && a.priceMonthlyUsd !== b.priceMonthlyUsd) {
    const cheaper = a.priceMonthlyUsd < b.priceMonthlyUsd ? a : b;
    notes.push(`${cheaper.name} is cheaper by claimed entry-plan price.`);
  }
  if (a.claimedSpeedMbps != null && b.claimedSpeedMbps != null && a.claimedSpeedMbps !== b.claimedSpeedMbps) {
    const faster = a.claimedSpeedMbps > b.claimedSpeedMbps ? a : b;
    notes.push(`${faster.name} claims a higher maximum speed.`);
  }
  const onlyA = a.tags.filter((t) => !b.tags.includes(t));
  const onlyB = b.tags.filter((t) => !a.tags.includes(t));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE_URL}/en/compare` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${a.name} vs ${b.name}`,
        item: `${SITE_URL}/en/compare/${params.pair}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <nav className="mb-6 text-sm text-muted">
        <Link href="/en" className="hover:text-fg">
          Home
        </Link>
        {" / "}
        <Link href="/en/compare" className="hover:text-fg">
          Comparisons
        </Link>
        {" / "}
        <span>
          {a.name} vs {b.name}
        </span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">
        {a.name} vs {b.name}: which to choose
      </h1>
      <p className="mt-2 text-sm text-muted">
        Compared using catalog data — price, claimed speed, and features are stated by the
        providers.
      </p>

      {notes.length > 0 && (
        <ul className="mt-4 flex flex-col gap-1 text-sm text-muted">
          {notes.map((n) => (
            <li key={n}>• {n}</li>
          ))}
        </ul>
      )}

      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <div className="grid grid-cols-[1fr,1.2fr,1.2fr] gap-2 border-b border-border pb-3 text-sm font-semibold">
          <div />
          <Link
            href={`/en/vpn/${a.slug}`}
            className="flex items-center gap-1.5 hover:text-accent hover:underline"
          >
            <ServiceLogo name={a.name} emoji={a.logo} websiteUrl={a.websiteUrl} status={a.status} locale="en" /> {a.name}
          </Link>
          <Link
            href={`/en/vpn/${b.slug}`}
            className="flex items-center gap-1.5 hover:text-accent hover:underline"
          >
            <ServiceLogo name={b.name} emoji={b.logo} websiteUrl={b.websiteUrl} status={b.status} locale="en" /> {b.name}
          </Link>
        </div>

        <Row
          label="VPNmarket Score"
          a={<ScoreBadge score={computeScore(a).overall} size="sm" locale="en" />}
          b={<ScoreBadge score={computeScore(b).overall} size="sm" locale="en" />}
        />
        <Row label="Price" a={a.priceFrom} b={b.priceFrom} />
        <Row
          label="Claimed speed"
          a={a.claimedSpeedMbps != null ? `up to ${a.claimedSpeedMbps} Mbps` : "—"}
          b={b.claimedSpeedMbps != null ? `up to ${b.claimedSpeedMbps} Mbps` : "—"}
        />
        <Row label="Free tier" a={a.freeOption ?? "—"} b={b.freeOption ?? "—"} />
        <Row label="Rating" a={a.rating != null ? `⭐ ${a.rating.toFixed(1)}` : "—"} b={b.rating != null ? `⭐ ${b.rating.toFixed(1)}` : "—"} />
        <Row label="Platforms" a={a.platforms.join(", ")} b={b.platforms.join(", ")} />
        <Row
          label="Site status"
          a={<StatusBadge status={a.status} latencyMs={a.latencyMs} lastCheckedAt={a.lastCheckedAt} locale="en" />}
          b={<StatusBadge status={b.status} latencyMs={b.latencyMs} lastCheckedAt={b.lastCheckedAt} locale="en" />}
        />
        <Row
          label="Unique features"
          a={
            onlyA.length > 0
              ? onlyA.map((t) => TAG_LABELS_EN[t] ?? t).join(", ")
              : "no differences from the other"
          }
          b={
            onlyB.length > 0
              ? onlyB.map((t) => TAG_LABELS_EN[t] ?? t).join(", ")
              : "no differences from the other"
          }
        />
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <a
          href={a.referralUrl ?? a.websiteUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1 rounded-full bg-accent px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Visit {a.name}
        </a>
        <a
          href={b.referralUrl ?? b.websiteUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1 rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:border-accent"
        >
          Visit {b.name}
        </a>
      </div>

      <p className="mt-10">
        <Link href="/en/compare" className="text-sm text-accent hover:underline">
          ← Back to all comparisons
        </Link>
      </p>
    </main>
  );
}
