import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

// async function getOneWithAddressByUserId(userId: number): Promise<GetOneWithAddressByUserIdResult> {
async function getAllActivities() {
  const allDates = await activitiesRepository.findActivitiesDate();

  const allActivities = await Promise.all(
    allDates.map(async (date) => {
      const activies = await activitiesRepository.findActivities(date.activityDate);
      return { date, activies };
    }),
  );
  return allActivities;
}

const activitiesService = {
  getAllActivities,
};

export default activitiesService;
