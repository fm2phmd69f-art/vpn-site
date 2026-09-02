import { prisma } from "./prisma";
import { SEED_SERVICES } from "../data/services";

/**
 * Upserts the curated catalog (src/data/services.ts) into the DB by slug, and
 * removes any DB row whose slug is no longer present in the seed file — so
 * edits to the source file (including removals) propagate automatically on
 * the next scheduled run without a manual deploy step.
 */
export async function syncCatalogFromSeed(): Promise<{ synced: number; removed: number }> {
  for (const service of SEED_SERVICES) {
    await prisma.vpnService.upsert({
      where: { slug: service.slug },
      create: { ...service },
      update: { ...service },
    });
  }

  const { count: removed } = await prisma.vpnService.deleteMany({
    where: { slug: { notIn: SEED_SERVICES.map((s) => s.slug) } },
  });

  return { synced: SEED_SERVICES.length, removed };
}
