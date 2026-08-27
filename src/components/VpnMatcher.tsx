"use client";

import { useState } from "react";
import { ServiceDTO } from "@/lib/types";
import { scoreServices, MatcherAnswers, Purpose, Budget, Priority } from "@/lib/matcher";
import { ServiceCard } from "./ServiceCard";
import { localizeServiceEn } from "@/lib/localizeService";
import { Locale } from "@/lib/i18n";

const PURPOSE_OPTIONS: Record<Locale, { value: Purpose; label: string; emoji: string }[]> = {
  ru: [
    { value: "privacy", label: "Приватность и анонимность", emoji: "🕵️" },
    { value: "streaming", label: "Netflix и стриминг", emoji: "🎬" },
    { value: "torrents", label: "Торренты", emoji: "⬇️" },
    { value: "budget", label: "Просто дёшево или бесплатно", emoji: "💸" },
    { value: "gaming", label: "Игры", emoji: "🎮" },
    { value: "business", label: "Работа/бизнес", emoji: "💼" },
  ],
  en: [
    { value: "privacy", label: "Privacy and anonymity", emoji: "🕵️" },
    { value: "streaming", label: "Netflix and streaming", emoji: "🎬" },
    { value: "torrents", label: "Torrenting", emoji: "⬇️" },
    { value: "budget", label: "Just cheap or free", emoji: "💸" },
    { value: "gaming", label: "Gaming", emoji: "🎮" },
    { value: "business", label: "Work/business", emoji: "💼" },
  ],
};

const PLATFORM_OPTIONS = ["any", "Windows", "macOS", "iOS", "Android", "Linux"];
const PLATFORM_LABELS: Record<Locale, Record<string, string>> = {
  ru: {
    any: "Не важно",
    Windows: "Windows",
    macOS: "macOS",
    iOS: "iPhone/iPad",
    Android: "Android",
    Linux: "Linux",
  },
  en: {
    any: "Doesn't matter",
    Windows: "Windows",
    macOS: "macOS",
    iOS: "iPhone/iPad",
    Android: "Android",
    Linux: "Linux",
  },
};

const BUDGET_OPTIONS: Record<Locale, { value: Budget; label: string }[]> = {
  ru: [
    { value: "free", label: "Бесплатно" },
    { value: "under3", label: "До 3 $/мес" },
    { value: "under7", label: "До 7 $/мес" },
    { value: "any", label: "Не важно" },
  ],
  en: [
    { value: "free", label: "Free" },
    { value: "under3", label: "Under $3/mo" },
    { value: "under7", label: "Under $7/mo" },
    { value: "any", label: "Doesn't matter" },
  ],
};

const PRIORITY_OPTIONS: Record<Locale, { value: Priority; label: string; emoji: string }[]> = {
  ru: [
    { value: "speed", label: "Скорость", emoji: "⚡" },
    { value: "privacy", label: "Приватность", emoji: "🔒" },
    { value: "price", label: "Цена", emoji: "💰" },
  ],
  en: [
    { value: "speed", label: "Speed", emoji: "⚡" },
    { value: "privacy", label: "Privacy", emoji: "🔒" },
    { value: "price", label: "Price", emoji: "💰" },
  ],
};

const UI = {
  ru: {
    purposeQ: "Для чего вам нужен VPN?",
    platformQ: "Какая у вас платформа?",
    budgetQ: "Какой у вас бюджет?",
    priorityQ: "Что важнее всего?",
    back: "← Назад",
    resultsTitle: "Ваш подбор",
    reset: "Пройти заново",
    why: "Почему:",
    disclaimer:
      "Подбор основан на тегах и характеристиках из каталога (заявлены самими провайдерами), а не на независимом тестировании — рейтинг ориентировочный.",
  },
  en: {
    purposeQ: "What do you need a VPN for?",
    platformQ: "What's your platform?",
    budgetQ: "What's your budget?",
    priorityQ: "What matters most?",
    back: "← Back",
    resultsTitle: "Your matches",
    reset: "Start over",
    why: "Why:",
    disclaimer:
      "Matches are based on tags and specs from the catalog (as stated by the providers themselves), not independent testing — treat the ranking as a rough guide.",
  },
};

type Step = 0 | 1 | 2 | 3 | 4;

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
        selected
          ? "border-accent bg-accent text-white"
          : "border-border bg-surface hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}

export function VpnMatcher({
  services,
  locale = "ru",
}: {
  services: ServiceDTO[];
  locale?: Locale;
}) {
  const t = UI[locale];
  const [step, setStep] = useState<Step>(0);
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  function reset() {
    setStep(0);
    setPurpose(null);
    setPlatform(null);
    setBudget(null);
    setPriority(null);
  }

  if (step === 4 && purpose && platform && budget && priority) {
    const answers: MatcherAnswers = { purpose, platform, budget, priority };
    const results = scoreServices(services, answers, locale).slice(0, 5);

    return (
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t.resultsTitle}</h2>
          <button onClick={reset} className="text-sm text-accent hover:underline">
            {t.reset}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ service, reasons }) => (
            <div key={service.id} className="flex flex-col gap-2">
              <ServiceCard
                service={locale === "en" ? localizeServiceEn(service) : service}
                locale={locale}
              />
              {reasons.length > 0 && (
                <p className="px-1 text-xs text-muted">
                  {t.why} {reasons.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">{t.disclaimer}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
      <div className="mb-4 flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-accent" : "bg-border"}`}
          />
        ))}
      </div>

      {step === 0 && (
        <>
          <h2 className="mb-4 text-lg font-medium">{t.purposeQ}</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PURPOSE_OPTIONS[locale].map((opt) => (
              <OptionButton
                key={opt.value}
                selected={purpose === opt.value}
                onClick={() => {
                  setPurpose(opt.value);
                  setStep(1);
                }}
              >
                {opt.emoji} {opt.label}
              </OptionButton>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h2 className="mb-4 text-lg font-medium">{t.platformQ}</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PLATFORM_OPTIONS.map((p) => (
              <OptionButton
                key={p}
                selected={platform === p}
                onClick={() => {
                  setPlatform(p);
                  setStep(2);
                }}
              >
                {PLATFORM_LABELS[locale][p]}
              </OptionButton>
            ))}
          </div>
          <button onClick={() => setStep(0)} className="mt-4 text-xs text-muted hover:text-fg">
            {t.back}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="mb-4 text-lg font-medium">{t.budgetQ}</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BUDGET_OPTIONS[locale].map((opt) => (
              <OptionButton
                key={opt.value}
                selected={budget === opt.value}
                onClick={() => {
                  setBudget(opt.value);
                  setStep(3);
                }}
              >
                {opt.label}
              </OptionButton>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="mt-4 text-xs text-muted hover:text-fg">
            {t.back}
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="mb-4 text-lg font-medium">{t.priorityQ}</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PRIORITY_OPTIONS[locale].map((opt) => (
              <OptionButton
                key={opt.value}
                selected={priority === opt.value}
                onClick={() => {
                  setPriority(opt.value);
                  setStep(4);
                }}
              >
                {opt.emoji} {opt.label}
              </OptionButton>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="mt-4 text-xs text-muted hover:text-fg">
            {t.back}
          </button>
        </>
      )}
    </div>
  );
}
