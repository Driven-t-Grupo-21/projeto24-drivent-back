import { prisma } from '@/config';
import { invalidDataError, notFoundError, notFoundHotelError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';
import { Activities, ActivitiesOrder } from '@prisma/client';
import { check } from 'prettier';

import orderService from '../order-service';

async function getActivitiesDates(userId: number) {
  const allDates = await activitiesRepository.findActivitiesDate();

  await orderService.getByUserIdOnly(userId)

  return allDates;
}

async function getAllActivitiesByDate(date: string, userId: number) {
  const allLocals = await activitiesRepository.getAllLocals();

  const allActivities = await Promise.all(
    allLocals.map(async (item: any) => {
      const activities = {
        localName: item.name,
        activities: await activitiesRepository.findActivitiesByDate(date, item.id),
      };
      return activities;
    }),
  );
  const userActivities = await activitiesUserIsAlreadyBooked(userId);


  return { allActivities, userActivities };
}

async function postActivityBook(userId: number, activityId: number) {
  if (isNaN(userId) || isNaN(activityId)) throw invalidDataError([`Data: ${userId}, ${activityId} is invalid`]);

  const userActivitiesBooked = await activitiesRepository.findActivitiesByUserId(userId);
  const chosenActivity = await activitiesRepository.findActivitiesById(activityId);
  await checkTimeConflict(userActivitiesBooked, chosenActivity);
  await checkVacancy(chosenActivity);

  try {
    await prisma.$transaction(async (prisma) => {
      await activitiesRepository.createActivityOrder(userId, activityId);
      await activitiesRepository.updateActivityVacancy(activityId);
    });
    return;
  } catch (e) {
    console.log(e);
    throw { message: e };
  }
}

async function checkTimeConflict(userActivitiesBooked: ActivitiesOrder[] | [], chosenActivity: Activities) {
  userActivitiesBooked.map((activity: any) => {
    if (
      `${activity.activityInfo.activityDate}` === `${chosenActivity.activityDate}` &&
      (activity.activityInfo.endsAt > chosenActivity.startsAt ||
        activity.activityInfo.startsAt === chosenActivity.startsAt)
    ) {
      throw notFoundHotelError('This user already has an event at this time');
    }
  });

  return;
}

async function checkVacancy(activity: Activities | any) {
  if (activity.vacancies - activity?.ActivitiesOrder.length <= 0) throw notFoundHotelError('Sold out vacancies');
  return;
}

async function activitiesUserIsAlreadyBooked(userId: number) {
  const activitiesBookedHash: any = {};
  const userActivitiesBooked = await activitiesRepository.findActivitiesByUserId(userId);

  userActivitiesBooked.map((activity) => {
    activitiesBookedHash[activity.activityInfosId] = true;
  });

  return Object.keys(activitiesBookedHash);
}

const activitiesService = {
  getActivitiesDates,
  getAllActivitiesByDate,
  postActivityBook,
};

export default activitiesService;
