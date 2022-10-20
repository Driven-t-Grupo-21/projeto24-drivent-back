import { notFoundError } from '@/errors';
import ticketRepository from '@/repositories/ticket-repository';
import { Tiket } from '@prisma/client';

async function createTicket(ticketInfo: getTicketTypeWithUserId) {
  verifyUserRegistered(ticketInfo);
  console.log(ticketInfo);
  await ticketRepository.createTicket(ticketInfo);
}

function verifyUserRegistered(ticketInfo: getTicketTypeWithUserId) {}

export type getTicketTypeWithUserId = Omit<Tiket, 'id'>;

const tiketService = {
  createTicket,
};

export default tiketService;
