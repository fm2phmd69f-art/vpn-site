import { ReviewDTO } from "@/lib/reviews";

const AVATAR_COLORS = [
  "#f97316",
  "#ef4444",
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#eab308",
  "#ec4899",
  "#14b8a6",
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function Stars({ value }: { value: number }) {
  return (
    <span className="text-sm text-[#f5a623]" aria-label={`${value} из 5 звёзд`}>
      {"★".repeat(value)}
      <span className="text-border">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export function ReviewCard({ review }: { review: ReviewDTO }) {
  const initial = review.authorName.trim().charAt(0).toUpperCase() || "?";
  const date = new Date(review.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: avatarColor(review.authorName) }}
          aria-hidden
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <p className="font-medium text-fg">{review.authorName}</p>
            <Stars value={review.stars} />
          </div>
          <p className="text-xs text-muted">{date}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg">{review.text}</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted">
            <span>Скорость: {review.speedRating}/10</span>
            <span>Надёжность: {review.reliabilityRating}/10</span>
            <span>Цена/качество: {review.valueRating}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
