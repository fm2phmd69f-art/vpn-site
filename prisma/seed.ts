import { PrismaClient } from "@prisma/client";
import { SEED_SERVICES } from "../src/data/services";

const prisma = new PrismaClient();

async function main() {
  for (const service of SEED_SERVICES) {
    await prisma.vpnService.upsert({
      where: { slug: service.slug },
      create: { ...service },
      update: { ...service },
    });
  }
  console.log(`Seeded ${SEED_SERVICES.length} services.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
