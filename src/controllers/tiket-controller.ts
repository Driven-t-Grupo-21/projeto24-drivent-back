import tiketService from '@/services/ticket-service/index';
import { Response } from 'express';
import httpStatus from 'http-status';

import { Tiket } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketInfo: getTicketType = req.body;
  await tiketService.createTicket({ ...ticketInfo, userId: Number(userId) });

  return res.status(httpStatus.CREATED).send(ticketInfo);
}

export type getTicketType = Omit<Tiket, 'id' | 'userId'>;
