import { prisma } from '@/config';

export async function findByOrderId(orderId: number) {
    return prisma.roomBook.findFirst({
        where: {
          orderId
      },
      select: {
        id: true,
        Rooms: {
          select: {
            id: true,
            beds: true,
            RoomBooks: true,
            Hotel: true
          }
        }
      }
  })
}