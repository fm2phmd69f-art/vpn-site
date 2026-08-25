/**
 * DuckDuckGo's icon proxy returns its own generic "not found" placeholder image
 * (HTTP 404, but with a valid image body) for these hosts, so a plain <img onError>
 * can't detect the failure client-side — checked manually against the live catalog.
 */
const NO_FAVICON_HOSTS = new Set([
  "ivpn.net",
  "strongvpn.com",
  "atlasvpn.com",
  "perfect-privacy.com",
  "rusvpn.com",
  "vpnarea.com",
]);

/** Real favicon of the provider's own site, proxied through DuckDuckGo's icon service. */
export function faviconUrl(websiteUrl: string): string | null {
  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, "");
    if (NO_FAVICON_HOSTS.has(hostname)) return null;
    return `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
  } catch {
    return null;
  }
}
