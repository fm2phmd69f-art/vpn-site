import { syncCatalogFromSeed } from "../src/lib/syncCatalog";
import { prisma } from "../src/lib/prisma";

async function main() {
  const result = await syncCatalogFromSeed();
  console.log(`Seeded ${result.synced} services.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
