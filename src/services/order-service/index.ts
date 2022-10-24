import { getOrderWithUserId } from '@/controllers/order-controller';
import { notFoundError, unauthorizedError } from '@/errors';
import orderRepository from '@/repositories/order-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { exclude } from '@/utils/prisma-utils';

async function createOrder(ticketInfo: getOrderWithUserId) {
  await verifyOrderAlreadyExist(ticketInfo.userId);
  const ticketId: number = await getTicketId(ticketInfo.ticketName);
  const newTicketInfo = exclude(ticketInfo, 'ticketName');
  await orderRepository.createOrder({ ...newTicketInfo, ticketId });
}

async function getByUserId(userId: number, orderId: number) {
  return await orderRepository.findOrderByUser(userId, orderId);
}

async function getTicketId(ticketName: string): Promise<number> {
  const ticketId = await ticketRepository.findTicketIdByName(ticketName);
  if (!ticketId) throw notFoundError();
  return ticketId.id;
}

async function verifyOrderAlreadyExist(userId: number) {
  const orderByUserId = await orderRepository.findOrderByUser(userId);
  if (orderByUserId) throw unauthorizedError();
}

const orderService = {
  createOrder,
  getByUserId,
};

export default orderService;
