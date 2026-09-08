"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/lib/i18n";

const COPY = {
  ru: {
    trigger: "Связаться с нами",
    title: "Связаться с нами",
    close: "Закрыть",
    messageLabel: "Ваше сообщение",
    messagePlaceholder: "Опишите вопрос или предложение…",
    contactLabel: "Способ связи",
    contactPlaceholder: "Telegram, email и т.д.",
    send: "Отправить",
    sending: "Отправляем…",
    cancel: "Отмена",
    sent: "Спасибо, мы получили ваше сообщение.",
    error: "Не получилось отправить, попробуйте ещё раз.",
  },
  en: {
    trigger: "Contact us",
    title: "Contact us",
    close: "Close",
    messageLabel: "Your message",
    messagePlaceholder: "Describe your question or suggestion…",
    contactLabel: "Contact method",
    contactPlaceholder: "Telegram, email, etc.",
    send: "Send",
    sending: "Sending…",
    cancel: "Cancel",
    sent: "Thanks, we've received your message.",
    error: "Something went wrong, please try again.",
  },
};

export function ContactModal() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const t = COPY[locale];

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function openModal() {
    setMessage("");
    setContact("");
    setStatus("idle");
    setOpen(true);
  }

  async function submit() {
    if (!message.trim() || !contact.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), contact: contact.trim() }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-left text-muted transition-colors hover:text-fg"
      >
        {t.trigger}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t.title}
            className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-fg">{t.title}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="text-muted hover:text-fg"
              >
                ✕
              </button>
            </div>

            {status === "sent" ? (
              <p className="mt-4 text-sm text-muted">{t.sent}</p>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">
                    {t.messageLabel}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={2000}
                    rows={4}
                    placeholder={t.messagePlaceholder}
                    className="w-full rounded-xl border border-border bg-bg p-3 text-sm outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">
                    {t.contactLabel}
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    maxLength={200}
                    placeholder={t.contactPlaceholder}
                    className="w-full rounded-xl border border-border bg-bg p-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={submit}
                    disabled={status === "sending" || !message.trim() || !contact.trim()}
                    className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {status === "sending" ? t.sending : t.send}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted hover:text-fg"
                  >
                    {t.cancel}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-[var(--offline)]">{t.error}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
