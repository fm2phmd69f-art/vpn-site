"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Manrope } from "next/font/google";
import { localeFromPathname } from "@/lib/i18n";
import { withUtm } from "@/lib/utm";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700", "800"],
  display: "optional",
});

const HREF = withUtm("https://magnit.help/p7b27319c", "geodema");

const WORDS = ["свободе", "безопасности", "скорости"];
const SCRAMBLE_CHARS = "}*?={\\$%~@#!<>|/^";

function useScramble() {
  const [text, setText] = useState(WORDS[0]);

  useEffect(() => {
    let wordIndex = 0;
    let cancelled = false;

    function scrambleTo(word: string, onDone: () => void) {
      let frame = 0;
      const totalFrames = 14;
      const timer = setInterval(() => {
        if (cancelled) return clearInterval(timer);
        frame++;
        const revealCount = Math.floor((frame / totalFrames) * word.length);
        const revealed = word.slice(0, revealCount);
        const scrambled = Array.from({ length: word.length - revealCount })
          .map(() => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
          .join("");
        setText(revealed + scrambled);
        if (frame >= totalFrames) {
          clearInterval(timer);
          setText(word);
          onDone();
        }
      }, 45);
    }

    function cycle() {
      if (cancelled) return;
      wordIndex = (wordIndex + 1) % WORDS.length;
      scrambleTo(WORDS[wordIndex], () => setTimeout(cycle, 2200));
    }

    const start = setTimeout(cycle, 2200);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, []);

  return text;
}

/**
 * Recreates geodema.app's own CTA background: a grid of breathing cells behind
 * two drifting lime glows. Cell parameters are derived from the index so server
 * and client render identically; the random "live" highlight runs only after mount.
 */
function CtaBackground({ rows, cellSize }: { rows: number; cellSize: number }) {
  const cols = 14;
  const total = cols * rows;
  const [live, setLive] = useState<Record<number, "live" | "accentLive">>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const next: Record<number, "live" | "accentLive"> = {};
      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * total);
        next[idx] = Math.random() < 0.35 ? "accentLive" : "live";
      }
      setLive(next);
    }, 1800);
    return () => clearInterval(timer);
  }, [total]);

  const cells = Array.from({ length: total }, (_, i) => {
    const seed = (i * 2654435761) % 233280;
    const r = (n: number) => ((seed >> n) % 1000) / 1000;
    return {
      dur: 4.8 + r(2) * 3.5,
      delay: -(r(4) * 6),
      float: -6 + r(6) * 11,
      alpha: 0.28 + r(8) * 0.16,
      scale: 0.985 + r(3) * 0.04,
      filled: seed % 8 === 0,
      accent: seed % 37 === 0,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
      <div className="gd-bg-sheen absolute inset-px" />
      <span className="gd-glow gd-glow--left" />
      <span className="gd-glow gd-glow--right" />
      <div
        className="gd-grid"
        style={{
          ["--gd-cell" as string]: `${cellSize}px`,
          ["--gd-cols" as string]: cols,
          ["--gd-grid-w" as string]: `${cols * cellSize}px`,
          ["--gd-grid-h" as string]: `${rows * cellSize}px`,
        }}
      >
        {cells.map((c, i) => (
          <span
            key={i}
            className={`gd-cell${c.filled ? " is-filled" : ""}${c.accent ? " is-accent" : ""}${
              live[i] === "live" ? " is-live" : live[i] === "accentLive" ? " is-accent-live" : ""
            }`}
            style={{
              ["--dur" as string]: `${c.dur.toFixed(2)}s`,
              ["--delay" as string]: `${c.delay.toFixed(2)}s`,
              ["--float" as string]: `${c.float.toFixed(1)}px`,
              ["--alpha" as string]: c.alpha.toFixed(2),
              ["--scale" as string]: c.scale.toFixed(3),
            }}
          />
        ))}
      </div>
    </div>
  );
}

const BANNER_CSS = `
.gd-bg-sheen {
  border-radius: inherit;
  background:
    linear-gradient(rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 24%),
    radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 56%);
  opacity: 0.7;
}
.gd-glow {
  position: absolute;
  border-radius: 999px;
  background: rgba(209, 247, 1, 0.34);
  filter: blur(120px);
  animation: gdGlowShift 10s ease-in-out infinite;
  will-change: transform, opacity;
}
.gd-glow--left {
  width: clamp(240px, 28vw, 420px);
  height: clamp(120px, 14vw, 220px);
  left: max(-6%, -40px);
  bottom: 8%;
  animation-delay: -2.2s;
}
.gd-glow--right {
  width: clamp(240px, 28vw, 420px);
  height: clamp(120px, 14vw, 220px);
  right: max(-6%, -40px);
  top: 6%;
}
.gd-grid {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(var(--gd-grid-w), calc(100% - 20px));
  height: var(--gd-grid-h);
  display: grid;
  grid-template-columns: repeat(var(--gd-cols), var(--gd-cell));
  grid-auto-rows: var(--gd-cell);
  border: 1px solid rgba(208, 213, 221, 0.18);
  border-bottom: none;
  overflow: hidden;
  opacity: 0.9;
  -webkit-mask-image: linear-gradient(rgba(0,0,0,0.2) 0%, #000 24%, #000 100%);
  mask-image: linear-gradient(rgba(0,0,0,0.2) 0%, #000 24%, #000 100%);
}
.gd-grid::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 10%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%),
    linear-gradient(rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 22%);
}
.gd-cell {
  position: relative;
  width: var(--gd-cell);
  height: var(--gd-cell);
  border-right: 1px solid rgba(208, 213, 221, 0.18);
  border-bottom: 1px solid rgba(208, 213, 221, 0.18);
  background: rgba(242, 244, 247, 0);
  opacity: var(--alpha, 0.38);
  transform: translate3d(0, 0, 0);
  filter: brightness(0.95);
  transition: background .6s, transform .6s, opacity .6s, box-shadow .6s, filter .6s;
  animation: gdCellBreath var(--dur, 6s) ease-in-out var(--delay, 0s) infinite;
}
.gd-cell.is-filled { background: rgba(242, 244, 247, 0.06); }
.gd-cell.is-accent {
  background: rgba(209, 247, 1, 0.06);
  box-shadow: inset 0 0 16px rgba(209, 247, 1, 0.08);
}
.gd-cell.is-live {
  background: rgba(242, 244, 247, 0.12);
  opacity: 0.96;
  transform: translate3d(0, -10px, 0) scale(1.02);
  filter: brightness(1.14);
}
.gd-cell.is-accent-live {
  background: linear-gradient(rgba(209,247,1,0.28) 0%, rgba(209,247,1,0.08) 100%);
  opacity: 1;
  transform: translate3d(0, -14px, 0) scale(1.035);
  box-shadow: inset 0 0 28px rgba(209,247,1,0.18), 0 0 34px rgba(209,247,1,0.1);
  filter: brightness(1.2);
}
@keyframes gdCellBreath {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: var(--alpha, 0.38); }
  50% { transform: translate3d(0, var(--float, -4px), 0) scale(var(--scale, 1.01)); opacity: calc(var(--alpha, 0.38) + 0.22); }
}
@keyframes gdGlowShift {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.42; }
  50% { transform: translate3d(3%, -4%, 0) scale(1.08); opacity: 0.65; }
}
@media (prefers-reduced-motion: reduce) {
  .gd-cell, .gd-glow { animation: none; }
}
`;

export function GeodemaBanner() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const isHome = pathname === "/";
  const scrambled = useScramble();

  if (locale !== "ru" || pathname.startsWith("/admin")) return null;

  const shell =
    `group relative block overflow-hidden ${isHome ? "" : "sticky top-16 z-40"} ` +
    manrope.className;
  const shellStyle = {
    background:
      "radial-gradient(1200px 420px at 50% 115%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%), linear-gradient(#1b1b1b 0%, #171717 100%)",
  };

  if (isHome) {
    return (
      <a href={HREF} target="_blank" rel="noopener noreferrer sponsored" className={shell} style={shellStyle}>
        <style>{BANNER_CSS}</style>
        <CtaBackground rows={5} cellSize={96} />
        <div className="relative z-[2] mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-8 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
          <div>
            <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/50">
              Geodema VPN
            </span>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
              Ваш доступ к
              <br className="sm:hidden" />
              <span
                className="mt-1 inline-block rounded-full px-4 py-1 align-middle text-white sm:ml-2 sm:mt-0"
                style={{ backgroundColor: "#917be6" }}
              >
                {scrambled}
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/60 md:mx-0">
              VPN на VLESS с серверами в 70+ странах. Избавьтесь от ограничений и слежки в любой
              точке мира.
            </p>
          </div>
          <div className="flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-none sm:flex-row md:w-auto md:shrink-0">
            <span className="inline-flex h-12 shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-5 text-white">
              <span className="text-xl font-extrabold leading-none">299 ₽</span>
              <span className="text-sm text-white/60">/мес</span>
            </span>
            <span
              className="inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-[#171717] transition-transform group-hover:scale-105 sm:w-auto"
              style={{ backgroundColor: "#d1f701" }}
            >
              Подключиться →
            </span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={HREF} target="_blank" rel="noopener noreferrer sponsored" className={shell} style={shellStyle}>
      <style>{BANNER_CSS}</style>
      <CtaBackground rows={2} cellSize={64} />
      <div className="relative z-[2] mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-white sm:px-6 sm:py-2.5">
        <div className="flex min-w-0 flex-col text-left">
          <span className="truncate text-xs font-medium sm:text-sm">
            <span className="mr-1 hidden text-[10px] font-medium uppercase tracking-wide text-white/40 sm:inline">
              Реклама ·
            </span>
            Geodema VPN — доступ к{" "}
            <span className="font-semibold" style={{ color: "#c3b3f5" }}>
              {scrambled}
            </span>
          </span>
          <span className="truncate text-[11px] text-white/60 sm:text-sm">
            от 299 ₽/мес — VLESS, серверы в 70+ странах
          </span>
        </div>
        <span
          className="shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold text-[#171717] transition-transform group-hover:scale-105"
          style={{ backgroundColor: "#d1f701" }}
        >
          Подключиться
        </span>
      </div>
    </a>
  );
}
