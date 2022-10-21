import { getOrderWithUserId } from '@/controllers/order-controller';
import { notFoundError } from '@/errors';
import orderRepository from '@/repositories/order-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { exclude } from '@/utils/prisma-utils';

async function createOrder(ticketInfo: getOrderWithUserId) {
  // await verifyUserRegistered(ticketInfo.userId);
  const ticketId: number = await getTicketId(ticketInfo.ticketName);
  const newTicketInfo = exclude(ticketInfo, 'ticketName');
  await orderRepository.createOrder({ ...newTicketInfo, ticketId });
}

async function getTicketId(ticketName: string): Promise<number> {
  const ticketId = await ticketRepository.findTicketIdByName(ticketName);
  if (!ticketId) throw notFoundError();
  return ticketId.id;
}

async function verifyUserRegistered(userId: number) {
  const user = await orderRepository.getUserRegister(userId);
  if (!user) throw notFoundError();
}

const orderService = {
  createOrder,
};

export default orderService;
