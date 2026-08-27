"use client";

import { useEffect, useState } from "react";
import { ServiceStatus } from "@/lib/types";
import { Locale } from "@/lib/i18n";
import { UI } from "@/lib/uiDictionary";

const DOT_STYLE: Record<ServiceStatus, string> = {
  ONLINE: "bg-[var(--online)]",
  OFFLINE: "bg-[var(--offline)]",
  UNKNOWN: "bg-[var(--unknown)]",
};

function timeAgo(iso: string, locale: Locale): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (locale === "en") {
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} h ago`;
    const days = Math.round(hours / 24);
    return `${days} d ago`;
  }
  if (minutes < 1) return "только что";
  if (minutes < 60) return `${minutes} мин назад`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} ч назад`;
  const days = Math.round(hours / 24);
  return `${days} дн назад`;
}

export function StatusBadge({
  status,
  latencyMs,
  lastCheckedAt,
  locale = "ru",
}: {
  status: ServiceStatus;
  latencyMs: number | null;
  lastCheckedAt: string | null;
  locale?: Locale;
}) {
  const labels = UI[locale].status;
  // Pages are ISR-cached, so the gap between "when this HTML was generated"
  // and "when the browser hydrates it" can be minutes — computing a
  // Date.now()-relative string during render would mismatch between server
  // and client and throw a hydration error. Render nothing on the first
  // pass (identical on server and client) and fill it in after mount.
  const [ago, setAgo] = useState<string | null>(null);

  useEffect(() => {
    if (!lastCheckedAt) return;
    setAgo(timeAgo(lastCheckedAt, locale));
  }, [lastCheckedAt, locale]);

  const label =
    status === "ONLINE" ? labels.online : status === "OFFLINE" ? labels.offline : labels.unknown;

  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted">
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT_STYLE[status]}`} />
        <span>{label}</span>
      </span>
      {status === "ONLINE" && latencyMs != null && (
        <span className="whitespace-nowrap">· {latencyMs} {locale === "en" ? "ms" : "мс"}</span>
      )}
      {ago && (
        <span className="whitespace-nowrap">
          · {locale === "en" ? "checked" : "проверено"} {ago}
        </span>
      )}
    </div>
  );
}
