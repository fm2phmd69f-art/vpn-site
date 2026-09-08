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
    // Only the fields that actually exist on the VpnService model — SeedService
    // also carries editorial extras (pros/cons/faq/protocols/etc.) that are
    // looked up directly from SEED_SERVICES at render time, never synced to the DB.
    const dbFields = {
      slug: service.slug,
      name: service.name,
      logo: service.logo,
      websiteUrl: service.websiteUrl,
      referralUrl: service.referralUrl,
      priceFrom: service.priceFrom,
      priceMonthlyUsd: service.priceMonthlyUsd,
      claimedSpeedMbps: service.claimedSpeedMbps,
      freeOption: service.freeOption,
      rating: service.rating,
      platforms: service.platforms,
      tags: service.tags,
      description: service.description,
    };
    await prisma.vpnService.upsert({
      where: { slug: service.slug },
      create: dbFields,
      update: dbFields,
    });
  }

  const { count: removed } = await prisma.vpnService.deleteMany({
    where: { slug: { notIn: SEED_SERVICES.map((s) => s.slug) } },
  });

  return { synced: SEED_SERVICES.length, removed };
}
