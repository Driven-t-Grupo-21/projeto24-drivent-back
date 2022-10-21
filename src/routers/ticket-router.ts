import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketsEvent } from '@/controllers/ticket-controller';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/:id', getTicketsEvent);

export { ticketsRouter };