import { prisma } from "./prisma";
import { ServiceDTO } from "./types";

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
  const services = await prisma.vpnService.findMany({
    orderBy: [{ status: "asc" }, { name: "asc" }],
  });
  return services.map(toDTO);
}

export async function getServiceBySlug(slug: string): Promise<ServiceDTO | null> {
  const service = await prisma.vpnService.findUnique({ where: { slug } });
  return service ? toDTO(service) : null;
}

export async function getServicesByTag(tag: string): Promise<ServiceDTO[]> {
  const services = await prisma.vpnService.findMany({
    where: { tags: { has: tag } },
    orderBy: [{ status: "asc" }, { name: "asc" }],
  });
  return services.map(toDTO);
}
