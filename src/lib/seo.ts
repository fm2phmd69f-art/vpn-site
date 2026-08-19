export const SITE_URL = "https://vpnmarket.online";
export const SITE_NAME = "VPN Маркетплейс";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Renders a JSON-LD payload, escaping `</script` so embedded text can't break out of the tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
