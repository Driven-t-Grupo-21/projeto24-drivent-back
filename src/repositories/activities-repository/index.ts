import { prisma } from '@/config';

async function findActivitiesDate() {
  return prisma.activities.groupBy({
    by: ['activityDate'],
  });
}

async function getAllLocals() {
  return prisma.locations.findMany();
}

async function findActivitiesByDate(date: any, localId: any) {
  return prisma.activities.findMany({
    where: {
      activityDate: date,
      localId,
    },
    orderBy: {
      hour: 'asc',
    },
    select: {
      id: true,
      vacancies: true,
      Activity: true,
      hour: true,
    },
  });
}

const activitiesRepository = {
  findActivitiesDate,
  getAllLocals,
  findActivitiesByDate,
};

export default activitiesRepository;
