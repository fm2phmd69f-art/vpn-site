import { prisma } from "./prisma";
import { SEED_SERVICES } from "../data/services";

/**
 * Upserts the curated catalog (src/data/services.ts) into the DB by slug.
 * Safe to call repeatedly — used by the seed script, the admin endpoint,
 * and the recurring cron job so edits to the source file propagate
 * automatically on the next scheduled run without a manual deploy step.
 */
export async function syncCatalogFromSeed(): Promise<{ synced: number }> {
  for (const service of SEED_SERVICES) {
    await prisma.vpnService.upsert({
      where: { slug: service.slug },
      create: { ...service },
      update: { ...service },
    });
  }
  return { synced: SEED_SERVICES.length };
}
