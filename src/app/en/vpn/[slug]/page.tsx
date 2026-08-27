import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/lib/getServices";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";
import { localizeServiceEn } from "@/lib/localizeService";
import { StatusBadge } from "@/components/StatusBadge";
import { ServiceCard } from "@/components/ServiceCard";
import { ReportForm } from "@/components/ReportForm";
import { SITE_URL, SITE_NAME, jsonLdScript } from "@/lib/seo";
import { getUptimeStats } from "@/lib/uptime";
import { ServiceLogo } from "@/components/ServiceLogo";
import { computeScore } from "@/lib/score";
import { ScoreBreakdownCard } from "@/components/ScoreBreakdownCard";

export const revalidate = 1800;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const raw = await getServiceBySlug(params.slug);
  if (!raw) return {};
  const service = localizeServiceEn(raw);

  const description = service.description;
  const title = `${service.name} — price, speed, review`;
  const metaDescription = `${service.name}: ${service.priceFrom}. ${description}`.slice(0, 160);

  return {
    title,
    description: metaDescription,
    alternates: {
      canonical: `/en/vpn/${service.slug}`,
      languages: {
        ru: `${SITE_URL}/vpn/${service.slug}`,
        en: `${SITE_URL}/en/vpn/${service.slug}`,
      },
    },
    openGraph: {
      title: `${service.name} | ${SITE_NAME}`,
      description: metaDescription,
      type: "website",
      locale: "en_US",
    },
  };
}

export default async function ServicePageEn(props: Props) {
  const params = await props.params;
  const raw = await getServiceBySlug(params.slug);
  if (!raw) notFound();
  const service = localizeServiceEn(raw);

  const description = service.description;

  const allServices = await getAllServices();
  const related = allServices
    .filter((s) => s.id !== service.id && s.tags.some((t) => service.tags.includes(t)))
    .slice(0, 3)
    .map(localizeServiceEn);

  const uptime30d = await getUptimeStats(service.id, 30);
  const score = computeScore(service);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "Catalog", item: `${SITE_URL}/en#catalog` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${SITE_URL}/en/vpn/${service.slug}`,
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
        <span>{service.name}</span>
      </nav>

      <div className="mb-6 flex items-center gap-3">
        <ServiceLogo
          name={service.name}
          emoji={service.logo}
          websiteUrl={service.websiteUrl}
          status={service.status}
          locale="en"
        />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{service.name}</h1>
          {service.rating != null && (
            <p className="text-sm text-muted">⭐ {service.rating.toFixed(1)} (provider&apos;s own rating)</p>
          )}
        </div>
      </div>

      <StatusBadge
        status={service.status}
        latencyMs={service.latencyMs}
        lastCheckedAt={service.lastCheckedAt}
        locale="en"
      />
      {uptime30d.uptimePercent != null && (
        <p className="mt-1 text-xs text-muted">
          30-day site uptime: {uptime30d.uptimePercent}% ({uptime30d.onlineChecks} of{" "}
          {uptime30d.totalChecks} checks)
        </p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-fg">{description}</p>

      <ScoreBreakdownCard score={score} locale="en" />

      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl border border-border bg-surface p-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted">Price</dt>
          <dd className="font-medium">{service.priceFrom}</dd>
        </div>
        {service.claimedSpeedMbps != null && (
          <div>
            <dt className="text-muted">Claimed speed</dt>
            <dd className="font-medium">up to {service.claimedSpeedMbps} Mbps</dd>
          </div>
        )}
        {service.freeOption && (
          <div>
            <dt className="text-muted">Free tier</dt>
            <dd className="font-medium">{service.freeOption}</dd>
          </div>
        )}
        <div className="col-span-2 sm:col-span-3">
          <dt className="text-muted">Platforms</dt>
          <dd className="font-medium">{service.platforms.join(", ")}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <Link
            key={tag}
            href={`/en/vpn/category/${tag}`}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-fg"
          >
            {TAG_LABELS_EN[tag] ?? tag}
          </Link>
        ))}
      </div>

      <a
        href={service.referralUrl ?? service.websiteUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Visit {service.name}
      </a>

      <p className="mt-4 text-xs text-muted">
        Price, speed, and terms are stated by the provider and may change — check the current
        terms on the official site before purchasing.
      </p>

      <ReportForm serviceId={service.id} locale="en" />

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Similar services</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.id} service={s} locale="en" />
            ))}
          </div>
        </section>
      )}

      <p className="mt-10">
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Back to the full VPN catalog
        </Link>
      </p>
    </main>
  );
}
