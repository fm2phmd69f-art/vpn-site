"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Item {
  href: string;
  label: string;
}

export function LinkDropdown({ label, items }: { label: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
          open ? "border-accent text-fg" : "border-border text-fg hover:border-accent"
        }`}
      >
        {label}
        <span className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-20 flex max-h-80 w-64 flex-col gap-0.5 overflow-y-auto rounded-2xl border border-border bg-surface p-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-1.5 text-sm text-fg transition-colors hover:bg-bg hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
