import { promises as dns } from "node:dns";

export interface BlocklistZone {
  name: string;
  zone: string;
}

export const DNSBL_ZONES: BlocklistZone[] = [
  { name: "Spamhaus ZEN", zone: "zen.spamhaus.org" },
  { name: "Barracuda Reputation", zone: "b.barracudacentral.org" },
  { name: "SpamCop", zone: "bl.spamcop.net" },
  { name: "SORBS", zone: "dnsbl.sorbs.net" },
  { name: "CBL (Abuseat)", zone: "cbl.abuseat.org" },
];

export interface BlocklistResult {
  name: string;
  zone: string;
  /** true = listed, false = clean, null = check failed/timed out */
  listed: boolean | null;
}

function reverseIpv4(ip: string): string | null {
  const parts = ip.split(".");
  if (parts.length !== 4 || !parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255)) {
    return null;
  }
  return parts.reverse().join(".");
}

async function queryZone(reversedIp: string, zone: BlocklistZone): Promise<BlocklistResult> {
  const query = `${reversedIp}.${zone.zone}`;
  try {
    const addresses = await Promise.race([
      dns.resolve4(query),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 3000)),
    ]);
    return { name: zone.name, zone: zone.zone, listed: addresses.length > 0 };
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOTFOUND" || code === "ENODATA") {
      // No DNS record for the query = not listed. This is the expected "clean" path.
      return { name: zone.name, zone: zone.zone, listed: false };
    }
    return { name: zone.name, zone: zone.zone, listed: null };
  }
}

export interface BlocklistCheck {
  ip: string;
  supported: boolean;
  results: BlocklistResult[];
}

/** Real DNSBL lookups (RFC 5782 style) — no third-party API, no API key. IPv4 only. */
export async function checkBlocklists(ip: string): Promise<BlocklistCheck> {
  const reversed = reverseIpv4(ip);
  if (!reversed) {
    return { ip, supported: false, results: [] };
  }
  const results = await Promise.all(DNSBL_ZONES.map((zone) => queryZone(reversed, zone)));
  return { ip, supported: true, results };
}
