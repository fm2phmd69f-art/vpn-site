import { prisma } from "./prisma";
import { checkWebsite } from "./checker";

export interface RunChecksSummary {
  checked: number;
  online: number;
  offline: number;
}

const CONCURRENCY = 10;

/**
 * Runs `fn` over `items` with at most CONCURRENCY in flight at once.
 * Firing all checks at once from a single serverless function starves
 * outbound connections and produces false "OFFLINE" reads from self-inflicted
 * timeouts rather than real provider outages — batching avoids that.
 */
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

export async function runChecksForAllServices(): Promise<RunChecksSummary> {
  const services = await prisma.vpnService.findMany({
    select: { id: true, slug: true, websiteUrl: true },
  });

  const results = await mapWithConcurrency(services, CONCURRENCY, async (service) => {
    const result = await checkWebsite(service.websiteUrl);
    return { id: service.id, slug: service.slug, ...result };
  });

  const checkedAt = new Date();

  await mapWithConcurrency(results, CONCURRENCY, (r) =>
    prisma.vpnService.update({
      where: { id: r.id },
      data: {
        status: r.status,
        latencyMs: r.latencyMs,
        lastError: r.error,
        lastCheckedAt: checkedAt,
      },
    })
  );

  await mapWithConcurrency(results, CONCURRENCY, (r) =>
    prisma.statusCheck.create({
      data: {
        serviceId: r.id,
        status: r.status,
        latencyMs: r.latencyMs,
        checkedAt,
      },
    })
  );

  return {
    checked: results.length,
    online: results.filter((r) => r.status === "ONLINE").length,
    offline: results.filter((r) => r.status === "OFFLINE").length,
  };
}
