"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Ошибка входа");
      }
    } catch {
      setError("Ошибка входа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4">
      <form onSubmit={submit} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
        <p className="text-sm font-semibold text-fg">Вход в админку</p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Секретный ключ"
          autoFocus
          className="w-full rounded-xl border border-border bg-bg p-2.5 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={loading || !key}
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Проверка…" : "Войти"}
        </button>
        {error && <p className="text-xs text-[var(--offline)]">{error}</p>}
      </form>
    </main>
  );
}
