import { Request, Response } from "express"
import httpStatus from 'http-status';

import * as ticketServices from "../services/ticket-service"

export async function getTicketsEvent(req: Request, res: Response) {
    const { id } = req.params
    const { userId } = res.locals.session
    const tickets = await ticketServices.findByEventId({ id: +id, userId: userId })
    
    return res.status(httpStatus.OK).send(tickets);
  }