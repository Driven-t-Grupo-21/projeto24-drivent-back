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

const eventRepository = {
  findFirst,
};

export default eventRepository;
