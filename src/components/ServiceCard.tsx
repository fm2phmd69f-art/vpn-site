import Link from "next/link";
import { ServiceDTO } from "@/lib/types";
import { TAG_LABELS } from "@/data/services";
import { StatusBadge } from "./StatusBadge";
import { ServiceLogo } from "./ServiceLogo";

export function ServiceCard({ service }: { service: ServiceDTO }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5">
          <ServiceLogo name={service.name} emoji={service.logo} websiteUrl={service.websiteUrl} />
          <div>
            <h3 className="text-base font-semibold leading-tight">
              <Link href={`/vpn/${service.slug}`} className="hover:text-accent hover:underline">
                {service.name}
              </Link>
            </h3>
            {service.rating != null && (
              <p className="text-xs text-muted">⭐ {service.rating.toFixed(1)}</p>
            )}
          </div>
        </div>
        <StatusBadge
          status={service.status}
          latencyMs={service.latencyMs}
          lastCheckedAt={service.lastCheckedAt}
        />
      </div>

      <p className="line-clamp-3 text-sm text-muted">{service.description}</p>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
        <div className="text-muted">Цена</div>
        <div className="text-right font-medium">{service.priceFrom}</div>

        {service.claimedSpeedMbps != null && (
          <>
            <div className="text-muted">Заявл. скорость</div>
            <div className="text-right font-medium">до {service.claimedSpeedMbps} Мбит/с</div>
          </>
        )}

        {service.freeOption && (
          <>
            <div className="text-muted">Бесплатно</div>
            <div className="text-right font-medium">{service.freeOption}</div>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
          >
            {TAG_LABELS[tag] ?? tag}
          </span>
        ))}
      </div>

      <p className="text-xs text-muted">{service.platforms.join(" · ")}</p>

      <a
        href={service.referralUrl ?? service.websiteUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-auto inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Перейти на сайт
      </a>
    </div>
  );
}
