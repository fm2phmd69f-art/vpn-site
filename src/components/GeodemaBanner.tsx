"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Manrope, Fragment_Mono } from "next/font/google";
import { localeFromPathname } from "@/lib/i18n";
import { withUtm } from "@/lib/utm";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], weight: ["500", "700", "800"] });
const fragmentMono = Fragment_Mono({ subsets: ["latin"], weight: "400" });

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

/** Recreates geodema.app's speedometer: lime arc, needle sweeping up from the left, counting value. */
function Speedometer() {
  const [value, setValue] = useState(0);
  const max = 40;

  useEffect(() => {
    const start = performance.now();
    const durationMs = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * max));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const ratio = value / max;
  const angle = -90 + ratio * 180;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[120px] w-[240px] items-start justify-center">
        <svg width="240" height="86" viewBox="0 0 240 86" fill="none" className="block overflow-visible">
          <path
            d="M15.0015 70.1726C26.7227 53.1565 42.4039 39.244 60.695 29.6329C78.9861 20.0217 99.339 15 120.001 15C140.664 15 161.017 20.0217 179.308 29.6329C197.599 39.244 213.28 53.1565 225.001 70.1726"
            stroke="rgba(229,231,235,0.14)"
            strokeWidth="30"
            strokeLinecap="round"
          />
          <path
            d="M15.0015 70.1726C26.7227 53.1565 42.4039 39.244 60.695 29.6329C78.9861 20.0217 99.339 15 120.001 15C140.664 15 161.017 20.0217 179.308 29.6329C197.599 39.244 213.28 53.1565 225.001 70.1726"
            stroke="#D1F701"
            strokeWidth="30"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            strokeDashoffset={100 - ratio * 100}
            style={{ filter: "drop-shadow(0 8px 20px rgba(209,247,1,0.35))", transition: "stroke-dashoffset 90ms linear" }}
          />
        </svg>
        <svg
          width="19"
          height="49"
          viewBox="0 0 19 49"
          fill="none"
          className="absolute bottom-3 left-1/2"
          style={{
            transformOrigin: "9.5px 39.5px",
            transform: `translateX(-50%) rotate(${angle}deg)`,
            filter: "drop-shadow(0 10px 24px rgba(209,247,1,0.28))",
            transition: "transform 90ms linear",
          }}
        >
          <line x1="10" y1="40" x2="10" y2="2" stroke="#D1F701" strokeWidth="4" strokeLinecap="round" />
          <circle cx="9.5" cy="39.5" r="9" fill="#D1F701" stroke="#D1F701" />
        </svg>
      </div>
      <span
        className={`${fragmentMono.className} -mt-3 text-[44px] leading-none`}
        style={{ color: "#917be6" }}
      >
        {value}
      </span>
      <span className={`${fragmentMono.className} mt-2 text-sm`} style={{ color: "#917be6" }}>
        Gbit/s
      </span>
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
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); filter: brightness(0.92); }
  50% { transform: translate3d(0, var(--float, -4px), 0) scale(var(--scale, 1.01)); filter: brightness(1.12); }
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
    `group relative block overflow-hidden ${isHome ? "" : "sticky top-0 z-50"} ` +
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
        <div className="relative z-[2] mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/50">
              Реклама · Geodema VPN
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Ваш доступ к{" "}
              <span
                className="inline-block rounded-full px-4 py-1 align-middle text-white"
                style={{ backgroundColor: "#917be6" }}
              >
                {scrambled}
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/60 md:mx-0">
              VPN на VLESS с серверами в 70+ странах. Избавьтесь от ограничений и слежки в любой
              точке мира.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <span className="inline-flex h-12 items-center gap-1.5 rounded-full bg-white/10 px-5 text-white">
                <span className="text-xl font-extrabold leading-none">299 ₽</span>
                <span className="text-sm text-white/60">/мес</span>
              </span>
              <span
                className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-[#171717] transition-transform group-hover:scale-105"
                style={{ backgroundColor: "#d1f701" }}
              >
                Подключиться →
              </span>
            </div>
          </div>
          <div className="shrink-0 scale-90 sm:scale-100">
            <Speedometer />
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={HREF} target="_blank" rel="noopener noreferrer sponsored" className={shell} style={shellStyle}>
      <style>{BANNER_CSS}</style>
      <CtaBackground rows={2} cellSize={64} />
      <div className="relative z-[2] mx-auto flex max-w-6xl flex-col items-center justify-center gap-1.5 px-4 py-4 text-center text-white sm:flex-row sm:gap-4 sm:py-3.5">
        <span className="hidden text-[10px] font-medium uppercase tracking-wide text-white/40 sm:inline">
          Реклама
        </span>
        <span className="text-sm font-medium sm:text-base">
          Geodema VPN — доступ к{" "}
          <span className="font-semibold" style={{ color: "#c3b3f5" }}>
            {scrambled}
          </span>
        </span>
        <span className="text-xs text-white/60 sm:text-sm">
          от 299 ₽/мес — VLESS, серверы в 70+ странах
        </span>
        <span
          className="mt-1 shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold text-[#171717] transition-transform group-hover:scale-105 sm:mt-0"
          style={{ backgroundColor: "#d1f701" }}
        >
          Подключиться
        </span>
      </div>
    </a>
  );
}
