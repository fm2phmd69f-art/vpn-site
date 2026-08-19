"use client";

import { useMemo, useState } from "react";
import { ServiceDTO } from "@/lib/types";
import { TAG_LABELS } from "@/data/services";
import { ServiceCard } from "./ServiceCard";

type SortKey = "rating" | "priceAsc" | "speedDesc" | "name";

const SORT_LABELS: Record<SortKey, string> = {
  rating: "По рейтингу",
  priceAsc: "Сначала дешевле",
  speedDesc: "По скорости",
  name: "По названию",
};

export function CatalogClient({ services }: { services: ServiceDTO[] }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [onlineOnly, setOnlineOnly] = useState(false);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    services.forEach((s) => s.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [services]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = services.filter((s) => {
      if (onlineOnly && s.status !== "ONLINE") return false;
      if (activeTags.length > 0 && !activeTags.every((t) => s.tags.includes(t))) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q) || (TAG_LABELS[t] ?? "").toLowerCase().includes(q))
      );
    });

    result = [...result].sort((a, b) => {
      switch (sortKey) {
        case "priceAsc":
          return (a.priceMonthlyUsd ?? Infinity) - (b.priceMonthlyUsd ?? Infinity);
        case "speedDesc":
          return (b.claimedSpeedMbps ?? 0) - (a.claimedSpeedMbps ?? 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
        default:
          return (b.rating ?? 0) - (a.rating ?? 0);
      }
    });

    return result;
  }, [services, query, activeTags, sortKey, onlineOnly]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск: название, «netflix», «бесплатно»…"
            className="flex-1 rounded-full border border-border bg-bg px-4 py-2 text-sm outline-none focus:border-accent"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-full border border-border bg-bg px-4 py-2 text-sm outline-none focus:border-accent"
          >
            {Object.entries(SORT_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 whitespace-nowrap text-sm text-muted">
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={(e) => setOnlineOnly(e.target.checked)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            Только доступные
          </label>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {allTags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-border text-muted hover:border-accent"
                }`}
              >
                {TAG_LABELS[tag] ?? tag}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted">Найдено сервисов: {filtered.length}</p>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">
          Ничего не найдено — попробуйте изменить фильтры.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
