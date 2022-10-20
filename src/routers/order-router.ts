import { createOrder } from '@/controllers/order-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const tiketsRouter = Router();

tiketsRouter.all('/*', authenticateToken).post('/', createOrder);

export { tiketsRouter };
