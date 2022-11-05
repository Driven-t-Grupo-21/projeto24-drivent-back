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
      startsAt: 'asc',
    },
    select: {
      id: true,
      description: true,
      startsAt: true,
      endsAt: true,
      vacancies: true,
    },
  });
}

const activitiesRepository = {
  findActivitiesDate,
  getAllLocals,
  findActivitiesByDate,
};

export default activitiesRepository;
