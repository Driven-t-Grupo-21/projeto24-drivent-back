import { createOrder, getUserOrder } from '@/controllers/order-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const orderRouter = Router();

orderRouter.all('/*', authenticateToken).post('/', createOrder).get('/:eventId', getUserOrder);

export { orderRouter };
