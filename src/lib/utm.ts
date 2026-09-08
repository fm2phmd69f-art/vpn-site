/**
 * Appends UTM tracking params to an outbound VPN link without disturbing any
 * existing query params (referral IDs like ?from=, ?afid=, ?RID= etc.) or the
 * URL's hash fragment.
 */
export function withUtm(url: string, slug: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "vpnmarket");
    u.searchParams.set("utm_medium", "referral");
    u.searchParams.set("utm_campaign", "vpn_catalog");
    u.searchParams.set("utm_content", slug);
    return u.toString();
  } catch {
    return url;
  }
}
