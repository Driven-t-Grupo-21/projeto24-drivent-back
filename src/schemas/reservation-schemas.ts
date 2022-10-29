import Joi from 'joi';

export const reservationSchema = Joi.object({
  roomId: Joi.number().required(),
});
