export type ServiceStatus = "ONLINE" | "OFFLINE" | "UNKNOWN";

export interface ServiceDTO {
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
  status: ServiceStatus;
  latencyMs: number | null;
  lastCheckedAt: string | null;
}
