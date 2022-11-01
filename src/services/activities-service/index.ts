import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

// async function getOneWithAddressByUserId(userId: number): Promise<GetOneWithAddressByUserIdResult> {
async function getAllActivities() {
  const allActivities = await activitiesRepository.findActivities();
  return allActivities;
}

const activitiesService = {
  getAllActivities,
};

export default activitiesService;
