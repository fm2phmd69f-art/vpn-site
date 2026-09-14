import { prisma } from "./prisma";
import { ServiceDTO } from "./types";
import { SEED_SERVICES } from "@/data/services";

/**
 * Falls back to the static SEED_SERVICES catalog when the database is
 * unreachable (e.g. a paused/over-quota Neon project) so the site keeps
 * serving pages instead of 500ing on every request. Live-only fields
 * (status, latency, last-checked time, DB id) aren't available from seed
 * data, so they're reported as unknown rather than guessed.
 */
function seedToDTO(s: (typeof SEED_SERVICES)[number]): ServiceDTO {
  return {
    id: s.slug,
    slug: s.slug,
    name: s.name,
    logo: s.logo,
    websiteUrl: s.websiteUrl,
    referralUrl: s.referralUrl ?? null,
    priceFrom: s.priceFrom,
    priceMonthlyUsd: s.priceMonthlyUsd ?? null,
    claimedSpeedMbps: s.claimedSpeedMbps ?? null,
    freeOption: s.freeOption ?? null,
    rating: s.rating ?? null,
    platforms: s.platforms,
    tags: s.tags,
    description: s.description,
    status: "UNKNOWN",
    latencyMs: null,
    lastCheckedAt: null,
  };
}

function toDTO(s: {
  id: string;
  slug: string;
  name: string;
  logo: string;
  websiteUrl: string;
  referralUrl: string | null;
  priceFrom: string;
  priceMonthlyUsd: number | null;
  claimedSpeedMbps: number | null;
  freeOption: string | null;
  rating: number | null;
  platforms: string[];
  tags: string[];
  description: string;
  status: string;
  latencyMs: number | null;
  lastCheckedAt: Date | null;
}): ServiceDTO {
  return {
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
    status: s.status as ServiceDTO["status"],
    latencyMs: s.latencyMs,
    lastCheckedAt: s.lastCheckedAt ? s.lastCheckedAt.toISOString() : null,
  };
}

export async function getAllServices(): Promise<ServiceDTO[]> {
  try {
    const services = await prisma.vpnService.findMany({
      orderBy: [{ status: "asc" }, { name: "asc" }],
    });
    return services.map(toDTO);
  } catch {
    return [...SEED_SERVICES].sort((a, b) => a.name.localeCompare(b.name)).map(seedToDTO);
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDTO | null> {
  try {
    const service = await prisma.vpnService.findUnique({ where: { slug } });
    return service ? toDTO(service) : null;
  } catch {
    const seed = SEED_SERVICES.find((s) => s.slug === slug);
    return seed ? seedToDTO(seed) : null;
  }
}

export async function getServicesByTag(tag: string): Promise<ServiceDTO[]> {
  try {
    const services = await prisma.vpnService.findMany({
      where: { tags: { has: tag } },
      orderBy: [{ status: "asc" }, { name: "asc" }],
    });
    return services.map(toDTO);
  } catch {
    return SEED_SERVICES.filter((s) => s.tags.includes(tag))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(seedToDTO);
  }
}
