import { prisma } from "./prisma";
import { checkWebsite } from "./checker";

export interface RunChecksSummary {
  checked: number;
  online: number;
  offline: number;
}

export async function runChecksForAllServices(): Promise<RunChecksSummary> {
  const services = await prisma.vpnService.findMany({
    select: { id: true, slug: true, websiteUrl: true },
  });

  const results = await Promise.all(
    services.map(async (service) => {
      const result = await checkWebsite(service.websiteUrl);
      return { id: service.id, slug: service.slug, ...result };
    })
  );

  await Promise.all(
    results.map((r) =>
      prisma.vpnService.update({
        where: { id: r.id },
        data: {
          status: r.status,
          latencyMs: r.latencyMs,
          lastError: r.error,
          lastCheckedAt: new Date(),
        },
      })
    )
  );

  return {
    checked: results.length,
    online: results.filter((r) => r.status === "ONLINE").length,
    offline: results.filter((r) => r.status === "OFFLINE").length,
  };
}
