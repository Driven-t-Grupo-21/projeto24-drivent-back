import { prisma } from '@/config';
import { getOrderWithoutTicketName, getOrderWithUserId } from '@/controllers/order-controller';
import { exclude } from '@/utils/prisma-utils';
import { Prisma } from '@prisma/client';

async function createOrder(orderInfo: getOrderWithoutTicketName) {
  await prisma.order.create({
    data: orderInfo,
  });
}

async function findOrderByUser(userId: number, eventId?: number) {
  return await prisma.order.findFirst({
    where: {
      userId,
      Ticket: {
        eventId,
      },
    },
    include: {
      Ticket: true,
      User: {
        select: {
          Enrollment: {
            select: {
              name: true,
              cpf: true,
            },
          },
        },
      },
    },
  });
}

async function findOrderById(orderId: number) {
  return await prisma.order.findFirst({
    where: {
      id: orderId,
    },
  });
}

const orderRepository = {
  createOrder,
  findOrderByUser,
  findOrderById,
};

export default orderRepository;
