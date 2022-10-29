import { notFoundHotelError, notFoundError } from '@/errors';
import { Session } from '@prisma/client';

import * as hotelRepositories from '../../repositories/hotel-repository/index';
import * as userServices from '../users-service/index';
import * as roomBookServices from '../room-book-service/index';
import orderService from '../order-service/index';
import orderRepository from '../../repositories/order-repository/index';
import * as roomBookRepository from '../../repositories/room-book-repository/index';
import eventRepository from '../../repositories/event-repository/index';

export async function getAllByEventId(eventId: number, session: Session) {
  if (isNaN(eventId)) throw notFoundError();

  const { userId: id } = session as { userId: number };
  const order = await verifyOrderAlreadyExist(id, eventId);
  const isAlreadyBooked = await verifyBookAlreadyExist(order.id);
  const hotels = await hotelRepositories.getAllByEventId(eventId);
  const roomsAvailable = checkRoomsAvailable(hotels);

  return { roomsAvailable, isAlreadyBooked };
}

async function verifyOrderAlreadyExist(userId: number, eventId: number) {
  const order = await orderService.getByUserId(userId, eventId);

  if (!order) throw notFoundHotelError('Order not completed');

  if (!order.hosting) throw notFoundHotelError('Order without hosting');

  return order;
}

async function verifyBookAlreadyExist(orderId: number) {
  const usersHotelBooked = await roomBookServices.findByOrderId(orderId);

  if (!usersHotelBooked) return false;

  const roomType = setRoomType(usersHotelBooked.Rooms.beds);
  const hotel = usersHotelBooked.Rooms.Hotel;
  const roomBookeds = roomType !== 'Single' ? `Você e mais ${usersHotelBooked.Rooms.RoomBooks.length - 1}` : 'You';

  delete usersHotelBooked.Rooms.RoomBooks;
  delete usersHotelBooked.Rooms.Hotel;

  return { ...usersHotelBooked, Rooms: { ...usersHotelBooked.Rooms, roomType }, hotel, roomBookeds };
}

function checkRoomsAvailable(hotels: IHotel[]) {
  return hotels.map((hotel) => {
    const { availableHotelBeds, hotelRoomsType, Rooms } = reduceAvailableBeds(hotel.Rooms);

    return { ...hotel, availableHotelBeds, hotelRoomsType, Rooms };
  });
}

function reduceAvailableBeds(rooms: IRoom[]) {
  const Rooms: IRoomResponse[] = [];
  let hash: any = {};
  let availableHotelBeds: number = 0;

  rooms.map((room) => {
    const availableRoomBeds = room.beds - room.RoomBooks.length;
    const roomType = setRoomType(room.beds);

    if (!hash[roomType]) hash[roomType] = true;
    availableHotelBeds += availableRoomBeds;

    delete room.RoomBooks;

    return Rooms.push({ ...room, roomType, availableBeds: availableRoomBeds });
  });
  const hotelRoomsType = Object.keys(hash);

  return { Rooms, availableHotelBeds, hotelRoomsType };
}

function setRoomType(beds: number) {
  switch (beds) {
    case 1:
      return 'Single';
    case 2:
      return 'Double';
    default:
      return 'Triple';
  }
}

export async function createOrUpdateReservation(roomId: number, eventId: any, userId: number) {
  const order = await verifyOrderAlreadyExist(userId, eventId);
  await verifyValidEventId(eventId);
  await verifyValidOrder(order.id);

  return await roomBookRepository.createOrUpdateReservation(order.id, roomId);
}

async function verifyValidEventId(eventId: any) {
  if (isNaN(eventId)) throw notFoundHotelError('The eventId sent is not valid.');

  const validEventId = await eventRepository.findEventById(Number(eventId));

  if (!validEventId) throw notFoundHotelError('The eventId sent does not match any active event.');
}

async function verifyValidOrder(orderId: number) {
  const order = await orderRepository.findOrderById(orderId);

  if (!order) throw notFoundHotelError('Order not found.');
}

interface IHotel {
  id: number;
  name: string;
  Rooms: IRoom[];
}

interface IRoom {
  id: number;
  beds: number;
  RoomBooks: IRoomBook[];
}

interface IRoomBook {
  id: number;
  roomId: number;
  orderId: number;
}

interface IRoomResponse {
  id: number;
  beds: number;
  roomType: string;
  availableBeds: number;
}

/* interface IHashTable<RoomType>{
  [key: string]: boolean
}

enum RoomType {
  Single,
  Double,
  Triple
} */
