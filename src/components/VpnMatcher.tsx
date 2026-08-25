"use client";

import { useState } from "react";
import { ServiceDTO } from "@/lib/types";
import { scoreServices, MatcherAnswers, Purpose, Budget, Priority } from "@/lib/matcher";
import { ServiceCard } from "./ServiceCard";

const PURPOSE_OPTIONS: { value: Purpose; label: string; emoji: string }[] = [
  { value: "privacy", label: "Приватность и анонимность", emoji: "🕵️" },
  { value: "streaming", label: "Netflix и стриминг", emoji: "🎬" },
  { value: "torrents", label: "Торренты", emoji: "⬇️" },
  { value: "budget", label: "Просто дёшево или бесплатно", emoji: "💸" },
  { value: "gaming", label: "Игры", emoji: "🎮" },
  { value: "business", label: "Работа/бизнес", emoji: "💼" },
];

const PLATFORM_OPTIONS = ["any", "Windows", "macOS", "iOS", "Android", "Linux"];
const PLATFORM_LABELS: Record<string, string> = {
  any: "Не важно",
  Windows: "Windows",
  macOS: "macOS",
  iOS: "iPhone/iPad",
  Android: "Android",
  Linux: "Linux",
};

const BUDGET_OPTIONS: { value: Budget; label: string }[] = [
  { value: "free", label: "Бесплатно" },
  { value: "under3", label: "До 3 $/мес" },
  { value: "under7", label: "До 7 $/мес" },
  { value: "any", label: "Не важно" },
];

const PRIORITY_OPTIONS: { value: Priority; label: string; emoji: string }[] = [
  { value: "speed", label: "Скорость", emoji: "⚡" },
  { value: "privacy", label: "Приватность", emoji: "🔒" },
  { value: "price", label: "Цена", emoji: "💰" },
];

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

export function VpnMatcher({ services }: { services: ServiceDTO[] }) {
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
    const results = scoreServices(services, answers).slice(0, 5);

    return (
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Ваш подбор</h2>
          <button onClick={reset} className="text-sm text-accent hover:underline">
            Пройти заново
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ service, reasons }) => (
            <div key={service.id} className="flex flex-col gap-2">
              <ServiceCard service={service} />
              {reasons.length > 0 && (
                <p className="px-1 text-xs text-muted">Почему: {reasons.join(", ")}</p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Подбор основан на тегах и характеристиках из каталога (заявлены самими провайдерами), а
          не на независимом тестировании — рейтинг ориентировочный.
        </p>
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
          <h2 className="mb-4 text-lg font-medium">Для чего вам нужен VPN?</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PURPOSE_OPTIONS.map((opt) => (
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
          <h2 className="mb-4 text-lg font-medium">Какая у вас платформа?</h2>
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
                {PLATFORM_LABELS[p]}
              </OptionButton>
            ))}
          </div>
          <button onClick={() => setStep(0)} className="mt-4 text-xs text-muted hover:text-fg">
            ← Назад
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="mb-4 text-lg font-medium">Какой у вас бюджет?</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BUDGET_OPTIONS.map((opt) => (
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
            ← Назад
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="mb-4 text-lg font-medium">Что важнее всего?</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {PRIORITY_OPTIONS.map((opt) => (
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
            ← Назад
          </button>
        </>
      )}
    </div>
  );
}
