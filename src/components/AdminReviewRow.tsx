"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  serviceName: string;
  serviceSlug: string;
  authorName: string;
  text: string;
  stars: number;
  speedRating: number;
  reliabilityRating: number;
  valueRating: number;
  createdAt: string;
  isNew: boolean;
}

export function AdminReviewRow(props: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  async function handleDelete() {
    if (!confirm("Удалить этот отзыв безвозвратно?")) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.id }),
      });
      if (res.ok) {
        setDeleted(true);
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  }

  if (deleted) return null;

  const date = new Date(props.createdAt).toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`rounded-2xl border p-4 ${props.isNew ? "border-accent bg-accent/5" : "border-border bg-surface"}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            {props.isNew && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                Новый
              </span>
            )}
            <a
              href={`/vpn/${props.serviceSlug}#reviews`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:underline"
            >
              {props.serviceName}
            </a>
          </div>
          <p className="mt-0.5 text-xs text-muted">{date}</p>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-[var(--offline)] hover:text-[var(--offline)] disabled:opacity-50"
        >
          {deleting ? "Удаление…" : "Удалить"}
        </button>
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="font-medium text-fg">{props.authorName}</span>
        <span className="text-[#f5a623]">{"★".repeat(props.stars)}<span className="text-border">{"★".repeat(5 - props.stars)}</span></span>
      </div>
      <p className="mt-1.5 text-sm text-fg">{props.text}</p>
      <div className="mt-2 flex gap-4 text-xs text-muted">
        <span>Скорость: {props.speedRating}/10</span>
        <span>Надёжность: {props.reliabilityRating}/10</span>
        <span>Цена/качество: {props.valueRating}/10</span>
      </div>
    </div>
  );
}
