import { notFoundError } from '@/errors';
import orderRepository from '@/repositories/order-repository';
import { Order } from '@prisma/client';

async function createOrder(ticketInfo: getOrderWithUserId) {
  verifyUserRegistered(ticketInfo.userId);
  await orderRepository.createOrder(ticketInfo);
}

async function verifyUserRegistered(userId: number) {
  const user = await orderRepository.getUserRegister(userId);
  if (!user) throw notFoundError();
}

export type getOrderWithUserId = Omit<Order, 'id'>;

const orderService = {
  createOrder,
};

export default orderService;
