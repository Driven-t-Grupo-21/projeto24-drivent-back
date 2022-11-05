import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesDates() {
  const allDates = await activitiesRepository.findActivitiesDate();

  return allDates;
}

async function getAllActivitiesByDate(date: string) {
  const allLocals = await activitiesRepository.getAllLocals();

  const allActivities = Promise.all(
    allLocals.map(async (item: any) => {
      const activities = {
        localName: item.name,
        activities: await activitiesRepository.findActivitiesByDate(date, item.id),
      };
      return activities;
    }),
  );

  return allActivities;
}

const activitiesService = {
  getActivitiesDates,
  getAllActivitiesByDate,
};

export default activitiesService;
