import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesDates() {
  const allDates = await activitiesRepository.findActivitiesDate();

  return allDates;
}

async function getAllActivitiesByDate(date: string) {
  const allLocals = await activitiesRepository.getAllLocals(date);

  const allActivities = Promise.all(
    allLocals.map(async (item) => {
      const activities = {
        local: item.local,
        activities: await activitiesRepository.findActivitiesByDate(date, item.local),
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
