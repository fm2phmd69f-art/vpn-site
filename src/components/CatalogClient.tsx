"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ServiceDTO } from "@/lib/types";
import { ServiceCard } from "./ServiceCard";
import { computeScore } from "@/lib/score";
import { TAG_LABELS } from "@/data/services";

const DESKTOP_PAGE_SIZE = 50;
const MOBILE_PAGE_SIZE = 30;
const MOBILE_BREAKPOINT = 640; // matches Tailwind's `sm`

type SortKey = "recommended" | "price-asc" | "price-desc" | "score" | "speed" | "rating";

const SORT_LABELS: Record<SortKey, string> = {
  recommended: "Рекомендованные",
  "price-asc": "Цена: сначала дешевле",
  "price-desc": "Цена: сначала дороже",
  score: "VPNmarket Score",
  speed: "Заявленная скорость",
  rating: "Рейтинг провайдера",
};

const PLATFORM_FILTERS: { label: string; match: (platforms: string[]) => boolean }[] = [
  { label: "iPhone", match: (p) => p.includes("iOS") },
  { label: "Android", match: (p) => p.includes("Android") },
  { label: "Mac", match: (p) => p.includes("macOS") },
  { label: "Windows", match: (p) => p.includes("Windows") },
  { label: "TV", match: (p) => p.includes("TV") || p.includes("Fire TV") },
];

const TASK_TAGS = [
  "netflix",
  "torrents",
  "privacy",
  "no-logs",
  "free-tier",
  "budget",
  "unlimited-devices",
  "circumvention",
];

export function CatalogClient({ services }: { services: ServiceDTO[] }) {
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);
  const [visibleCount, setVisibleCount] = useState(DESKTOP_PAGE_SIZE);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [platform, setPlatform] = useState<string | null>(null);
  const [task, setTask] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function updatePageSize() {
      const size = window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
      setPageSize(size);
      setVisibleCount(size);
    }
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const filteredSorted = useMemo(() => {
    let result = services;

    if (platform) {
      const def = PLATFORM_FILTERS.find((p) => p.label === platform);
      if (def) result = result.filter((s) => def.match(s.platforms));
    }
    if (task) {
      result = result.filter((s) => s.tags.includes(task));
    }

    if (sort === "recommended") return result;

    const withScore = result.map((s) => ({ s, score: computeScore(s).overall }));
    withScore.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return (a.s.priceMonthlyUsd ?? Infinity) - (b.s.priceMonthlyUsd ?? Infinity);
        case "price-desc":
          return (b.s.priceMonthlyUsd ?? -Infinity) - (a.s.priceMonthlyUsd ?? -Infinity);
        case "score":
          return b.score - a.score;
        case "speed":
          return (b.s.claimedSpeedMbps ?? -1) - (a.s.claimedSpeedMbps ?? -1);
        case "rating":
          return (b.s.rating ?? -1) - (a.s.rating ?? -1);
        default:
          return 0;
      }
    });
    return withScore.map((x) => x.s);
  }, [services, sort, platform, task]);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [sort, platform, task, pageSize]);

  const visible = filteredSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSorted.length;

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => c + pageSize);
        }
      },
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, pageSize]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted">Сортировка:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-bg px-3 py-1.5 text-sm"
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-medium text-muted">Платформа:</span>
          {PLATFORM_FILTERS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setPlatform(platform === p.label ? null : p.label)}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                platform === p.label
                  ? "border-accent bg-accent text-white"
                  : "border-border hover:border-accent"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-medium text-muted">Задача:</span>
          {TASK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setTask(task === tag ? null : tag)}
              className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                task === tag
                  ? "border-accent bg-accent text-white"
                  : "border-border hover:border-accent"
              }`}
            >
              {TAG_LABELS[tag] ?? tag}
            </button>
          ))}
        </div>

        {(platform || task || sort !== "recommended") && (
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Показано {filteredSorted.length} из {services.length}</span>
            <button
              type="button"
              onClick={() => {
                setSort("recommended");
                setPlatform(null);
                setTask(null);
              }}
              className="text-accent hover:underline"
            >
              Сбросить
            </button>
          </div>
        )}
      </div>

      {filteredSorted.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">
          Ничего не найдено под эти фильтры — попробуйте сбросить их.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

      {hasMore && (
        <div ref={sentinelRef} className="flex items-center justify-center py-8">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
        </div>
      )}
    </div>
  );
}
