import { prisma } from "./prisma";

export interface UptimeStats {
  totalChecks: number;
  onlineChecks: number;
  uptimePercent: number | null;
}

export async function getUptimeStats(serviceId: string, days: number): Promise<UptimeStats> {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const checks = await prisma.statusCheck.findMany({
    where: { serviceId, checkedAt: { gte: since } },
    select: { status: true },
  });

  const totalChecks = checks.length;
  const onlineChecks = checks.filter((c) => c.status === "ONLINE").length;

  return {
    totalChecks,
    onlineChecks,
    uptimePercent: totalChecks > 0 ? Math.round((onlineChecks / totalChecks) * 100) : null,
  };
}
