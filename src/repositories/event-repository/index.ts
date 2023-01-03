import { prisma } from '@/config';

async function findFirst() {
  return prisma.event.findFirst({
    select: {
      Ticket: true,
      startsAt: true,
      endsAt: true,
      logoImageUrl: true,
      backgroundImageUrl: true,
      title: true,
      id: true
    }
  });
}

async function findEventById(id: number) {
  return prisma.event.findFirst({
    where: {
      id
    }
  });
}

const eventRepository = {
  findFirst,
  findEventById
};

export default eventRepository;
