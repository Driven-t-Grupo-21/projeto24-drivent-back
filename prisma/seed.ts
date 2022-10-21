import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "Event" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Ticket" RESTART IDENTITY CASCADE`,
  ]);

  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  let ticket: any = await prisma.ticket.findFirst({
    where: {
      eventId: event.id,
    },
  });

  if (!ticket) {
    ticket = await prisma.ticket.createMany({
      data: [
        {
          type: 'Presencial',
          price: '250.00',
          eventId: event.id,
        },
        {
          type: 'Online',
          price: '100.00',
          eventId: event.id,
        },
      ],
    });
  }

  console.log({ ticket });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
