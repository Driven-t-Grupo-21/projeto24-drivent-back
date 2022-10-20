import { prisma } from '@/config';
import { getTicketType } from '@/controllers/tiket-controller';
import { getTicketTypeWithUserId } from '@/services/ticket-service';
import { Prisma } from '@prisma/client';

async function createTicket(ticketInfo: getTicketTypeWithUserId) {
  await prisma.tiket.create({
    data: ticketInfo,
  });
}

const ticketRepository = {
  createTicket,
};

export default ticketRepository;
