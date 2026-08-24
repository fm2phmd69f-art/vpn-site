import { headers } from "next/headers";

export interface ClientInfo {
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
  latitude: string | null;
  longitude: string | null;
}

/** Real request-derived data — Vercel's edge network geolocation headers, no third-party API. */
export async function getClientInfo(): Promise<ClientInfo> {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : h.get("x-real-ip");
  const city = h.get("x-vercel-ip-city");

  return {
    ip: ip || null,
    country: h.get("x-vercel-ip-country"),
    region: h.get("x-vercel-ip-country-region"),
    city: city ? decodeURIComponent(city) : null,
    timezone: h.get("x-vercel-ip-timezone"),
    latitude: h.get("x-vercel-ip-latitude"),
    longitude: h.get("x-vercel-ip-longitude"),
  };
}
