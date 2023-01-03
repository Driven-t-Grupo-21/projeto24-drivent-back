import { prisma } from '@/config';
import { Hotel } from '@prisma/client';

export async function getAllByEventId(eventId: number): Promise<any> {
  return await prisma.hotel.findMany({
    where: {
      eventId,
    },
    select: {
      id: true,
      name: true,
      logoImageUrl: true,
      Rooms: {
        select: {
          id: true,
          beds: true,
          RoomBooks: true,
          number: true,
        },
      },
    },
  });
}
