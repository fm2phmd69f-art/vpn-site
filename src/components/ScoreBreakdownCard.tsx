import Link from "next/link";
import { ScoreBreakdown } from "@/lib/score";
import { ScoreBadge } from "./ScoreBadge";
import { Locale } from "@/lib/i18n";
import { UI } from "@/lib/uiDictionary";

const ROW_KEYS: (keyof Omit<ScoreBreakdown, "overall">)[] = [
  "privacy",
  "speed",
  "price",
  "streaming",
  "features",
  "reliability",
];

function barColor(score: number): string {
  if (score >= 75) return "var(--online)";
  if (score >= 50) return "#e8a223";
  return "var(--offline)";
}

export function ScoreBreakdownCard({
  score,
  locale = "ru",
}: {
  score: ScoreBreakdown;
  locale?: Locale;
}) {
  const labels = UI[locale].score;
  const scorePath = locale === "en" ? "/en/vpnmarket-score" : "/vpnmarket-score";

  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <ScoreBadge score={score.overall} />
        <div>
          <p className="text-sm font-semibold">{labels.title}</p>
          <Link href={scorePath} className="text-xs text-accent hover:underline">
            {labels.howItWorks}
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {ROW_KEYS.map((key) => {
          const value = score[key];
          return (
            <div key={key} className="flex items-center gap-3 text-sm">
              <span className="w-24 shrink-0 text-muted">{labels[key]}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${value}%`, backgroundColor: barColor(value) }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-medium">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
