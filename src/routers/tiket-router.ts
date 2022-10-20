import { createTicket } from '@/controllers/tiket-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const tiketsRouter = Router();

tiketsRouter.all('/*', authenticateToken).post('/', createTicket);

export { tiketsRouter };
