import { prisma } from '@/config';

async function findActivities() {
  return prisma.activities.groupBy({
    by: ['activityDate'],
  });
}

const activitiesRepository = {
  findActivities,
};

export default activitiesRepository;
