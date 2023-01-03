import { prisma } from '@/config';

async function findByEventId(id: number) {
  return prisma.ticket.findMany({
    where: {
      eventId: id,
    },
  });
}

async function findTicketIdByName(ticketName: string) {
  return prisma.ticket.findFirst({
    where: {
      type: ticketName,
    },
  });
}

const ticketRepository = {
  findByEventId,
  findTicketIdByName,
};

export default ticketRepository;
