import orderService from '@/services/order-service/index';
import { Response } from 'express';
import httpStatus from 'http-status';

import { Order } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';

export async function createOrder(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const orderInfo: getOrder = req.body;
  await orderService.createOrder({ ...orderInfo, userId: Number(userId) });

  return res.status(httpStatus.CREATED).send(orderInfo);
}

export type getOrder = Omit<Order, 'id' | 'userId'>;
