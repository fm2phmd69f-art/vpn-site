/**
 * Curated set of well-known providers eligible for /compare/x-vs-y pages.
 * Deliberately NOT all 54×53/2 possible pairs — most combinations
 * (e.g. "Kaspersky VPN vs Le VPN") have no real search demand and would
 * just be thin, low-value pages that dilute the site's overall quality
 * signal. Keep this list to brands people actually search "X vs Y" for.
 */
export const COMPARISON_SLUGS = [
  "nordvpn",
  "expressvpn",
  "surfshark",
  "protonvpn",
  "mullvad",
  "pia",
  "cyberghost",
  "ipvanish",
  "purevpn",
  "windscribe",
];

export interface ComparisonPair {
  a: string;
  b: string;
  pairSlug: string;
}

export function pairSlug(a: string, b: string): string {
  const [first, second] = [a, b].sort();
  return `${first}-vs-${second}`;
}

export function parsePairSlug(pair: string): { a: string; b: string } | null {
  const parts = pair.split("-vs-");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return { a: parts[0], b: parts[1] };
}

export function allComparisonPairs(): ComparisonPair[] {
  const pairs: ComparisonPair[] = [];
  for (let i = 0; i < COMPARISON_SLUGS.length; i++) {
    for (let j = i + 1; j < COMPARISON_SLUGS.length; j++) {
      const a = COMPARISON_SLUGS[i];
      const b = COMPARISON_SLUGS[j];
      pairs.push({ a, b, pairSlug: pairSlug(a, b) });
    }
  }
  return pairs;
}
