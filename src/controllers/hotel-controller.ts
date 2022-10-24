import { Request, Response } from "express";

import * as hotelServices from "../services/hotel-service/index"

export async function getAllByEventId(req: Request, res: Response) {
    const { session } = res.locals
    const { eventId } = req.params
    
    const hotels = await hotelServices.getAllByEventId(+eventId, session)

    res.status(200).send(hotels)
}