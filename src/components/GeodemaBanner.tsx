"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Manrope } from "next/font/google";
import { localeFromPathname } from "@/lib/i18n";
import { withUtm } from "@/lib/utm";

const manrope = Manrope({ subsets: ["latin", "cyrillic"], weight: ["500", "700", "800"] });

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

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="glow" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#917be6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#917be6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shieldFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a996f0" />
          <stop offset="100%" stopColor="#7057c9" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="90" r="95" fill="url(#glow)" />
      <path
        d="M100 24 L162 48 V96 C162 138 136 166 100 180 C64 166 38 138 38 96 V48 Z"
        fill="url(#shieldFill)"
        stroke="#d1f701"
        strokeWidth="3"
      />
      <path
        d="M78 96 L94 112 L126 74"
        fill="none"
        stroke="#0b0c10"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="90" r="95" fill="none" stroke="#d1f701" strokeOpacity="0.25" strokeWidth="1.5" />
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
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "#917be6" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "#d1f701" }}
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
                className="inline-block min-w-[9ch] rounded-full px-4 py-1 align-middle text-white"
                style={{ backgroundColor: "#917be6" }}
              >
                {scrambled}
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/60 md:mx-0">
              VPN на VLESS с серверами в 70+ странах. Избавьтесь от ограничений и слежки в любой
              точке мира.
            </p>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
              <span className="inline-flex items-baseline gap-1.5 rounded-2xl bg-white/10 px-4 py-2 text-white">
                <span className="text-2xl font-extrabold leading-none">299 ₽</span>
                <span className="text-sm text-white/60">/мес</span>
              </span>
              <span
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#14151a] transition-transform group-hover:scale-105"
                style={{ backgroundColor: "#d1f701" }}
              >
                Подключиться →
              </span>
            </div>
          </div>
          <div className="h-32 w-32 shrink-0 sm:h-40 sm:w-40">
            <ShieldIllustration />
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
      className={`group flex items-center justify-center gap-3 bg-[#14151a] px-4 py-2.5 text-center text-sm text-white sm:gap-4 ${manrope.className}`}
    >
      <span className="hidden text-[10px] font-medium uppercase tracking-wide text-white/40 sm:inline">
        Реклама
      </span>
      <span className="font-medium">
        Geodema VPN — доступ к{" "}
        <span className="font-semibold" style={{ color: "#c3b3f5" }}>
          {scrambled}
        </span>
      </span>
      <span className="hidden font-semibold text-white/80 sm:inline">от 299 ₽/мес</span>
      <span
        className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-[#14151a] transition-transform group-hover:scale-105"
        style={{ backgroundColor: "#d1f701" }}
      >
        Подключиться
      </span>
    </a>
  );
}
