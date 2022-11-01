import { prisma } from '@/config';

async function findActivitiesDate() {
  return prisma.activities.groupBy({
    by: ['activityDate'],
  });
}

async function findActivities(date: any) {
  return prisma.activities.findMany({
    where: {
      activityDate: date,
    },
    select: {
      id: true,
      local: true,
      vacancies: true,
      Activity: true
    }
  });
}

const activitiesRepository = {
  findActivitiesDate,
  findActivities,
};

export default activitiesRepository;
