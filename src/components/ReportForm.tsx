"use client";

import { useState } from "react";
import { Locale } from "@/lib/i18n";
import { UI } from "@/lib/uiDictionary";

export function ReportForm({ serviceId, locale = "ru" }: { serviceId: string; locale?: Locale }) {
  const t = UI[locale].report;
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit() {
    if (!note.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, note }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-4 text-xs text-muted underline decoration-dotted hover:text-fg"
      >
        {t.trigger}
      </button>
    );
  }

  if (status === "sent") {
    return <p className="mt-4 text-xs text-muted">{t.sent}</p>;
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={500}
        rows={3}
        placeholder={t.placeholder}
        className="w-full rounded-xl border border-border bg-bg p-3 text-sm outline-none focus:border-accent"
      />
      <div className="flex items-center gap-3">
        <button
          onClick={submit}
          disabled={status === "sending" || !note.trim()}
          className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "sending" ? t.sending : t.send}
        </button>
        <button onClick={() => setOpen(false)} className="text-xs text-muted hover:text-fg">
          {t.cancel}
        </button>
        {status === "error" && (
          <span className="text-xs text-[var(--offline)]">{t.error}</span>
        )}
      </div>
    </div>
  );
}
