import Joi from 'joi';

export const reservationSchema = Joi.object({
    orderId: Joi.number().required(),
    roomId: Joi.number().required(),
});