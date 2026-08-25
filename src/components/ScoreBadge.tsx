import Link from "next/link";

function tierColor(score: number): string {
  if (score >= 75) return "var(--online)";
  if (score >= 50) return "#e8a223";
  return "var(--offline)";
}

export function ScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" }) {
  const color = tierColor(score);
  const dims = size === "sm" ? "h-9 w-9 text-sm" : "h-11 w-11 text-base";

  return (
    <Link
      href="/vpnmarket-score"
      title="VPNmarket Score — как считается"
      className={`flex ${dims} shrink-0 flex-col items-center justify-center rounded-full border-2 font-semibold leading-none transition-opacity hover:opacity-80`}
      style={{ borderColor: color, color }}
    >
      {score}
    </Link>
  );
}
