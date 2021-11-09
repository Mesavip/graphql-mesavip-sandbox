import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

async function teste() {
  const test = await prisma.user.findMany({
    where: {
      email: 'daniel@gmail.com',
    },
    include: {
      _count: {
        select: {
          ratings: true,
        },
      },
    },
  });

  console.log(test);
}

teste();
