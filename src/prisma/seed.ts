import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.tag.createMany({
    data: [
      { name: "Nutrition" },
      { name: "Bloc" },
      { name: "Voie" },
      { name: "Vitesse" },
      { name: "Santé mentale" },
      { name: "Méditation" },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
