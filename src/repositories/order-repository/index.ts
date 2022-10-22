import { prisma } from '@/config';
import { getOrderWithoutTicketName, getOrderWithUserId } from '@/controllers/order-controller';
import { exclude } from '@/utils/prisma-utils';
import { Prisma } from '@prisma/client';

async function createOrder(orderInfo: getOrderWithoutTicketName) {
  await prisma.order.create({
    data: orderInfo,
  });
}

async function findOrderByUser(userId: number) {
  return await prisma.order.findFirst({
    where: { userId },
  });
}

const orderRepository = {
  createOrder,
  findOrderByUser,
};

export default orderRepository;
