import { Hotel, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE "Event" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Ticket" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Hotel" RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE "Rooms" RESTART IDENTITY CASCADE`,
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

  let hotel: any = await prisma.hotel.findFirst({
    where: {
      eventId: event.id,
    },
  });

  if (!hotel) {
    await prisma.hotel.createMany({
      data: [
        {
          name: 'Driven Resort',
          logoImageUrl:
            'https://www.melhoresdestinos.com.br/wp-content/uploads/2020/10/melhores-resorts-mundo-capa2019.jpg',
          eventId: event.id,
        },
        {
          name: "Driven'Ibis",
          logoImageUrl: 'https://digital.ihg.com/is/image/ihg/hotel-indigo-tallahassee-6579045922-2x1',
          eventId: event.id,
        },
      ],
    });
  }

  let hotels: any = await prisma.hotel.findMany({
    where: {
      eventId: event.id,
    },
  });

  let rooms: any = await prisma.rooms.findFirst({
    where: {
      hotelId: hotels[0].id,
    },
  });

  if (!rooms) {
    hotels.map(async (hotel: Hotel) => {
      rooms = await prisma.rooms.createMany({
        data: [
          {
            beds: 3,
            number: 101,
            hotelId: hotel.id,
          },
          {
            beds: 1,
            number: 102,
            hotelId: hotel.id,
          },
          {
            beds: 1,
            number: 103,
            hotelId: hotel.id,
          },
          {
            beds: 3,
            number: 104,
            hotelId: hotel.id,
          },
          {
            beds: 2,
            number: 201,
            hotelId: hotel.id,
          },
          {
            beds: 1,
            number: 202,
            hotelId: hotel.id,
          },
          {
            beds: 2,
            number: 203,
            hotelId: hotel.id,
          },
          {
            beds: 3,
            number: 204,
            hotelId: hotel.id,
          },
        ],
      });
    });
  }

  let locations = await prisma.locations.findFirst();

  if (!locations) {
    await prisma.locations.createMany({
      data: [
        {
          name: 'Auditório Principal',
        },
        {
          name: 'Auditório Lateral',
        },
        {
          name: 'Sala de Workshop',
        },
      ],
    });
  }

  let activities = await prisma.activities.findFirst();

  if (!activities) {
    await prisma.activities.createMany({
      data: [
        {
          activityDate: dayjs().add(10, 'days').toDate(),
          description: 'Minecraft: montando o PC ideal',
          startsAt: '09:00',
          endsAt: '10:00',
          vacancies: 27,
          localId: 1,
        },
        {
          activityDate: dayjs().add(10, 'days').toDate(),
          description: 'LoL: montando o PC ideal',
          startsAt: '10:00',
          endsAt: '11:00',
          vacancies: 0,
          localId: 1,
        },
        {
          activityDate: dayjs().add(10, 'days').toDate(),
          description: 'Palestra X',
          startsAt: '09:00',
          endsAt: '11:00',
          vacancies: 27,
          localId: 2,
        },
        {
          activityDate: dayjs().add(10, 'days').toDate(),
          description: 'Palestra Y',
          startsAt: '09:00',
          endsAt: '10:00',
          vacancies: 0,
          localId: 3,
        },
        {
          activityDate: dayjs().add(10, 'days').toDate(),
          description: 'Palestra Z',
          startsAt: '10:00',
          endsAt: '12:00',
          vacancies: 27,
          localId: 3,
        },
        {
          activityDate: dayjs().add(11, 'days').toDate(),
          description: 'Palestra A',
          startsAt: '9:00',
          endsAt: '10:00',
          vacancies: 27,
          localId: 1,
        },
        {
          activityDate: dayjs().add(11, 'days').toDate(),
          description: 'Palestra B',
          startsAt: '10:00',
          endsAt: '12:00',
          vacancies: 0,
          localId: 2,
        },
        {
          activityDate: dayjs().add(11, 'days').toDate(),
          description: 'Palestra C',
          startsAt: '12:00',
          endsAt: '15:00',
          vacancies: 27,
          localId: 3,
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
