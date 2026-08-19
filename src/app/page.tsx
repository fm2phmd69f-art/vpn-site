import { prisma } from "@/lib/prisma";
import { ServiceDTO } from "@/lib/types";
import { CatalogClient } from "@/components/CatalogClient";

export const dynamic = "force-dynamic";

async function getServices(): Promise<ServiceDTO[]> {
  const services = await prisma.vpnService.findMany({
    orderBy: [{ status: "asc" }, { name: "asc" }],
  });

  return services.map((s) => ({
    id: s.id,
    slug: s.slug,
    name: s.name,
    logo: s.logo,
    websiteUrl: s.websiteUrl,
    referralUrl: s.referralUrl,
    priceFrom: s.priceFrom,
    priceMonthlyUsd: s.priceMonthlyUsd,
    claimedSpeedMbps: s.claimedSpeedMbps,
    freeOption: s.freeOption,
    rating: s.rating,
    platforms: s.platforms,
    tags: s.tags,
    description: s.description,
    status: s.status,
    latencyMs: s.latencyMs,
    lastCheckedAt: s.lastCheckedAt ? s.lastCheckedAt.toISOString() : null,
  }));
}

export default async function HomePage() {
  const services = await getServices();
  const onlineCount = services.filter((s) => s.status === "ONLINE").length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">VPN Маркетплейс</h1>
        <p className="max-w-2xl text-muted">
          Сравнение VPN-сервисов: цены, заявленная скорость и особенности — от провайдеров.
          Статус «сайт доступен» и задержка проверяются автоматически по расписанию.
        </p>
        {services.length > 0 && (
          <p className="text-sm text-muted">
            Доступно сейчас: {onlineCount} из {services.length}
          </p>
        )}
      </header>

      <CatalogClient services={services} />

      <footer className="mt-12 border-t border-border pt-6 text-xs text-muted">
        Цены, скорость и функции указаны со слов провайдеров и могут отличаться от актуальных —
        уточняйте на сайте сервиса. Мы не продаём и не выдаём доступ к VPN сами.
      </footer>
    </main>
  );
}
