import type { Metadata } from "next";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AdminReviewRow } from "@/components/AdminReviewRow";
import { MarkReviewsSeen } from "@/components/MarkReviewsSeen";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

async function isAuthorized(): Promise<boolean> {
  const expected = process.env.CRON_SECRET;
  if (!expected) return false;
  const store = await cookies();
  return store.get("admin_key")?.value === expected;
}

export default async function AdminReviewsPage() {
  const authorized = await isAuthorized();
  if (!authorized) {
    return <AdminLoginForm />;
  }

  const store = await cookies();
  const seenAtRaw = store.get("reviews_seen_at")?.value;
  const seenAt = seenAtRaw ? new Date(seenAtRaw) : null;

  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
  });
  const serviceIds = Array.from(new Set(reviews.map((r) => r.serviceId)));
  const services = await prisma.vpnService.findMany({
    where: { id: { in: serviceIds } },
    select: { id: true, name: true, slug: true },
  });
  const serviceById = new Map(services.map((s) => [s.id, s]));

  const newCount = seenAt ? reviews.filter((r) => r.createdAt > seenAt).length : reviews.length;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <MarkReviewsSeen />

      <h1 className="text-2xl font-semibold tracking-tight">Отзывы пользователей</h1>
      <p className="mt-2 text-sm text-muted">
        Всего {reviews.length} отзывов (показаны последние 300).{" "}
        {newCount > 0 && (
          <span className="font-medium text-accent">Новых с прошлого визита: {newCount}.</span>
        )}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {reviews.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
            Пока нет отзывов.
          </p>
        ) : (
          reviews.map((r) => {
            const service = serviceById.get(r.serviceId);
            return (
              <AdminReviewRow
                key={r.id}
                id={r.id}
                serviceName={service?.name ?? "Неизвестный сервис"}
                serviceSlug={service?.slug ?? ""}
                authorName={r.authorName}
                text={r.text}
                stars={r.stars}
                speedRating={r.speedRating}
                reliabilityRating={r.reliabilityRating}
                valueRating={r.valueRating}
                createdAt={r.createdAt.toISOString()}
                isNew={seenAt ? r.createdAt > seenAt : false}
              />
            );
          })
        )}
      </div>
    </main>
  );
}
