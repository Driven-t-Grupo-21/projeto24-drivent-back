import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

import * as hotelController from "../controllers/hotel-controller"

const hotelRouter = Router();

hotelRouter.all('/*', authenticateToken)
    .get('/:eventId', hotelController.getAllByEventId)

export { hotelRouter };
