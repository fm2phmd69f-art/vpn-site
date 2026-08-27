import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/getServices";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";
import { localizeServiceEn } from "@/lib/localizeService";
import { StatusBadge } from "@/components/StatusBadge";
import { ServiceLogo } from "@/components/ServiceLogo";
import { ScoreBadge } from "@/components/ScoreBadge";
import { computeScore } from "@/lib/score";
import { SITE_NAME } from "@/lib/seo";
import { ServiceDTO } from "@/lib/types";

interface Props {
  searchParams: Promise<{ ids?: string }>;
}

export const metadata: Metadata = {
  title: "Compare selected VPNs",
  robots: { index: false, follow: true },
};

function Row({
  label,
  services,
  render,
}: {
  label: string;
  services: ServiceDTO[];
  render: (s: ServiceDTO) => React.ReactNode;
}) {
  return (
    <div
      className="grid items-center gap-2 border-b border-border py-3 text-sm last:border-b-0"
      style={{ gridTemplateColumns: `120px repeat(${services.length}, 1fr)` }}
    >
      <div className="text-muted">{label}</div>
      {services.map((s) => (
        <div key={s.id} className="font-medium">
          {render(s)}
        </div>
      ))}
    </div>
  );
}

export default async function CustomComparePageEn(props: Props) {
  const searchParams = await props.searchParams;
  const slugs = (searchParams.ids ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  const allServices = await getAllServices();
  const services = slugs
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter((s): s is ServiceDTO => Boolean(s))
    .map(localizeServiceEn);

  if (services.length < 2) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 text-center sm:px-6">
        <h1 className="text-xl font-semibold">Nothing to compare</h1>
        <p className="mt-2 text-sm text-muted">
          Pick 2 to 4 services in the catalog by checking &quot;+ Compare&quot;, then click
          &quot;Compare →&quot;.
        </p>
        <Link
          href="/en"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          ← To the catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/en" className="hover:text-fg">
          Home
        </Link>
        {" / "}
        <Link href="/en/compare" className="hover:text-fg">
          Comparisons
        </Link>
        {" / "}
        <span>Selected services</span>
      </nav>

      <h1 className="text-2xl font-semibold tracking-tight">
        Comparing: {services.map((s) => s.name).join(", ")}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Data for each service is stated by the provider, except site status and VPNmarket Score,
        which {SITE_NAME} calculates itself.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface p-5">
        <div
          className="grid gap-2 pb-3"
          style={{ gridTemplateColumns: `120px repeat(${services.length}, 1fr)` }}
        >
          <div />
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/en/vpn/${s.slug}`}
              className="flex flex-col items-start gap-1.5 font-semibold hover:text-accent"
            >
              <ServiceLogo name={s.name} emoji={s.logo} websiteUrl={s.websiteUrl} status={s.status} locale="en" />
              {s.name}
            </Link>
          ))}
        </div>

        <Row
          label="VPNmarket Score"
          services={services}
          render={(s) => <ScoreBadge score={computeScore(s).overall} size="sm" locale="en" />}
        />
        <Row label="Price" services={services} render={(s) => s.priceFrom} />
        <Row
          label="Speed"
          services={services}
          render={(s) => (s.claimedSpeedMbps != null ? `up to ${s.claimedSpeedMbps} Mbps` : "—")}
        />
        <Row
          label="Netflix"
          services={services}
          render={(s) => (s.tags.includes("netflix") ? "✓" : "—")}
        />
        <Row
          label="Torrents"
          services={services}
          render={(s) => (s.tags.includes("torrents") ? "✓" : "—")}
        />
        <Row
          label="No-logs"
          services={services}
          render={(s) => (s.tags.includes("no-logs") ? "✓" : "—")}
        />
        <Row
          label="Devices"
          services={services}
          render={(s) => (s.tags.includes("unlimited-devices") ? "Unlimited" : "—")}
        />
        <Row
          label="Platforms"
          services={services}
          render={(s) => s.platforms.join(", ")}
        />
        <Row
          label="Site status"
          services={services}
          render={(s) => (
            <StatusBadge status={s.status} latencyMs={s.latencyMs} lastCheckedAt={s.lastCheckedAt} locale="en" />
          )}
        />
        <Row
          label="Features"
          services={services}
          render={(s) => s.tags.map((t) => TAG_LABELS_EN[t] ?? t).join(", ") || "—"}
        />
        <Row
          label=""
          services={services}
          render={(s) => (
            <a
              href={s.referralUrl ?? s.websiteUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              Visit →
            </a>
          )}
        />
      </div>

      <p className="mt-6">
        <Link href="/en" className="text-sm text-accent hover:underline">
          ← Change selection in the catalog
        </Link>
      </p>
    </main>
  );
}
