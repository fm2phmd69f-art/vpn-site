import Link from "next/link";
import { ServiceDTO } from "@/lib/types";
import { TAG_LABELS } from "@/data/services";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";
import { StatusBadge } from "./StatusBadge";
import { ServiceLogo } from "./ServiceLogo";
import { ScoreBadge } from "./ScoreBadge";
import { computeScore } from "@/lib/score";
import { Locale } from "@/lib/i18n";
import { UI } from "@/lib/uiDictionary";

const ADVANTAGE_TAG_PRIORITY = [
  "no-logs",
  "netflix",
  "free-tier",
  "torrents",
  "privacy",
  "budget",
  "unlimited-devices",
  "fast",
  "open-source",
  "wireguard",
  "streaming",
  "china-friendly",
  "circumvention",
  "double-vpn",
  "anonymous-payment",
  "static-ip",
  "ad-block",
  "self-hosted",
  "swiss-based",
  "channel-bonding",
  "antivirus-bundle",
  "business",
];

function topAdvantageTags(tags: string[], max = 3): string[] {
  const ranked = ADVANTAGE_TAG_PRIORITY.filter((t) => tags.includes(t));
  const rest = tags.filter((t) => !ADVANTAGE_TAG_PRIORITY.includes(t));
  return [...ranked, ...rest].slice(0, max);
}

interface Props {
  service: ServiceDTO;
  locale?: Locale;
  compare?: {
    selected: boolean;
    disabled: boolean;
    onToggle: () => void;
  };
}

export function ServiceCard({ service, locale = "ru", compare }: Props) {
  const score = computeScore(service);
  const advantages = topAdvantageTags(service.tags);
  const labels = locale === "en" ? TAG_LABELS_EN : TAG_LABELS;
  const t = UI[locale].card;
  const basePath = locale === "en" ? `/en/vpn/${service.slug}` : `/vpn/${service.slug}`;

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md ${
        compare?.selected ? "border-accent" : "border-border"
      }`}
    >
      {compare && (
        <label
          className={`-mb-1 flex items-center gap-1.5 self-start rounded-full border px-2 py-1 text-xs transition-colors ${
            compare.selected
              ? "border-accent bg-accent text-white"
              : "border-border text-muted hover:border-accent"
          } ${compare.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          <input
            type="checkbox"
            checked={compare.selected}
            disabled={compare.disabled}
            onChange={compare.onToggle}
            className="sr-only"
          />
          {compare.selected ? t.compareOn : t.compareAdd}
        </label>
      )}
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <ServiceLogo
            name={service.name}
            emoji={service.logo}
            websiteUrl={service.websiteUrl}
            status={service.status}
            locale={locale}
          />
          <div>
            <h3 className="text-base font-semibold leading-tight">
              <Link href={basePath} className="hover:text-accent hover:underline">
                {service.name}
              </Link>
            </h3>
            {service.rating != null && (
              <p className="text-xs text-muted">⭐ {service.rating.toFixed(1)}</p>
            )}
          </div>
        </div>
        <ScoreBadge score={score.overall} size="sm" locale={locale} />
      </div>

      <StatusBadge
        status={service.status}
        latencyMs={service.latencyMs}
        lastCheckedAt={service.lastCheckedAt}
        locale={locale}
      />

      <p className="text-xl font-semibold tracking-tight">{service.priceFrom}</p>

      {advantages.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {advantages.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
            >
              {labels[tag] ?? tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-muted">{service.platforms.join(" · ")}</p>

      <div className="mt-auto flex gap-2 pt-1">
        <Link
          href={basePath}
          className="flex-1 inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
        >
          {t.learnMore}
        </Link>
        <a
          href={service.referralUrl ?? service.websiteUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1 inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {t.visit}
        </a>
      </div>
    </div>
  );
}
