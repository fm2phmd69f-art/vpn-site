import { runChecksForAllServices } from "../src/lib/runChecks";
import { prisma } from "../src/lib/prisma";

async function main() {
  const summary = await runChecksForAllServices();
  console.log(
    `Checked ${summary.checked} services — ${summary.online} online, ${summary.offline} offline.`
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
