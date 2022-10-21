import { prisma } from '@/config';
import { getOrderWithoutTicketName, getOrderWithUserId } from '@/controllers/order-controller';
import { exclude } from '@/utils/prisma-utils';
import { Prisma } from '@prisma/client';

async function createOrder(orderInfo: getOrderWithoutTicketName) {
  await prisma.order.create({
    data: orderInfo,
  });
}

async function getUserRegister(userId: number) {
  return await prisma.enrollment.findFirst({
    where: { userId },
  });
}

const orderRepository = {
  createOrder,
  getUserRegister,
};

export default orderRepository;
