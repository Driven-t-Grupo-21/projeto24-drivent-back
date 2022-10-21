import { prisma } from '@/config';

async function findByEventId(id: number) {
  return prisma.ticket.findMany({
      where: {
        eventId: id
    }
  });
}

const ticketRepository = {
  findByEventId,
};

export default ticketRepository;