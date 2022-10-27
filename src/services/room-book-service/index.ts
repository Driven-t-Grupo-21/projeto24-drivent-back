import { notFoundHotelError } from '@/errors';

import * as roomBookRepository from "../../repositories/room-book-repository/index"
import orderRepository from "../../repositories/order-repository/index";

export async function findByOrderId(orderId: number) {
    return await roomBookRepository.findByOrderId(orderId) 
}

export async function createOrUpdateReservation(orderId: number, roomId: number) {
    
    await verifyValidOrder(orderId);

    return await roomBookRepository.createOrUpdateReservation(orderId, roomId);
}

async function verifyValidOrder(orderId: number) {
    const order = await orderRepository.findOrderById(orderId);

    if(!order) throw notFoundHotelError("Order not found.")
}