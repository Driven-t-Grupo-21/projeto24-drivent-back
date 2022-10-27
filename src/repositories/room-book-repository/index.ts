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

export async function createOrUpdateReservation(orderId: number, roomId: number) {
  return prisma.roomBook.upsert({
    where: {
      orderId
    },
    update: {
      roomId
    },
    create: {
      roomId,
      orderId
    }
  })
}