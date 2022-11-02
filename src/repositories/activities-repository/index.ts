import { prisma } from '@/config';

async function findActivitiesDate() {
  return prisma.activities.groupBy({
    by: ['activityDate'],
  });
}

async function getAllLocals(date: any) {
  return prisma.activities.groupBy({
    where: { activityDate: date },
    by: ['local'],
  });
}

async function findActivitiesByDate(date: any, local: any) {
  return prisma.activities.findMany({
    where: {
      activityDate: date,
      local,
    },
    select: {
      id: true,
      local: true,
      vacancies: true,
      Activity: true,
    },
  });
}

const activitiesRepository = {
  findActivitiesDate,
  getAllLocals,
  findActivitiesByDate,
};

export default activitiesRepository;
