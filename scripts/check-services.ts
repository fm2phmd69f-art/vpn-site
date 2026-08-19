import { runChecksForAllServices } from "../src/lib/runChecks";
import { syncCatalogFromSeed } from "../src/lib/syncCatalog";
import { prisma } from "../src/lib/prisma";

async function main() {
  const sync = await syncCatalogFromSeed();
  const summary = await runChecksForAllServices();
  console.log(
    `Synced ${sync.synced} catalog entries. Checked ${summary.checked} services — ${summary.online} online, ${summary.offline} offline.`
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
