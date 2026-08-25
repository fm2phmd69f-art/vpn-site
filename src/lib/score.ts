import { ServiceDTO } from "./types";

export interface ScoreBreakdown {
  overall: number;
  price: number;
  speed: number;
  privacy: number;
  streaming: number;
  features: number;
  reliability: number;
}

/** Fixed normalization scale, not catalog-relative — so a score means the same thing regardless of which other providers are currently listed. Documented on /vpnmarket-score. */
const PRICE_CAP_USD = 15;
const SPEED_CAP_MBPS = 1000;

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

function scorePrice(priceMonthlyUsd: number | null): number {
  if (priceMonthlyUsd == null) return 50;
  if (priceMonthlyUsd <= 0) return 100;
  return Math.round(clamp(100 - (priceMonthlyUsd / PRICE_CAP_USD) * 100));
}

function scoreSpeed(claimedSpeedMbps: number | null): number {
  if (claimedSpeedMbps == null) return 50;
  return Math.round(clamp((claimedSpeedMbps / SPEED_CAP_MBPS) * 100));
}

function scorePrivacy(tags: string[]): number {
  let points = 0;
  if (tags.includes("no-logs")) points += 40;
  if (tags.includes("privacy")) points += 20;
  if (tags.includes("open-source")) points += 15;
  if (tags.includes("anonymous-payment")) points += 15;
  if (tags.includes("double-vpn")) points += 10;
  return Math.round(points > 0 ? clamp(points) : 20);
}

function scoreStreaming(tags: string[]): number {
  let points = 0;
  if (tags.includes("netflix")) points += 70;
  if (tags.includes("streaming")) points += 30;
  return Math.round(points > 0 ? clamp(points) : 15);
}

function scoreFeatures(platforms: string[], tags: string[]): number {
  let points = clamp((platforms.length / 5) * 60, 0, 60);
  if (tags.includes("wireguard")) points += 10;
  if (tags.includes("unlimited-devices")) points += 10;
  if (tags.includes("static-ip")) points += 5;
  if (tags.includes("channel-bonding")) points += 5;
  if (tags.includes("self-hosted")) points += 5;
  if (tags.includes("ad-block")) points += 5;
  if (tags.includes("business")) points += 5;
  if (tags.includes("circumvention")) points += 5;
  return Math.round(clamp(points));
}

function scoreReliability(status: ServiceDTO["status"]): number {
  if (status === "ONLINE") return 100;
  if (status === "UNKNOWN") return 55;
  return 10;
}

/**
 * VPNmarket Score: our own composite index, built only from data already in the
 * catalog (self-reported price/speed/features + our own uptime monitoring) — never
 * from independent lab testing we don't actually do. See /vpnmarket-score.
 */
export function computeScore(service: ServiceDTO): ScoreBreakdown {
  const price = scorePrice(service.priceMonthlyUsd);
  const speed = scoreSpeed(service.claimedSpeedMbps);
  const privacy = scorePrivacy(service.tags);
  const streaming = scoreStreaming(service.tags);
  const features = scoreFeatures(service.platforms, service.tags);
  const reliability = scoreReliability(service.status);
  const overall = Math.round((price + speed + privacy + streaming + features + reliability) / 6);
  return { overall, price, speed, privacy, streaming, features, reliability };
}
