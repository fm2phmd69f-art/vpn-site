import { ReviewDTO, ReviewAggregate } from "@/lib/reviews";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";

export function ReviewsSection({
  serviceId,
  serviceName,
  reviews,
  aggregate,
}: {
  serviceId: string;
  serviceName: string;
  reviews: ReviewDTO[];
  aggregate: ReviewAggregate | null;
}) {
  return (
    <section id="reviews" className="mt-12 scroll-mt-20">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Отзывы пользователей о {serviceName}</h2>
        {aggregate && (
          <p className="text-sm text-muted">
            <span className="font-semibold text-fg">★ {aggregate.avgStars.toFixed(1)}</span> из 5 ·{" "}
            {aggregate.count} {pluralizeReviews(aggregate.count)}
          </p>
        )}
      </div>

      {aggregate && (
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-surface p-4 text-center text-xs">
          <div>
            <p className="text-base font-semibold text-fg">{aggregate.avgSpeed.toFixed(1)}</p>
            <p className="text-muted">Скорость</p>
          </div>
          <div>
            <p className="text-base font-semibold text-fg">{aggregate.avgReliability.toFixed(1)}</p>
            <p className="text-muted">Надёжность</p>
          </div>
          <div>
            <p className="text-base font-semibold text-fg">{aggregate.avgValue.toFixed(1)}</p>
            <p className="text-muted">Цена/качество</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3">
        {reviews.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface p-5 text-center text-sm text-muted">
            Пока нет отзывов — будьте первым, кто поделится опытом использования {serviceName}.
          </p>
        ) : (
          reviews.map((r) => <ReviewCard key={r.id} review={r} />)
        )}
      </div>

      <div className="mt-4">
        <ReviewForm serviceId={serviceId} />
      </div>
    </section>
  );
}

function pluralizeReviews(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "отзыв";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "отзыва";
  return "отзывов";
}
