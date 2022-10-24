import * as roomBookRepository from "../../repositories/room-book-repository/index"

export async function findByOrderId(orderId: number) {
    return await roomBookRepository.findByOrderId(orderId) 
}