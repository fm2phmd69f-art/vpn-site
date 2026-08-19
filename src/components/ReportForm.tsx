"use client";

import { useState } from "react";

export function ReportForm({ serviceId }: { serviceId: string }) {
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
        Сообщить об ошибке в цене или описании
      </button>
    );
  }

  if (status === "sent") {
    return <p className="mt-4 text-xs text-muted">Спасибо, мы получили сообщение.</p>;
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        maxLength={500}
        rows={3}
        placeholder="Например: цена изменилась на 5 $/мес, ссылка на бесплатный тариф не работает…"
        className="w-full rounded-xl border border-border bg-bg p-3 text-sm outline-none focus:border-accent"
      />
      <div className="flex items-center gap-3">
        <button
          onClick={submit}
          disabled={status === "sending" || !note.trim()}
          className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "sending" ? "Отправляем…" : "Отправить"}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="text-xs text-muted hover:text-fg"
        >
          Отмена
        </button>
        {status === "error" && (
          <span className="text-xs text-[var(--offline)]">Не получилось, попробуйте ещё раз</span>
        )}
      </div>
    </div>
  );
}
