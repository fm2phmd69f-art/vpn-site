"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ServiceDTO } from "@/lib/types";
import { ServiceCard } from "./ServiceCard";
import { computeScore } from "@/lib/score";
import { TAG_LABELS } from "@/data/services";
import { TAG_LABELS_EN } from "@/data/tagLabelsEn";
import { Locale } from "@/lib/i18n";
import { UI } from "@/lib/uiDictionary";

const MAX_COMPARE = 4;
const MIN_COMPARE = 2;

const DESKTOP_PAGE_SIZE = 50;
const MOBILE_PAGE_SIZE = 30;
const MOBILE_BREAKPOINT = 640; // matches Tailwind's `sm`

type SortKey = "recommended" | "price-asc" | "price-desc" | "score" | "speed" | "rating";

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

export function CatalogClient({
  services,
  locale = "ru",
}: {
  services: ServiceDTO[];
  locale?: Locale;
}) {
  const router = useRouter();
  const t = UI[locale].catalog;
  const tagLabels = locale === "en" ? TAG_LABELS_EN : TAG_LABELS;
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);
  const [visibleCount, setVisibleCount] = useState(DESKTOP_PAGE_SIZE);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [platform, setPlatform] = useState<string | null>(null);
  const [task, setTask] = useState<string | null>(null);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  function toggleCompare(slug: string) {
    setCompareSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }

  const compareServices = compareSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is ServiceDTO => Boolean(s));

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
          <span className="text-xs font-medium text-muted">{t.sort}</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-bg px-3 py-1.5 text-sm"
          >
            {(Object.keys(t.sortLabels) as SortKey[]).map((key) => (
              <option key={key} value={key}>
                {t.sortLabels[key]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-medium text-muted">{t.platform}</span>
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
          <span className="mr-1 text-xs font-medium text-muted">{t.task}</span>
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
              {tagLabels[tag] ?? tag}
            </button>
          ))}
        </div>

        {(platform || task || sort !== "recommended") && (
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{t.shownOf(filteredSorted.length, services.length)}</span>
            <button
              type="button"
              onClick={() => {
                setSort("recommended");
                setPlatform(null);
                setTask(null);
              }}
              className="text-accent hover:underline"
            >
              {t.reset}
            </button>
          </div>
        )}
      </div>

      {filteredSorted.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              locale={locale}
              compare={{
                selected: compareSlugs.includes(service.slug),
                disabled:
                  compareSlugs.length >= MAX_COMPARE && !compareSlugs.includes(service.slug),
                onToggle: () => toggleCompare(service.slug),
              }}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div ref={sentinelRef} className="flex items-center justify-center py-8">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
        </div>
      )}

      {compareSlugs.length > 0 && (
        <div className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-3xl flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-lg">
          <span className="text-sm font-medium">{t.compareCount(compareSlugs.length, MAX_COMPARE)}</span>
          <div className="flex flex-1 flex-wrap gap-1.5">
            {compareServices.map((s) => (
              <span
                key={s.slug}
                className="flex items-center gap-1 rounded-full border border-border px-2 py-1 text-xs"
              >
                {s.name}
                <button
                  type="button"
                  onClick={() => toggleCompare(s.slug)}
                  aria-label={locale === "en" ? `Remove ${s.name} from comparison` : `Убрать ${s.name} из сравнения`}
                  className="text-muted hover:text-fg"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCompareSlugs([])}
            className="rounded-full border border-border px-3 py-2 text-sm transition-colors hover:border-accent"
          >
            {t.clear}
          </button>
          <button
            type="button"
            disabled={compareSlugs.length < MIN_COMPARE}
            onClick={() => router.push(`/compare/custom?ids=${compareSlugs.join(",")}`)}
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.compareGo}
          </button>
        </div>
      )}
    </div>
  );
}
