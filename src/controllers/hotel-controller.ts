import { Request, Response } from "express";

import * as hotelServices from "../services/hotel-service/index";
import * as roomBookServices from "../services/room-book-service/index";

export async function getAllByEventId(req: Request, res: Response) {
    const { session } = res.locals
    const { eventId } = req.params
    
    const hotels = await hotelServices.getAllByEventId(+eventId, session)

    res.status(200).send(hotels)
}

export async function createOrUpdateReservation(req: Request, res: Response) {
    const {orderId, roomId} = req.body;

    await roomBookServices.createOrUpdateReservation(orderId, roomId);

    res.status(201).send("Reservation completed.")
}