"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { localeFromPathname } from "@/lib/i18n";
import { withUtm } from "@/lib/utm";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], weight: ["500", "700", "800"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"] });

const HREF = withUtm("https://magnit.help/p7b27319c", "geodema");

const WORDS = ["свободе", "безопасности", "скорости"];
const SCRAMBLE_CHARS = "}*?={\\$%~@#!<>|/^";

function useScramble(active: boolean) {
  const [text, setText] = useState(WORDS[0]);

  useEffect(() => {
    if (!active) return;
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
      setTimeout(() => {
        if (cancelled) return;
        scrambleTo(WORDS[wordIndex], () => {
          setTimeout(cycle, 2200);
        });
      }, 0);
    }

    const start = setTimeout(cycle, 2200);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [active]);

  return text;
}

/** Deterministic pseudo-random mosaic tiles — same on server and client render, no hydration mismatch. */
const MOSAIC_CELLS = Array.from({ length: 70 }, (_, i) => {
  const seed = (i * 2654435761) % 233280;
  const rnd = (seed % 10000) / 10000;
  return {
    opacity: 0.05 + rnd * 0.16,
    delay: (seed % 500) / 100,
    duration: 4 + (seed % 400) / 100,
    olive: seed % 3 !== 0,
  };
});

function MosaicBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="grid h-full w-full"
        style={{ gridTemplateColumns: "repeat(10, 1fr)", gridTemplateRows: "repeat(7, 1fr)" }}
      >
        {MOSAIC_CELLS.map((c, i) => (
          <div
            key={i}
            style={{
              backgroundColor: c.olive ? "#9aa66b" : "#6b6f5a",
              opacity: c.opacity,
              animation: `gdCellPulse ${c.duration}s ease-in-out ${c.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes gdCellPulse {
          0%, 100% { opacity: var(--gd-op-lo, 0.04); }
          50% { opacity: var(--gd-op-hi, 0.2); }
        }
      `}</style>
    </div>
  );
}

function SpeedometerIllustration() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const target = 40;
    const start = performance.now();
    const durationMs = 1400;
    let raf: number;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Needle sweeps from -70deg (low) to ~22deg (its resting "40 Gbit/s" reading).
  const needleAngle = -70 + (value / 40) * 92;

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <radialGradient id="gdGlow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#d1f701" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d1f701" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="80" r="95" fill="url(#gdGlow)" />
      <path
        d="M 28 108 A 78 78 0 0 1 172 108"
        fill="none"
        stroke="#d1f701"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <g style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: "100px 118px", transition: "transform 80ms linear" }}>
        <line x1="100" y1="118" x2="138" y2="103" stroke="#d1f701" strokeWidth="5" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="118" r="7" fill="#d1f701" />
      <text
        x="100"
        y="160"
        textAnchor="middle"
        fill="#917be6"
        fontSize="34"
        fontWeight="700"
        className={jetbrainsMono.className}
      >
        {value}
      </text>
      <text
        x="100"
        y="182"
        textAnchor="middle"
        fill="#917be6"
        fontSize="16"
        className={jetbrainsMono.className}
      >
        Gbit/s
      </text>
    </svg>
  );
}

export function GeodemaBanner() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const isHome = pathname === "/";
  const scrambled = useScramble(true);

  if (locale !== "ru" || pathname.startsWith("/admin")) return null;

  if (isHome) {
    return (
      <a
        href={HREF}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`group relative block overflow-hidden bg-[#14151a] ${manrope.className}`}
      >
        <MosaicBackground />
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "#917be6" }}
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-10 sm:px-6 md:flex-row md:justify-between md:py-12">
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
                className="inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-[#14151a] transition-transform group-hover:scale-105"
                style={{ backgroundColor: "#d1f701" }}
              >
                Подключиться →
              </span>
            </div>
          </div>
          <div className="h-36 w-36 shrink-0 sm:h-44 sm:w-44">
            <SpeedometerIllustration />
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`group flex flex-col items-center justify-center gap-1 bg-[#14151a] px-4 py-3.5 text-center text-white sm:flex-row sm:gap-4 sm:py-3 ${manrope.className}`}
    >
      <span className="hidden text-[10px] font-medium uppercase tracking-wide text-white/40 sm:inline">
        Реклама
      </span>
      <span className="text-sm font-medium">
        Geodema VPN — доступ к{" "}
        <span className="font-semibold" style={{ color: "#c3b3f5" }}>
          {scrambled}
        </span>
      </span>
      <span className="text-xs text-white/60 sm:text-sm sm:font-semibold sm:text-white/80">
        от 299 ₽/мес — VPN на VLESS, серверы в 70+ странах
      </span>
      <span
        className="mt-1 shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold text-[#14151a] transition-transform group-hover:scale-105 sm:mt-0"
        style={{ backgroundColor: "#d1f701" }}
      >
        Подключиться
      </span>
    </a>
  );
}
