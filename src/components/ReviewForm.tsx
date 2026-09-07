"use client";

import { useState, useRef } from "react";

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} из 5`}
          className={`text-2xl leading-none transition-colors ${n <= value ? "text-[#f5a623]" : "text-border hover:text-[#f5a623]/50"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="font-medium text-fg">{value}/10</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-accent"
      />
    </div>
  );
}

export function ReviewForm({ serviceId, onSubmitted }: { serviceId: string; onSubmitted?: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);
  const [speedRating, setSpeedRating] = useState(7);
  const [reliabilityRating, setReliabilityRating] = useState(7);
  const [valueRating, setValueRating] = useState(7);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const formLoadedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function submit() {
    if (!name.trim() || text.trim().length < 10) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          authorName: name,
          text,
          stars,
          speedRating,
          reliabilityRating,
          valueRating,
          website: honeypotRef.current?.value ?? "",
          formLoadedAt: formLoadedAt.current,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        onSubmitted?.();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Не удалось отправить отзыв.");
        setStatus("error");
      }
    } catch {
      setError("Не удалось отправить отзыв.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5 text-center text-sm text-muted">
        Спасибо за отзыв! Он уже опубликован на странице.
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent"
      >
        Оставить отзыв
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
      <p className="text-sm font-semibold text-fg">Оставить отзыв</p>

      {/* Honeypot — hidden from real users, bots tend to fill every field */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
        style={{ left: "-9999px" }}
      />

      <div>
        <label className="mb-1 block text-xs text-muted">Ваше имя</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="Например, Алексей"
          className="w-full rounded-xl border border-border bg-bg p-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-muted">Общая оценка</label>
        <StarPicker value={stars} onChange={setStars} />
      </div>

      <div className="flex flex-col gap-3">
        <Slider label="Скорость" value={speedRating} onChange={setSpeedRating} />
        <Slider label="Надёжность" value={reliabilityRating} onChange={setReliabilityRating} />
        <Slider label="Цена/качество" value={valueRating} onChange={setValueRating} />
      </div>

      <div>
        <label className="mb-1 block text-xs text-muted">Отзыв</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder="Расскажите о своём опыте использования — что понравилось, что нет."
          className="w-full rounded-xl border border-border bg-bg p-2.5 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={submit}
          disabled={status === "sending" || !name.trim() || text.trim().length < 10}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "sending" ? "Отправка…" : "Отправить отзыв"}
        </button>
        <button onClick={() => setOpen(false)} className="text-sm text-muted hover:text-fg">
          Отмена
        </button>
      </div>
      {status === "error" && <p className="text-xs text-[var(--offline)]">{error}</p>}
      <p className="text-xs text-muted">
        Отзыв публикуется сразу и анонимно — мы не спрашиваем email и не создаём аккаунт.
      </p>
    </div>
  );
}
