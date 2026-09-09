import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { prisma } from "../src/lib/prisma";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Dumps every row from every table to a local timestamped JSON file.
 * DATABASE_URL is shared between local dev and production (see CLAUDE.md),
 * so this is the safety net before any migration or destructive DB command —
 * run `npm run db:backup` first, always.
 */
async function main() {
  const [vpnServices, reviews, contactMessages, priceReportsResult, statusChecksResult] =
    await Promise.all([
      prisma.vpnService.findMany(),
      prisma.review.findMany(),
      prisma.contactMessage.findMany(),
      prisma.priceReport.findMany().catch(() => []),
      prisma.statusCheck.findMany().catch(() => []),
    ]);

  const snapshot = {
    takenAt: new Date().toISOString(),
    vpnServices,
    reviews,
    contactMessages,
    priceReports: priceReportsResult,
    statusChecks: statusChecksResult,
  };

  const dir = path.join(__dirname, "..", "backups");
  fs.mkdirSync(dir, { recursive: true });
  const stamp = snapshot.takenAt.replace(/[:.]/g, "-");
  const file = path.join(dir, `backup-${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify(snapshot, null, 2));

  console.log(`Backed up:`);
  console.log(`  VpnService: ${vpnServices.length}`);
  console.log(`  Review: ${reviews.length}`);
  console.log(`  ContactMessage: ${contactMessages.length}`);
  console.log(`  PriceReport: ${priceReportsResult.length}`);
  console.log(`  StatusCheck: ${statusChecksResult.length}`);
  console.log(`Saved to ${file}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
