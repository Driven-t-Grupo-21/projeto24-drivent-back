import { authenticateToken } from '@/middlewares';
import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { reservationSchema } from '@/schemas';

import * as hotelController from "../controllers/hotel-controller"

const hotelRouter = Router();

hotelRouter.all('/*', authenticateToken)
    .get('/:eventId', hotelController.getAllByEventId)
    .post("/:eventId/reservation", validateBody(reservationSchema), hotelController.createOrUpdateReservation)

export { hotelRouter };
