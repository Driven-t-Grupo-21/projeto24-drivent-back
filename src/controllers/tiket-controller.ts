import tiketService from '@/services/ticket-service/index';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function chooseTicketType(_req: Request, res: Response) {
  await tiketService.chooseTicketType;

  return res.sendStatus(httpStatus.CREATED);
}
