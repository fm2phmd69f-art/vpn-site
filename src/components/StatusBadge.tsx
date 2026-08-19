import { ServiceStatus } from "@/lib/types";

const LABELS: Record<ServiceStatus, string> = {
  ONLINE: "Сайт доступен",
  OFFLINE: "Недоступен",
  UNKNOWN: "Не проверен",
};

const DOT_STYLE: Record<ServiceStatus, string> = {
  ONLINE: "bg-[var(--online)]",
  OFFLINE: "bg-[var(--offline)]",
  UNKNOWN: "bg-[var(--unknown)]",
};

function timeAgo(iso: string | null): string | null {
  if (!iso) return null;
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
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
}: {
  status: ServiceStatus;
  latencyMs: number | null;
  lastCheckedAt: string | null;
}) {
  const ago = timeAgo(lastCheckedAt);
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted">
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT_STYLE[status]}`} />
        <span>{LABELS[status]}</span>
      </span>
      {status === "ONLINE" && latencyMs != null && (
        <span className="whitespace-nowrap">· {latencyMs} мс</span>
      )}
      {ago && <span className="whitespace-nowrap">· проверено {ago}</span>}
    </div>
  );
}
