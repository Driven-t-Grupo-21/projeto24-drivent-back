import { prisma } from '@/config';
import { getOrder } from '@/controllers/order-controller';
import { getOrderWithUserId } from '@/services/order-service';
import { Prisma } from '@prisma/client';

async function createOrder(orderInfo: getOrderWithUserId) {
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
