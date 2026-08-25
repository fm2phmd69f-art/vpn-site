import Link from "next/link";
import { ScoreBreakdown } from "@/lib/score";
import { ScoreBadge } from "./ScoreBadge";

const ROWS: { key: keyof Omit<ScoreBreakdown, "overall">; label: string }[] = [
  { key: "privacy", label: "Приватность" },
  { key: "speed", label: "Скорость" },
  { key: "price", label: "Цена" },
  { key: "streaming", label: "Стриминг" },
  { key: "features", label: "Функции" },
  { key: "reliability", label: "Надёжность" },
];

function barColor(score: number): string {
  if (score >= 75) return "var(--online)";
  if (score >= 50) return "#e8a223";
  return "var(--offline)";
}

export function ScoreBreakdownCard({ score }: { score: ScoreBreakdown }) {
  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <ScoreBadge score={score.overall} />
        <div>
          <p className="text-sm font-semibold">VPNmarket Score</p>
          <Link href="/vpnmarket-score" className="text-xs text-accent hover:underline">
            Как считается →
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {ROWS.map((row) => {
          const value = score[row.key];
          return (
            <div key={row.key} className="flex items-center gap-3 text-sm">
              <span className="w-24 shrink-0 text-muted">{row.label}</span>
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
